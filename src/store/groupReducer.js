const GET_MY_GROUP ="GET_MY_GROUP"
const GET_MY_TRAINING_GROUP ="GET_MY_TRAINING_GROUP"
const GET_CURRENT_GROUP ="GET_CURRENT_GROUP"
const GET_TRAINERS_IN_GROUP ="GET_TRAINERS_IN_GROUP"
const GET_USERS_IN_GROUP ="GET_USERS_IN_GROUP"


const defaultState ={
    myGroup:{},
    myTrainingGroups:{},
    currentGroup:{},
    trainersInGroup:{},
    users:{}
}
export default function groupReducer(state = defaultState, action){
    switch (action.type){
        case GET_MY_GROUP:
            return {
                ...state,
                myGroup:action.payload.data
            }
        case GET_MY_TRAINING_GROUP:
            return {
                ...state,
                myTrainingGroups:action.payload.data
            }
        case GET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup:action.payload.data
            }
        case GET_TRAINERS_IN_GROUP:
            return {
                ...state,
                trainersInGroup:action.payload.data
            }
        case GET_USERS_IN_GROUP:
            return {
                ...state,
                users:action.payload.data
            }
        default:
            return state
    }
}
export const getMyGroup = myGroup =>({type:GET_MY_GROUP, payload:myGroup})
export const getMyTrainGroup = myTrainingGroups =>({type:GET_MY_TRAINING_GROUP, payload:myTrainingGroups})
export const getCurrentGroup = currentGroup =>({type:GET_CURRENT_GROUP, payload:currentGroup})
export const getTrainersInGroup = trainersInGroup=>({type:GET_TRAINERS_IN_GROUP, payload:trainersInGroup})
export const getUsersInGroup = users=>({type:GET_USERS_IN_GROUP, payload:users})