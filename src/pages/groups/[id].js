import React, {Fragment, useEffect, useState} from 'react';
import {
    addTrainer, addUser,
    currentGroup,
    deleteGroup, deleteTrainer, deleteUser,
    editGroup,
    getTrainersGroup, getUsersGroup,
    myGroups,
    myTrainingGroups
} from "../../api/groupApi";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../../components/NavBar";
import {GROUPS} from "../../utils/consts";
import {getMyUsers, getTrainers} from "../../api/trainerApi";

const Id = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups.currentGroup)
    const trainers = useSelector(state => state.groups.trainersInGroup)
    const allTrainersInApp = useSelector(state => state.trainers.trainersPage)
    const users = useSelector(state => state.groups.users)
    const allUsersInGroup = useSelector(state=>state.trainers.myUsers)
    const [item,setItem] =useState();
    const [show, setShow] = useState(false);
    const [showTrainerModal, setShowTrainerModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [groupName, setGroupName] =useState("");
    const [description, setDescription] =useState("");
    const [image, setImage] =useState("");
    const [mainTrainerId,setMainTrainerId]= useState('')
    const [trainersGroup,setTrainersGroup]=useState([]);
    const [allTrainers,setAllTrainers]=useState();
    const [usersGroup,setUsersGroup]=useState([]);
    const [allUsers,setAllUsers]=useState();
    const [ids,setIds]=useState([]);


    const navigate = useNavigate();
    const {id} =useParams()
    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setShow(true);
    }
    const closeChooseTrainerModal = () => {
        setIds([])
        setShowTrainerModal(false);
    }
    const showChooseTrainerModal = (name) => {
        setShowTrainerModal(true);
    }
    const closeChooseUserModal = () => {
        setIds([])
        setShowUserModal(false);
    }
    const showChooseUserModal = (name) => {
        setShowUserModal(true);
    }
    useEffect(()=>{
        dispatch(currentGroup(id))
        dispatch(getTrainers(1,100,''));
        dispatch(getTrainersGroup(id));
        dispatch(getUsersGroup(id))
        dispatch(getMyUsers(1,100,''))
    },[dispatch])
    useEffect(()=>{
        if(groups.name!==undefined) {
            setMainTrainerId(groups.mainTrainer.id)
            setGroupName(groups.name)
            setDescription(groups.description)
            setItem(<div>
                <div className="mb-4">
                    <h1>
                        Мои группы
                    </h1>
                    <Button variant="primary" onClick={() => {
                        handleShow("")}}>Редактировать группу</Button>
                    <Button variant="primary" onClick={() => {deleteMyGroup()}}>Удалить группу</Button>
                </div>
                <b>{groups.name}</b>
                <div className="d-grid">
                    <div> Описание- {groups.description}</div>
                    <div className="pt-1">Зал {groups.mainTrainer.shortName}</div>
                    <div className="pt-1">Имя тренера {groups.mainTrainer.name}</div>
                </div>
            </div>)
        }
    },[groups,dispatch])
    const editMyGroup=()=>{
        dispatch(editGroup(
            description,
            image,
            mainTrainerId,
            groupName,
            id
        ))
    }
    const deleteMyGroup= async ()=>{
        await dispatch(deleteGroup(
            id
        ));
        navigate(GROUPS)
    }
    const addTrainerToGroup=()=>{
        dispatch(addTrainer(id,ids))
    }
    const deleteTrainerInGroup=(trainerId)=>{
        let arr = []
        arr.push(trainerId)
        dispatch(deleteTrainer(id,arr))
        setIds([])
    }
    const addUserToGroup=()=>{
        dispatch(addUser(id,ids))
    }
    const deleteUserInGroup=(userId)=>{
        let arr = []
        arr.push(userId)
        dispatch(deleteUser(id,arr))
        setIds([])
    }
    useEffect(()=>{
        if(allTrainersInApp.data!==undefined){
            setAllTrainers(allTrainersInApp.data.map((data) => {
                return <option key={data.id} value={data.id}>{data.name}</option>
            }))
        }
    },[allTrainersInApp])

    useEffect(()=>{
        if(allUsersInGroup.data!==undefined){
            setAllUsers(allUsersInGroup.data.map((data) => {
                return <option key={data.id} value={data.id}>{data.name}</option>
            }))
        }
    },[allTrainersInApp])

    useEffect(()=>{
        if(trainers.length!==undefined){
        setTrainersGroup(trainers.map((data) => {
            return <ListGroupItem key={data.id}>
                <b>{data.name}</b>
                <Button variant="primary" onClick={() => {deleteTrainerInGroup(data.id)}}>Удалить тренера</Button>
            </ListGroupItem>
        }))}
    },[trainers])
    useEffect(()=>{
        console.log(users)
        if(users.length!==undefined){
            setUsersGroup(users.map((data) => {
                return <ListGroupItem key={data.id}>
                    <b>{data.name}</b>
                    <Button variant="primary" onClick={() => {deleteUserInGroup(data.id)}}>Удалить пользователя</Button>
                </ListGroupItem>
            }))}
    },[users])
    return (
        <Fragment>
            <NavBar/>
            <Container fluid="md" className="mt-3">
                {item}
            </Container>
            <ListGroup fluid="md" className="mt-3">
                {trainersGroup}
            </ListGroup>
            <Button variant="primary" onClick={() => {showChooseTrainerModal()}}>Добавить тренера</Button>
            <ListGroup fluid="md" className="mt-3">
                {usersGroup}
            </ListGroup>
            <Button variant="primary" onClick={() => {showChooseUserModal()}}>Добавить пользователя</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование группы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Название группы
                            </Form.Label>
                            <Form.Control
                                autoFocus
                                value={groupName}
                                onChange={e=>setGroupName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Описание
                            </Form.Label>
                            <Form.Control
                                value={description}
                                onChange={e=>setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Фото
                            </Form.Label>
                            <Form.Control
                                value={image}
                                onChange={e=>setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>
                            Основной тренер
                        </Form.Label>
                        <Form.Control
                            value={mainTrainerId}
                            onChange={e=>setMainTrainerId(e.target.value)}
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{editMyGroup();handleClose()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTrainerModal} onHide={closeChooseTrainerModal}>
                <Modal.Header >
                    <Modal.Title>Добавить тренера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mt-2">
                            <Form.Label>
                                Тренера
                            </Form.Label>
                            <Form.Select onChange={e =>setIds((state)=>[...state, e.target.value])}>
                                {allTrainers}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={closeChooseTrainerModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{addTrainerToGroup();closeChooseTrainerModal()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUserModal} onHide={closeChooseUserModal}>
                <Modal.Header >
                    <Modal.Title>Добавить пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mt-2">
                            <Form.Label>
                                Пользователи
                            </Form.Label>
                            <Form.Select onClick={e =>setIds((state)=>[...state, e.target.value])}>
                                {allUsers}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={closeChooseUserModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{addUserToGroup();closeChooseUserModal()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

    export default Id;