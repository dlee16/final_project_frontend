import React from 'react';
import Comment from '../components/Comment';
import { connect } from 'react-redux';
import withAuth from '../components/WithAuth';

const CommentContainer = (props) => {
    const renderComments = () => {
        return props.group.map(comment => {
            return <Comment key={comment.id} commentId={comment.id} userId={comment.user_id} username={comment.user_name} userComment={comment.user_comment} handleCommentInput={props.handleCommentInput} />
        })
    }

    return (
        <div>
            <h2>{props.group[0].group_name}</h2>
            {renderComments()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(withAuth(CommentContainer))