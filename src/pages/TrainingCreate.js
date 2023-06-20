import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {COMPLEX, CREATE_COMPLEX, MUSCULS, MUSCULS_RUS} from "../utils/consts";
import {getAllExercise, getExercise} from "../api/exerciseApi";
import {delCurEx, getCurEx} from "../store/exerciseReducer";
import {createComplex, getComplex, getComplexes} from "../api/complexApi";

const TrainingCreate = () => {
    const dispatch = useDispatch();
    const [exInComplex,setExInComplex] = useState({
        exesices:[
        ]})
    const [comInComplex,setComInComplex] = useState({
        complexes:[
        ]})
    const [exInComplexList,setexInComplexList] = useState([])
    const [comInComplexList,setComInComplexList] = useState([])
    const [comAndExInComplexList,setComAndExInComplexList] = useState([])
    const exercise = useSelector(state => state.exercise.allExercise)
    const complexes = useSelector(state => state.complex.allComplexes)
    const curExercise = useSelector(state => state.exercise.currentExercise)
    const curComplex = useSelector(state => state.complex.currentComplex)
    const [curExId, setcurExId]=useState()
    const [curComId, setcurComId]=useState()
    let [exForm, setExForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:10,
        shared:false
    })
    let [complexForm, setComplexForm] = useState({
        complexType:"",
        exercises:{},
        orderNumber:0,
        repetitions:0,
        spaceDuration:0,
    })
    let [trainingForm, seTtrainingForm] = useState({
        complexType:"ONE",
        description:"",
        name:"",
        published:true,
        repetitions:0,
        spaceDuration:0,
    })
    let [comForm, setComForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:50,
        shared:false,
        liked:false,
        published:false,
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
        findComplexes()
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
    const findComplexes=()=>{
        dispatch(getComplexes(comForm.common,comForm.my,comForm.name,comForm.page,comForm.size,comForm.shared,comForm.liked,comForm.published))
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
                        <Button className="h-25" onClick={()=>{getInfoAboutCurEx(data.id)}}>Добавить</Button>
                    </Container>
                </ListGroupItem>
            }))}
        if(complexes.data && complexes){
            setComGroup(complexes.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <b>{data.name}</b>
                        </Container>
                        <Button className="h-25" onClick={()=>{getInfoAboutCurCom(data.id)}}>Добавить</Button>
                    </Container>
                </ListGroupItem>
            }))}
    },[exercise,complexes])

    //отображение убражнений
    useEffect(()=>{
        setHidden(true)
        if(exInComplex.exesices.length!==0){
            setHidden(false)
            setexInComplexList(
                exInComplex.exesices.map((data)=>{
                    return <ListGroupItem key={data.number} className="border border-dark mb-2 mt-2 rounded-4 h-25">
                        <Container className="d-flex h-25">
                            <Container className="d-grid h-25">
                                <p>{data.name.length >50? data.name.substring(0, 40) + '...' : data.name}</p>
                            </Container>
                            <Container className="d-grid justify-content-end h-25" >
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
            setComAndExInComplexList((prevState)=>[...prevState,exInComplexList])
        }
        else{
            setexInComplexList('')
        }
    },[exInComplex])
    const getInfoAboutCurEx= (id)=>{
        setcurExId(id)
        dispatch(getExercise(id))
    }
    const getInfoAboutCurCom=(id)=>{
        setcurComId(id)
        dispatch(getComplex(id))
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

    useEffect(()=> {
        if(curComplex.exercises!==undefined){
            console.log(curComplex)
            setNumberInQue((state)=>state+1)
            setComInComplex((state)=>{return{complexes:[...state.complexes,{
                            complexId:curComplex.id,
                            name:curComplex.name,
                            complexType: curComplex.complexType,
                            exercises:curComplex.exercises,
                            orderNumber: numberInQue,
                            repetitions: curComplex.repetitions,
                            spaceDuration: curComplex.spaceDuration
                }]
            }})
            dispatch(delCurEx())
        }
    },[curComplex])
    console.log(comInComplex)
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
        exInComplex.exesices.map((data)=>{
            console.log(data.number)
            if(data.number!==number){
                newEx.push(data)
            }
            else {

            }
        })
        setExInComplex((state)=>{return{exesices:newEx}})
    }
    const deleteComFromComplex=(number)=>{
        let newEx =[]
        comInComplex.complexes.map((data)=>{
            console.log(data.number)
            if(data.orderNumber!==number){
                newEx.push(data)
            }
            else {

            }
        })
        setComInComplex((state)=>{return{complexes:newEx}})
    }
    const sortedList=[]
    const sort=()=>{
        const combinedList = [...exInComplexList, ...comInComplexList];
        const sortedList = combinedList.sort((a, b) => a.key - b.key);
        return sortedList
    }
    const changeNumberUp=(number)=>{
        if(comInComplex.length!==0){
            setComInComplex((state) => {
                const updatedComplex = state.complexes.map((complex) => {
                    if (complex.orderNumber === number) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...complex,
                            orderNumber: number+1, // Замените fieldName на нужное имя поля
                        };
                    }
                    if (complex.orderNumber === number+1) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...complex,
                            orderNumber: number-1, // Замените fieldName на нужное имя поля
                        };
                    }
                    return complex;
                })
                return {
                    ...state,
                    complexes: updatedComplex,
                };
                ;})}
        if(exInComplex.length!==0){
            setExInComplex((state) => {
                const updatedComplex = state.exesices.map((exercise) => {
                    if (exercise.number === number) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...exercise,
                            orderNumber: number+1, // Замените fieldName на нужное имя поля
                        };
                    }
                    if (exercise.number === number+1) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...exercise,
                            orderNumber: number-1, // Замените fieldName на нужное имя поля
                        };
                    }
                    return exercise;
                })
                return {
                    ...state,
                    exesices: updatedComplex,
                };
                ;}
            )}
    }
    const changeNumberDown=(number)=>{
        if(comInComplex.length!==0){
            setComInComplex((state) => {
                const updatedComplex = state.complexes.map((complex) => {
                    if (complex.orderNumber === number) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...complex,
                            orderNumber: number-1, // Замените fieldName на нужное имя поля
                        };
                    }
                    if (complex.orderNumber === number-1) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...complex,
                            orderNumber: number+1, // Замените fieldName на нужное имя поля
                        };
                    }
                    return complex;
                })
                return {
                    ...state,
                    complexes: updatedComplex,
                };
                ;})}
        if(exInComplex.length!==0){
            setExInComplex((state) => {
                const updatedComplex = state.exesices.map((exercise) => {
                    if (exercise.number === number) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...exercise,
                            orderNumber: number-1, // Замените fieldName на нужное имя поля
                        };
                    }
                    if (exercise.number === number-1) {
                        // Измените нужное поле у определенного элемента
                        return {
                            ...exercise,
                            orderNumber: number+1, // Замените fieldName на нужное имя поля
                        };
                    }
                    return exercise;
                })
                return {
                    ...state,
                    exesices: updatedComplex,
                };
                ;}
            )}
    }
    useEffect(()=>{
        setHidden(true)
        if(comInComplex.complexes.length!==0){
            setHidden(false)
            setComInComplexList(
                comInComplex.complexes.map((data)=>{
                    return <ListGroupItem key={data.orderNumber} className="border border-dark mb-2 mt-2 rounded-4 h-25">
                        <Container className="d-flex h-25">
                            <Container className="d-grid h-25">
                                <p>{data.name.length >50? data.name.substring(0, 40) + '...' : data.name}</p>
                            </Container>
                            <Container className="d-grid justify-content-end h-25" >
                                <p className="mb-0  d-flex">Повторы -
                                    <InputGroup className="mb-3 " style={{width: 50}}>
                                        <Form.Control
                                            placeholder={data.repetitions}
                                            value={data.repetitions}
                                            aria-describedby="basic-addon1"
                                            onChange={(e)=>{setComInComplex((state) => {
                                                const updatedComplex = state.complexes.map((complex) => {
                                                    if (complex.orderNumber === data.orderNumber) {
                                                        // Измените нужное поле у определенного элемента
                                                        return {
                                                            ...complex,
                                                            repetitions: e.target.value, // Замените fieldName на нужное имя поля
                                                        };
                                                    }
                                                    return complex;
                                                });

                                                return {
                                                    ...state,
                                                    complexes: updatedComplex,
                                                };
                                            });}}
                                            className="form-control-sm"
                                        />
                                    </InputGroup>раз
                                </p>
                                <p className="mb-0  d-flex">Продолжительность
                                    <InputGroup className="mb-3" style={{width: 50}}>
                                        <Form.Control
                                            placeholder={data.spaceDuration}
                                            value={data.spaceDuration}
                                            aria-describedby="basic-addon1"
                                            onChange={(e)=>{setComInComplex((state) => {
                                                const updatedComplex = state.complexes.map((complex) => {
                                                    if (complex.orderNumber === data.orderNumber) {
                                                        // Измените нужное поле у определенного элемента
                                                        return {
                                                            ...complex,
                                                            spaceDuration: e.target.value, // Замените fieldName на нужное имя поля
                                                        };
                                                    }
                                                    return complex;
                                                });

                                                return {
                                                    ...state,
                                                    complexes: updatedComplex,
                                                };
                                            });}}
                                            className="form-control-sm"
                                        />
                                    </InputGroup>минут
                                </p>
                                <ListGroup className="mb-auto">
                                    <ListGroupItem>
                                        {console.log(data)}
                                        {data.exercises.map((exercise)=>{
                                            return <ListGroupItem key={exercise.exerciseId} className="border border-dark mb-2 mt-2 rounded-4 h-25">
                                                <Container className="d-flex mb-auto">
                                                    <Container className="d-grid mb-auto">
                                                        <p>{exercise.name.length >50? exercise.name.substring(0, 40) + '...' :exercise.name}</p>
                                                    </Container>
                                                    <Container className="d-grid justify-content-end h-25" >
                                                        <p className="mb-0  d-flex">Продолжительность -
                                                            <InputGroup className="mb-3 " style={{width: 50}}>
                                                                <Form.Control
                                                                    placeholder={exercise.exerciseValues.duration}
                                                                    value={exercise.exerciseValues.duration}
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
                                                                    placeholder={exercise.exerciseValues.weight}
                                                                    value={exercise.exerciseValues.weight}
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
                                                                    placeholder={exercise.exerciseValues.repetitions}
                                                                    value={exercise.exerciseValues.repetitions}
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
                                                </Container>
                                            </ListGroupItem>
                                        })}
                                    </ListGroupItem>
                                </ListGroup>
                            </Container>
                            <CloseButton onClick={()=>{setComInComplex((state) => {
                                const updatedComplex = state.complexes.map((complex) => {
                                    if (complex.orderNumber === data.orderNumber) {
                                        return {
                                            ...complex,
                                            repetitions: "",
                                            spaceDuration:"",
                                        };
                                    }
                                    return complex;
                                });

                                return {
                                    ...state,
                                    complexes: updatedComplex,
                                };
                            });deleteComFromComplex(data.orderNumber)}}></CloseButton>
                        </Container>
                    </ListGroupItem>
                })
            )
            setComAndExInComplexList((prevState)=>[...prevState,comInComplexList])
        }
        else{
            setComInComplexList('')
        }
    },[comInComplex])


    const [comGroup,setComGroup]=useState();

    return (
        <Fragment>
            <NavBar/>
            <Container className="d-flex justify-content-start mb-auto">
                <Container className="d-grid h-75 mb-auto">
                    <h4>Фильтры</h4>
                    <Container className="d-flex mb-auto">
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
                    <Button onClick={findExercises} className="mb-3">Применить фильтры</Button>

                    <Container>
                        <h4>Упражнения</h4>
                        <ListGroup>
                            {exGroup}
                        </ListGroup>
                    </Container>
                </Container>


                <Container className="d-grid h-75">
                    <h4>Фильтры</h4>
                    <Container className="d-flex">
                        <InputGroup className="mb-3">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Базовые упражнения"
                                onChange={(e)=>{setComForm((actual)=>{return {...actual, common:e.target.checked}})}}
                                className="ms-3 me-3"
                            />
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Назначенные"
                                onChange={(e)=>{setComForm((actual)=>{return {...actual, shared:e.target.checked}})}}
                                className="ms-3 me-3"
                            />
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Мои"
                                onChange={(e)=>{setComForm((actual)=>{return {...actual, my:e.target.checked}})}}
                                className="ms-3 me-3"
                            />
                        </InputGroup>
                    </Container>
                    <InputGroup className="mb-3 pe-3">
                        <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                        <Form.Control
                            placeholder="Название"
                            aria-label="Название"
                            aria-describedby="basic-addon1"
                            onChange={(e)=>{setComForm((actual)=>{return {...actual, name:e.target.value}})}}
                        />
                    </InputGroup>
                    <Button onClick={findComplexes}>Применить фильтры</Button>
                    <Container>
                        <h4>Комплексы</h4>
                        <ListGroup>
                            {comGroup}
                        </ListGroup>
                    </Container>
                </Container>

                <Container className="d-grid mb-auto">
                    <Container className="d-flex">
                        <h2>Создание тренировки</h2>
                    </Container>
                    <ListGroup className="mb-auto">
                        {sort()}
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

export default TrainingCreate;