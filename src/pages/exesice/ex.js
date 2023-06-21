import React, {Fragment, useEffect, useState} from 'react';
import {
    addTrainer, addUser,
    currentGroup,
    deleteGroup, deleteTrainer, deleteUser,
    editGroup,
    getTrainersGroup, getUsersGroup,
    myGroups,
    myTrainingGroups
} from "../../api/groupApi";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../../components/NavBar";
import {GROUPS, MUSCULS_RUS} from "../../utils/consts";
import {getMyUsers, getTrainers} from "../../api/trainerApi";
import {getExercise} from "../../api/exerciseApi";
import LikeButton from "../../components/LikeButton";

const Ex = () => {
    const dispatch = useDispatch()
    const currentExercise = useSelector(state => state.exercise.currentExercise)
    const navigate = useNavigate();
    const [exersice,setExersice]=useState()
    const {id} =useParams()
    useEffect(()=>{
        dispatch(getExercise(id))
    },[dispatch])
    useEffect(()=>{
        if(currentExercise.name!==undefined) {
            setExersice(<Container>
                <Container className="mb-4 d-flex">
                    <h1>
                        {currentExercise.name}
                    </h1>
                    <Container className="mt-2 ms-2">
                        <LikeButton type={"Exercise"} id={id}/>
                    </Container>
                </Container>
                <Container className="d-grid">
                    <h6> Продолжительность- {currentExercise.defaultValues.duration}</h6>
                    <h6 className="pt-1">Повторы {currentExercise.defaultValues.repetitions}</h6>
                    <h6 className="pt-1">Вес {currentExercise.defaultValues.weight}</h6>
                </Container>
                <Container>
                    <p>{currentExercise.description}</p>
                    <ListGroup>
                        {currentExercise.muscleGroups.map((data)=>{
                            return <ListGroupItem>
                                <p>{MUSCULS_RUS[data]}</p>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                </Container>
                </Container>
            )
        }
    },[dispatch,currentExercise])

    return (
        <Fragment>
            <NavBar/>
            {exersice}
        </Fragment>
    );
};

export default Ex;