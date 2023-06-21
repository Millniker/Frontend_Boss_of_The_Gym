import React, {Fragment, useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {getTraining, getTrainings} from "../api/trainingApi";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../components/NavBar";
import {createToken} from "../api/shareApi";

const Sharing = () => {
    const [show,setShow]=useState(true)
    const [trainGroup,setTrainGroup]=useState();
    const token = useSelector(state=>state.sharing.token)
    const [trainInTrainingList,setTrainInTrainingList] = useState([])
    const [trainInTraning,setTrainInTraning] = useState({
        tranings:[
        ]})
    const currentTraining = useSelector(state=>state.training.currentTraining)
    const dispatch = useDispatch();
    const trainings = useSelector(state=>state.training.allTrainings)
    const [sharingsIds, setSharingsIds] = useState([])
    useEffect(()=>{
    findTrainings()
    },[])
    const deleteComFromComplex=(number)=>{
        let newEx =[]
        trainInTraning.tranings.map((data)=>{
            if(data.id!==number){
                newEx.push(data)
            }
        })
        let newIds =[]
        sharingsIds.map((data)=>{
            if(data!==number){
                newIds.push(data)
            }
        })
        setTrainInTraning((state)=>{return{tranings:newEx}})
        setSharingsIds(newIds)
    }
    let [trainingFindForm, setTrainingFind] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:1000,
        shared:false,
        liked:false,
        published:false
    })
    const takeExaple=(id)=>{
        dispatch(getTraining(id))

    }
    console.log(currentTraining)
    useEffect(()=>{
        if(currentTraining.id!==undefined){
        setSharingsIds((prevState)=>[...prevState,currentTraining.id])
            console.log(trainInTraning)
        setTrainInTraning((state)=>{return{tranings:[...state.tranings,{
                name:currentTraining.name,
                id: currentTraining.id,
            }]
        }})}
    },[currentTraining])
    console.log(trainInTraning)
    const findTrainings=()=>{
        dispatch(getTrainings(trainingFindForm.common,trainingFindForm.liked,trainingFindForm.my,trainingFindForm.name,trainingFindForm.page,trainingFindForm.size,trainingFindForm.published,trainingFindForm.shared))
    }

    const addShared=()=>{
        setShow(false)
        dispatch(createToken(sharingsIds))
    }
    useEffect(()=>{
        if(trainInTraning.tranings.length!==0){
            setTrainInTrainingList(
                trainInTraning.tranings.map((data)=>{
                    return <ListGroupItem key={data.id} className="border border-dark mb-2 mt-2 rounded-4 h-25">
                            <Container className="d-flex">
                                <h3>{data.name}</h3>
                                <CloseButton className="ms-auto" onClick={()=>{deleteComFromComplex(data.id)}}></CloseButton>
                            </Container>
                    </ListGroupItem>
                })
            )
        }
        else{
            setTrainInTrainingList('')
        }
    },[trainInTraning])
    useEffect(()=>{
        if(trainings.data!==undefined && trainings){
            setTrainGroup(trainings.data.map((data) => {
                console.log(sharingsIds)
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <b>{data.name}</b>
                        </Container>
                        {!sharingsIds.includes(data.id) && <Button className="h-25" onClick={()=>{takeExaple(data.id)}}>Добавить</Button>}
                    </Container>
                </ListGroupItem>
            }))}
    },[trainings, sharingsIds,trainInTraning])
    return (
        <Fragment>
            <NavBar/>
            {show && <Container className="d-grid h-75 mb-auto">
                <h4>Фильтры</h4>
                <Container className="d-flex mb-auto">
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Базовые тренировки"
                            onChange={(e)=>{setTrainingFind((actual)=>{return {...actual, common:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Понравившиеся"
                            onChange={(e)=>{setTrainingFind((actual)=>{return {...actual,liked:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Мои"
                            onChange={(e)=>{setTrainingFind((actual)=>{return {...actual, my:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Доступные мне"
                            onChange={(e)=>{setTrainingFind((actual)=>{return {...actual, shared:e.target.checked}})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 ms-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Публичные"
                            onChange={(e)=>{setTrainingFind((actual)=>{return {...actual, published:e.target.checked}})}}
                        />
                    </InputGroup>
                </Container>
                <InputGroup className="mb-3 pe-3">
                    <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                    <Form.Control
                        placeholder="Название"
                        aria-label="Название"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setTrainingFind((actual)=>{return {...actual, name:e.target.value}})}}
                    />
                </InputGroup>
                <Button onClick={findTrainings} className="mb-3">Применить фильтры</Button>
                <Container>
                    <h4>Тренировки</h4>
                    {trainInTraning.tranings.length!=0 && <Button className="mb-3" onClick={addShared}>Открыть доступ</Button>}
                    <ListGroup>
                        {trainGroup}
                    </ListGroup>
                </Container>
                <Container>
                    <ListGroup>
                        {trainInTrainingList}
                    </ListGroup>
                </Container>
            </Container>}
            {!show&& <Container className="justify-content-center text-center align-content-center align-self-center">
                <h1 className="align-content-center">{token}</h1>
            </Container>}
        </Fragment>
    );
};

export default Sharing;