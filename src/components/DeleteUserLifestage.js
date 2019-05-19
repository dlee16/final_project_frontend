import React from 'react';

class DeleteUserLifestage extends React.Component{

    componentDidMount(){
        fetch('http://localhost:3000/user_lifestages')
        .then(res => res.json())
        .then(console.log)
    }

    render(){
        return(
            <div>
                delete here 
            </div>
        )
    }
}

export default DeleteUserLifestage