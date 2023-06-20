import axios from "axios";
import {BASE_URL} from "../utils/consts";

export const createTraining= (common,complexes,exercises,description,template,name,published) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `training/`,
                {
                    common,
                    complexes,
                    description,
                    exercises,
                    name,
                    published,
                    template
                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const getTraining= (trainingId) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `training/${trainingId}`,
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const getTrainings= (page,size) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `trainings/`,
                {
                    "paginationQueryDto": {
                        page,
                        size
                    }

                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}