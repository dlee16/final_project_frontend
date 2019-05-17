import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Lifestage from './containers/Lifestage';
import { Route, Switch } from 'react-router-dom';
import GroupList from './components/GroupList';
import GroupContent from './components/GroupContent';
import SignupForm from './components/SignupForm';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        
        <Switch>
          <Route path="/login" component={ Login }/>  
          <Route path="/grouplist" component={ GroupList }/>  
          <Route path="/lifestage" component={ Lifestage }/>  
          <Route path="/group/:id" component={ GroupContent }/> 
          <Route path="/signup" component={ SignupForm }/> 
          <Route path="/" component={ Login }/> 

        </Switch>
 
      </div>
    ); 
  }
}



export default App;
