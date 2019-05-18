import React from 'react'

class SignupForm extends React.Component {
    state ={ 
        name: "",
        username: "",
        password: "",
        funFact: "", 
        email: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = () => {
        this.props.createUser(this.state)
        this.props.history.push('/lifestages')
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Name"/>
                    <input type="text" onChange={this.handleChange} value={this.state.email} name="email" placeholder="Email"/>
                    <input type="text" onChange={this.handleChange} value={this.state.funFact} name="funFact" placeholder="Fun Fact"/>
                    <input type="text" onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username"/>
                    <input type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password"/>
                    <button>Sign up!</button>
                </form>
            </div>
        )
    }
}

export default SignupForm