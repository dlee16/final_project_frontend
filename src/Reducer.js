const defaultState = {
    group: [],
    comments: [],
    lifestage: [],
    userLifestages:[],
    user: {}
}

function reducer(state = defaultState, action) {
    switch(action.type){
        case "JOIN_GROUP": 
            return {...state, selectedGroup: action.payload }
        case "GET_GROUPS":
        // console.log({...state, group: action.payload})
            return {...state, group: action.payload}
        case "GET_LIFESTAGES":
            return {...state, lifestage: action.payload}
        case "GET_USERLIFESTAGES":
            return {...state, userLifestages: action.payload}
        default:
            return state
    }
}

export default reducer