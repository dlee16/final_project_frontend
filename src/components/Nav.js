import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
        props.currentUser ? 
        <div className="ui menu">
            <div className="ui container">
                <div className="right menu">
                    <NavLink to={`/${props.currentUser.id}/profile`} className="right item"> My Profile </NavLink>
                    <NavLink onClick={props.logOut} to='/login' className="right item"> Log Out</NavLink>
                </div>
            </div>
        </div>
            : 
        <div className="ui pointing menu">
                <div className="right menu">
                        <NavLink className="active item" to ='/signup'> SignUp</NavLink>
                    <NavLink className=" item" to ='/login'> Login</NavLink>
                </div>
        
        </div>
    )
}

export default Nav


   