import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Lifestage from './containers/Lifestage';
import { Route, Switch } from 'react-router-dom';
// connects component to redux store (HOC)
// import { connect } from 'react-redux'; 
import GroupList from './components/GroupList';
import NewGroupForm from './components/NewGroupForm';
import GroupContent from './components/GroupContent';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        
        <Switch>
          <Route path="/login" component={ Login }/>  
          <Route path="/grouplist" component={ GroupList }/>  
          <Route path="/group/new" component={ NewGroupForm }/>  
          <Route path="/lifestage" component={ Lifestage }/>  
          <Route path="/group/:id" component={ GroupContent }/> 
          <Route path="/" component={ Login }/> 

        </Switch>

      </div>
    ); 
  }
}



export default App;
