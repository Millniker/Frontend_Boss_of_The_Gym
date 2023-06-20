import axios from "axios";
import {logout} from "../store/userReducer";
import {profile} from "./profileApi";
import {BASE_URL} from "../utils/consts";

export const registration = (email,login,name, password)=>{
    return async dispatch =>{
    try {
        const response = await axios.post(BASE_URL+`user/register/`, {
            email,
            login,
            name,
            password
        })

    }
    catch (e){
        //TODO событие для вылета информации, что надо поддтвердить почту
        console.log(e)
        alert(e)
    }
    }
}
export const login = (login, password)=>{
    return async dispatch => {
        try {
            console.log(login,password)
            const response = await axios.post(BASE_URL + `user/sing-in/`, {
                login,
                password
            })
            localStorage.setItem(`accessToken`,response.data.accessToken)
            localStorage.setItem(`restoreToken`,response.data.restoreToken)
            dispatch(profile())
        } catch (e) {
            alert(e)
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