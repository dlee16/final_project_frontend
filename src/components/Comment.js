import React from 'react'

const Comment = (props) => {
    return(
        <div>
            <li> {props.comment} -  commented by: {props.user} </li>
        </div>
    )
}

export default Comment