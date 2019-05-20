import React from 'react'

class UpdateUser extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render(){
        return(
            <div>
               <form onSubmit ={this.handleSubmit}>
                   Name: <input type="text" value={this.props.currentUser.name}/>
                   <br/>
                   Email: <input type="text" value={this.props.currentUser.email}/>
                    <br/>
                   FunFact: <input type="text" value={this.props.currentUser.fun_fact}/>
                   <br/>
                   Username: <input type="text" value={this.props.currentUser.username}/>
                   <br/>
                   Password: <input type="password" value={this.props.currentUser.password}/>
               </form>
            </div>
        )
    }
}

export default UpdateUser