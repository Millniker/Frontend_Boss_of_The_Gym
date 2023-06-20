import axios from "axios";
import {BASE_URL} from "../utils/consts";

export const createTraining= (common,complexesArray,exercisesArray,description,template,name,published) => {
    return async dispatch => {
        try {
            console.log(exercisesArray.exesices)
            const exercises = exercisesArray.exesices.map(item => ({
                exerciseId: item.exerciseId,
                exerciseValues: {
                    duration: item.duration,
                    repetitions: item.repetitions,
                    weight: item.weight
                },
                orderNumber:item.number+1
            }));
            const complexes = complexesArray.complexes.map(item => ({
                complexType:item.complexType,
                exercises:item.exercises.map(ex => ({
                        exerciseId:ex.exerciseId,
                        exerciseValues: {
                            duration: ex.exerciseValues.duration,
                            repetitions: ex.exerciseValues.repetitions,
                            weight: ex.exerciseValues.weight
                        },
                        orderNumber: 0
                }
                )),
                orderNumber:item.orderNumber+1,
                spaceDuration:item.spaceDuration,
                repetitions:item.repetitions
            }));
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
            console.log(response.config.data)
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

