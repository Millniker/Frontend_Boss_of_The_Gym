import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, privateRoutes, publicRoutes} from "../routes";
const AppRouter = () => {
    const isAuth = true
    return (
        <Routes>
            {!isAuth && authRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            {isAuth && privateRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>

    );
};


export default AppRouter;