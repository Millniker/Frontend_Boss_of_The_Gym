const GET_TOKEN ="GET_TOKEN"
const defaultState ={
    token:""
}
export default function sharingReducer(state = defaultState, action){
    switch (action.type){
        case GET_TOKEN:
            return {
                ...state,
                token:action.payload.data
            }
        default:
            return state
    }
}
export const getSharingToken = token =>({type:GET_TOKEN, payload:token})
