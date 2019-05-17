import {
    GET_GROUPS,
    GET_LIFESTAGES,
    GET_USERLIFESTAGES,
    ADD_GROUP,
    SET_COMMENTS,
    ADD_COMMENT
} from './types'

export function getGroups(groups) {
    return {
        type: GET_GROUPS,
        payload: groups
    }
}

export function getLifestages(lifestages){
    return {
        type: GET_LIFESTAGES,
        payload: lifestages
    }
}

export function getUserLifestages(userLifestages) {
    return {
        type: GET_USERLIFESTAGES,
        payload: userLifestages
    }
}

export function addGroup(addGroup) {
    return {
        type: ADD_GROUP,
        payload: addGroup
    }
}

export function setComments(setComments) {
    return {
        type: SET_COMMENTS,
        payload: setComments
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}