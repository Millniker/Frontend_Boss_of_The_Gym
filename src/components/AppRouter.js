import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {authRoutes, privateRoutes, publicRoutes} from "../routes";
import {profile, putProfile} from "../api/profileApi";
import {MAIN_PAGE_ROUTE, RESET_PASSWORD} from "../utils/consts";
import ResetPassword from "../pages/ResetPassword";
import PageRender from "./PageRender";
import Id from "../pages/groups/[id]";
import Id1 from "../pages/appointed/[id1]";
import Ex from "../pages/exesice/ex";
import Com from "../pages/complex/com";
import Train from "../pages/training/train";
const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    return (
        <Routes>
            {!isAuth && authRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            {isAuth && privateRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            {<Route exact path='/groups/:id' element={<Id/>}/>}
            {<Route exact path='/appointed/:id' element={<Id1/>}/>}
            {<Route exact path='/exercise/:id' element={<Ex/>}/>}
            {<Route exact path='/complex/:id' element={<Com/>}/>}
            {<Route exact path='/training/:id' element={<Train/>}/>}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>

    );
};


export default AppRouter;