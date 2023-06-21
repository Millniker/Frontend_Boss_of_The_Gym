const GET_CURRENT_TRAINING ="GET_CURRENT_TRAINING"
const GET_APPOINTED_TRAINING ="GET_APPOINTED_TRAINING"
const GET_CURRENT_APPOINTED_TRAINING ="GET_CURRENT_APPOINTED_TRAINING"
const GET_MY_APPOINTED_TRAINING ="GET_MY_APPOINTED_TRAINING"
const GET_ALL_TRAINING ="GET_ALL_COMPLEXES"


const defaultState ={
    currentTraining:{},
    allTrainings:{},
    appointedTrainings:{},
    myAppointedTrainings:{},
    currentAppointedTrain:{}
}
export default function trainingReducer(state = defaultState, action){
    switch (action.type){
        case GET_CURRENT_TRAINING:
            return {
                ...state,
                currentTraining:action.payload.data
            }
        case GET_ALL_TRAINING:
            return {
                ...state,
                allTrainings:action.payload.data
            }
        case GET_APPOINTED_TRAINING:
            return {
                ...state,
                appointedTrainings:action.payload.data
            }
        case GET_MY_APPOINTED_TRAINING:
            return {
                ...state,
                myAppointedTrainings:action.payload.data
            }
        case GET_CURRENT_APPOINTED_TRAINING:
            return {
                ...state,
                currentAppointedTrain:action.payload.data
            }
        default:
            return state
    }
}
export const getCurTrain = curTrain =>({type:GET_CURRENT_TRAINING, payload:curTrain})
export const getAllTrain = allTrain =>({type:GET_ALL_TRAINING, payload:allTrain})
export const getAppointedTrain = appointedTrain =>({type:GET_APPOINTED_TRAINING, payload:appointedTrain})
export const getMyAppointedTrain = myAppointedTrain =>({type:GET_MY_APPOINTED_TRAINING, payload:myAppointedTrain})
export const getCurrentAppointedTrain = currentAppointedTrain =>({type:GET_CURRENT_APPOINTED_TRAINING, payload:currentAppointedTrain})
