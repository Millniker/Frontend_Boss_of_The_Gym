import React, {Fragment, useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../api/authApi";
import NavBar from "../components/NavBar";
import {getAllExercise} from "../api/exerciseApi";
import {useNavigate} from "react-router-dom";
import {COMPLEX, CREATE_COMPLEX, CREATE_TRAINING} from "../utils/consts";
import {getComplexes} from "../api/complexApi";
import {getTrainings} from "../api/trainingApi";

const Training = () => {
    const dispatch = useDispatch();
    const trainings = useSelector(state => state.training.allTrainings)
    let [trainForm, setComForm] = useState({
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
        findTrainings()
    },[])
    const [trainGroup,setTrainGroup]=useState();


    const findTrainings=()=>{
        dispatch(getTrainings(trainForm.common,trainForm.liked,trainForm.my,trainForm.name,trainForm.page,trainForm.size,trainForm.published,trainForm.shared))
    }
    useEffect(()=>{
        if(trainings.data && trainings){
            setTrainGroup(trainings.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <a className="text-decoration-none text-dark" onClick={()=>router('/training/'+data.id)}><b>{data.name}</b></a>
                        </Container>
                        <p>{data.imageId}</p>
                    </Container>
                </ListGroupItem>
            }))}
    },[trainings])
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
                            label="Открыт доступ"
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
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Избранное"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, liked:e.target.checked}})}}
                            className="ms-3 me-3"
                        />
                    </InputGroup>
                    <Button onClick={findTrainings}>Применить фильтры</Button>
                    <Button onClick={()=>{router(CREATE_TRAINING)}} className="ms-3">Создать тренировку</Button>
                </Container>
                <Container>
                    <h1>Комплексы</h1>
                    <ListGroup>
                        {trainGroup}
                    </ListGroup>
                </Container>
            </Container>
        </Fragment>
    );
};

export default Training;