import{
    GET_GROUPS
} from '../actions/types'

const defaultState = []

const groupReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_GROUPS":
            return action.payload 
        default: 
        return state
    }
}

export default groupReducer