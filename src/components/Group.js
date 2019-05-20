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
                <div className="two column row">
                    <div className="ui card" id="borderimg2">
                        <div className="seven wide column">
                            <div className="content">
                                <h2>{this.props.group.name}</h2> <br/>
                                <img src="../topic.jpg" height="100px" width="100px" alt="broken"/>
                                <br/>
                                <p>{this.props.group.description}</p>
                                <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
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

