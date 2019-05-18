import React from 'react';


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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} />
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
                    <button >Sign in</button>
                </form>

                <button onClick={this.handleSignUpClick}>Sign Up! </button>
                {this.state.error ? this.state.error : null}
            </div>
        )
    }
}

export default Login