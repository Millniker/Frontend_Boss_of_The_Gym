import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "../components/NavBar";

const ResetPassword = () => {
    const [show, setShow] = useState(false);
    const [login,setLogin] = useState('');
    const [code,setCode] = useState();
    const [password,setPassword] = useState();
    const changePassword=(e)=>{
        e.preventDefault()
    }
    const sendCode=()=>{

    }
    return (
        <div>
            <NavBar/>
            <Container>
                <Form  onSubmit={changePassword}>
                    {!show && <Form.Group className="mb-3">
                        <Form.Label>Введите ваш логин</Form.Label>
                        <Form.Control type="text" required value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
                    </Form.Group>}
                    {show &&
                    <Form.Group className="mb-3">
                        <Form.Label>Введите код</Form.Label>
                        <Form.Control type="password" name="ps1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    }
                    {show &&
                    <Form.Group className="mb-3">
                        <Form.Label>Введите новый пароль</Form.Label>
                        <Form.Control type="password" name="ps1" value={code} onChange={(e)=>{setCode(e.target.value)}}/>
                    </Form.Group>
                    }
                    {show && <Button variant="primary" type="submit" >Изменить пароль</Button>}
                    {!show && <Button variant="primary" type="button" onClick={()=>{sendCode();setShow(true)}}>
                        Отправить код
                    </Button>}

                </Form>
            </Container>
        </div>
    );
};

export default ResetPassword;