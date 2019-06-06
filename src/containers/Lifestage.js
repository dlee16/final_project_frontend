import React from 'react';
import { getLifestages, getUserLifestages, getAllUserLifestages, setNewLifestage, joinLifestage } from '../actions';
import { connect } from 'react-redux';
import withAuth from '../components/WithAuth';
import { Button } from 'semantic-ui-react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import v4 from 'uuid';

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
                
                this.props.joinLifestage({ id: parseInt(e.target.id), name: e.target.name, description: e.target.dataset.des })

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
        // const userLifestage= this.props.lifestage.filter(ls => ls.users.map(u => u.id).includes(this.props.currentUser.id))


        const usls = this.props.lifestage.filter(ls => this.props.currentUser.lifestages.find(userls => userls.id === ls.id))
        
        const new_usls = usls.map(ls => ls.id)

        if (this.props.lifestage.length > 0 && this.props.currentUser.id){
        // return this.props.lifestage.map(ls => {
            // debugger
            // if (userLifestage.map(ls => ls.id).includes(ls.id)){
            return (
                this.props.lifestage.map(ls =>{
                    if (new_usls.includes(ls.id)) {
                        return (         
                            // <div key={v4()} >
                            <div key={v4()} id="test3" >
                                    {/* <div className="step-wrap">
                                        <div className="steps-stops">
                                            <div className="verticle-line"></div>
                                        </div>
                                    </div> */}
                                    
                                <div id="lsContainer">

                                    <div id="lsCircle">
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <div className="circle-text">
                                                    <h3>{ls.name}</h3>
                                                </div>
                                            </div>
                                            <div className="flip-card-back">
                                                <div className="circle-text">
                                                    <p>{ls.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="buttonSpacing">
                                    <div className="lifestageButton">
                                            <Button onClick={this.handleClick} value="joined" id={ls.id} data-des={ls.description} name={ls.name} className="ui join button">
                                            Joined: See all groups
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                                // </div>
                            
                            
                        )} else {
                        return (
                            // <div key={v4()} >
                                <div key ={v4()} >
                                    {/* <div className="step-wrap">
                                        <div className="steps-stops">
                                            <div className="verticle-line"></div>
                                        </div>
                                    </div> */}
                                <div id="lsContainer">
                                <div id="lsCircle">

                                    
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <div className="circle-text">
                                                    <h3>{ls.name}</h3>
                                                </div>
                                            </div>
                                            <div className="flip-card-back">
                                                <div className="circle-text">
                                                    <p>{ls.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        <div id="buttonSpacing">
                                    <div className="lifestageButton">
                                            <Button onClick={this.handleClick} value="join" id={ls.id} data-des={ls.description} name={ls.name} className="ui join button">
                                            Join
                                            </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            // </div>
                        )
                    }
                    }))}
}

    render(){
        return (
            <div>
                <Header />
                <Nav /> 

            <div id="lifestageContainer">
                <div id="test7">
                    <h2 className="text-center">Join a lifestage:</h2>

                </div>
                

                { this.renderLifestage() }
               
            </div>
            </div>
            // <section id="process">
            //     <div className="row">
            //         <div className="section-heading">
            //         <h2 className="text-center">Join a lifestage:</h2>
            //         </div>
            //     </div>
            //     <div className="container-fluid">
            //         <div className="row">
            //         <div className="steps-timeline text-center">
            //                 {this.renderLifestage()}
            //         </div>
            //         </div>
            //     </div>
            // </section>





                
            
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
        },
        joinLifestage: (lifestage) => {
            dispatch(joinLifestage(lifestage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Lifestage))
