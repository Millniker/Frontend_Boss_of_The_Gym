import axios from "axios";
import {setUser} from "../store/userReducer";
import {BASE_URL} from "../utils/consts";
import {restoreToken} from "./authApi";


export const profile = ()=> {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `user/me/`, {
                headers: {Authorization: `${localStorage.getItem('accessToken')}`}
            })
            dispatch(setUser(response.data))
        }
        catch (err){
            localStorage.removeItem('isAuth')
            if(localStorage.getItem('restoreToken')){
                dispatch(restoreToken(localStorage.getItem('restoreToken')))
            }
        }
    }
}
export const putProfile = (email, name)=> {
    return async dispatch => {
        try {
            const response = await axios.put(BASE_URL + `user/`, {
                email,
                name
            },{
                headers: {Authorization: `${localStorage.getItem('accessToken')}`}
            })
            dispatch(setUser(response.data))
        } catch (e) {
            alert(e)

        }
    }
}