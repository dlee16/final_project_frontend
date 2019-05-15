import React from 'react';
import Comment from '../components/Comment'

const CommentContainer = (props) => {
    const renderComments = () => {
        return props.group.map(comment => {
            return <Comment key={comment.id} comment={comment.user_comment} />
        })
    }

    console.log(props)
    return (
        <div>
            {renderComments()}
        </div>
    )
}

export default CommentContainer