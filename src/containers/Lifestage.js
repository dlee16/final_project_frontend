import React from 'react';
import { getLifestages, getUserLifestages, getAllUserLifestages, setNewLifestage } from '../actions';
import { connect } from 'react-redux';

class Lifestage extends React.Component {

    state ={
        userLifestages: []
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/lifestages')
        .then(res => res.json())
        .then((response) => {
            this.props.getLifestages(response)

            const filteredLs = this.props.lifestage.filter(ls => ls.users.map(u => u.id).includes(this.props.currentUser.id))
           
            this.props.getAllUserLifestages(filteredLs)
        })
    }


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


//    handleSubmit = (e) => { 
//         e.preventDefault();
//         this.addUserLifestage(this.state.userLifestages[0], this.props.currentUser.id )
//        this.props.history.push(`/lifestages/${this.state.userLifestages[0]}/grouplist`)
//     }
    
    // handleChange = (e) => {
    //     if (e.target.id){
    //            this.setState({
    //            userLifestages: [...this.state.userLifestages, parseInt(e.target.id)]
    //        })
    //     }else {
    //         this.setState({
    //             userLifestages: this.state.userLifestages.filter(uls => uls !== parseInt(e.target.id))
    //         })
    //     }
    // }

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
    
    renderLifestage = () => {
        return this.props.lifestage.map(ls => {
            if (this.props.allUserLifestages.map(ls => ls.id).includes(ls.id)){
                return (
                    <div key={ls.id}>
                        <h3>{ls.name}</h3>
                        <button onClick={this.handleClick} id={ls.id} value="joined">Joined: See all groups</button>
                    </div>
                )
            } else {
               return( 
                    <div key={ls.id}>
                        <h3>{ls.name}</h3>
                        <button onClick={this.handleClick} id ={ls.id} value="join">Join</button>
                    </div> 
                )
            }
        })
    }

    render(){
        console.log(this.props.lifestage)
        return (
            <div className="ui stackable center aligned grid container">
                    <h2>Lifestages:</h2>
                    {this.renderLifestage()}
                {/* <form onSubmit={this.handleSubmit}>
                    
                    <button>Join!</button>
                </form> */}
               <button> Back to Profile</button>
    
                {/* <select name="" id="">
                    <option selected ="selected" defaultValue value='' disabled>Select your lifestage...</option>
                    <option value="college_grad">Recent College Graduate</option>
                    <option value="career">Career Change</option>
                    <option value="marriage">Marriage</option>
                    <option value="divorce">Divorce</option>
                    <option value="child">Having a child</option>
                    <option value="retirement">Retirement</option>
                    <option value="death">Death of a loved one</option>
                </select>
                */}
            </div>
        )
    }  
}

const mapStateToProps = (state) => {
    return {
        lifestage: state.lifestage,
        userLifestages: state.userLifestages,
        allUserLifestages: state.allUserLifestages,
        newProfileUserLifestages: state.newProfileUserLifestages,
        newlySetLifestage: state.newlySetLifestage
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

export default connect(mapStateToProps, mapDispatchToProps)(Lifestage)
