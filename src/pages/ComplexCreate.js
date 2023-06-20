import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllExercise, getExercise} from "../api/exerciseApi";
import {Input} from "react-select/animated";
import {createComplex} from "../api/complexApi";
import {delCurEx} from "../store/exerciseReducer";
import {COMPLEX, MUSCULS, MUSCULS_RUS} from "../utils/consts";

const ComplexCreate = () => {
    const dispatch = useDispatch();
    const [exInComplex,setExInComplex] = useState({
        exesices:[
            ]})
    const [exInComplexList,setexInComplexList] = useState([])
    const exercise = useSelector(state => state.exercise.allExercise)
    const curExercise = useSelector(state => state.exercise.currentExercise)
    const [curExId, setcurExId]=useState()
    let [exForm, setExForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:50,
        shared:false
    })
    let [complexForm, setComplexForm] = useState({
        complexType:"ONE",
        description:"",
        name:"",
        published:true,
        repetitions:0,
        spaceDuration:0,
    })
    const [muscles, setMuscles] = useState([])
    const [show, setShow] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [musclesList, setMusclesList] = useState([])
    const [options, setOptions] = useState([])
    const [numberInQue, setNumberInQue] = useState(0)
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
                            <b>{data.name}</b>
                        </Container>
                        <p>{data.imageId}</p>
                        <Button onClick={()=>{getInfoAboutCurEx(data.id)}}>Добавить</Button>
                    </Container>
                </ListGroupItem>
            }))}
    },[exercise])
    useEffect(()=>{
        console.log(exInComplex)
        setHidden(true)
        if(exInComplex.exesices.length!==0){
            setHidden(false)
            console.log(exInComplex.exesices)
            setexInComplexList(
            exInComplex.exesices.map((data)=>{
                return <ListGroupItem key={data.exerciseId} className="border border-dark mb-2 mt-2 rounded-4">
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <p>{data.name.length >50? data.name.substring(0, 40) + '...' : data.name}</p>
                        </Container>
                        <Container className="d-grid justify-content-end" >
                                <p className="mb-0  d-flex">Продолжительность -
                                <InputGroup className="mb-3 " style={{width: 50}}>
                                    <Form.Control
                                        placeholder={data.duration}
                                        value={data.duration}
                                        aria-describedby="basic-addon1"
                                        onChange={(e)=>{setExInComplex((state) => {
                                            const updatedExercises = state.exesices.map((exercise) => {
                                                if (exercise.number === data.number) {
                                                    // Измените нужное поле у определенного элемента
                                                    return {
                                                        ...exercise,
                                                        duration: e.target.value, // Замените fieldName на нужное имя поля
                                                    };
                                                }
                                                return exercise;
                                            });

                                            return {
                                                ...state,
                                                exesices: updatedExercises,
                                            };
                                        });}}
                                        className="form-control-sm"
                                    />
                                </InputGroup>m
                                </p>
                                <p className="mb-0  d-flex">Вес -
                                <InputGroup className="mb-3" style={{width: 50}}>
                                    <Form.Control
                                        placeholder={data.weight}
                                        value={data.weight}
                                        aria-describedby="basic-addon1"
                                        onChange={(e)=>{setExInComplex((state) => {
                                            const updatedExercises = state.exesices.map((exercise) => {
                                                if (exercise.number === data.number) {
                                                    // Измените нужное поле у определенного элемента
                                                    return {
                                                        ...exercise,
                                                        weight: e.target.value, // Замените fieldName на нужное имя поля
                                                    };
                                                }
                                                return exercise;
                                            });

                                            return {
                                                ...state,
                                                exesices: updatedExercises,
                                            };
                                        });}}
                                        className="form-control-sm"
                                    />
                                </InputGroup>кг
                                </p>
                                <p  className="mb-0 d-flex">Повторы -
                                <InputGroup className="mb-3 w-50">
                                    <Form.Control
                                        placeholder={data.repetitions}
                                        value={data.repetitions}
                                        aria-describedby="basic-addon1"
                                        onChange={(e)=>{setExInComplex((state) => {
                                            const updatedExercises = state.exesices.map((exercise) => {
                                                if (exercise.number === data.number) {
                                                    // Измените нужное поле у определенного элемента
                                                    return {
                                                        ...exercise,
                                                        repetitions: e.target.value, // Замените fieldName на нужное имя поля
                                                    };
                                                }
                                                return exercise;
                                            });

                                            return {
                                                ...state,
                                                exesices: updatedExercises,
                                            };
                                        });}}
                                        className="form-control-sm"
                                    />раз
                                </InputGroup>
                        </p>
                        </Container>
                        <CloseButton onClick={()=>{setExInComplex((state) => {
                            const updatedExercises = state.exesices.map((exercise) => {
                                if (exercise.number === data.number) {
                                    // Измените нужное поле у определенного элемента
                                    return {
                                        ...exercise,
                                        repetitions: "",
                                        duration:"",
                                        weight: "",// Замените fieldName на нужное имя поля
                                    };
                                }
                                return exercise;
                            });

                            return {
                                ...state,
                                exesices: updatedExercises,
                            };
                        });deleteExFromComplex(data.number)}}></CloseButton>
                    </Container>
                    </ListGroupItem>
                })
            )
        }
        else{
            setexInComplexList('')
        }
    },[exInComplex])
    const getInfoAboutCurEx= (id)=>{
        setcurExId(id)
        dispatch(getExercise(id))
    }
    useEffect(()=> {
        if(curExercise.defaultValues!==undefined){
            console.log(curExercise)
            setNumberInQue((state)=>state+1)
            setExInComplex((state)=>{return{exesices:[...state.exesices,{
                exerciseId:curExId,
                duration:curExercise.defaultValues.duration,
                repetitions:curExercise.defaultValues.repetitions,
                weight:curExercise.defaultValues.weight,
                name:curExercise.name,
                number:numberInQue
            }]
        }})
        dispatch(delCurEx())
        }
    },[curExercise])

    const showModalAdd=()=>{
        setShow(true)
    }
    const closeModalAdd=()=>{
        setShow(false)
    }

    const addComplex=()=>{
        dispatch(createComplex(complexForm.complexType,complexForm.description,exInComplex,complexForm.name,complexForm.published,complexForm.repetitions,complexForm.spaceDuration))
        setExInComplex({
            exesices:[]
        })

    }
    const deleteExFromComplex=(number)=>{
        let newEx =[]
        console.log(number)
        exInComplex.exesices.map((data)=>{
            console.log(data.number)
            if(data.number!==number){
                newEx.push(data)
            }
            else {

            }
        })
        console.log(newEx)
        setExInComplex((state)=>{return{exesices:newEx}})
    }
    return (
        <Fragment>
            <NavBar/>
            <Container className="d-flex">
                <Container className="d-grid h-75">
                    <h1>Фильтры</h1>
                    <Container className="d-flex">
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
                        <InputGroup className="mb-3 ms-3">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Мои"
                                onChange={(e)=>{setExForm((actual)=>{return {...actual, my:e.target.checked}})}}
                            />
                        </InputGroup>
                        <Button onClick={findExercises} className="mb-3">Применить фильтры</Button>
                    </Container>
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
                    <ListGroup className="d-grid">
                        {musclesList}
                    </ListGroup>
                    <Container>
                        <h1>Упражнения</h1>
                        <ListGroup className="mb-auto">
                            {exGroup}
                        </ListGroup>
                    </Container>
                </Container>

                <Container className="d-grid mb-auto">
                    <Container className="d-flex">
                        <h2>Создание комплекса</h2>
                        <Button onClick={() => router(COMPLEX)} className="ms-3 mb-auto">Перейти к комплексам</Button>
                    </Container>
                    <ListGroup className="mb-auto">
                        {exInComplexList}
                    </ListGroup>
                    <Button hidden={hidden} onClick={showModalAdd}>Создать комплекс</Button>
                </Container>
            </Container>

            <Modal show={show} onHide={closeModalAdd} onSubmit={addComplex}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить комлекс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Название комплекса
                            </Form.Label>
                            <Form.Control
                                autoFocus
                                value={complexForm.name}
                                required
                                onChange={e=>setComplexForm((state)=>{return {...state,name:e.target.value} })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Описание комплекса
                            </Form.Label>
                            <Form.Control
                                value={complexForm.description}
                                required
                                onChange={e=>setComplexForm((state)=>{return {...state,description:e.target.value} })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Тип комплекса
                            </Form.Label>
                            <Form.Select size="sm" onChange={e=>setComplexForm((state)=>{return {...state,complexType:e.target.value} })}>
                                <option value="ONE">Обычный</option>
                                <option value="MANY">Круговой</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Публичный
                            </Form.Label>
                            <Form.Check onChange={e=>setComplexForm((state)=>{return {...state,published:e.target.checked} })}
                                        type={'checkbox'}
                            />
                        </Form.Group>
                        {complexForm.complexType!=="ONE" && <Form.Group>
                            <Form.Label>
                                Повторы
                            </Form.Label>
                            <Form.Control
                                value={complexForm.repetitions}
                                onChange={e=>setComplexForm((state)=>{return {...state,repetitions:e.target.value} })}
                            />
                        </Form.Group>}
                        {complexForm.complexType!=="ONE" && <Form.Group>
                            <Form.Label>
                                Время отдыха
                            </Form.Label>
                            <Form.Control
                                value={complexForm.spaceDuration}
                                onChange={e=>setComplexForm((state)=>{return {...state,spaceDuration:e.target.value} })}
                            />
                        </Form.Group>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={closeModalAdd}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=> {closeModalAdd();addComplex()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ComplexCreate;