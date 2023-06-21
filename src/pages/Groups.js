import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createGroup, deleteGroup, editGroup, myGroups, myTrainingGroups} from "../api/groupApi";

const Groups = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups.myTrainingGroups)
    const [groupsArray,setGroupsArray] =useState([]);
    const [show, setShow] = useState(false);
    const [imageId,setImageId] = useState('')
    const [mainTrainer,setMainTrainer]= useState('')
    const [name,setName]= useState('')
    const [description,setDescription]= useState('')
    const [searchName, setSearchName] = useState('')
    const [currentGroupId, setCurrentGroupId] = useState();
    const [title, setTitle] =useState();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setShow(true);
        setName(name)
    }
    useEffect(()=>{
        dispatch(myTrainingGroups(searchName))
    },[dispatch])
    useEffect(()=>{
        console.log(groups.length, groups.data)
        if (groups.length!==undefined) {
            setGroupsArray(groups.map((data)=>{
                return <ListGroupItem key={data.id}>
                    <a className="link-primary" onClick={()=>{navigate('/groups/'+data.id)}}>{data.name}</a>
                </ListGroupItem>
            }))}
    },[groups,dispatch])
    const changeNameGroup =()=>{
        if(title==="Создать группу"){
            createGroupButton();
            dispatch(myTrainingGroups(searchName))
        }
        else {
            dispatch(editGroup(imageId,mainTrainer,name,description,currentGroupId))
        }
    }

    const createGroupButton = () => {
        dispatch(createGroup(imageId,name))
    }
    return (
        <Fragment>
            <NavBar/>
            <Container fluid="md" className="mt-3">
                <div className="mb-4">
                    <h1 >
                        Мои группы
                    </h1>
                    <Button variant="primary" onClick={()=>{handleShow("");setTitle("Создать группу")}}>Создать</Button>
                </div>
                <Card style={{ width: '100%' }}>
                    <ListGroup variant="flush" >
                        {groupsArray}
                    </ListGroup>
                </Card>
            </Container>
            <Modal show={show} onHide={handleClose} onSubmit={changeNameGroup}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Название группы
                            </Form.Label>
                            <Form.Control
                                autoFocus
                                value={name}
                                required
                                onChange={e=>setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Картинка группы
                            </Form.Label>
                            <Form.Control
                                autoFocus
                                value={imageId}
                                required
                                onChange={e=>setImageId(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=> {changeNameGroup(); handleClose()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default Groups;