import React from 'react';
import Group from './Group';
import { connect } from 'react-redux';
import { getGroups, addGroup } from '../actions';

class GroupList extends React.Component {

    state ={ 
        groupName: "",
        groupDescription: "",
        userLifestage: ""
    }

    componentDidMount() {
        fetch(`http://localhost:3000/groups`)
        .then(res => res.json())
        .then(this.props.getGroups)
    }
     
    renderGroups = () => {
        const group = this.props.group.filter(group => this.props.userLifestages.includes(group.lifestage_id))
        return group.map( group => {
            return <Group key={group.id} group={group}/> 
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDropDownChange = (e) => {
        this.setState({
            userLifestage: parseInt(e.target.value)
        })
    }

    renderSelectGroupOptions = () => {
        if (this.props.group.length !==0){
            const ulsg = this.props.group.filter(group => this.props.userLifestages.includes(group.lifestage_id))
           return ulsg.map( group => {
               return <option key={group.id} value={group.lifestage_id}>{group.lifestage_name}</option>
           })
       }
    }

    addGroupList = (id, name, description) => {
        fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lifestage_id: id,
                name: name,
                description: description
            }),
        })
        .then(res => res.json())
        .then(this.props.addGroup)
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.addGroupList(this.state.userLifestage, this.state.groupName, this.state.groupDescription)
    }

    render(){
        return (
            <div>
                <label >Don't see what you're looking for? Start a new group!</label>
                <form onSubmit={this.handleSubmit} action="">
                    <input type="text" placeholder="Group name" onChange={this.handleChange} name="groupName" value={this.state.groupName}/>
                    <input type="text" placeholder="Group description" onChange={this.handleChange} name="groupDescription" value={this.state.groupDesc}/>

                    <select onChange={this.handleDropDownChange} name="userLifestage">
                        <option selected="selected" value='selected' disabled>Select the lifestage...</option>
                        {this.renderSelectGroupOptions()}
                    </select>

                    <input type="submit" value="submit"/>
                </form>
                {this.renderGroups()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedIn: !!state.currentUser.id,
        group: state.group,
        userLifestages: state.userLifestages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        },
        addGroup: (group) => {
            dispatch(addGroup(group))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
