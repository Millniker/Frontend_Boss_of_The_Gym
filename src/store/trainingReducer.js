const GET_CURRENT_TRAINING ="GET_CURRENT_TRAINING"
const GET_ALL_TRAINING ="GET_ALL_COMPLEXES"


const defaultState ={
    currentTraining:{},
    allTrainings:{},
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
        default:
            return state
    }
}
export const getCurTrain = curTrain =>({type:GET_CURRENT_TRAINING, payload:curTrain})
export const getAllTrain = allTrain =>({type:GET_ALL_TRAINING, payload:allTrain})
