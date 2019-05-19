import React from 'react';
import { connect } from 'react-redux';
import { getGroups } from '../actions';
import Group from './Group'

class UserGroupList extends React.Component{

    componentDidMount() {
        fetch(`http://localhost:3000/memberships`)
            .then(res => res.json())
            .then(this.props.getGroups)
    }

    renderGroups = () => {
        if (this.props.group.length !==0 ){
            const userId = parseInt(this.props.currentUser.id)
            const lifestageId = parseInt(this.props.userGroups[0].lifestage_id)
            const group = this.props.group.filter(group => group.user_id === userId && lifestageId === parseInt(group.lifestage_id))
          
            return group.map(group => {
                return <Group key={group.id} group={group.group} currentUser={this.props.currentUser} />
            })

        }
    }

    render(){
        return(
            <div>
                {this.renderGroups()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        group: state.group,
        userGroups: state.userGroups
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