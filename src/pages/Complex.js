import React, {Fragment, useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../api/authApi";
import NavBar from "../components/NavBar";
import {getAllExercise} from "../api/exerciseApi";
import {useNavigate} from "react-router-dom";
import {COMPLEX, CREATE_COMPLEX} from "../utils/consts";
import {getComplexes} from "../api/complexApi";
import ComplexCreate from "./ComplexCreate";

const Complex = () => {
    const dispatch = useDispatch();
    const complexes = useSelector(state => state.complex.allComplexes)
    let [comForm, setComForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:50,
        shared:false,
        liked:false,
        published:false,
    })
    const router = useNavigate()
    useEffect(()=>{
        findComplexes()
    },[])
    const [comGroup,setComGroup]=useState();


    const findComplexes=()=>{
        dispatch(getComplexes(comForm.common,comForm.my,comForm.name,comForm.page,comForm.size,comForm.shared,comForm.liked,comForm.published))
    }
    useEffect(()=>{
        if(complexes.data && complexes){
            setComGroup(complexes.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <b>{data.name}</b>
                        </Container>
                        <p>{data.imageId}</p>
                    </Container>
                </ListGroupItem>
            }))}
    },[complexes])
    return (
        <Fragment>
            <NavBar/>
            <Container className="d-grid">
                <h1>Фильтры</h1>
                <Container className="d-flex">
                    <InputGroup className="mb-3 pe-3">
                        <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                        <Form.Control
                            placeholder="Название"
                            aria-label="Название"
                            aria-describedby="basic-addon1"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, name:e.target.value}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Базовые упражнения"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, common:e.target.checked}})}}
                            className="ms-3 me-3"
                        />
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Назначенные"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, shared:e.target.checked}})}}
                            className="ms-3 me-3"
                        />
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Мои"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, my:e.target.checked}})}}
                            className="ms-3 me-3"
                        />
                    </InputGroup>
                    <Button onClick={findComplexes}>Применить фильтры</Button>
                    <Button onClick={()=>{router(CREATE_COMPLEX)}} className="ms-3">Создать комплекс</Button>
                </Container>
                <Container>
                    <h1>Комплексы</h1>
                    <ListGroup>
                        {comGroup}
                    </ListGroup>
                </Container>
            </Container>
        </Fragment>
    );
};

export default Complex;