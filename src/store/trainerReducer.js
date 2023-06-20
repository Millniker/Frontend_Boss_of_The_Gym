import trainers from "../pages/Trainers";
const GET_TRAINERS ="GET_TRAINERS"
const GET_MY_QUERY="GET_MY_QUERY"
const GET_MY_USERS="GET_MY_USERS"
const defaultState ={
    trainersPage:{},
    myQuery:{},
    myUsers:{}
}
export default function trainerReducer(state = defaultState, action){
    switch (action.type){
            case GET_TRAINERS:
                return {
                ...state,
                    trainersPage:action.payload.data
            }
            case GET_MY_QUERY:
                return {
                ...state,
                myQuery:action.payload.data
            }
        case GET_MY_USERS:
            return {
                ...state,
                myUsers:action.payload.data
            }
        default:
            return state
    }
}
export const getArrayTrainers = trainers =>({type:GET_TRAINERS, payload:trainers})
export const getArrayMyQuery = query =>({type:GET_MY_QUERY, payload:query})
export const getArrayMyUser = users =>({type:GET_MY_USERS, payload:users})
