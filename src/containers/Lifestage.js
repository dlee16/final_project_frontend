import React from 'react';
import { getLifestages, getUserLifestages } from '../actions';
import { connect } from 'react-redux';

class Lifestage extends React.Component {

    state ={
        userLifestages: ""
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/lifestages')
        .then(res => res.json())
        .then(this.props.getLifestages)
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


   handleSubmit = (e) => { 
        e.preventDefault();
        this.addUserLifestage(this.state.userLifestages[0], this.props.currentUser.id )
       this.props.history.push(`/lifestages/${this.state.userLifestages[0]}/grouplist`)
    }
    
    handleChange = (e) => {
        if (e.target.checked){
           this.setState({
               userLifestages: [...this.state.userLifestages, parseInt(e.target.name)]
           })
        } else {
            this.setState({
                userLifestages: this.state.userLifestages.filter(uls => uls !== parseInt(e.target.name))
            })
        }
    }

    
    renderLifestage = () => {
        return this.props.lifestage.map(ls => {
            return (
                <div key={ls.id} className="ui card ">
                    <input type="checkbox" onChange={this.handleChange} name={ls.id} value={ls.name} />
                    {ls.name}
                </div>
            )
        })
    }

    render(){
        return (
            <div className="ui stackable center aligned grid container">
                <form onSubmit={this.handleSubmit}>
                    <h2>Lifestages:</h2>
                    {this.renderLifestage()}
                    
                    <button>Submit</button>
                </form>
               
    
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
        userLifestages: state.userLifestages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        },
        getUserLifestages: (userLifestages) => {
            dispatch(getUserLifestages(userLifestages))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lifestage)
