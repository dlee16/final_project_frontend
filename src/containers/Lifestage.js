import React from 'react';
import { getLifestages, getUserLifestages } from '../actions';
import { connect } from 'react-redux';

class Lifestage extends React.Component {

    state ={
        userLifestages: []
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/lifestages')
        .then(res => res.json())
        .then(this.props.getLifestages)
    }

   handleSubmit = (e) => { 
        e.preventDefault();
        this.props.getUserLifestages(this.state.userLifestages)
        // need to post
        this.props.history.push('/grouplist')
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
                <div key={ls.id}>
                    <input type="checkbox" onChange={this.handleChange} name={ls.id} value={ls.name} />
                    {ls.name}
                </div>
            )
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="">
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
