const defaultState = {
    group: [],
    comments: [],
    lifestage: [],
    user: {}
}

function reducer(state = defaultState, action) {
    // console.log(action)
    switch(action.type){
        case "JOIN_GROUP": 
            return {...state, selectedGroup: action.payload }
        case "GET_GROUPS":
            // console.log({...state, group: action.payload})
            return {...state, group: action.payload}
        case "GET_LIFESTAGES":
            // console.log({...state, group: action.payload})
            return {...state, lifestage: action.payload}
        default:
            return state
    }
}

export default reducer