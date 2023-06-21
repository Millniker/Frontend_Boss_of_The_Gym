import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {getTrainersInGroup} from "../store/groupReducer";
import {getAllCom, getCurCom} from "../store/complexReducer";

export const getComplex= (complexId) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `complex/${complexId}`,
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getCurCom(response))
        } catch (e) {
            console.log(e)
        }
    }
}
export const createComplex= (complexType,description,exArray,name,published,repetitions,spaceDuration) => {
    return async dispatch => {
        try {
            console.log(exArray)
            const exercises = exArray.exesices.map(item => ({
                exerciseId: item.exerciseId,
                exerciseValues: {
                    duration: item.duration,
                    repetitions: item.repetitions,
                    weight: item.weight
                }
            }));
            console.log(exercises)
            const response = await axios.post(BASE_URL + `complex/`,
                {
                    complexType,
                    description,
                    exercises,
                    name,
                    published,
                    repetitions,
                    spaceDuration
                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const getComplexes= (common,my,name,page,size,shared,liked,published) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `complexes/`,
                {
                    common,
                    liked:true,
                    my,
                    name,
                    "paginationQueryDto": {
                        page,
                        size
                    },
                    published,
                    shared
                }
                ,{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getAllCom(response))
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}