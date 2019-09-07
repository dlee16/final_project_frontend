import React from 'react';
import { connect } from 'react-redux';
import { getMemberships, getProfileUserGroups } from '../actions';
import Group from './Group';
import withAuth from './WithAuth';
import Header from './Header';
import Nav from './Nav';

class UserGroupList extends React.Component{

    renderGroups = () => {
        const lifestageId = this.props.match.params.lifestage_id
        if (this.props.profileUserGroups.length === 0 && this.props.currentUser){
            fetch(`http://localhost:3000/memberships`)
                .then(res => res.json())
                .then((response) => {
                    this.props.getMemberships(response)
                    const userMemberships = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)

                    const usergroups = userMemberships.filter(g => g.ls_id === parseInt(lifestageId))

                    this.props.getProfileUserGroups(usergroups)
        })
        }
        else if (this.props.profileUserGroups.length !==0 ){
                const filtered = this.props.profileUserGroups.filter(group => group.group.lifestage_id === parseInt(lifestageId))
                return filtered.map( group => {
                    return <Group key={group.id} group={group.group} value="joined" />
                })
        }
    }

    render(){
        return(
            <div >
                <Header />
                <Nav /> 
                <h2>Usergroups</h2>
                <div className="ui hidden divider"></div>
                <div>
                    <div id="usergroup">
                        {this.renderGroups()}
                    </div>
                </div>
                </div>
          
        )
    }
}

const mapStateToProps = (state) => {
    return {
        group: state.group,
        userGroups: state.userGroups,
        profileUserGroups: state.profileUserGroups,
        lifestageId: state.lifestageId,
        currentUser: state.currentUser,
        userLifestages: state.userLifestages,
        allMemberships: state.allMemberships,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMemberships: (memberships) => {
            dispatch(getMemberships(memberships))
        },
        getProfileUserGroups: (groups) => {
            dispatch(getProfileUserGroups(groups))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(UserGroupList))