import React, { Component } from 'react';
import fire from './config/fire';

import Login from './login.js';
import Home from './home';
//import Quiz from "./quiz";
//import Questions from "./quiz";

class App extends Component
{

  constructor(props){
    super(props);

    this.state ={
      user: null,
    }

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {     //giving by firebase sdk
      if(user){
        this.setState({ user });
      }else{
        this.setState({ user: null });
      }
    })
  }

  

  render(){
    return(
      <div className="App">
       { this.state.user ? ( <Home /> ) : ( <Login /> ) }
    </div>
    );
  }

}


export default App;
