import React from 'react'; 
import { NavLink } from 'react-router-dom';


const Group = (props) => {
    return (
        <div>
           <label>Topic name:</label>
           { props.group.name} <br/>
            Topic image <br/>
            <label>Topic Description:</label>
            {props.group.description}
           
            <NavLink to={`/group/${props.group.id}`}> Join! </NavLink>
            
        </div>
    )
}

export default Group

