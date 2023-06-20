import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToTrainer, getTrainers} from "../api/trainerApi";
import {Button, Card, Container, Form, InputGroup, ListGroup, ListGroupItem, Pagination} from "react-bootstrap";
import {RESET_PASSWORD} from "../utils/consts";
import NavBar from "../components/NavBar";
import {createExercise} from "../api/exerciseApi";

const Trainers = () => {
    const dispatch = useDispatch()
    const [pageInfo, setPageInfo] =useState({
        page:1,
        size:5,
        name:''
    })
    const [trainersArray,setTrainersArray] =useState([]);
    const trainersPage = useSelector(state=>state.trainers.trainersPage)
    let [items,setItems] = useState([]);
    const sendPage=(number)=>{
        dispatch(getTrainers(number,pageInfo.size,pageInfo.name))
        dispatch(createExercise())
    }
    const addUserToTrainer=(trainerId)=>{
        dispatch(addToTrainer(trainerId))
    }
    useEffect(()=>{
        dispatch(getTrainers(pageInfo.page,pageInfo.size,pageInfo.name))
    },[dispatch,pageInfo])

    useEffect(()=>{
        if (trainersPage && trainersPage.data) {
            setTrainersArray(trainersPage.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <div className="d-grid">
                        <div> Имя - {data.name} </div>
                        <div className="pt-1">Название зала {data.shortName}</div>
                    </div>
                    <Button onClick={()=>addUserToTrainer(data.id)}>Добавиться к тренеру</Button>
                </ListGroupItem>
            }))
            let active = trainersPage.page+1;
            let newItems =[]
            for (let number = 1; number <=trainersPage.maxPage; number++) {
                newItems.push(
                    <Pagination.Item  key={number} active={number === active}>
                      <a href="#" className="text-decoration-none" onClick={()=>{sendPage(number)}}>{number}</a>
                    </Pagination.Item>
                );
            }
            setItems(newItems)
        }
    },[trainersPage])
    return (
        <Fragment>
            <NavBar/>
            <Container fluid="md" className="mt-3">
                <div className="mb-4">
                    <h1 >
                        Тренера
                    </h1>
                </div>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Название зала"
                        aria-label="Название зала"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setPageInfo((actual)=>{return{...actual,name:e.target.value}});sendPage()}}
                    />
                </InputGroup>
                <Card style={{ width: '100%' }}>
                    <ListGroup variant="flush" >
                        {trainersArray}
                    </ListGroup>
                </Card>
                <Pagination>{items}</Pagination>
            </Container>
        </Fragment>
    );
};

export default Trainers;