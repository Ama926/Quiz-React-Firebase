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

    async signup() {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      try {
        const { user } = await fire
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const db = fire.firestore();
        await db.collection("users").add({
          userId: user.uid,
          email: user.email,
          attempts: [],
        });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
        return (
          <div style={{ textAlign: 'center' }}>
            <div className="login">
              <div>Email</div>
              <div className ="ui input focus"><input id="email" placeholder="email" type="text"/></div>
            </div>
            <div>
              <div>Password</div>
              <div className ="ui input focus"><input id="password" placeholder="password" type="password"  /></div>
            </div>
            <button style={{margin: '10px'}} onClick={this.login}   className = "ui inverted button">Login</button>
            <button style={{margin: '10px'}} onClick={this.signup}   className = "ui inverted button">Sign Up</button>
          </div>
        )
      }

}

export default login;