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
        //const  uid="";

         fire.auth().createUserWithEmailAndPassword(email,password)
          .then((u) => {
              console.log("successufully signed up");
          })
          .catch((err) =>{
              console.log("Error: "+err.toString());
              
          })

          fire.auth().onAuthStateChanged((user) => {
            if (user) {
              // User logged in already or has just logged in.
              console.log(user.uid);
              // uid = user.id;
             
            } else {
              // User not logged in or has just logged out.
            }
         
        });

        const db = fire.firestore();
         db.collection("techQuiz").add({
           username: email ,
           password: password,
           score: 0,
           //uid: user.id,
           //uid: uid,
          
       })
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