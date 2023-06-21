import React, {Fragment, useEffect, useState} from 'react';
import {getAllExercise} from "../api/exerciseApi";
import {Button, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAppointedTrain} from "../store/trainingReducer";
import NavBar from "../components/NavBar";
import {getMyAppointingTrainings} from "../api/trainingApi";

const AppointedTrainings = () => {
    const dispatch = useDispatch();
    const training = useSelector(state => state.training.appointedTrainings)
    const [trainGroup,setTrainGroup]=useState();
    const router = useNavigate()
    useEffect(()=>{
        findAppointedTrainings()
    },[])
    const findAppointedTrainings=()=>{
        dispatch(getMyAppointingTrainings())
    }
    console.log(training)
useEffect(()=>{
    if(training.length!==undefined){
        setTrainGroup(training.map((data) => {
            return <ListGroupItem key={data.id} className="d-flex border border-dark mb-2 mt-2 rounded-4">
                <Container >
                    <h3>{data.name}</h3>
                    <Container className="d-grid">
                        <ListGroup>
                            Дата выполнения -
                            {data.dates.map((data)=>{
                                return <ListGroupItem>
                                    <p>{(new Date(data)).toLocaleDateString()}</p>
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    </Container>
                    <p>Тренер - {data.trainerName}</p>
                </Container>
                <Button className="mb-3 ms-auto mt-auto" onClick={()=>{router('/appointed/'+data.id)}}>Подробнее</Button>
            </ListGroupItem>
        }))}
},[training])
    return (
        <Fragment>
            <NavBar/>
            <Container>
                {trainGroup}
            </Container>
        </Fragment>
    );
};

export default AppointedTrainings;