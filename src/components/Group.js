import React from 'react'; 
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { joinGroup, removeUserGroups } from '../actions';
import withAuth from './WithAuth';

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

    renderButtonText = () => {
        if (this.props.currentUser && this.props.group.users.find(u => u.id === this.props.currentUser.id)) {
            return (
                <div>
                    <button onClick={this.handleClick} className="ui fluid  submit button">See all comments</button>
                    
                    <div className="ui horizontal divider">Or</div>
                    <button onClick={() => this.handleLeaveClick(this.props.group.id)} name={this.props.group.id} className="ui fluid submit button">Leave Group?</button>
                </div>
            )
       } else{
           return <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
        }
    }

    render(){ 
        return (
                <div className="two column row">
                    <div className="ui card" id="borderimg2">
                        <div className="seven wide column">
                            <div className="content">
                                <h2>{this.props.group.name}</h2> <br/>
                                    <img src={require('./question.png')} height="150px" width="150px" alt="broken" />
                                <br/>
                                <p>{this.props.group.description}</p>
                                {/* <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
                                <button onClick={() => this.handleLeaveClick(this.props.group.id)} name={this.props.group.id}>Leave Group</button> */}
                                {this.renderButtonText()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLifestages: state.userLifestages,
        joinedGroups: state.joinedGroups,
        profileUserGroups: state.profileUserGroups,
        currentUser: state.currentUser,
        hi: state.group
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuth(Group)))

