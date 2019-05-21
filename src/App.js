import React from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Login from './components/Login';
import Lifestage from './containers/Lifestage';
import { Route, Switch, withRouter } from 'react-router-dom';
import GroupList from './components/GroupList';
import Group from './components/Group';
import GroupContent from './components/GroupContent';
import UserGroupList from './components/UserGroupList';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import { getLifestages, getUserLifestages } from './actions';
import { connect } from 'react-redux'; 

class App extends React.Component {
  state = {
    currentUser: null
  }

  logOut = () => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: null
    }, () => {
      this.props.history.push("/login")
    })
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (token){
      Promise.all([fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      }), fetch('http://localhost:3000/lifestages'), fetch('http://localhost:3000/memberships')])
        .then(([res1, res2, res3]) => {
          return Promise.all([res1.json(), res2.json(), res3.json()])
        })
        .then(([res1, res2, res3]) => {
          if (res1.errors){
            alert(res1.errors)
          } else {
            this.setState({
              currentUser: res1
            })
          this.props.getLifestages(res2)
          this.props.getUserLifestages(res3)
          }
        })
      }
  }

  createUser = (user) => {
    fetch("http://localhost:3000/users", {
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
        }
      })
  }


  setCurrentUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.setItem("token", response.token)
        this.props.history.push(`/${this.state.currentUser.id}/profile`)
    })
  }

  setUserForNewUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.setItem("token", response.token)
        this.props.history.push(`/lifestages`)
    })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Nav currentUser ={this.state.currentUser} logOut={this.logOut}/> 
        <Switch>
          <Route path="/login" render={(routeProps)=> < Login {...routeProps} setCurrentUser={this.setCurrentUser} /> }/>  

          <Route path={this.state.currentUser ? `/${this.state.currentUser.id}/profile` : '/login'} render={(routeProps) => <Profile {...routeProps} currentUser={this.state.currentUser}/> }/>  

          <Route path={this.state.currentUser ? '/lifestages/:lifestage_id/grouplist' : '/login'} render={(routeProps) => <GroupList {...routeProps} currentUser={this.state.currentUser} />}/>  

          <Route path={this.state.currentUser ? '/lifestages/:lifestage_id/usergrouplist' : '/login'} render={(routeProps) => <UserGroupList {...routeProps} currentUser={this.state.currentUser} />}/>  

          <Route path={this.state.currentUser ? '/lifestages' : '/login'} render={(routeProps) => <Lifestage {...routeProps} currentUser={this.state.currentUser} />} /> 

          <Route path={this.state.currentUser ? '/group/:id' : '/login'} render={(routeProps) => <GroupContent {...routeProps} currentUser={this.state.currentUser} />} /> 

          <Route path={this.state.currentUser ? '/group/:id' : '/login'} render={(routeProps) => <Group {...routeProps} currentUser={this.state.currentUser} />} /> 

          <Route path="/signup" render={(routeProps) => (< SignupForm {...routeProps} createUser={this.createUser} />)} /> 

          <Route path="/" render={(routeProps) => < Login {...routeProps} setCurrentUser={this.setCurrentUser} />}/> 
        </Switch>
 
      </div>
    ); 
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

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));