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
                .then((response) => this.props.removeUserGroups({groups: response, deletedId: id}))
        }
    }

    renderButtonText = () => {
        if (this.props.currentUser && this.props.group.users.find(u => u.id === this.props.currentUser.id)) {
        const users = this.props.group.users.filter(user => user.id !== this.props.currentUser.id)
        console.log(users)
            return (
                <div>
                    <button onClick={this.handleClick} className="ui fluid  submit button">See all comments</button>
                    
                    <div className="ui horizontal divider">Or</div>
                    <button onClick={() => this.handleLeaveClick(this.props.group.id)} name={this.props.group.id} users={users} className="ui fluid submit button">Leave Group?</button>
                </div>
            )
       } else{
           return <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
        }
    }

    render(){ 
        console.log("prof user groups", this.props.profileUserGroups)
        console.log("props", this.props)
        console.log("props grp from parent", this.props.group)
        return (
            <div id="gcard1">
                <div className="ui card" id="borderimg2">
                    <div className="column">
                        <div className="content">
                        <div className="groupName">
                            <h2>{this.props.group.name}</h2>
                        </div>
                        <div className="groupImg">
                                <img src={require('./question.png')} height="100px" width="100px" alt="broken" />

                        </div>
                            
                            <div className="groupDesc">
                            <p>{this.props.group.description}</p>

                            </div>
                            <div id="groupButton">

                            {this.renderButtonText()}
                            </div>
                            {/* <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
                            <button onClick={() => this.handleLeaveClick(this.props.group.id)} name={this.props.group.id}>Leave Group</button> */}
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

