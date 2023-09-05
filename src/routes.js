import {
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE, PROFILE,
    REGISTRATION_ROUTE, RESET_PASSWORD
} from "./utils/consts";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

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
    }
]