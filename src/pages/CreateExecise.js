import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, CloseButton, Container, Form, Image, InputGroup, ListGroup} from "react-bootstrap";
import {COMPLEX, EXERCISE, MUSCULS, MUSCULS_RUS, RESET_PASSWORD} from "../utils/consts";
import {useDispatch} from "react-redux";
import heroBanner from "../img/heroBanner.svg";
import {createExercise} from "../api/exerciseApi";
import {useNavigate} from "react-router-dom";

const CreateExecise = () => {
    const dispatch = useDispatch();
    const [muscles, setMuscles] = useState([])
    const [musclesList, setMusclesList] = useState([])
    const [options, setOptions] = useState([])
    const router = useNavigate();

    let [exForm, setExForm] = useState({
        weight:0,
        repetitions:0,
        duration:0,
        imageId:"",
        description:"",
        name:"",
        published:false
    })
    const addExesice=()=>{
        dispatch(createExercise(exForm.duration,exForm.repetitions,exForm.weight,exForm.description,exForm.imageId,muscles,exForm.name,exForm.published))
    }
    const deleteElement=(elem)=>{
        let newList=[]
        muscles.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setMuscles(newList)
    }

    useEffect(()=>{
        setMusclesList([])
        if(muscles.length!==0){
            setMusclesList(muscles.map((data) => {
                return <ListGroup.Item key={data}>
                    <b>{MUSCULS_RUS[data]}</b>
                    <CloseButton onClick={()=>{deleteElement(data)}}></CloseButton>
                </ListGroup.Item>
            }))}
        setOptions(MUSCULS.map((data)=>{
                return <option key={data} value={data} disabled={muscles.includes(data)}>{MUSCULS_RUS[data]}</option>
            })
        )
    },[muscles])
    return (
        <Fragment>
            <NavBar/>
            <Container className="d-flex">
                <Container>
                    <Form  onSubmit={addExesice}>
                        <h1>Создание упражнения</h1>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" required value={exForm.name} onChange={(e)=>{setExForm((actual)=>{return {...actual, name:e.target.value}})}}/>
                        </Form.Group>
                        <Form.Group className="mb-3"    >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control type="text" name="ps1" value={exForm.description} onChange={(e)=>{setExForm((actual)=>{return {...actual, description:e.target.value}})}}/>
                        </Form.Group>
                        <InputGroup className="mb-3 pe-3">
                            <InputGroup.Text id="basic-addon1">Вес</InputGroup.Text>
                            <Form.Control
                                aria-label="Название"
                                aria-describedby="basic-addon1"
                                onChange={(e)=>{setExForm((actual)=>{return {...actual, weight:e.target.value}})}}
                            />
                            <InputGroup.Text id="basic-addon1">Продолжительность</InputGroup.Text>
                            <Form.Control
                                aria-label="Название"
                                aria-describedby="basic-addon1"
                                onChange={(e)=>{setExForm((actual)=>{return {...actual, duration:e.target.value}})}}
                            />
                            <InputGroup.Text id="basic-addon1">Количество подходов</InputGroup.Text>
                            <Form.Control
                                aria-label="Название"
                                aria-describedby="basic-addon1"
                                onChange={(e)=>{setExForm((actual)=>{return {...actual, repetitions:e.target.value}})}}
                            />
                        </InputGroup>
                        <Form.Select aria-label="Default select example" onChange={(e)=>{setMuscles((state)=>[...state, e.target.value])}}>
                            <option></option>
                            {options}
                        </Form.Select>
                        <ListGroup className="d-grid">
                            {musclesList}
                        </ListGroup>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Сделать публичной"
                            onChange={(e)=>{setExForm((actual)=>{return {...actual, published:e.target.checked}})}}
                        />
                        <Button variant="primary" type="submit" className="mt-3">
                            Сохранить
                        </Button>
                        <Button variant="primary" type="button" className="mt-3" onClick={()=>{router(EXERCISE)}}>
                            Перейти к упражнениям
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Image src={heroBanner} thumbnail/>
                </Container>
            </Container>


        </Fragment>
    );
};

export default CreateExecise;