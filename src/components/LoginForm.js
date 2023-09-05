import React, {Fragment, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {RESET_PASSWORD} from "../utils/consts";

const LoginForm = () => {
    const router = useNavigate()
    let [logForm, setLogForm] = useState({
        password:"",
        login:""
    })
    return (
        <Fragment>
            <Container>
                <Form>
                    <h1>Вход</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" required value={logForm.login} onChange={(e)=>{setLogForm((actual)=>{return {...actual, login:e.target.value}})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="ps1" value={logForm.password} onChange={(e)=>{setLogForm((actual)=>{return {...actual, password:e.target.value}})}}/>
                        <Form.Control.Feedback type="invalid">Укажите пароль !</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Войти
                    </Button>
                    <p>Забыли пароль <Button variant="primary" type="button" onClick={()=>router(RESET_PASSWORD)}>Восстановить пароль</Button></p>
                </Form>
            </Container>
        </Fragment>
    );
};

export default LoginForm;