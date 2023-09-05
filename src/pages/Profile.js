import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";

const Profile = () => {
    let [userInfo, setUserInfo]=useState({
        name:"",
        email:""
    })
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setShortName(user.name)
    }
    const user =[]
    const [show, setShow] = useState(false);
    const [shortName, setShortName] = useState('');
    useEffect(()=>{
        setUserInfo({
            name:user.name,
            email:user.email
        })
    },[user])
    const updateProfile=(e)=>{
        e.preventDefault()
    }
    const bacomeTrainer=()=>{
    }
    return (
            <Fragment>
                <NavBar/>
                <Container>
                    <Form onSubmit={updateProfile}>
                        <h1 className="my-3">Профиль</h1>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                ФИО
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userInfo.name} onChange={e=>setUserInfo((actual)=>{return {...actual,name:e.target.value}})} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Login
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={user.login} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" value={userInfo.email} onChange={e=>setUserInfo((actual)=>{return {...actual,email:e.target.value}})} />
                            </Col>
                        </Form.Group>
                        {!user.isTrainer && <Button variant="primary" type="button" className="float-end ms-2" onClick={handleShow}>
                            Стать тренером
                        </Button>}
                        <Button variant="primary" type="submit" className="float-end" >
                            Изменить
                        </Button>
                    </Form>
                </Container>
                <Modal show={show} onHide={handleClose} onSubmit={bacomeTrainer}>
                    <Modal.Header closeButton>
                        <Modal.Title>Стать тренером</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Название спортзала
                                </Form.Label>
                                <Form.Control
                                    autoFocus
                                    value={shortName}
                                    required
                                    onChange={e=>setShortName(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"  onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" type="submit" onClick={()=> {bacomeTrainer(); handleClose()}}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
    );
};

export default Profile;