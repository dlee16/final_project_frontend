import React from 'react';
import { connect } from 'react-redux'; 
import { getProfileUserGroups, findUserGroup, setNewLifestage, getLifestages, getNewProfileUserLifestages, getLifestageId, getMemberships } from '../actions';
import UpdateUser from './UpdateUser';
import withAuth from './WithAuth';
import { Card, Container, Grid, Image, Button, Icon, Divider, Modal} from 'semantic-ui-react';
import v4 from "uuid";
import Header from './Header';
import Nav from './Nav';

class Profile extends React.Component {

    state = { 
        open: false 
    }

   show = dimmer => () => this.setState({ 
        dimmer, open: true 
    })

   close = () => this.setState({ 
        open: false 
    })

   componentDidMount = () => {
       Promise.all([fetch('http://localhost:3000/user_lifestages'), fetch('http://localhost:3000/memberships'), fetch('http://localhost:3000/lifestages')])
           .then(([res1, res2, res3]) => {
                return Promise.all([res1.json(), res2.json(), res3.json()])
            })
           .then(([res1, res2, res3]) => {
          
                   this.props.getNewProfileUserLifestages(res1)
                   this.props.getMemberships(res2)
                   this.props.getLifestages(res3)
                   const lifestageId = this.props.match.params.lifestage_id
                   if (this.props.currentUser){
                    const userMemberships = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)

                    const usergroups = userMemberships.filter(g => g.ls_id === parseInt(lifestageId))

                    this.props.getProfileUserGroups(usergroups)
                   }
            })
    }
    

    handleAllGroupsClick = (e) => {
        if (this.props.lifestage.length !==0) {
            const currUserLifestage = this.props.lifestage.filter(ls => ls.users.map(user => (user.id)).includes(this.props.currentUser.id))
            
            const lifestageId= parseInt(currUserLifestage.find(ls => ls.name === e.target.name).id)
           
            const lifestage= currUserLifestage.find(ls => ls.name === e.target.name)
    
            this.props.setNewLifestage(lifestage)
    
            this.props.history.push(`/lifestages/${lifestageId}/grouplist`)
        }
    }

    handleDeleteClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/user_lifestages/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log("helloooo", response)
                this.props.getNewProfileUserLifestages(response)
            })
        }
    }

    handleUserGroupClick = (e) => {
        const lifestageId = parseInt(e.target.id)
        if (this.props.allMemberships.length > 0) {

            const userLifestages = this.props.allMemberships.filter(ls => ls.ls_id === lifestageId)
            const usergroups = userLifestages.filter(group => group.user_id === this.props.currentUser.id )
        
                if (usergroups.length === 0){
                    this.props.history.push(`/lifestages/${lifestageId}/usergrouplist`)
                    // alert("you're not a member of any groups yet!")
                } else{
                    this.props.getProfileUserGroups(usergroups)
                    this.props.history.push(`/lifestages/${lifestageId}/usergrouplist`)
                } 
        }
            // else {
            //     const userMemberships = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)
            //      this.props.getProfileUserGroups(userMemberships)
            //     const userLifestages = this.props.profileUserGroups.filter(ls => ls.group.lifestage_name === e.target.name)
            //     if (userLifestages.length === 0) {
            //         alert("you're not a member of any groups yet!")
            //     } else {
            //         this.props.getProfileUserGroups(userLifestages)
            //         const lsId = parseInt(userLifestages[0].group.lifestage_id)
            //         // this.props.getLifestageId(lsId)
            //         this.props.history.push(`/lifestages/${lsId}/usergrouplist`)
            //     }
            // }
        }

    renderLifestage = () => {
        if (this.props.newProfileUserLifestages.length !== 0){
            const currUserLifestage= this.props.newProfileUserLifestages.filter(ls => ls.user_id === parseInt(this.props.currentUser.id))
            return currUserLifestage.map(ls => {
                return (
                        <Card key={v4()} id="borderimg1">
                            <Card.Content>
                                <h2 className="header">{ls.lifestage_name}</h2>
                                <Button onClick={this.handleAllGroupsClick} name={ls.lifestage_name} className="ui fluid submit button">
                                See All Groups
                                </Button>
                                <br/>
                                <Button onClick={this.handleUserGroupClick} id={ls.lifestage_id} className="ui fluid submit button">
                                See Your Groups
                                </Button>
                                <br/>
                                <Button onClick={() => this.handleDeleteClick(ls.id)} className="ui fluid submit button">
                                Leave Lifestage
                                </Button>
                            </Card.Content>

                        </Card>
                )
            })
        }
    }


    handleLifestageClick = () => {
        this.props.history.push('/lifestages/')
    }

    renderuserCommentLength = () => {
        return this.props.comments.filter(c => c.user_id === this.props.currentUser.id).length
    }

    render(){
        console.log("props from profile",this.props)
        console.log("props ", this.props.comments.filter(c => c.user_id === this.props.currentUser.id))
        const userLifestages= this.props.newProfileUserLifestages.filter(ls => ls.user_id === parseInt(this.props.currentUser.id))

        const userGroups = this.props.allMemberships.filter(m => m.user_id === this.props.currentUser.id)

        const { open, dimmer } = this.state
        if (this.props.currentUser){
            return (
            <div >
                    <Header />
                    <Nav /> 
                    <Container> 
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <div id="profile">
                                        <Image src="../profile.jpg" width="200px" height="200px"  alt="broken" circular/>
                                    </div>
                                    <div id="div10">

                                    <Button onClick={this.show('inverted')}>Edit Profile</Button>
                                    </div>
                                
                                        <Modal dimmer={dimmer} open={open} onClose={this.close}>
                                            <Modal.Header>Edit your profile</Modal.Header>
                                            <Modal.Content image>
                                                <Image wrapped size='medium' width="200px" height="200px" src='../profile.jpg' />
                                                <Modal.Description>
                                                    <UpdateUser />
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color='black' onClick={this.close}>
                                                    Close
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                        <h1>Welcome {this.props.currentUser ? this.props.currentUser.name : null} !</h1>
                                        <Divider />
                                        <h4>FACT: {this.props.currentUser.fun_fact}</h4>
                                        <Divider />
                                    <Grid columns={3} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <h4># of Lifestages Joined:</h4>
                                                <h5>{userLifestages.length}</h5>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <h4># of Groups Joined:</h4> 
                                                <h5>{userGroups.length}</h5>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <h4># of Comments Made:</h4> 
                                                <h5>{this.renderuserCommentLength()}</h5>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal><h2>Your lifestages:</h2></Divider>
                            <Grid.Row>
                            <div id="renderLsButton">
                                <div id="lifestageBtn">
                                    {/* <NavLink to='/lifestages'> */}
                                    <Button onClick={this.handleLifestageClick} id="lsButton" animated className="ui prof button">
                                        <Button.Content visible>See More Lifestages</Button.Content>
                                    <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                    {/* </NavLink> */}
                                </div>
                            </div>
                                    {this.renderLifestage()}
                            </Grid.Row>
                        </Grid>
                    </Container>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        lifestage: state.lifestage,
        profileUserGroups: state.profileUserGroups,
        userGroups: state.userGroups,
        newlySetLifestage: state.newlySetLifestage,
        newProfileUserLifestages: state.newProfileUserLifestages,
        lifestageId: state.lifestageId,
        allMemberships: state.allMemberships,
        allUserLifestages: state.allUserLifestages,
        currentUser: state.currentUser,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findUserGroup: (group) => {
            dispatch(findUserGroup(group))
        },
        setNewLifestage: (lifestage) => {
            dispatch(setNewLifestage(lifestage))
        },
        getProfileUserGroups: (groups) => {
            dispatch(getProfileUserGroups(groups))
        },
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        },
        getNewProfileUserLifestages: (lifestages) => {
            dispatch(getNewProfileUserLifestages(lifestages))
        },
        getLifestageId: (lifestageId) => {
            dispatch(getLifestageId(lifestageId))
        },
        getMemberships: (memberships) => {
            dispatch(getMemberships(memberships))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Profile))