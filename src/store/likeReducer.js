const CHECK ="CHECK"
const LIKE ="LIKE"
const DISLIKE ="DISLIKE"


const defaultState ={
    check:false,
}
export default function likeReducer(state = defaultState, action){
    switch (action.type){
        case CHECK:
            return {
                ...state,
                check:action.payload.data
            }
        case LIKE:
            return {
                ...state,
                check:true
            }
        case DISLIKE:
            return {
                ...state,
                check:false
            }

        default:
            return state
    }
}
export const checkExOrComOrTrain = check =>({type:CHECK, payload:check})
export const setLike = like =>({type:LIKE, payload:like})
export const setDisLke = dislike =>({type:DISLIKE, payload:dislike})