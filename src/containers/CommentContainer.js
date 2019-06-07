import React from 'react';
import Comment from '../components/Comment';
import { connect } from 'react-redux';
import withAuth from '../components/WithAuth';
import v4 from 'uuid';

const CommentContainer = (props) => {
    const renderComments = () => {
        return props.group.map(comment => {
            return (
                <div key={v4()} className="commentSpacing" >
                    <Comment key={v4()}  commentId={comment.id} userId={comment.user_id} username={comment.user_name} userComment={comment.user_comment} handleCommentInput={props.handleCommentInput} /> 
                    <div className="ui hidden divider"></div>
                </div>
            )
        })
    }

    return (
        <div>
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