import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {myTrainingGroups} from "./groupApi";
import {getSharingToken} from "../store/sharingReducer";
import swal from 'sweetalert';

export const createToken= (trainings) => {
    const today = new Date(); // Получаем текущую дату
    const expDate = new Date(today); // Создаем новый объект Date на основе текущей даты
    expDate.setDate(expDate.getDate() + 1);
    const maxCount=1
    const complexes=[]
    const exercises=[]
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `sharing/create`,
                {
                    complexes,
                    exercises,
                    expDate,
                    maxCount,
                    trainings
                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getSharingToken(response))
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}
export const activateToken= (token) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `sharing/use?value=${token}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            swal("Доступ открыт")
        } catch (e) {
            swal("Код недействителен")
        }
    }
}
