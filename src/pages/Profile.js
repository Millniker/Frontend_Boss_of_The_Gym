import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../components/NavBar";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {profile, putProfile} from "../api/profileApi";

const Profile = () => {
    let [userInfo, setUserInfo]=useState({
        name:"",
        email:""
    })
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    useEffect(()=>{
        setUserInfo({
            name:user.name,
            email:user.email
        })
    },[user])
    const updateProfile=(e)=>{
        e.preventDefault()
        dispatch(putProfile(userInfo.email,userInfo.name))
    }
    return (
            <div>
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
                        <Button variant="primary" type="submit" className="float-end" >
                            Изменить
                        </Button>
                    </Form>
                </Container>
            </div>
    );
};

export default Profile;