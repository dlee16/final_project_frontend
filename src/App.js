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
import { getLifestages, getUserLifestages, setComments, getGroups, setCurrentUser } from './actions';
import { connect } from 'react-redux'; 
import Home from './components/Home';

class App extends React.Component {
  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser(null)
    this.props.history.push("/")
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (token){
      Promise.all([fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      }), fetch('http://localhost:3000/comments'), fetch('http://localhost:3000/memberships'), fetch('http://localhost:3000/lifestages'), fetch('http://localhost:3000/groups')])
        .then(([res1, res2, res3, res4, res5]) => {
          return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()])
        })
        .then(([res1, res2, res3, res4, res5]) => {
          if (res1.errors){
            alert(res1.errors)
          } else {
            this.props.setCurrentUser(res1)
            }
          this.props.setComments(res2)
          this.props.getUserLifestages(res3)
          this.props.getLifestages(res4)
          this.props.getGroups(res5)
          }
        )
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
    console.log("bye")
    this.props.setCurrentUser(response.user)
    localStorage.setItem("token", response.token)
    // debugger
    this.props.history.push(`/${this.props.currentUser.id}/profile`)
    // this.props.history.push(`/${this.state.currentUser.id}/profile`)
    // this.setState({
    //   currentUser: response.user
    // }, () => {
    //   localStorage.setItem("token", response.token)
    //     this.props.history.push(`/${this.state.currentUser.id}/profile`)
    // })
  }

  setUserForNewUser = (response) => {
      this.props.setCurrentUser(response.user)
      localStorage.setItem("token", response.token)
      this.props.history.push(`/lifestages`)
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Nav logOut={this.logOut}/> 
        {/* <Nav currentUser ={this.state.currentUser} logOut={this.logOut}/>  */}
        <Switch>
          <Route path={this.props.currentUser ? `/${this.props.currentUser.id}/profile` : '/login'} component= {Profile}/>  

          <Route path= '/lifestages/:lifestage_id/grouplist' component= {GroupList}/>  

          <Route path= '/lifestages/:lifestage_id/usergrouplist' component= {UserGroupList}/>  

          <Route path= '/lifestages' component= {Lifestage } /> 

          <Route path= '/group/:id' component= {GroupContent } /> 

          <Route path= '/group/:id' component= {Group } /> 

          <Route path="/userlogin" render={(routeProps) => < Login {...routeProps} setCurrentUser={this.setCurrentUser} />} /> 

          {/* <Route path="/userlogin" component ={Login} />  */}

          <Route path="/signup" render={(routeProps) => (< SignupForm {...routeProps} createUser={this.createUser} />)} /> 

          <Route path="/" component = {Home} /> 

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