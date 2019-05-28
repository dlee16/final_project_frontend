import React from 'react';
import { getLifestages, getUserLifestages, getAllUserLifestages, setNewLifestage } from '../actions';
import { connect } from 'react-redux';
import withAuth from '../components/WithAuth';
import { Button } from 'semantic-ui-react' 

class Lifestage extends React.Component {

    state ={
        userLifestages: []
    }

    // componentDidMount = () => {
    //     fetch('http://localhost:3000/lifestages')
    //     .then(res => res.json())
    //     .then((response) => {
    //         this.props.getLifestages(response)
    //         if (this.props.currentUser){
    //             const filteredLs = this.props.lifestage.filter(ls => ls.users.map(u => u.id).includes(this.props.currentUser.id))
    //             this.props.getAllUserLifestages(filteredLs)
    //         }
    //     })
    // }

    addUserLifestage = (id, user) => {
        fetch('http://localhost:3000/user_lifestages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lifestage_id: id,
                user_id: user,
            }),
        })
            .then(res => res.json())
            .then(this.props.getUserLifestages)
    }


    handleClick =(e) => {
            const id = parseInt(e.target.id)
            this.addUserLifestage(id, this.props.currentUser.id)
            
            const currUserLifestage = this.props.lifestage.filter(ls => ls.users.map(user => (user.id)).includes(this.props.currentUser.id))
    
            if (e.target.value ==="joined"){
                const lifestage = currUserLifestage.find(ls => ls.id === id)
        
                this.props.setNewLifestage(lifestage)
              
                this.props.history.push(`/lifestages/${id}/grouplist`)
            } else {
                const lifestage = this.props.lifestage.find(ls => ls.id === id)

                this.props.setNewLifestage(lifestage)

                this.props.history.push(`/lifestages/${id}/grouplist`)
            }
    
    }


    // renderButtonText = () => {
    //     if (this.props.lifestage.length > 0 && this.props.currentUser){
    //         // debugger
            
    //         if (this.props.lifestage.filter(ls => ls.users.map(u => u.id).includes(this.props.currentUser.id))){
    //             return (
    //                 <div>
    //                     <button onClick={this.handleClick} className="ui fluid  submit button">Joined! See all groups</button>
    //                     <br />
    //                 </div>
    //             )
    //         } else {
    //             return <button onClick={this.handleClick} className="ui fluid submit button">Join</button>
    //         }
    //     }
    // }
    
    renderLifestage = () => {
        const userLifestage= this.props.lifestage.filter(ls => ls.users.map(u => u.id).includes(this.props.currentUser.id))
        if (this.props.lifestage.length > 0 && this.props.currentUser.id){
        return this.props.lifestage.map(ls => {
            // debugger
            if (userLifestage.map(ls => ls.id).includes(ls.id)){
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="steps-one">
                                <div className="step-wrap">
                                    <div className="steps-stops">
                                        <div className="verticle-line back-blue"></div>
                                    </div>
                                </div>
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="steps-pane">
                                                <h3>{ls.name}</h3>
                                            </div>
                                        </div>
                                        <div className="flip-card-back">
                                            <div className="steps-pane">
                                                <p>{ls.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={this.handleClick} id={ls.id} value="joined" className="ui fluid join button">
                                Joined: See all groups
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return( 
                        <div className="container-fluid">
                            <div className="row">
                                <div className="steps-one">
                                    <div className="step-wrap">
                                        <div className="steps-stops">
                                            <div className="verticle-line back-blue"></div>
                                        </div>
                                    </div>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <div className="steps-pane">
                                                    <h3>{ls.name}</h3>
                                                </div>
                                            </div>
                                            <div className="flip-card-back">
                                                <div className="steps-pane">
                                                    <p>{ls.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={this.handleClick} id={ls.id} value="join" className="ui fluid join button">
                                        Join
                                    </Button>
                                </div>
                            </div>
                        </div>










                        /* <Grid columns='equal'>
                            <Grid.Row stretched>
                                <img src="../ls1.png" className="ls1" width="225px" height="225px" alt="hello"/>
                                <Grid.Column>
                                    <Card.Group >
                                        <Card>
                                            <Card.Content>
                                                <Card.Header>{ls.name}</Card.Header>
                                                <Card.Description>
                                                    {ls.description}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Button onClick={this.handleClick} id={ls.id} value="join" className="ui fluid submit button">
                                                Join
                                                </Button>
                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> */

                //    </div>













                )
            }
        })
    }
}

    render(){
        console.log("ls", this.props.lifestage)
        console.log("uls", this.props.userLifestages)
        return (
            // <React.Fragment>
            // <div className="ui stackable center aligned grid container">
            //     <div>
            //         <h2>Lifestages:</h2>
            //     </div>
            //     <Grid>
            //         <Grid.Row>            
            //             {this.renderLifestage()}
            //         </Grid.Row>
            //     </Grid>








<section id="process">
  <div className="row">
    <div className="section-heading">
      <h2 className="text-center">Join a lifestage:</h2>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row">
      <div className="steps-timeline text-center">
            {this.renderLifestage()}
      </div>
    </div>
  </div>
</section>





                
            
                    // <button> Back to Profile</button>
                    
                /* <select name="" id="">
                    <option selected ="selected" defaultValue value='' disabled>Select your lifestage...</option>
                    <option value="college_grad">Recent College Graduate</option>
                    <option value="career">Career Change</option>
                    <option value="marriage">Marriage</option>
                    <option value="divorce">Divorce</option>
                    <option value="child">Having a child</option>
                    <option value="retirement">Retirement</option>
                    <option value="death">Death of a loved one</option>
                </select>
                */

           
        //  <React.Fragment>
        )
    }  
}

const mapStateToProps = (state) => {
    return {
        lifestage: state.lifestage,
        userLifestages: state.userLifestages,
        allUserLifestages: state.allUserLifestages,
        newProfileUserLifestages: state.newProfileUserLifestages,
        newlySetLifestage: state.newlySetLifestage,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        },
        getUserLifestages: (userLifestages) => {
            dispatch(getUserLifestages(userLifestages))
        },
        getAllUserLifestages: (userLifestages) => {
            dispatch(getAllUserLifestages(userLifestages))
        },
        setNewLifestage: (lifestage) => {
            dispatch(setNewLifestage(lifestage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Lifestage))
