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
    GET_PROFILE_USERGROUPS,
    GET_NEW_PROFILE_USERLIFESTAGES,
    REMOVE_COMMENT,
    UPDATED_COMMENTID,
    REMOVE_USER_GROUPS,
    GET_LIFESTAGE_ID,
    GET_MEMBERSHIPS,
    GET_ALL_USERLIFESTAGES,
    SET_CURRENTUSER,
    UPDATE_CURRENTUSER
    
} from './types'

export function getGroups(groups) {
    return {
        type: GET_GROUPS,
        payload: groups
    }
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENTUSER,
        payload: user
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

export function getProfileUserGroups(groups){
    return {
        type: GET_PROFILE_USERGROUPS,
        payload: groups
    }
}

export function getNewProfileUserLifestages(lifestages){
    return {
        type: GET_NEW_PROFILE_USERLIFESTAGES,
        payload: lifestages
    }
}

export function removeComment(comment){
    return {
        type: REMOVE_COMMENT,
        payload: comment
    }
}

export function updateCommentId(comment){
    return {
        type: UPDATED_COMMENTID,
        payload: comment
    }
}

export function removeUserGroups(group){
    return {
        type: REMOVE_USER_GROUPS,
        payload: group
    }
}

export function getLifestageId(lifestageId){
    return {
        type: GET_LIFESTAGE_ID,
        payload: lifestageId
    }
}

export function getMemberships(memberships){
    return {
        type: GET_MEMBERSHIPS,
        payload: memberships
    }
}

export function getAllUserLifestages(userLifestages){
    return {
        type: GET_ALL_USERLIFESTAGES,
        payload: userLifestages
    }
}

export function updateCurrentUser(user){
    return {
        type: UPDATE_CURRENTUSER,
        payload: user
    }
}