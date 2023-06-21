import React, {Fragment, useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../api/authApi";
import NavBar from "../components/NavBar";
import {getAllExercise} from "../api/exerciseApi";
import {useNavigate} from "react-router-dom";
import {COMPLEX, CREATE_EXERCISE, MUSCULS, MUSCULS_RUS} from "../utils/consts";

const Exercise = () => {
    const dispatch = useDispatch();
    const exercise = useSelector(state => state.exercise.allExercise)
    let [exForm, setExForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:50,
        shared:false
    })
    const [muscles, setMuscles] = useState([])
    const [musclesList, setMusclesList] = useState([])
    const [options, setOptions] = useState([])
    const [exGroup,setExGroup]=useState();
    const router = useNavigate()


    useEffect(()=>{
        findExercises()
    },[])
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
    const deleteElement=(elem)=>{
        let newList=[]
        muscles.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setMuscles(newList)
    }

    const findExercises=()=>{
        dispatch(getAllExercise(exForm.common,muscles,exForm.my,exForm.name,exForm.page,exForm.size,exForm.shared))
    }
    useEffect(()=>{
        if(exercise.data && exercise){
            setExGroup(exercise.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <a className="text-decoration-none text-dark" onClick={()=>router('/exercise/'+data.id)}><b>{data.name}</b></a>
                        </Container>
                        <p>{data.imageId}</p>
                    </Container>
                </ListGroupItem>
            }))}
    },[exercise])
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
                            onChange={(e)=>{setExForm((actual)=>{return {...actual, name:e.target.value}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Select aria-label="Default select example" onChange={(e)=>{setMuscles((state)=>[...state, e.target.value])}}>
                            {options}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Базовые упражнения"
                            onChange={(e)=>{setExForm((actual)=>{return {...actual, common:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Назначенные"
                            onChange={(e)=>{setExForm((actual)=>{return {...actual, shared:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Мои"
                            onChange={(e)=>{setExForm((actual)=>{return {...actual, my:e.target.checked}})}}
                        />
                    </InputGroup>
                    <Button onClick={findExercises}>Применить фильтры</Button>
                    <Button onClick={()=>{router(CREATE_EXERCISE)}}>Создать упражнение</Button>
                </Container>
                <ListGroup className="d-grid">
                    {musclesList}
                </ListGroup>
                <Container>
                    <h1>Упражнения</h1>
                    <ListGroup>
                        {exGroup}
                    </ListGroup>
                </Container>
            </Container>
        </Fragment>
    );
};

export default Exercise;