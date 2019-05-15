import React from 'react';
import { NavLink } from 'react-router-dom';
import { getLifestages } from '../actions';
import { connect } from 'react-redux';

class Lifestage extends React.Component {

    componentDidMount = () => {
        fetch('http://localhost:3000/lifestages')
        .then(res => res.json())
        .then(this.props.getLifestages)
    }

   handleSubmit = (e) => { 
        e.preventDefault();
        // need to post
        
    }

    renderLifestage = () => {
        return this.props.lifestage.map(ls => {
            return (
                <div>
                    <input type="checkbox" name={ls.name} value={ls.name} />
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
                    
                    <NavLink to='/grouplist'> <button>Submit</button> </NavLink> 
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
        lifestage: state.lifestage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLifestages: (lifestages) => {
            dispatch(getLifestages(lifestages))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lifestage)
