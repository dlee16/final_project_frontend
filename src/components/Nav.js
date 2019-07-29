import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {

    const logOut = () => {
        localStorage.removeItem("token")
        this.props.setCurrentUser(null)
        this.props.history.push("/")
    }

    return (
        props.currentUser ? 
        <div className="ui menu">
            <div className="ui container">
                <div className="right menu">
                        <NavLink to={`/${props.currentUser.id}/profile`} className="right item"> My Profile </NavLink>
                        <NavLink to='/' onClick={logOut} className=" right item"> Log Out</NavLink>
                        <NavLink to='/about' className="right item"> About</NavLink>
                </div>
            </div>
        </div>
            : 
        <div className="ui menu">
            <div className="right menu">
                <NavLink className="active item" to ='/signup'> SignUp</NavLink>
                <NavLink className=" item" to='/userlogin'> Login</NavLink>
                <NavLink to='/about' className="right item"> About</NavLink>
                <NavLink to='/' className="right item"> Home</NavLink>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Nav)


   