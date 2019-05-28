import React from 'react'
import { connect } from 'react-redux';
import {  Form, Button, Container } from 'semantic-ui-react';
import { updateCurrentUser } from '../actions';

class UpdateUser extends React.Component{

    state = {
        name: this.props.currentUser.name,
        username: this.props.currentUser.username,
        fun_fact: this.props.currentUser.fun_fact,
        email: this.props.currentUser.email
    }

    updateUser = (id, name, username, fun_fact, email) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    username,
                    fun_fact,
                    email
                })
            })
                .then(res => res.json())
                .then(response => this.props.updateCurrentUser(response))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.updateUser(this.props.currentUser.id, this.state.name, this.state.username, this.state.fun_fact, this.state.email)
    }
    
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }


    render(){
        console.log(this.state)
        return(
            <div >
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Name</label>
                            <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                            <input type="text" onChange={this.handleChange} value={this.state.email} name="email" />
                    </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Username</label>
                            <input type="text" onChange={this.handleChange} value={this.state.username} name="username"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <p>Can't edit</p>
                            {/* <input type="password" value={this.props.currentUser.password} name="password" placeholder="Can't edit password..." /> */}
                    </Form.Field>
                    </Form.Group>
                        <Form.TextArea label='Fun Fact' value={this.state.fun_fact} onChange={this.handleChange} name="fun_fact"  />
                    <Button type='submit'>Edit</Button>
                </Form>
                </Container>
            </div>







            //    <form onSubmit ={this.handleSubmit}>
            //        Name: <input type="text" onChange={this.handleChange} value={this.props.currentUser.name}/>
            //        <br/>
            //         Email: <input type="text" onChange={this.handleChange} value={this.props.currentUser.email}/>
            //         <br/>
            //         FunFact:<textarea onChange={this.handleChange} value={this.props.currentUser.fun_fact}></textarea>  
            //        <br/>
            //         Username: <input type="text" onChange={this.handleChange} value={this.props.currentUser.username}/>
            //        <br/>
            //         Password: <input type="password" onChange={this.handleChange} value={this.props.currentUser.password ? this.props.currentUser.password : "" }  />
            //    </form>
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentUser: (user) => {
        dispatch(updateCurrentUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)