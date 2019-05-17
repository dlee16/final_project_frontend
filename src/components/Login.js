import React from 'react';

class Login extends React.Component{
    state = {
        username: "", 
        password: ""
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push('/lifestage')
    }

    handleSignUpClick = () => {
        this.props.history.push('/signup')
    }

    render(){
        return (
            <div>
                <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
                <input type="text" name="password" placeholder="password" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Sign in</button>
                <button onClick={this.handleSignUpClick}>Sign Up! </button>
            </div>
        )
    }
}

export default Login