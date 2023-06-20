import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, Container, Form, InputGroup, ListGroup, ListGroupItem, Pagination} from "react-bootstrap";
import {acceptQuery, getMyQuery, getTrainers, rejectQuery} from "../api/trainerApi";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import {COACHING, QUERY_COACHING} from "../utils/consts";

const QueryCoaching = () => {
    const dispatch = useDispatch()
    const router = useNavigate()
    const [pageInfo, setPageInfo] =useState({
        page:1,
        size:5,
        name:''
    })
    const [trainersArray,setTrainersArray] =useState([]);
    const trainersPage = useSelector(state=>state.trainers.myQuery)
    let [items,setItems] = useState([]);
    const getNewQuery=(number)=>{
        dispatch(getMyQuery(number,pageInfo.size,pageInfo.name))
    }
    const acceptUser=(id)=>{
        dispatch(acceptQuery(id))
    }
    const rejectUser=(id)=>{
        dispatch(rejectQuery(id))
    }
    useEffect(()=>{
        dispatch(getMyQuery(pageInfo.page,pageInfo.size,pageInfo.name))
    },[dispatch,pageInfo])
    useEffect(()=>{
        if (trainersPage && trainersPage.data) {
            setTrainersArray(trainersPage.data.map((data) => {
                return <ListGroupItem key={data.queryId}>
                    <div className="d-grid">
                        <div> Имя - {data.name} </div>
                        <div> Login - {data.login} </div>
                    </div>

                    <Button onClick={()=>{acceptUser(data.queryId)}}>Принять</Button>
                    <Button onClick={()=>{rejectUser(data.queryId)}}>Отклонить</Button>
                </ListGroupItem>
            }))
            let active = trainersPage.page+1;
            let newItems =[]
            for (let number = 1; number <=trainersPage.maxPage; number++) {
                newItems.push(
                    <Pagination.Item  key={number} active={number === active}>
                        <a href="#" className="text-decoration-none" onClick={()=>{getNewQuery(number)}}>{number}</a>
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
                        Заявки на вступление в зал
                    </h1>
                </div>
                <Button onClick={()=>router(COACHING)}>Очередь на вступление</Button>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Имя"
                        aria-label="Имя"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setPageInfo((actual)=>{return{...actual,name:e.target.value}})}}
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

export default QueryCoaching;