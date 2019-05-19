import React from 'react'; 
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { joinGroup } from '../actions';

class Group extends React.Component {

    addUserToGroup =(user_id, group_id) => {
        fetch("http://localhost:3000/memberships", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                group_id: group_id
            }),
        })
            .then(res => res.json())
            .then(this.props.joinGroup)
    }

    handleClick = () => {
        this.addUserToGroup(this.props.currentUser.id, this.props.group.id)
        this.props.history.push(`/group/${this.props.group.id}`)
    }

    render(){
        return (
            <div>
               <label>Topic name:</label>
               { this.props.group.name} <br/>
                Topic image <br/>
                <label>Topic Description:</label>
                {this.props.group.description}
                <button onClick={this.handleClick}>Join</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLifestages: state.userLifestages,
        joinGroup: state.joinGroup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinGroup: (group) => {
            dispatch(joinGroup(group))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Group))

