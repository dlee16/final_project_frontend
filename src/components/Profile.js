import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getProfileUserLifestages, findUserGroup, setNewLifestage, getLifestages } from '../actions';
import UpdateUser from './UpdateUser'

class Profile extends React.Component {
  
   componentDidMount = () => {
       Promise.all([fetch('http://localhost:3000/lifestages'), fetch('http://localhost:3000/memberships')])
           .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
           .then(([res1, res2]) => {
                this.props.getLifestages(res1)
                this.props.getProfileUserLifestages(res2)
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
            fetch(`http://localhost:3000/user_lifestages/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.text())
            .then(text => console.log(text))
        }
    }

    handleUserGroupClick = (e) => {
        if (this.props.profileUserLifestages.length > 0){
            const filteredLifestage = this.props.profileUserLifestages.filter(ls => ls.user_id === this.props.currentUser.id)
                const findingLifestageThroughGroup = filteredLifestage.map(group => group.group)
                const userLifestages = findingLifestageThroughGroup.filter(ls => ls.lifestage_id === parseInt(e.target.name))
             
                if (userLifestages.length === 0){
                    alert("you're not a member of any groups yet!")
                } else{
                    this.props.findUserGroup(userLifestages)
                    const lifestageId= parseInt(userLifestages[0].lifestage_id)
                    this.props.history.push(`/lifestages/${lifestageId}/usergrouplist`)
                }
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
                        <button onClick={() => this.handleDeleteClick(ls.id)} className="ui fluid submit button"> Leave Lifestage</button>
                    </div>
                </div> 
            )
        })
    }


    render(){
        console.log("prof uls", this.props.profileUserLifestages)
        console.log("ls", this.props.lifestage)
        console.log("new ls", this.props.newlySetLifestage)
        console.log("usergroup", this.props.userGroups)
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
        profileUserLifestages: state.profileUserLifestages,
        userGroups: state.userGroups,
        newlySetLifestage: state.newlySetLifestage
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
        getProfileUserLifestages: (lifestages) => {
            dispatch(getProfileUserLifestages(lifestages))
        },
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)