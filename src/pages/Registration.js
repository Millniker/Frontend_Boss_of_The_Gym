import React, {Fragment, useState} from 'react';
import RegisterForm from "../components/RegisterForm";
import NavBar from "../components/NavBar";

const Registration = () => {
    return (
        <Fragment>
            <NavBar/>
            <RegisterForm/>
        </Fragment>
    );
};

export default Registration;