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
        return this.props.group.map( group => {
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
        group: state.group
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            // console.log("calling dispatch")
            dispatch(getGroups(groups))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
