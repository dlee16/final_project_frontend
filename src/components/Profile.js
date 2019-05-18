import React from 'react';
import { NavLink } from 'react-router-dom'

const Profile = (props) => {

    if (props.currentUser){
        return (
            <div>
                <h2>Welcome {props.currentUser ? props.currentUser.name : null} ! </h2>
                <NavLink to='/lifestages'> <button>See Lifestages</button></NavLink>
            </div>
        )
    } else {
        return null
    }
}

export default Profile