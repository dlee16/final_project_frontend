import React from 'react';
// import { connect } from 'react-redux';
// import { setCurrentUser } from '../actions';

class Login extends React.Component{
    state = {
        username: "", 
        password: "",
        error: ""
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    errorDisplay = (error) => {
        this.setState({
            error
        })
    }

    handleSignUpClick = () => {
        this.props.history.push('/signup')
    }

    handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(response => {
            if (response.errors) {
                this.errorDisplay(response.errors)
            } else {
                this.props.setCurrentUser(response)
            }
        })
    }

    render(){
        console.log(this.props)
        return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <h2 className="ui login image header">
                    <div className="content">
                        Log-in to your account
                    </div>
                </h2>
                <form onSubmit={this.handleSubmit} className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                    <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                        </div>
                        <button className="ui fluid large submit button">Login</button>
                    </div>
                </form>

                <div className={this.state.error ? "ui message" : "ui hidden message"}>
                    <h3 className="centered">{this.state.error ? this.state.error : null} </h3>
                </div>

                    <div className="middle aligned column">
                        New to us?  
                        <button onClick={this.handleSignUpClick} >Sign Up </button>
                    </div>
            </div>
        </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         currentUser: state.currentUser
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setCurrentUser: (user) => {
//             dispatch(setCurrentUser(user))
//         }
//     }
// }

export default Login