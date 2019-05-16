import React from 'react';
import Group from './Group';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroups } from '../actions';

class GroupList extends React.Component {

    componentDidMount() {
        fetch(`http://localhost:3000/groups`)
        .then(res => res.json())
        .then(this.props.getGroups)
    }
     
    renderGroups = () => {
        const group = this.props.group.filter(group => this.props.userLifestages.includes(group.lifestage_id))
        return group.map( group => {
            return <Group key={group.id} group={group}/> 
        })
    }

    render(){
        return (
            <div>
                <NavLink to='/group/new'>Create new group</NavLink>
                {this.renderGroups()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedIn: !!state.currentUser.id,
        group: state.group,
        userLifestages: state.userLifestages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
