import React from 'react';
import { connect } from 'react-redux';
import { getMemberships, getProfileUserGroups } from '../actions';
import Group from './Group';
import withAuth from './WithAuth';

class UserGroupList extends React.Component{

    // componentDidMount = ()=>  {
    //     fetch(`http://localhost:3000/memberships`)
    //     .then(res => res.json())
    //     .then((response) => {
    //         this.props.getMemberships(response)
    //         const userMemberships = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)

    //         this.props.getProfileUserGroups(userMemberships)
    //     })
    // }

    renderGroups = () => {
        console.log("props in ugl", this.props)
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
            // debugger
            // if (this.props.lifestageId.length === 0){
            //     return this.props.profileUserGroups.map(group => {
            //         return <Group key={group.id} group={group.group} />
            //     })
            // } else{
        
                const filtered = this.props.profileUserGroups.filter(group => group.group.lifestage_id === parseInt(lifestageId))
                return filtered.map( group => {
                    return <Group key={group.id} group={group.group} value="joined" />
                })
            // }
        }
    }

    render(){
        console.log("prof ls", this.props.profileUserGroups)
        console.log("lsid", this.props.lifestageId)
        return(
            <div className="ui stackable center aligned container">
                <h2>Usergroups</h2>
                <div className="ui hidden divider"></div>
                {this.renderGroups()}
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