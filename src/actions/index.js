import {
    GET_GROUPS,
    GET_LIFESTAGES,
    GET_USERLIFESTAGES
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