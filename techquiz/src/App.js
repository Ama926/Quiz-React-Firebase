import React, { Component } from 'react';
import fire from './config/fire';
import './App.css';
import login from './login';
import home from './home';

class App extends Component
{
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }

  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    fire.auth().onAuthStateChange((user) => {

      if(user){
        this.setState({ user });


      }else{
        this.setState({ user: null });

      }
   });
 }

  
  render(){
    return(
      <div className="App">
        {this.state.user ? (<home />) : (<login />)}
        </div>
    );
  }

}
export default App;
