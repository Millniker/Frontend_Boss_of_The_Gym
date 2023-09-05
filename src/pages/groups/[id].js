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
import {Button, Card, CloseButton, Container, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../../components/NavBar";
import {GROUPS} from "../../utils/consts";
import {getMyUsers, getTrainers} from "../../api/trainerApi";
import Com from "../complex/com";

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
        setTrainer([])
        setTrainersIds([])
        setShowTrainerModal(false);
    }
    const showChooseTrainerModal = (name) => {
        setShowTrainerModal(true);
    }
    const closeChooseUserModal = () => {
        setIds([])
        setUsersIds([])
        setUsersList([])
        setUser([])
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
                    <Button variant="primary" className="me-2" onClick={() => {showChooseTrainerModal()}}>Добавить тренера</Button>
                    <Button variant="primary" className="me-2" onClick={() => {showChooseUserModal()}}>Добавить пользователя</Button>
                    <Button variant="primary" className="me-2" onClick={() => {
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
        dispatch(addTrainer(id,trainersIds))
    }
    const deleteTrainerInGroup=(trainerId)=>{
        let arr = []
        arr.push(trainerId)
        dispatch(deleteTrainer(id,arr))
        setIds([])
    }
    const addUserToGroup=()=>{
        dispatch(addUser(id,usersIds))
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
        if(trainers.length!==undefined){
        setTrainersGroup(trainers.map((data) => {
            return <ListGroupItem key={data.id} className="border border-dark rounded-4 mb-2 mt-2">
                <b>{data.name}</b>
                <CloseButton className="float-end" onClick={() => {deleteTrainerInGroup(data.id)}}></CloseButton>
            </ListGroupItem>
        }))}
    },[trainers])
    useEffect(()=>{
        console.log(users)
        if(users.length!==undefined){
            setUsersGroup(users.map((data) => {
                return <ListGroupItem key={data.id} className="border border-dark rounded-4 mb-2 mt-2">
                    <b>{data.name}</b>
                    <CloseButton className="float-end" variant="primary" onClick={() => {deleteUserInGroup(data.id)}}></CloseButton>
                </ListGroupItem>
            }))}
    },[users])
    const [usersList, setUsersList] = useState([])
    const [usersIds, setUsersIds] = useState([])
    const [usersOptions, setUsersOptions] = useState([])
    const [user, setUser] = useState([])
    const deleteUsersElement=(elem)=>{
        let newList=[]
        user.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setUser(newList)
    }
    useEffect(()=>{
        setUsersList([])
        if(user.length!==0){
            setUsersIds([])
            setUsersList(user.map((data) => {
                allUsersInGroup.data.map((train)=>{
                    if(data === train.login){
                        setUsersIds((prevState)=>[...prevState,train.id])
                    }
                })
                return <ListGroup.Item key={data}>
                    <b>{data}</b>
                    <CloseButton onClick={()=>{deleteUsersElement(data)}}></CloseButton>
                </ListGroup.Item>
            }))}
        if(allUsersInGroup.data!==undefined){
            setUsersOptions(allUsersInGroup.data.map((data)=>{
                let dis = false
                if(users.length!=undefined){
                users.map((users)=>{
                    if(users.login===data.login){
                        dis=true
                    }
                })}
                return <option key={data.id} value={data.login} disabled={user.includes(data.login) ||dis}>{data.name}</option>
                })
            )}
    },[allUsersInGroup,user,users])
    const [trainersList, setTrainersList] = useState([])
    const [trainersIds, setTrainersIds] = useState([])
    const [trainersOptions, setTrainersOptions] = useState([])
    const [trainer, setTrainer] = useState([])
    console.log(users)
    const deleteTrainerElement=(elem)=>{
        let newList=[]
        trainer.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setTrainer(newList)
    }

    useEffect(()=>{
        setTrainersList([])
        if(trainer.length!==0){
            setTrainersIds([])
            setTrainersList(trainer.map((data) => {
                allTrainersInApp.data.map((train)=>{
                    if(data === train.name){
                        setTrainersIds((prevState)=>[...prevState,train.id])
                    }
                })
                return <ListGroup.Item key={data}>
                    <b>{data}</b>
                    <CloseButton onClick={()=>{deleteTrainerElement(data)}}></CloseButton>
                </ListGroup.Item>
            }))}
        if(allTrainersInApp.data!==undefined){
            setTrainersOptions(allTrainersInApp.data.map((data)=>{
                let dis = false
                trainers.map((users)=>{
                    if(users.name===data.name){
                        dis=true
                    }
                })
                    return <option key={data.id} value={data.name} disabled={user.includes(data.name)||dis}>{data.name}</option>
                })
            )}
    },[allTrainersInApp,trainer,trainers])

    console.log(trainersIds)
    return (
        <Fragment>
            <NavBar/>
            <Container fluid="md" className="mt-3">
                {item}
            </Container>
            <Container className="mt-4">
                <h3>Тренера</h3>
                <ListGroup fluid="md" className="mt-3 border border-light">
                    {trainersGroup}
                </ListGroup>
            </Container>
            <Container className="mt-4">
                <h3>Участники</h3>
                <ListGroup fluid="md" className="mt-3 border border-light">
                {usersGroup}
            </ListGroup>
            </Container>
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
                            <Form.Select aria-label="Default select example" onChange={(e)=>{setTrainer((state)=>[...state, e.target.value]);}} className="mb-2">
                                <option></option>
                                {trainersOptions}
                            </Form.Select>
                            <ListGroup>
                                {trainersList}
                            </ListGroup>
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
                            <Form.Select aria-label="Default select example" onChange={(e)=>{setUser((state)=>[...state, e.target.value]);}} className="mb-2">
                                <option></option>
                                {usersOptions}
                            </Form.Select>
                            <ListGroup>
                                {usersList}
                            </ListGroup>
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