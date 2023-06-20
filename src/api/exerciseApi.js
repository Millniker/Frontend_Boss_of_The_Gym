import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {getCurrentGroup} from "../store/groupReducer";
import {getAllEx, getCurEx} from "../store/exerciseReducer";

export const createExercise= (duration,repetitions,weight,description,imageId,muscleGroups,name,published) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `exercise/`,
                {
                    defaultValues:{
                        duration,
                        repetitions,
                        weight
                    },
                    description,
                    imageId,
                    muscleGroups,
                    name,
                    published
                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const getExercise= (exerciseId) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `exercise/${exerciseId}`,
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getCurEx(response))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getAllExercise= (common,muscleGroups,my,name, page, size, shared,published,liked) => {
    return async dispatch => {
        try {
            published=false
            liked = true
            const response = await axios.post(BASE_URL + `exercises/`,{
                    common,
                    liked,
                    muscleGroups,
                    my,
                    name,
                    "paginationQueryDto": {
                        page,
                        size
                    },
                    published,
                    shared
                },
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getAllEx(response))
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}