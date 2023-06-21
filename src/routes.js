import {
    APPOINT, APPOINT_MY, APPOINTED,
    COACHING, COMPLEX, CREATE_COMPLEX, CREATE_EXERCISE, CREATE_TRAINING, EXERCISE, GROUPS,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE, PROFILE, QUERY_COACHING,
    REGISTRATION_ROUTE, RESET_PASSWORD, SHARING, TRAINERS, TRAINING
} from "./utils/consts";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Trainers from "./pages/Trainers";
import QueryCoaching from "./pages/QueryCoaching";
import Coaching from "./pages/Coaching";
import Groups from "./pages/Groups";
import Exercise from "./pages/Exercise";
import ComplexCreate from "./pages/ComplexCreate";
import Complex from "./pages/Complex";
import CreateExecise from "./pages/CreateExecise";
import Training from "./pages/Training";
import TrainingCreate from "./pages/TrainingCreate";
import AppointTraning from "./pages/AppointTraning";
import AppointedTrainings from "./pages/AppointedTrainings";
import MyAppointTrainings from "./pages/MyAppointTrainings";
import Sharing from "./pages/Sharing";

export const authRoutes=[
    {
        path:LOGIN_ROUTE,
        component:<Login/>
    },
    {
        path:REGISTRATION_ROUTE,
        exact:true,
        component:<Registration/>
    },
    {
        path: RESET_PASSWORD,
        exact: true,
        component: <ResetPassword/>
    }
]
export const publicRoutes =[
    {
        path:MAIN_PAGE_ROUTE,
        exact:true,
        component:<Main/>
    }

]
export const privateRoutes=[
    {
        path:PROFILE,
        component:<Profile/>
    },
    {
        path: TRAINERS,
        exact: true,
        component: <Trainers/>
    },
    {
        path: QUERY_COACHING,
        exact: true,
        component: <QueryCoaching/>
    },
    {
        path: COACHING,
        exact: true,
        component: <Coaching/>
    },
    {
        path: GROUPS,
        exact: true,
        component: <Groups/>
    },
    {
        path: EXERCISE,
        exact: true,
        component: <Exercise/>
    },
    {
        path: CREATE_EXERCISE,
        exact: true,
        component: <CreateExecise/>
    },
    {
        path: COMPLEX,
        exact: true,
        component: <Complex/>
    },
    {
        path: CREATE_COMPLEX,
        exact: true,
        component: <ComplexCreate/>
    },
    {
        path: TRAINING,
        exact: true,
        component: <Training/>
    },
    {
        path: CREATE_TRAINING,
        exact: true,
        component: <TrainingCreate/>
    },
    {
        path: APPOINT,
        exact: true,
        component: <AppointTraning/>
    },
    {
        path: APPOINTED,
        exact: true,
        component: <AppointedTrainings/>
    },
    {
        path: APPOINT_MY,
        exact: true,
        component: <MyAppointTrainings/>
    },
    {
        path: SHARING,
        exact: true,
        component: <Sharing/>
    }
]