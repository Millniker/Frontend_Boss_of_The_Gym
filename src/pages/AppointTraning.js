import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button, CloseButton, Container, Form, InputGroup, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {COMPLEX, CREATE_COMPLEX, MUSCULS, MUSCULS_RUS} from "../utils/consts";
import {getAllExercise, getExercise} from "../api/exerciseApi";
import {delCurEx, getCurEx} from "../store/exerciseReducer";
import {createComplex, getComplex, getComplexes} from "../api/complexApi";
import {delCurCom, getCurCom} from "../store/complexReducer";
import {appointTraining, createTraining, getTraining, getTrainings} from "../api/trainingApi";
import {getCurTrain} from "../store/trainingReducer";
import {getMyUsers} from "../api/trainerApi";
import ChangeDate from "../components/ChangeDate";
import {getMyTrainGroup} from "../store/groupReducer";
import {myTrainingGroups} from "../api/groupApi";

const TrainingCreate = () => {
    const dispatch = useDispatch();
    const [exInComplex,setExInComplex] = useState({
        exesices:[
        ]})
    const [comInComplex,setComInComplex] = useState({
        complexes:[
        ]})
    const[showToolsForCreating,setShowToolsForCreating]=useState(false)
    const trainings = useSelector(state=>state.training.allTrainings)
    const currentTraining = useSelector(state=>state.training.currentTraining)
    const [exInComplexList,setexInComplexList] = useState([])
    const [comInComplexList,setComInComplexList] = useState([])
    const exercise = useSelector(state => state.exercise.allExercise)
    const complexes = useSelector(state => state.complex.allComplexes)
    const curExercise = useSelector(state => state.exercise.currentExercise)
    const curComplex = useSelector(state => state.complex.currentComplex)
    const [curExId, setcurExId]=useState()
    let [exForm, setExForm] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:10,
        shared:false
    })
    let [trainingForm, seTtrainingForm] = useState({
        name:"",
        published:true,
        template: true,
        common: true,
        description:""
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
    let [trainingFindForm, setTrainingFind] = useState({
        common:false,
        my:false,
        name:"",
        page:1,
        size:50,
        shared:false,
        liked:false,
        published:false
    })
    const [muscles, setMuscles] = useState([])
    const [show, setShow] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [musclesList, setMusclesList] = useState([])
    const [options, setOptions] = useState([])
    const [numberInQue, setNumberInQue] = useState(1)
    const [exGroup,setExGroup]=useState();
    const [trainGroup,setTrainGroup]=useState();

    const router = useNavigate()
    useEffect(()=>{
        findExercises()
        findComplexes()
        findTrainings()
        dispatch(getMyUsers(1,100,''))
        dispatch(myTrainingGroups(''))
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

    const deleteUsersElement=(elem)=>{
        let newList=[]
        users.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setUsers(newList)
    }
    const deleteGroupsElement=(elem)=>{
        let newList=[]
        groups.map((data)=>{
            if(data!==elem){
                newList.push(data)
            }
        })
        setGroups(newList)
    }

    const findExercises=()=>{
        dispatch(getAllExercise(exForm.common,muscles,exForm.my,exForm.name,exForm.page,exForm.size,exForm.shared))
    }
    const findComplexes=()=>{
        dispatch(getComplexes(comForm.common,comForm.my,comForm.name,comForm.page,comForm.size,comForm.shared,comForm.liked,comForm.published))
    }
    const findTrainings=()=>{
        dispatch(getTrainings(trainingFindForm.common,trainingFindForm.liked,trainingFindForm.my,trainingFindForm.name,trainingFindForm.page,trainingFindForm.size,trainingFindForm.published,trainingFindForm.shared))
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

        if(trainings.data && trainings){
            setTrainGroup(trainings.data.map((data) => {
                return <ListGroupItem key={data.id}>
                    <Container className="d-flex">
                        <Container className="d-grid">
                            <b>{data.name}</b>
                        </Container>
                        <Button className="h-25" onClick={()=>{takeExaple(data.id)}}>Добавить</Button>
                    </Container>
                </ListGroupItem>
            }))}
    },[exercise,complexes,trainings])

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
        dispatch(getComplex(id))
    }
    useEffect(()=> {
        if(curExercise.defaultValues!==undefined){
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
            dispatch(delCurCom())
        }
    },[curComplex])
    const showModalAdd=()=>{
        setShow(true)
    }
    const closeModalAdd=()=>{
        setShow(false)
    }

    const addTrainig=()=>{
        dispatch(appointTraining(comInComplex,dates,description,exInComplex,groupsIds,name,usersIds))
        setExInComplex({
            exesices:[]
        })
        setComInComplex({
            complexes:[]
        })
        setNumberInQue(1)
        setDates('')
        setName('')
        setDescription('')
        setUsersList([])
        setGroupsList([])

    }
    const deleteExFromComplex=(number)=>{
        let newEx =[]
        exInComplex.exesices.map((data)=>{
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
            if(data.orderNumber!==number){
                newEx.push(data)
            }
        })
        setComInComplex((state)=>{return{complexes:newEx}})
    }
    const sort=()=>{
        const combinedList = [...exInComplexList, ...comInComplexList];
        const sortedList = combinedList.sort((a, b) => a.key - b.key);
        return sortedList
    }
    const takeExaple=(id)=>{
        dispatch(getTraining(id))
    }
    useEffect(()=>{
        if(currentTraining.complexes!==undefined){
            setNumberInQue(currentTraining.complexes.length+1)
            currentTraining.complexes.map((data)=>{
                setComInComplex((state)=>{return{complexes:[...state.complexes,{
                        complexId:data.complexId,
                        exercises:data.exerciseValues,
                        orderNumber: data.orderNumber,
                    }]
                }})
            })
        }

        if(currentTraining.exercises!==undefined){
            setNumberInQue(currentTraining.exercises.length+1)
            currentTraining.exercises.map((data)=>{
                setExInComplex((state)=>{return{exesices:[...state.exesices,{
                        exerciseId:data.exerciseId,
                        duration:data.exerciseValues.duration,
                        repetitions:data.exerciseValues.repetitions,
                        weight:data.exerciseValues.weight,
                        name:data.name,
                        number:data.orderNumber
                    }]
                }})
            })
        }
    },[currentTraining])
    useEffect(()=>{
        setHidden(true)
        if(comInComplex.complexes.length!==0){
            setHidden(false)
            setComInComplexList(
                comInComplex.complexes.map((data)=>{
                    return <ListGroupItem key={data.orderNumber} className="border border-dark mb-2 mt-2 rounded-4 h-25">
                        <Container className="d-flex h-25">
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
                                        {data.exercises.map((exercise)=>{
                                            return <ListGroupItem key={exercise.orderNumber} className="border border-dark mb-2 mt-2 rounded-4 h-25">
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
                                                                    onChange={(e)=>{setComInComplex((state) => {
                                                                        const updatedComplex = state.complexes.map((item) => {
                                                                            const updatedExercises = item.exercises.map((execise) => {
                                                                                if (execise.orderNumber===exercise.orderNumber && item.orderNumber===data.orderNumber ) {
                                                                                    // Измените нужное поле у определенного элемента
                                                                                    return {
                                                                                        ...exercise,
                                                                                        exerciseValues: {
                                                                                            ...exercise.exerciseValues,
                                                                                            duration: e.target.value,
                                                                                        },
                                                                                    };
                                                                                }
                                                                                return execise;
                                                                            });

                                                                            return {
                                                                                ...item,
                                                                                exercises: updatedExercises,
                                                                            };
                                                                        });

                                                                        return {
                                                                            ...state,
                                                                            complexes: updatedComplex,
                                                                        };
                                                                    });
                                                                    }}
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
                                                                    onChange={(e)=>{setComInComplex((state) => {
                                                                        const updatedExercises = state.complexes.map((exercise) => {
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
                                                                            complexes: updatedExercises,
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
                                                                    onChange={(e)=>{setComInComplex((state) => {
                                                                        const updatedExercises = state.complexes.map((exercise) => {
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
                                    console.log("ccvcc")
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
        }
        else{
            setComInComplexList('')
        }
    },[comInComplex])

    console.log(exInComplex, currentTraining)
    const myTrainingUsers= useSelector(state=>state.trainers.myUsers)
    const [comGroup,setComGroup]=useState();
    const [users, setUsers] = useState([])
    const [usersIds, setUsersIds] = useState([])
    const [usersOptions, setUsersOptions] = useState([])
    const [usersList, setUsersList] = useState([])

    useEffect(()=>{
        setUsersList([])
        if(users.length!==0){
            setUsersIds([])
            setUsersList(users.map((data) => {
                myTrainingUsers.data.map((train)=>{
                    if(data === train.login){
                        setUsersIds((prevState)=>[...prevState,train.id])
                    }
                })
                return <ListGroup.Item key={data}>
                    <b>{data}</b>
                    <CloseButton onClick={()=>{deleteUsersElement(data)}}></CloseButton>
                </ListGroup.Item>
            }))}
        if(myTrainingUsers.data!==undefined){
        setUsersOptions(myTrainingUsers.data.map((data)=>{
            return <option key={data.id} value={data.login} disabled={users.includes(data.name)}>{data.name}</option>
            })
        )}
    },[myTrainingUsers,users])
    const [dates,setDates]=useState([]);
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const fetchingDate=(date)=>{
        setDates(date)
    }
    const myTrainingGroup= useSelector(state=>state.groups.myTrainingGroups)
    const [groups, setGroups] = useState([])
    const [groupsIds, setGroupsIds] = useState([])
    const [groupsList, setGroupsList] = useState([])
    const[groupOption, setGroupOption] =useState([])
    useEffect(()=>{
        setGroupsList([])
        if(groups.length!==0){
            setGroupsIds([])
            setGroupsList(groups.map((data) => {
                myTrainingGroup.map((train)=>{
                    if(data === train.name){
                        setGroupsIds((prevState)=>[...prevState,train.id])
                    }
                })
                return <ListGroup.Item key={data}>
                    <b>{data}</b>
                    <CloseButton onClick={()=>{deleteGroupsElement(data)}}></CloseButton>
                </ListGroup.Item>
            }))}
        if(myTrainingGroup.length!==undefined){
            setGroupOption(myTrainingGroup.map((data)=>{
                    return <option key={data.id} value={data.login} disabled={groups.includes(data.name)}>{data.name}</option>
                })
            )}

    },[myTrainingGroup,groups])
    console.log(dates)

    console.log(complexes)
    return (
        <Fragment>
            <NavBar/>
            <Container className="d-flex justify-content-start mb-auto">
                {!showToolsForCreating&&<Button className="mb-auto" onClick={()=>{setShowToolsForCreating(true);setExGroup([]);setComGroup([]);setTrainGroup([])}}>Создать новую тренировку</Button>}
                {showToolsForCreating && <Button className="mb-auto" onClick={()=>{setShowToolsForCreating(false);setExGroup([]);setComGroup([]);setTrainGroup([])}}>Выбрать шаблон</Button>}
                {showToolsForCreating && <Container className="d-grid h-75 mb-auto">
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
                </Container>}


                {showToolsForCreating &&
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
                </Container>}


                {!showToolsForCreating &&
                <Container className="d-grid h-75 mb-auto">
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
                        <ListGroup>
                            {trainGroup}
                        </ListGroup>
                    </Container>
                </Container>
                }

                <Container className="d-grid mb-auto">
                    <Container className="d-flex">
                        <h2>Создание тренировки</h2>
                    </Container>
                    <ListGroup className="mb-auto">
                        {sort()}
                    </ListGroup>
                    <Button hidden={hidden} onClick={showModalAdd}>Назначить тренировку</Button>
                </Container>
            </Container>



            <Modal show={show} onHide={closeModalAdd} onSubmit={addTrainig}>
                <Modal.Header closeButton>
                    <Modal.Title>Настроить тренировку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                            <InputGroup className="mb-3">
                                <Form.Select aria-label="Default select example" onChange={(e)=>{setUsers((state)=>[...state, e.target.value]);}}>
                                    {usersOptions}
                                </Form.Select>
                            </InputGroup>
                        <ListGroup>
                            {usersList}
                        </ListGroup>
                            <InputGroup className="mb-3">
                                <Form.Select aria-label="Default select example" onChange={(e)=>{setGroups((state)=>[...state, e.target.value])}}>
                                    {groupOption}
                                </Form.Select>
                            </InputGroup>
                            <ListGroup>
                                {groupsList}
                            </ListGroup>
                        <Form.Label>
                            Название тренировки
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            value={name}
                            required
                            onChange={e=>setName(e.target.value)}
                        />
                        <Form.Label>
                            Описание тренировки
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            value={description}
                            required
                            onChange={e=>setDescription(e.target.value)}
                        />
                        <ChangeDate setDate={fetchingDate}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={closeModalAdd}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=> {closeModalAdd();addTrainig()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default TrainingCreate;


