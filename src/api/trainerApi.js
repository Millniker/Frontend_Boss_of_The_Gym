import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {getArrayMyQuery, getArrayMyUser, getArrayTrainers} from "../store/trainerReducer";
import {profile} from "./profileApi";

export const getTrainers= (page,size,shortName) => {
    return async dispatch => {
        if(shortName!==''){
            try {
                const response = await axios.post(BASE_URL + `trainer/?shortName=${shortName}`,{
                    page,
                    size
                }, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getArrayTrainers(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        else{
            try {
                const response = await axios.post(BASE_URL + `trainer/`,{
                    page,
                    size
                }, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}}
            )
                dispatch(getArrayTrainers(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
export const addToTrainer= (trainerId) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `trainer/${trainerId}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const acceptQuery= (queryId) => {
    return async dispatch => {
        try {
            const response = await axios.put(BASE_URL + `trainer/query/${queryId}`,'',
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getMyQuery(1,5,''))
        } catch (e) {
            console.log(e)
        }
    }
}
export const rejectQuery= (queryId) => {
    return async dispatch => {
        try {
            const response = await axios.delete(BASE_URL + `trainer/query/${queryId}`,
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getMyQuery(1,5,''))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getMyQuery= (page,size,name) => {
    return async dispatch => {
        if(name!==''){
        try {
            const response = await axios.post(BASE_URL + `trainer/query/my/?name=${name}`,{
                page,
                size
            },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getArrayMyQuery(response))
        } catch (e) {
            console.log(e)
        }
        }else{
            try {
                const response = await axios.post(BASE_URL + `trainer/query/my/`,{
                    page,
                    size
                }, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getArrayMyQuery(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
export const getMyUsers= (page,size,name) => {
    return async dispatch => {
        if(name!==''){
            try {
                const response = await axios.post(BASE_URL + `trainer/users/?name=${name}`,{
                    page,
                    size
                }, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getArrayMyUser(response))
            } catch (e) {
                console.log(e)
            }
        }else{
            try {
                const response = await axios.post(BASE_URL + `trainer/users/`,{
                    page,
                    size
                }, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getArrayMyUser(response))
            } catch (e) {
                console.log(e)
            }
        }
    }
}
export const promoteToTrainer= (shortName) => {
    return async dispatch => {
            try {
                const response = await axios.post(BASE_URL + `user/promote/?shortName=${shortName}`,'',{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(profile())
            } catch (e) {
                console.log(e)
            }
        }}