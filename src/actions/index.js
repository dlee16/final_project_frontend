import {
    GET_GROUPS,
    GET_LIFESTAGES
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