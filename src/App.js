import React from 'react';
import './App.css';
import Login from './components/Login';
import Lifestage from './containers/Lifestage';
import { Route, Switch, withRouter } from 'react-router-dom';
import GroupList from './components/GroupList';
import Group from './components/Group';
import About from './components/About';
import GroupContent from './components/GroupContent';
import UserGroupList from './components/UserGroupList';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import { getLifestages, getUserLifestages, setComments, getGroups, setCurrentUser } from './actions';
import { connect } from 'react-redux'; 
import Home from './components/Home';

class App extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (token){
      fetch("https://lqbackend.herokuapp.com/auto_login", {
        headers: {
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then((response) => {
          if (response.errors){
            alert(response.errors)
          } else {
            this.props.setCurrentUser(response)
            }
          }
        )
      }

    Promise.all([fetch('https://lqbackend.herokuapp.com/comments'), fetch('https://lqbackend.herokuapp.com/memberships'), fetch('https://lqbackend.herokuapp.com/lifestages'), fetch('https://lqbackend.herokuapp.com/groups')])
      .then(([res1, res2, res3, res4]) => {
      return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
    })
      .then(([res1, res2, res3, res4]) => {
        this.props.setComments(res1)
        this.props.getUserLifestages(res2)
        this.props.getLifestages(res3)
        this.props.getGroups(res4)
    })
  }

  createUser = (user) => {
    fetch("https://lqbackend.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.setUserForNewUser(response)
          this.props.history.push('/lifestages')
        }
      })
  }


  setCurrentUser = (response) => {
    this.props.setCurrentUser(response.user)
    localStorage.setItem("token", response.token)
    this.props.history.push(`/${this.props.currentUser.id}/profile`)
  }

  setUserForNewUser = (response) => {
      this.props.setCurrentUser(response.user)
      localStorage.setItem("token", response.token)
      this.props.history.push(`/lifestages`)
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path={this.props.currentUser ? `/${this.props.currentUser.id}/profile` : '/login'} component= {Profile}/>  

          <Route path= '/lifestages/:lifestage_id/grouplist' component= {GroupList}/>  

          <Route path= '/lifestages/:lifestage_id/usergrouplist' component= {UserGroupList}/>  

          <Route path= '/lifestages' component= {Lifestage } /> 

          <Route path= '/group/:id' component= {GroupContent } /> 

          <Route path= '/group/:id' component= {Group } /> 

          <Route path="/userlogin" render={(routeProps) => < Login {...routeProps} setCurrentUser={this.setCurrentUser} />} /> 

          <Route path="/userlogin" component ={Login} /> 

          <Route path="/signup" render={(routeProps) => (< SignupForm {...routeProps} createUser={this.createUser} />)} /> 

          <Route exact path="/About" component = {About} />

          <Route exact path="/" component = {Home} /> 

        </Switch>
 
      </div>

    ); 
  }
}

  const mapStateToProps = (state) => {
    return {
      lifestage: state.lifestage,
      userLifestages: state.userLifestages,
      comments: state.comments,
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
      setComments: (userLifestages) => {
        dispatch(setComments(userLifestages))
      },
      getGroups: (groups) => {
        dispatch(getGroups(groups))
      },
      setCurrentUser: (user) => {
        dispatch(setCurrentUser(user))
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));