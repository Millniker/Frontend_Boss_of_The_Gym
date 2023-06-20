const SET_USER ="SET_USER"
const LOGOUT ="LOGOUT"
const defaultState ={
    currentUser:{},
    isAuth:localStorage.getItem('isAuth')
}
export default function userReducer(state = defaultState, action){
    switch (action.type){
            case SET_USER:
                localStorage.setItem('isAuth','true')
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
            case LOGOUT:
                localStorage.removeItem('isAuth')
                localStorage.removeItem(`accessToken`)
                localStorage.removeItem(`restoreToken`)
            return {
                ...state,
                currentUser:{},
                isAuth: false
                }
        default:
            return state
    }
}
export const setUser = user =>({type:SET_USER, payload:user})
export const logout =()=>({type:LOGOUT})
