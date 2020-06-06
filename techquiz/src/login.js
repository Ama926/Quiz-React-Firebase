import React, { Component } from 'react';
import fire from './config/fire';

class login extends React.Component{

    login(){
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
   
       fire.auth().signInWithEmailAndPassword(email,password)
        .then((u) => {
            console.log("successufully logged in");
        })
        .catch((err) =>{
            console.log("Error: "+err.toString());
        })
    }


    signup(){
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
     
         fire.auth().createUserWithEmailAndPassword(email,password)
          .then((u) => {
              console.log("successufully signed up");
          })
          .catch((err) =>{
              console.log("Error: "+err.toString());
          })
    }



    render() {
        return (
          <div style={{ textAlign: 'center' }}>
            <div>
              <div>Email</div>
              <input id="email" placeholder="Enter Email.." type="text"/>
            </div>
            <div>
              <div>Password</div>
              <input id="password" placeholder="Enter Password.." type="text"/>
            </div>
            <button style={{margin: '10px'}} onClick={this.login}>Login</button>
            <button style={{margin: '10px'}} onClick={this.signup}>Sign Up</button>
          </div>
        )
      }

}

export default login;