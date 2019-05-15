import React from 'react';

const NewGroupForm = () => {
    return (
        <div>
           <form action="">
           <label>Group Name: </label>
           <input type="text"/> <br/>
           <label>Group Description: </label>
           <input type="text"/> <br/>
           <input type="submit" value="Submit"/>
           </form>
        </div>
    )
}

export default NewGroupForm