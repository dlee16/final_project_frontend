import React from 'react'

const Comment = (props) => {
    return(
        <div className="ui card" id="borderimg3">
            <li> {props.comment} -  commented by: {props.user} </li>
        </div>
    )
}

export default Comment