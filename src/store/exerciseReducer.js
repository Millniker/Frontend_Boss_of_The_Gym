const GET_CURRENT_EXERCISE ="GET_CURRENT_EXERCISE"
const DELETE_CURRENT_EXERCISE ="DELETE_CURRENT_EXERCISE"
const GET_ALL_EXERCISE ="GET_ALL_EXERCISE"


const defaultState ={
    currentExercise:{},
    allExercise:{},
}
export default function exerciseReducer(state = defaultState, action){
    switch (action.type){
        case GET_CURRENT_EXERCISE:
            return {
                ...state,
                currentExercise:action.payload.data
            }
        case GET_ALL_EXERCISE:
            return {
                ...state,
                allExercise:action.payload.data
            }
        case DELETE_CURRENT_EXERCISE:
            return {
                ...state,
                currentExercise: {}
            }
        default:
            return state
    }
}
export const getCurEx = curEx =>({type:GET_CURRENT_EXERCISE, payload:curEx})
export const getAllEx = allEx =>({type:GET_ALL_EXERCISE, payload:allEx})
export const delCurEx = delCur =>({type:DELETE_CURRENT_EXERCISE, payload:delCur})