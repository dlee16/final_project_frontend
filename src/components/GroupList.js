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

    // componentDidMount() {
    //     fetch(`http://localhost:3000/groups`)
    //     .then(res => res.json())
    //     .then(this.props.getGroups)
    // }
     
    renderGroups = () => {
        if (this.props.group.length !== 0){
            const grp = this.props.group.filter(group => this.props.newlySetLifestage.id === parseInt(group.lifestage_id))

            // debugger
    
            return grp.map( group => {
                return <Group key={group.id} group={group} currentUser={this.props.currentUser}/> 
            })
        }
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
        this.addGroupList(this.props.newlySetLifestage.id, this.state.groupName, this.state.groupDescription)
    }

    render(){
        return (
            <div>
                <label >Don't see what you're looking for? Start a new group!</label>
                
                <form onSubmit={this.handleSubmit} action="">
                    <input type="text" placeholder="Group name" onChange={this.handleChange} name="groupName" value={this.state.groupName}/>
                    <input type="text" placeholder="Group description" onChange={this.handleChange} name="groupDescription" value={this.state.groupDesc}/>

                    <input type="submit" className="ui prof button" value="submit"/>
                </form>
                <br/>
                <h2>{this.props.newlySetLifestage.name}</h2>
                <div className="ui stackable center aligned grid container">
                    {this.renderGroups()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        group: state.group,
        lifestage: state.lifestage,
        userGroups: state.userGroups,
        newlySetLifestage: state.newlySetLifestage,
        userLifestages: state.userLifestages,
        lifestageId: state.lifestageId,
        profileUserGroups: state.profileUserGroups
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
