import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
        props.currentUser ? 
        <div>
            <NavLink onClick={props.logOut} to='/login'> Log Out</NavLink>
            <NavLink to={`/${props.currentUser.id}/profile`}> My Profile </NavLink>
        </div>
            : 
        <div>
            <NavLink to ='/signup'> SignUp</NavLink>
            <NavLink to ='/login'> Login</NavLink>
        </div>
    )
}

export default Nav