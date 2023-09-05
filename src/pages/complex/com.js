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
import {getComplex} from "../../api/complexApi";

const Com = () => {
    const dispatch = useDispatch()
    const currenComplex = useSelector(state => state.complex.currentComplex)
    const [complex,setComplex]=useState()
    const [exercise,setExercise]=useState([])

    const {id} =useParams()
    useEffect(()=>{
        dispatch(getComplex(id))
    },[dispatch])
    console.log(currenComplex)
    useEffect(()=>{
        if(currenComplex.name!==undefined){
            setExercise(currenComplex.exercises.map((data)=>{
                return <ListGroupItem>
                    <Container>
                        <Container className="mb-4 d-flex">
                            <h1>
                                {data.name}
                            </h1>
                        </Container>
                        <Container className="d-grid">
                            {data.exerciseValues.duration!==null&&<h6> Продолжительность- {data.exerciseValues.duration}</h6>}
                            {data.exerciseValues.repetitions!==null&&<h6 className="pt-1">Повторы {data.exerciseValues.repetitions}</h6>}
                            {data.exerciseValues.weight!==null&&<h6 className="pt-1">Вес {data.exerciseValues.weight}</h6>}
                        </Container>
                        <Container>
                            <p>{data.description}</p>
                        </Container>
                    </Container>
                    </ListGroupItem>
    }))}},[currenComplex])

    useEffect(()=>{
        if(currenComplex.name!==undefined) {
            setComplex(<Container>
                    <Container className="mb-4 d-flex">
                        <h1>
                            {currenComplex.name}
                        </h1>
                        <Container className="mt-2 ms-2">
                            <LikeButton type={"Complex"} id={id}/>
                        </Container>
                    </Container>
                    <Container className="d-grid">
                        <h6> Повторы- {currenComplex.repetitions===0?1:currenComplex.repetitions}</h6>
                        {currenComplex.repetitions!==0&&<h6 className="pt-1">Время отдыха {currenComplex.spaceDuration}</h6>}
                    </Container>
                    <Container>
                        <p><b>Описание-</b></p>
                        <p>{currenComplex.description}</p>
                        <ListGroup>
                            {currenComplex.exercises.map((data)=>{
                            return <ListGroupItem>
                            <Container>
                            <Container className="mb-4 d-flex">
                            <h1>
                        {data.name}
                        </h1>
                    </Container>
                <Container className="d-grid">
                    {data.exerciseValues.duration!==null&&<h6> Продолжительность- {data.exerciseValues.duration}</h6>}
                    {data.exerciseValues.repetitions!==null&&<h6 className="pt-1">Повторы {data.exerciseValues.repetitions}</h6>}
                    {data.exerciseValues.weight!==null&&<h6 className="pt-1">Вес {data.exerciseValues.weight}</h6>}
                </Container>
                <Container>
                    <p>{data.description}</p>
                </Container>
                    </Container>
                </ListGroupItem>})}
                        </ListGroup>
                    </Container>
            </Container>
            )
        }
    },[dispatch,currenComplex])

    return (
        <Fragment>
            <NavBar/>
            {complex}
        </Fragment>
    );

}
export default Com;

