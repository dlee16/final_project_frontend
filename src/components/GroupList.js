import React from 'react';
import Group from './Group';
import { connect } from 'react-redux';
import { getGroups, addGroup } from '../actions';
import withAuth from './WithAuth';
import Header from './Header';
import Nav from './Nav';

class GroupList extends React.Component {

    state ={ 
        groupName: "",
        groupDescription: "",
        userLifestage: ""
    }

    componentDidMount() {
        fetch(`https://lqbackend.herokuapp.com/groups`)
        .then(res => res.json())
        .then(this.props.getGroups)
    }
     
    renderGroups = () => {
        const lifestageId = this.props.match.params.lifestage_id
        // if (this.props.group.length !== 0){
            // const grp = this.props.group.filter(group => this.props.newlySetLifestage.id === parseInt(group.lifestage_id))
            // if (this.props.group.length !==0){
                const grp = this.props.group.filter(group => group.lifestage_id === parseInt(lifestageId))
    
        return grp.map( group => {
            return <Group key={group.id} group={group} users={group.users}/> 
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addGroupList = (id, name, description) => {
        fetch('https://lqbackend.herokuapp.com/groups', {
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
        const lifestageId = this.props.match.params.lifestage_id
        this.addGroupList(lifestageId, this.state.groupName, this.state.groupDescription)
        this.setState({
            groupName: "",
            groupDescription: ""
        })
    }

    render(){
        return (
            <div>
                <Header />
                <Nav />
                <label >Don't see what you're looking for? Start a new group!</label>
                
                <form onSubmit={this.handleSubmit} action="">
                    <input type="text" placeholder="Group name" onChange={this.handleChange} name="groupName" value={this.state.groupName}/>
                    <input type="text" placeholder="Group description" onChange={this.handleChange} name="groupDescription" value={this.state.groupDescription}/>

                    <input type="submit" className="ui prof button" value="submit"/>
                </form>
                <br/>
                <h2>{this.props.newlySetLifestage.name}</h2>
                <div className="ui stackable grid container">
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
        currentUser: state.currentUser
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

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(GroupList))
