import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {getAppointTraining, getTraining} from "../../api/trainingApi";
import LikeButton from "../../components/LikeButton";

const Train = () => {
    const curTrain = useSelector(state => state.training.currentTraining)
    const {id} =useParams()
    const dispatch = useDispatch()
    const [train,setTrain] =  useState()
    const [comInTrain,setcomInTrain] =  useState([])

    const [exInTrain,setexInTrain] =  useState([])

    console.log(curTrain)
    useEffect(()=>{
        dispatch(getTraining(id))
    },[])
    const[exAndCom,setExAndCom]=useState()
    useEffect(()=>{
        if(curTrain.complexes!==undefined){
            setcomInTrain(
                curTrain.complexes.map((data)=>{
                    return <Container key={data.orderNumber} className="border border-dark rounded-4 mt-3 mb-3">
                        <h5>Комплекс</h5>
                        <ListGroup className="mb-2">
                            {data.exerciseValues.map((data)=>{
                                return<ListGroupItem>
                                    <p>{data.name}</p>
                                    <Container>
                                        <p>Продолжительность - {data.exerciseValues.duration}</p>
                                        <p>Повторы - {data.exerciseValues.repetitions}</p>
                                        <p>Вес - {data.exerciseValues.weight}</p>
                                    </Container>
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    </Container>
                })
            )
        }
    },[curTrain])
    useEffect(()=>{
        if(curTrain.exercises!==undefined){
            setexInTrain(
                curTrain.exercises.map((data)=>{
                    return <Container key={data.orderNumber} className="border border-dark rounded-4 mt-3 mb-3">
                        <h5>Упражнение</h5>
                        <ListGroupItem key={data.id} className="mb-2">
                            <ListGroup>
                                <ListGroupItem>
                                    <p>{data.name}</p>
                                    <Container>
                                        <p>Продолжительность - {data.exerciseValues.duration}</p>
                                        <p>Повторы - {data.exerciseValues.repetitions}</p>
                                        <p>Вес - {data.exerciseValues.weight}</p>
                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                    </Container>
                })
            )
        }
    },[curTrain])
    useEffect(()=>{
        if(curTrain.exercises!==undefined){
            setTrain(
                <Container className="d-flex border border-dark rounded-4 mt-3 mb-3">
                    <h5>Название - {curTrain.name}</h5>
                    <LikeButton type={"Training"} id={id}/>
                </Container>
            )
        }
    },[curTrain])
    useEffect(()=>{
        const combinedList = [...exInTrain, ...comInTrain];
        const sortedList = combinedList.sort((a, b) => a.key - b.key);
        setExAndCom(
            <Container>
                {train}
                {sortedList}
            </Container>

        )
    },[exInTrain,comInTrain])

    return (
        <Fragment>
            <NavBar/>
            {exAndCom}
        </Fragment>
    );
};

export default Train;