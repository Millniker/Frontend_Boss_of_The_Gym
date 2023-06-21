import React, {Fragment, useEffect} from 'react';
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import logo from '../img/gymBoss_icon_white_version_1.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    APPOINT_MY,
    COACHING,
    CREATE_TRAINING,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    PROFILE,
    REGISTRATION_ROUTE, SHARING,
    TRAINING
} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {userLogout} from "../api/authApi";
import {profile} from "../api/profileApi";


const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const router = useNavigate()
    const dispatch = useDispatch();
    useEffect(()=>{
        try {
            dispatch(profile())
        }catch (e) {
            console.log(e)
        }
    },[isAuth])
    const logout=()=>{
        dispatch(userLogout())
        router(MAIN_PAGE_ROUTE)
    };
    return (
        <Fragment>
            <Navbar className="custom-navbar" variant="dark">
                <Navbar.Brand className="me-1 ps-4 mb-0" onClick={()=>router(MAIN_PAGE_ROUTE)}><a href="#"><Image src={logo} width="200px"/></a></Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Container className="d-flex me-auto ms-0">
                        <Nav className="align-items-center">
                            {isAuth && <Nav.Link onClick={()=>router(CREATE_TRAINING)}>Создать тренировку</Nav.Link>}
                            {isAuth && <Nav.Link onClick={()=>router(APPOINT_MY)}>Мои тренировки</Nav.Link>}
                            {isAuth && <Nav.Link onClick={()=>router(COACHING)}>Тренерство</Nav.Link>}
                            {isAuth && <Nav.Link onClick={()=>router(SHARING)}>Поделиться тренировкой</Nav.Link>}
                        </Nav>
                    </Container>
                    <Container>
                        <Nav className="align-items-center justify-content-end">
                            {isAuth && <Nav.Link className="p-top" onClick={()=>router(PROFILE)}><Image src={require('../img/avatar.jpg')} width="40px" roundedCircle/></Nav.Link>}
                            {!isAuth && <Nav.Link onClick={()=>router(LOGIN_ROUTE)}>Войти</Nav.Link>}
                            {isAuth && <Nav.Link className="ms-3" onClick={()=>logout()} >Выйти</Nav.Link>}
                            {!isAuth && <Button variant="light" className="ms-3" onClick={()=>router(REGISTRATION_ROUTE)}>Зарегистрироваться</Button>}
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default NavBar;