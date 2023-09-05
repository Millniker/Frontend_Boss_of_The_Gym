import axios from "axios";
import {logout} from "../store/userReducer";
import {profile} from "./profileApi";
import {BASE_URL} from "../utils/consts";
import swal from 'sweetalert';

export const registration = (email,login,name, password)=>{
    return async dispatch =>{
        try {
            const response = await axios.post(BASE_URL+`user/register/`, {
                email,
                login,
                name,
                password
            })
            swal("Вы успешно зарегестрированы.Поддвердите почту.")
        }
        catch (e){
            if(e.response.data.message === "login already used"){
                swal("Ошибка","Логин уже используется", "warning");
            }
            else if(e.response.data.message === "email already used"){
                swal("Ошибка","Почта уже используется", "warning");
            }
            else if(e.code === "ERR_BAD_REQUEST") {
                swal("Ошибка","Ошибка валидации", "warning");
            }
            else {
                swal("Ошибка","Ошибка", "warning");
            }
            //TODO событие для вылета информации, что надо поддтвердить почту
        }
    }
}
export const login = (login, password)=>{
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `user/sing-in/`, {
                login,
                password
            })
            localStorage.setItem(`accessToken`,response.data.accessToken)
            localStorage.setItem(`restoreToken`,response.data.restoreToken)
            dispatch(profile())
        } catch (e) {
            if(e.response.data.message === "bad login or password") {
                swal("Ошибка","Неверный пароль или логин", "warning");
            }
            else if(e.response.data.message === "not confirmed") {
                swal("Ошибка","Вы не подтверждены. Проверьте почту");
            }
            else if(e.code === "ERR_BAD_REQUEST") {
                swal("Ошибка","Ошибка валидации", "warning");
            }
            else {
                swal("Ошибка","Ошибка", "warning");
            }
        }
    }
}
export const userLogout = ()=>{
    return async dispatch => {
        try {
            dispatch(logout())
        } catch (e) {
            alert(e)
        }
    }
}
export const restoreToken = (token)=>{
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `user/token/?token=${token}`)
            console.log(response)
            localStorage.setItem(`accessToken`,response.data.accessToken)
            localStorage.setItem(`restoreToken`,response.data.restoreToken)
            dispatch(profile())
        } catch (e) {
            console.log(e)
        }
    }
}
export const sendPasswordCode= (login) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `user/password/?login=${login}`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const resetPassword= (login,password,token) => {
    return async dispatch => {
        try {
            console.log(login,password,token)
            const response = await axios.put(BASE_URL + `user/password/?login=${login}&password=${password}&token=${token}`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}