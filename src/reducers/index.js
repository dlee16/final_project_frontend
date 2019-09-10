import{
    GET_GROUPS,
    GET_LIFESTAGES,
} from '../actions/types'

import groupReducer from './groups.js '

import {combineReducers} from 'redux'

// const defaultState = {
//     group: [],
//     comments: [],
//     lifestage: [],
//     userLifestages: [],
//     currentUser: null,
//     joinedGroups: [],
//     userGroups: [],
//     newlySetLifestage: [],
//     profileUserGroups: [],
//     newProfileUserLifestages: [],
//     updatedCommentId: null,
//     lifestageId: [],
//     allMemberships: [],
//     allUserLifestages: []
// }

// function reducer(state = defaultState, action) {
//     switch (action.type) {
//         case "GET_GROUPS":
//             return { ...state, group: action.payload }
//         case "GET_LIFESTAGES":
//             return { ...state, lifestage: action.payload }
//         case "GET_USERLIFESTAGES":
//             return { ...state, userLifestages: action.payload }
//         case "ADD_GROUP":
//             return { ...state, group: [...state.group, action.payload] }
//         case "SET_COMMENTS":
//             return { ...state, comments: action.payload }
//         case "ADD_COMMENT":
//             const editedComment = state.comments.find(comment => comment.id === action.payload.id)
//             if (editedComment) {
//                 return (
//                     { ...state, comments: state.comments.map(comment => comment === editedComment ? action.payload : comment) }
//                 )
//             }
//             return { ...state, comments: [...state.comments, action.payload] }
//         case "JOIN_GROUP":
//             return { ...state, joinedGroups: action.payload }
//         case "FIND_USER_GROUP":
//             return { ...state, userGroups: action.payload }
//         case "SET_LIFESTAGE":
//             return { ...state, newlySetLifestage: action.payload }
//         case "GET_PROFILE_USERGROUPS":
//             return { ...state, profileUserGroups: action.payload }
//         case "GET_NEW_PROFILE_USERLIFESTAGES":
//             return { ...state, newProfileUserLifestages: action.payload }
//         case "REMOVE_COMMENT":
//             return { ...state, comments: action.payload }
//         case "UPDATED_COMMENTID":
//             return { ...state, updatedCommentId: action.payload }
//         case "REMOVE_USER_GROUPS":
//             // return { ...state, userGroups: state.userGroups.filter( ug=> ug.id !== parseInt(action.payload)) }
//             const alteredGroups = state.group.find(g => g.id === action.payload.deletedId)
//             return {
//                 ...state, profileUserGroups: action.payload.groups, group: state.group.map(grp => grp === alteredGroups ? { ...grp, users: grp.users.filter(u => u.id !== state.currentUser.id) } : grp
//                 )
//             }
//         case "GET_LIFESTAGE_ID":
//             return { ...state, lifestageId: action.payload }
//         case "GET_MEMBERSHIPS":
//             return { ...state, allMemberships: action.payload }
//         case "GET_ALL_USERLIFESTAGES":
//             return { ...state, allUserLifestages: action.payload }
//         case "SET_CURRENTUSER":
//             return { ...state, currentUser: action.payload }
//         case "UPDATE_CURRENTUSER":
//             return { ...state, currentUser: action.payload }
//         case "JOIN_LIFESTAGE":
//             return { ...state, currentUser: { ...state.currentUser, lifestages: [...state.currentUser.lifestages, action.payload] } }
//         case "LEAVE_GROUP":
//             return { ...state, group: { ...state.group, users: [...state.group.users, action.payload] } }
//         default:
//             return state
//     }
// }

export default combineReducers({group: groupReducer})