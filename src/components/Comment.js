import React from 'react';
import { connect } from 'react-redux';
import { removeComment, updateCommentId  } from '../actions';

class Comment extends React.Component {

     handleDeleteClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
                .then(res => res.json())
                .then(response => this.props.removeComment(response))
        }
    }

     handleEditClick = (e) => {
         this.props.handleCommentInput(e.target.name)
         this.props.updateCommentId(this.props.commentId)
    }


    renderDeleteButton = () => {
        if (this.props.currUser.id === parseInt(this.props.userId)){
            return <button onClick={() => this.handleDeleteClick(this.props.commentId)}>Delete</button>
        } else{
            return null
        }
    }

    renderEditButton = () => {
        if (this.props.currUser.id === parseInt(this.props.userId)) {
            return <button name={this.props.comment} onClick={this.handleEditClick}>Edit</button>
        } else {
            return null
        }
    }

    render(){
        return(
            <div className="ui stackable center aligned grid container">
                <div className="ui card" id="borderimg3">
                    {this.props.comment}
                    <br/> - {this.props.username}
                    {this.renderEditButton()}
                    {this.renderDeleteButton()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeComment: (comment) => {
            dispatch(removeComment(comment))
        },
        updateCommentId: (comment) => {
            dispatch(updateCommentId(comment))
        }
    }
}

export default connect(null, mapDispatchToProps)(Comment)