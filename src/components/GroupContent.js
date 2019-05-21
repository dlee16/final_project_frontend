import React from 'react'; 
import { getGroups, setComments, addComment} from '../actions';
import { connect } from 'react-redux';
import CommentContainer from '../containers/CommentContainer'
import CommentForm from './CommentForm'

class GroupContent extends React.Component{

    componentDidMount() {
        fetch(`http://localhost:3000/comments`)
        .then(res => res.json())
        .then(this.props.setComments)
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    addComment = (user_id, group_id, input) => {
        fetch('http://localhost:3000/comments', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id,
                group_id,
                user_comment: input
            }),
        })
        .then(res => res.json())
        .then(this.props.addComment)
    }

    handleSubmit = (input) => {
        this.addComment(this.props.currentUser.id, parseInt(this.props.match.params.id), input)
    }

    handleBackButton = () => {
        this.props.history.push(`/${this.props.currentUser.id}/profile`)
    }

    renderComments = () => {
        if (this.props.comments.length !== 0) {
            const group = this.props.comments.filter(comment => {
                return comment.group_id === parseInt(this.props.match.params.id)
            }) 
            if (group.length > 0){
                return <CommentContainer key={group.id} group={group} />
            } else{
                return "Be the first to comment!"
            }
        }
    }
        
    render(){      
        return (
            <div className="ui center aligned container">
                <button>See all members of group</button>
                    {this.renderComments()}
                    <CommentForm handleSubmit={this.handleSubmit} /> 
                    <button onClick={this.handleBackButton} className="ui prof button">Back to Profile</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedIn: !!state.currentUser.id,
        group: state.group,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        },
        setComments: (comments) => {
            dispatch(setComments(comments))
        },
        addComment: (comments) => {
            dispatch(addComment(comments))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContent)