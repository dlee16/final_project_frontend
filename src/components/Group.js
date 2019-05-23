import React from 'react'; 
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { joinGroup, removeUserGroups } from '../actions';

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

    handleLeaveClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/memberships/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
                .then(res => res.json())
                .then((response) => this.props.removeUserGroups(response))
        }
    }

    render(){
        return (
                <div className="two column row">
                    <div className="ui card" id="borderimg2">
                        <div className="seven wide column">
                            <div className="content">
                                <h2>{this.props.group.name}</h2> <br/>
                                <img src="../topic.jpg" height="100px" width="100px" alt="broken"/>
                                <br/>
                                <p>{this.props.group.description}</p>
                                <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
                                <button onClick={() => this.handleLeaveClick(this.props.group.id)} name={this.props.group.id}>Leave Group</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // userLifestages: state.userLifestages,
        // joinedGroups: state.joinedGroups
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinGroup: (group) => {
            dispatch(joinGroup(group))
        },
        removeUserGroups: (group) => {
            dispatch(removeUserGroups(group))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Group))

