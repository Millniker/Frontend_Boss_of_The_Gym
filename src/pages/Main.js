import React, {Fragment} from 'react';
import NavBar from "../components/NavBar";
import {Button, Card, CardGroup, Col, Container, Form, Image, InputGroup, Row} from "react-bootstrap";
import heroBanner from '../img/heroBanner.svg'
import mock from '../img/mock.svg'
import gradient from '../img/gradiant_main_page.svg'
import logo from '../img/gymBoss_icon.svg'
import {COMPLEX, EXERCISE, TRAINERS} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const router = useNavigate();
    return (
        <Fragment>
            <NavBar/>
            <div className="hero position-relative">
                <Image src={heroBanner} fluid />
                <Container className="overlay-hero-text d-grid start top">
                    <Row>
                        <Col>
                            <h1 className="display-1 hero-title">Создавать тренировки <br/>стало еще проще!</h1>
                            <h2 className="hero-subtitle">Создайте свою первую тренировку</h2>
                            <Button variant="secondary" className="hero-button mt-4 ms-4">Создать тренировку</Button>
                        </Col>
                    </Row>

                </Container>
            </div>
            <CardGroup className="justify-content-center mb-5">
                <Card className="mx-5 mt-5">
                    <a href="#" onClick={() => router(EXERCISE)} className="text-decoration-none"><Card.Img variant="top" src={mock} /></a>
                    <a href="#" onClick={() => router(EXERCISE)} className="text-decoration-none text-dark">
                    <Card.Body>
                        <Card.Title>Создавайте уникальные упражнения!</Card.Title>
                        <Card.Text className="my-5">
                            Какое то описание
                        </Card.Text>
                    </Card.Body>
                    </a>
                </Card>
                <Card className="mx-5 mt-5">
                    <a href="#" onClick={() => router(COMPLEX)} className="text-decoration-none"><Card.Img variant="top" src={mock} /></a>
                    <a href="#" onClick={() => router(COMPLEX)} className="text-decoration-none text-dark">
                    <Card.Body >
                        <Card.Title>Создайте свой комплекс!</Card.Title>
                        <Card.Text className="my-5">
                            Какое то описание
                        </Card.Text>
                    </Card.Body>
                    </a>
                </Card>
                <Card className="mx-5 mt-5">
                    <a href="#"  onClick={() => router(TRAINERS)}className="text-decoration-none"><Card.Img variant="top" src={mock} /></a>
                    <a href="#" onClick={() => router(TRAINERS)} className="text-decoration-none text-dark">
                    <Card.Body>
                        <Card.Title>Найдите тренера!</Card.Title>
                        <Card.Text className="my-5">
                            Какое то описание
                        </Card.Text>

                    </Card.Body>
                </a>
                </Card>
            </CardGroup>
            <div className="position-relative">
                <Image src={gradient} fluid/>
                <Container className="overlay-text d-grid">
                    <h2>Импортировать тренировку</h2>
                    <p>Введите код от вашей тренировки</p>
                    <Container className="d-flex justify-content-center">
                        <InputGroup className="mb-3 w-auto">
                            <Form.Control
                                placeholder="Введите код"
                                aria-label="code"
                            />
                        </InputGroup>
                        <Button variant="secondary" className="ms-4 h-75">Ок</Button>
                    </Container>
                </Container>
            </div>
            <footer>
                <div className="d-flex me-auto ms-0">
                    <Image src={logo} width="400px" rounded className="mb-5 ms-5"/>
                    <Row className="d-flex ms-auto me-5">
                        <Col className="mt-5 me-5">
                            <div className="d-grid text-center">
                                <h2 className="ps-4">Тренировки</h2>
                                <ul>
                                    <li className="mb-1"><a href="#">Создать тренировку</a></li>
                                    <li className="mb-1"><a href="#">Добавить упражнение</a></li>
                                    <li className="mb-1"><a href="#">Начать тренировать</a></li>
                                    <li className="mb-1"><a href="#">Мои тренировки</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="mt-5 me-5 ms-5">
                            <div className="d-grid text-center">
                                <h2 className="ps-4">Содружество</h2>
                                <ul>
                                    <li className="mb-1"><a href="#">Войти</a></li>
                                    <li className="mb-1"><a href="#">Зарегистрироваться</a></li>
                                    <li className="mb-1"><a href="#">Мой профиль</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="mt-5 ms-5">
                            <div className="d-grid text-center">
                                <h2 className="ps-4"> Информация</h2>
                                <ul>
                                    <li className="mb-1"><a href="#">FAQ</a></li>
                                    <li className="mb-1"><a href="#">О нас</a></li>
                                    <li className="mb-1"><a href="#">Контакты</a></li>
                                </ul>
                            </div>
                        </Col>

                    </Row>
                </div>
            </footer>


        </Fragment>
    );
};

export default Main;