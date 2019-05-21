import React from 'react'

const Comment = (props) => {
    return(
        <div className="ui stackable center aligned grid container">
            <div className="ui card" id="borderimg3">
                {props.comment}
                <br/> - {props.user}
            </div>
        </div>
    )
}

export default Comment