import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getLifestages, getUserLifestages, findUserGroup } from '../actions';
import DeleteUserLifestage from './DeleteUserLifestage'

class Profile extends React.Component {
  
   componentDidMount = () => {
        fetch('http://localhost:3000/lifestages')
            .then(res => res.json())
            .then(this.props.getLifestages)
    }

    
    handleAllGroupsClick = (e) => {
        const currUserLifestage = this.props.lifestage.filter(ls => ls.users.map(user => (user.id)).includes(this.props.currentUser.id))
        
        const lifestageId= parseInt(currUserLifestage.find(ls => ls.name === e.target.name).id)
        const lifestage= currUserLifestage.find(ls => ls.name === e.target.name)
        
        
        this.props.getUserLifestages(lifestage)
        this.props.history.push(`/lifestages/${lifestageId}/grouplist`)
    }

    handleDeleteClick = () => {
       return  <DeleteUserLifestage /> 
    }
    // deleteLifeStage = () => {

    //     fetch(`http://localhost:3000/user_lifestages/${this.state.currentUser.id}`, {
    //         method: "DELETE"
    //     })
    //         .then(this.setState({
    //             currentUser: null
    //         }))
    // }

    handleUserGroupClick = (e) => {
        fetch('http://localhost:3000/memberships')
        .then(res => res.json())
        .then(this.props.getUserLifestages)

        if (this.props.userLifestages.length > 0){
            const filteredLifestage = this.props.userLifestages.filter(ls => ls.user_id === this.props.currentUser.id)
            const findingLifestageThroughGroup = filteredLifestage.map(group => group.group)
            const userLifestages = findingLifestageThroughGroup.filter(ls => ls.lifestage_id === parseInt(e.target.name))
            this.props.findUserGroup(userLifestages)

            const lifestageId= parseInt(userLifestages[0].lifestage_id)

            this.props.history.push(`/lifestages/${lifestageId}/usergrouplist`)
            

        } else{
            alert("Loading.... please try again.")
        }
    }

    renderLifestage = () => {
        const currUserLifestage= this.props.lifestage.filter(ls => ls.users.map(user => (user.id)).includes(this.props.currentUser.id))

        return currUserLifestage.map(ls => {
            return (
                <div key={ls.id}>
                    <h2>{ls.name}</h2>
                    <button onClick={this.handleAllGroupsClick} name={ls.name} >See All Groups</button>
                    <button onClick = {this.handleUserGroupClick} name={ls.id} >See Your Groups</button>
                    <button onClick={this.handleDeleteClick}> Leave Lifestage</button>
                </div>
            )
        })
    }


    render(){
        console.log("userlife", this.props.userGroups)
        if (this.props.currentUser){
            return (
                <div>
                    <h2>Welcome {this.props.currentUser ? this.props.currentUser.name : null} ! </h2>
                    <NavLink to='/lifestages'> <button>See More Lifestages</button></NavLink>
                    <br/>
                    <h2>Your lifestages:</h2>
                    {this.renderLifestage()}
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        lifestage: state.lifestage,
        userLifestages: state.userLifestages,
        userGroups: state.userGroups
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        },
        getUserLifestages: (userLifestages) => {
            dispatch(getUserLifestages(userLifestages))
        },
        findUserGroup: (group) => {
            dispatch(findUserGroup(group))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)