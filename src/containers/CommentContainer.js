import React from 'react';
import Comment from '../components/Comment'

const CommentContainer = (props) => {
    const renderComments = () => {
        return props.group.map(comment => {
            return <Comment key={comment.id} commentId={comment.id} userId={comment.user_id} username={comment.user_name} comment={comment.user_comment} currUser={props.currUser} handleCommentInput={props.handleCommentInput} />
        })
    }

    return (
        <div>
            <h2>{props.group[0].group_name}</h2>
            {renderComments()}
        </div>
    )
}

export default CommentContainer