import React from 'react'

class SignupForm extends React.Component {
    state ={ 
        name: "",
        username: "",
        password: "",
        fun_fact: "", 
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
                                         <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="address book icon"></i>
                                        <input type="text" onChange={this.handleChange} value={this.state.email} name="email" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="thumbs up icon"></i>
                                         <input type="text" onChange={this.handleChange} value={this.state.funFact} name="fun_fact" placeholder="Fun Fact"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                         <input type="text" onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                        <input type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password"/>
                                </div>
                            </div>
                        <button className="ui fluid large submit button" >Sign up!</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default SignupForm