import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {checkExOrComOrTrain} from "../store/likeReducer";

export const likeComplex= (id) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `liked/complex/${id}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkComplex(id))

        } catch (e) {
            alert(e)
        }
    }
}
export const checkComplex= (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `liked/complex/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkExOrComOrTrain(response))
        } catch (e) {
            alert(e)
        }
    }
}
export const deleteLikeComplex= (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(BASE_URL + `liked/complex/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkComplex(id))
        } catch (e) {
            alert(e)
        }
    }
}

export const likeExersice= (id) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `liked/exercise/${id}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkExersice(id))
        } catch (e) {
            alert(e)
        }
    }
}
export const checkExersice= (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `liked/exercise/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkExOrComOrTrain(response))
        } catch (e) {
            alert(e)
        }
    }
}
export const deleteLikeExersice= (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(BASE_URL + `liked/exercise/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkExersice(id))
        } catch (e) {
            alert(e)
        }
    }
}

export const likeTraining= (id) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `liked/training/${id}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkTraining(id))
        } catch (e) {
            alert(e)
        }
    }
}
export const checkTraining= (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `liked/training/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkExOrComOrTrain(response))
        } catch (e) {
            alert(e)
        }
    }
}
export const deleteLikeTraining= (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(BASE_URL + `liked/training/${id}`, { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(checkTraining(id))
        } catch (e) {
            alert(e)
        }
    }
}