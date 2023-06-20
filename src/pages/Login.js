import React, {Fragment} from 'react';
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";

const Login = () => {
    return (
        <Fragment>
            <div>
                <NavBar/>
                <LoginForm/>
            </div>
        </Fragment>
    );
};

export default Login;