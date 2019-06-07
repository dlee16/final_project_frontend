import React from 'react';

const initialState = {
    name: "",
    username: "",
    password: "",
    fun_fact: "",
    email: "",
    nameError: "",
    usernameError: "",
    passwordError: "",
    fun_factError: "",
    emailError: ""
}

class SignupForm extends React.Component {
state = initialState

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

validate = () => {
    let nameError = ""
    let usernameError = ""
    let passwordError = ""
    let fun_factError = ""
    let emailError = ""

    if (!this.state.name){
        nameError= "Please enter your name."
    }
    if (!this.state.fun_fact){
        fun_factError= "Let's learn more about you! Enter a fun fact."
    }
    if (!this.state.password){
        passwordError= "Please enter a password."
    }
    if (this.state.username < 2){
        usernameError= "Username must be longer than 2 characters."
    }
    if (!this.state.email.includes('@')){
        emailError= "This is an invalid email"
    }
    if (emailError || nameError || usernameError || passwordError || fun_factError){
        this.setState({emailError, nameError, usernameError, passwordError, fun_factError});
        return false 
    }
    return true;
}

handleClick = () => {
    this.props.history.push('/userlogin')
}

handleSubmit = (e) => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid){
        this.props.createUser(this.state)
        this.setState(initialState)
    }
}

render(){
    return (
        <div className="signUp">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui login image header">
                        <div className="content">
                            Sign Up!
                        </div>
                    </h2>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="address card icon"></i>
                                    <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Name" />
                                </div>
                                <div style={{color: 'red'}}>{this.state.nameError}</div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="address book icon"></i>
                                    <input type="text" onChange={this.handleChange} value={this.state.email} name="email" placeholder="Email" />
                                </div>
                                <div style={{ color: 'red' }}>{this.state.emailError}</div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="thumbs up icon"></i>
                                    <input type="text" onChange={this.handleChange} value={this.state.funFact} name="fun_fact" placeholder="Fun Fact" />
                                </div>
                                <div style={{ color: 'red' }}>{this.state.fun_factError}</div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username" />
                                </div>
                                <div style={{ color: 'red' }}>{this.state.usernameError}</div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password" />
                                </div>
                                <div style={{ color: 'red' }}>{this.state.passwordError}</div>
                            </div>
                            <button className="ui fluid large submit button" >Sign up!</button>
                        </div>
                    </form>
                    <div className="ui horizontal divider">Or</div>
                    <button onClick={this.handleClick} className="ui large submit button" >Log in</button>
                </div>
            </div>
        </div>

    )
}
}

export default SignupForm