import axios from "axios";
import {BASE_URL} from "../utils/consts";
import {getArrayTrainers} from "../store/trainerReducer";
import {getCurrentGroup, getMyGroup, getMyTrainGroup, getTrainersInGroup, getUsersInGroup} from "../store/groupReducer";

export const myGroups= (name) => {
    return async dispatch => {
        if(name!==''){
            try {
                const response = await axios.get(BASE_URL + `my/groups/?name=${name}`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getMyGroup(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        else{
            try {
                const response = await axios.get(BASE_URL + `my/groups/`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            } catch (e) {
                console.log(e)
            }
        }
    }
}
export const currentGroup= (groupId) => {
    return async dispatch => {
            try {
                const response = await axios.get(BASE_URL + `group/${groupId}`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getCurrentGroup(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
}
export const myTrainingGroups= (name) => {
    return async dispatch => {
        if(name!==''){
            try {
                const response = await axios.get(BASE_URL + `training/groups/?name=${name}`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getMyTrainGroup(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        else{
            try {
                const response = await axios.get(BASE_URL + `training/groups/`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getMyTrainGroup(response))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
export const createGroup= (imageId,name) => {
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `group/?imageId=${imageId}&name=${name}`,
                "",{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(myTrainingGroups(''))
        } catch (e) {
            console.log(e)
        }
    }
}

export const editGroup= (description,imageId,mainTrainer,name, groupId) => {
    return async dispatch => {
        try {
            const response = await axios.put(BASE_URL + `group/${groupId}`,
                {
                    description,
                    imageId,
                    mainTrainer,
                    name
                },{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(currentGroup(groupId))
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteGroup= (groupId) => {
    return async dispatch => {
        try {
            const response = await axios.delete(BASE_URL + `group/${groupId}`
                ,{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(myGroups(''))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getTrainersGroup= (groupId) => {
    return async dispatch => {
            try {
                const response = await axios.get(BASE_URL + `group/${groupId}/trainers`,
                    { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
                dispatch(getTrainersInGroup(response))
            } catch (e) {
                console.log(e)
            }
    }
}
export const addTrainer= (groupId,ids) => {
    return async dispatch => {
        try {
            console.log(groupId,ids)
            const response = await axios.post(BASE_URL + `group/${groupId}/trainers`,
                    ids
                ,{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            console.log(response)
            dispatch(getTrainersGroup(groupId))
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteTrainer= (groupId,ids) => {
    return async dispatch => {
        try {
            console.log(groupId,ids)
            const response = await axios.delete(BASE_URL + `group/${groupId}/trainers`,
                {data:ids
                , headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getTrainersGroup(groupId))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getUsersGroup= (groupId) => {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `group/${groupId}/users`,
                { headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getUsersInGroup(response))
        } catch (e) {
            console.log(e)
        }
    }
}
export const addUser= (groupId,ids) => {
    return async dispatch => {
        try {
            console.log(groupId,ids)
            const response = await axios.post(BASE_URL + `group/${groupId}/users`,
                ids
                ,{ headers: { Authorization: `${localStorage.getItem('accessToken')}`}})
            dispatch(getUsersGroup(groupId))
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteUser= (groupId,ids) => {
    return async dispatch => {
        try {
            console.log(groupId,ids)
            const response = await axios.delete(BASE_URL + `group/${groupId}/users`,{
                data:ids,
                headers: { Authorization: `${localStorage.getItem('accessToken')}`},
                })
            dispatch(getUsersGroup(groupId))
        } catch (e) {
            console.log(e)
        }
    }
}