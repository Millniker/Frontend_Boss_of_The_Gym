const GET_CURRENT_COMPLEX ="GET_CURRENT_COMPLEX"
const DELETE_CURRENT_COMPLEX ="DELETE_CURRENT_COMPLEX"
const GET_ALL_COMPLEXES ="GET_ALL_COMPLEXES"


const defaultState ={
    currentComplex:{},
    allComplexes:{},
}
export default function complexReducer(state = defaultState, action){
    switch (action.type){
        case GET_CURRENT_COMPLEX:
            return {
                ...state,
                currentComplex:action.payload.data
            }
        case GET_ALL_COMPLEXES:
            return {
                ...state,
                allComplexes:action.payload.data
            }
        case DELETE_CURRENT_COMPLEX:
            return {
                ...state,
                currentComplex: {}
            }
        default:
            return state
    }
}
export const getCurCom = curCom =>({type:GET_CURRENT_COMPLEX, payload:curCom})
export const getAllCom = allCom =>({type:GET_ALL_COMPLEXES, payload:allCom})
export const delCurCom = delCom =>({type:DELETE_CURRENT_COMPLEX, payload:delCom})