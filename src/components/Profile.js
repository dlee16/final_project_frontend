import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getLifestages, getUserLifestages, findUserGroup } from '../actions';
import DeleteUserLifestage from './DeleteUserLifestage'
import UpdateUser from './UpdateUser'

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
                <div key={ls.id} className="ui card" id="borderimg1">
                
                        <div className="content">
                            <h2 className="header">{ls.name}</h2>
                            <button onClick={this.handleAllGroupsClick} name={ls.name} className="ui fluid submit button" >See All Groups</button>
                            <br/>
                            <button onClick={this.handleUserGroupClick} name={ls.id} className="ui fluid submit button" >See Your Groups</button>
                            <br/>
                            <button onClick={this.handleDeleteClick} className="ui fluid submit button"> Leave Lifestage</button>
                    
                    </div>
                </div>
               
            )
        })
    }


    render(){
        if (this.props.currentUser){
            return (
                <div className="ui center align container">
                    <div className="ui vertically divided stackable grid">
                            <div className="eight wide column">
                            
                                    <h2>Welcome {this.props.currentUser ? this.props.currentUser.name : null} ! </h2>
                                    <h3>My Profile:</h3> 
                                    <img src="../profile.jpg" width="200px" height="200px" alt="broken"/>
                                   <UpdateUser currentUser={this.props.currentUser} /> 
                            </div>
                    
                            <div className="five wide column">
                                <h2>Your lifestages:</h2>
                            <div className="ui prof animated button">
                                 <NavLink to='/lifestages'> <button className="ui prof button">
                                    <div className="visible content">See More Lifestages</div>
                                    <div className="hidden content">
                                        <i className="right arrow icon"></i>
                                    </div>
                                </button></NavLink>
                            </div>
                                {this.renderLifestage()}
                            </div>
                    </div>
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