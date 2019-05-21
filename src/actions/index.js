import {
    GET_GROUPS,
    GET_LIFESTAGES,
    GET_USERLIFESTAGES,
    ADD_GROUP,
    SET_COMMENTS,
    ADD_COMMENT,
    GET_CURRENTUSER,
    JOIN_GROUP,
    FIND_USER_GROUP,
    SET_LIFESTAGE,
    GET_PROFILE_USERLIFESTAGES
    
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

export function getCurrentUser(token) {
    return {
        type: GET_CURRENTUSER,
        payload: token
    }
}

export function joinGroup(group) {
    return {
        type: JOIN_GROUP,
        payload: group
    }
}

export function findUserGroup(group) {
    return {
        type: FIND_USER_GROUP,
        payload: group
    }
}

export function setNewLifestage(lifestage) {
    return {
        type: SET_LIFESTAGE,
        payload: lifestage
    }
}

export function getProfileUserLifestages(lifestages){
    return {
        type: GET_PROFILE_USERLIFESTAGES,
        payload: lifestages
    }
}