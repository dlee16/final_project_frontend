const defaultState = {
    group: [],
    comments: [],
    lifestage: [],
    userLifestages:[],
    currentUser: null,
    joinedGroups: [],
    userGroups:[],
    newlySetLifestage:[],
    profileUserLifestages: []
}

function reducer(state = defaultState, action) {
    switch(action.type){
        case "GET_GROUPS":
        // console.log({...state, group: action.payload})
            return {...state, group: action.payload}
        case "GET_LIFESTAGES":
            return {...state, lifestage: action.payload}
        case "GET_USERLIFESTAGES":
            return { ...state, userLifestages:  action.payload}
        case "ADD_GROUP":
            return {...state, group: [...state.group, action.payload] }
        case "SET_COMMENTS":
            return {...state, comments: action.payload}
        case "ADD_COMMENT":
            return {...state, comments: [...state.comments, action.payload]}
        case "GET_CURRENTUSER":
            return {...state, currentUser: action.payload}
        case "JOIN_GROUP": 
            return {...state, joinedGroups: action.payload }
        case "FIND_USER_GROUP":
            return { ...state, userGroups: action.payload }
        case "SET_LIFESTAGE":
            return { ...state, newlySetLifestage: action.payload }
        case "GET_PROFILE_USERLIFESTAGES":
            return { ...state, profileUserLifestages: action.payload }
        
        default:
            return state
    }
}

export default reducer