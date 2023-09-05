import React, {Fragment, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const RegisterForm = () => {
    let [regForm, setRegForm] = useState({
        name:"",
        login:"",
        password:"",
        email:""
    })
    const register=(event)=>{
        event.preventDefault()
        setRegForm({
            name:"",
            login:"",
            password:"",
            email:""
        })
    }
    const router = useNavigate()
    return (
        <Fragment>
            <Container>
                <Form  onSubmit={register}>
                    <h1>Регистрация</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required value={regForm.email} onChange={(e)=>{setRegForm((actual)=>{return {...actual, email:e.target.value}})}}/>
                        <Form.Control.Feedback type="invalid">Укажите email !</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" required value={regForm.login} onChange={(e)=>{setRegForm((actual)=>{return {...actual, login:e.target.value}})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" required value={regForm.name} onChange={(e)=>{setRegForm((actual)=>{return {...actual, name:e.target.value}})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="ps1" value={regForm.password} onChange={(e)=>{setRegForm((actual)=>{return {...actual, password:e.target.value}})}}/>
                        <Form.Control.Feedback type="invalid">Укажите пароль !</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Зарегестрироваться
                    </Button>
                    <p>Уже есть аккаунт? <Button variant="primary" type="button" className="mt-2" onClick={()=>{router(LOGIN_ROUTE)}} >Вход</Button></p>
                </Form>
            </Container>
        </Fragment>
    );
};

export default RegisterForm;