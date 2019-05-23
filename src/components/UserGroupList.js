import React from 'react';
import { connect } from 'react-redux';
import { getGroups } from '../actions';
import Group from './Group'

class UserGroupList extends React.Component{

    // componentDidMount() {
    //     fetch(`http://localhost:3000/memberships`)
    //         .then(res => res.json())
    //         .then(this.props.getGroups)
    // }

    renderGroups = () => {
        if (this.props.profileUserGroups.length !==0 ){
            // debugger
            if (this.props.lifestageId.length === 0){
                return this.props.profileUserGroups.map(group => {
                    return <Group key={group.id} group={group.group} currentUser={this.props.currentUser}/>
                })
            } else{
                const filtered = this.props.profileUserGroups.filter(group => group.group.lifestage_id === this.props.lifestageId)
                return filtered.map( group => {
                    return <Group key={group.id} group={group.group} currentUser={this.props.currentUser} value="joined" />
                })
            }
        }
    }

    render(){
        console.log("prof ls", this.props.profileUserGroups)
        console.log("lsid", this.props.lifestageId)
        return(
            <div className="ui stackable center aligned grid container">
            <h2>Usergroups</h2>
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
        lifestageId: state.lifestageId

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupList)