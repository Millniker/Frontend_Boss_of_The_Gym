import React, {Fragment, useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {COMPLEX} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllExercise} from "../api/exerciseApi";

const ExesiceForm = () => {
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
    const MUSCULS=["CHEST_MUSCLES",
        "THE_BROADEST_MUSCLES_OF_THE_BACK",
        "DELTOIDS",
        "BICEPS",
        "TRICEPS",
        "FOREARMS",
        "ABS",
        "GENERAL_BACK_MUSCLES",
        "GLUTEUS_MUSCLES",
        "QUADRICEPS",
        "HIPS",
        "CALF_MUSCLES"]
    const router = useNavigate()

    const MUSCULS_RUS={
        CHEST_MUSCLES:"Грудные мышцы",
        THE_BROADEST_MUSCLES_OF_THE_BACK:"    Широчайшие мышцы спины",
        DELTOIDS:"    Дельтовидные мышцы (мышцы плеч)",
        BICEPS:"    Бицепсы (мышцы передней части руки)",
        TRICEPS:"    Трицепсы (мышцы задней части руки)",
        FOREARMS:"    Предплечья",
        ABS:"    Пресс (верхний, нижний и боковые мышцы живота)",
        GENERAL_BACK_MUSCLES:"    Общие мышцы спины",
        GLUTEUS_MUSCLES:"    Ягодичные мышцы",
        QUADRICEPS:"    Квадрицепсы (мышцы передней части бедра)",
        HIPS:"    Бедра (внутренняя и внешняя части)",
        CALF_MUSCLES:"    Икроножные мышцы (мышцы нижней части ноги)"
    }
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
                            <b>{data.name}</b>
                        </Container>
                        <p>{data.imageId}</p>
                    </Container>
                </ListGroupItem>
            }))}
    },[exercise])
    return (
        <Fragment>
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

export default ExesiceForm;