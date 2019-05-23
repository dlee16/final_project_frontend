import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getProfileUserGroups, findUserGroup, setNewLifestage, getLifestages, getNewProfileUserLifestages, getLifestageId, getMemberships } from '../actions';
import UpdateUser from './UpdateUser';
import UserGroupList from './UserGroupList'

class Profile extends React.Component {
  
   componentDidMount = () => {
       Promise.all([fetch('http://localhost:3000/user_lifestages'), fetch('http://localhost:3000/memberships')])
           .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
           .then(([res1, res2]) => {
                this.props.getNewProfileUserLifestages(res1)
                this.props.getMemberships(res2)
                const userMemberships = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)
                this.props.getProfileUserGroups(userMemberships)
           })  
    }
    
    handleAllGroupsClick = (e) => {
        const currUserLifestage = this.props.lifestage.filter(ls => ls.users.map(user => (user.id)).includes(this.props.currentUser.id))
        
        const lifestageId= parseInt(currUserLifestage.find(ls => ls.name === e.target.name).id)
       
        const lifestage= currUserLifestage.find(ls => ls.name === e.target.name)

        this.props.setNewLifestage(lifestage)

        this.props.history.push(`/lifestages/${lifestageId}/grouplist`)
        
    }

    handleDeleteClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/user_lifestages/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(response => {
                this.props.getNewProfileUserLifestages(response)
            })
        }
    }

    handleUserGroupClick = (e) => {
        if (this.props.profileUserGroups.length > 0){
            const userLifestages = this.props.profileUserGroups.filter(ls => ls.group.lifestage_name === e.target.name)
          
                if (userLifestages.length === 0){
                    alert("you're not a member of any groups yet!")
                } else{
                    this.props.getProfileUserGroups(userLifestages)
                    const lsId= parseInt(userLifestages[0].group.lifestage_id)
                    this.props.getLifestageId(lsId)
                    this.props.history.push(`/lifestages/${lsId}/usergrouplist`)
                    return <UserGroupList /> 
                }
            } else{
                alert("Loading.... please try again.")
            }
    }

    renderLifestage = () => {
        if (this.props.newProfileUserLifestages.length !== 0){
            const currUserLifestage= this.props.newProfileUserLifestages.filter(ls => ls.user_id === parseInt(this.props.currentUser.id))
            return currUserLifestage.map(ls => {
                return (
                    <div key={ls.id} className="ui card" id="borderimg1">
                        <div className="content">
                            <h2 className="header">{ls.lifestage_name}</h2>
                            <button onClick={this.handleAllGroupsClick} name={ls.lifestage_name} className="ui fluid submit button" >See All Groups</button>
                            <br/>
                            <button onClick={this.handleUserGroupClick} name={ls.lifestage_name} className="ui fluid submit button" >See Your Groups</button>
                            <br/>
                            <button onClick={() => this.handleDeleteClick(ls.id)} className="ui fluid submit button"> Leave Lifestage</button>
                        </div>
                    </div> 
                )
            })
        }
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
                            <NavLink to='/lifestages'>
                                <button className="ui prof button">
                                    <div className="visible content">See More Lifestages</div>
                                    <div className="hidden content">
                                        <i className="right arrow icon"></i>
                                    </div>
                                </button>
                            </NavLink>
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
        profileUserGroups: state.profileUserGroups,
        userGroups: state.userGroups,
        newlySetLifestage: state.newlySetLifestage,
        newProfileUserLifestages: state.newProfileUserLifestages,
        lifestageId: state.lifestageId,
        allMemberships: state.allMemberships,
        allUserLifestages: state.allUserLifestages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findUserGroup: (group) => {
            dispatch(findUserGroup(group))
        },
        setNewLifestage: (lifestage) => {
            dispatch(setNewLifestage(lifestage))
        },
        getProfileUserGroups: (groups) => {
            dispatch(getProfileUserGroups(groups))
        },
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        },
        getNewProfileUserLifestages: (lifestages) => {
            dispatch(getNewProfileUserLifestages(lifestages))
        },
        getLifestageId: (lifestageId) => {
            dispatch(getLifestageId(lifestageId))
        },
        getMemberships: (memberships) => {
            dispatch(getMemberships(memberships))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)