import React, { Component } from 'react';
import fire from './config/fire';

class login extends Component{
    constructor(props){
        super(props);
        this.state={
            email : "",
            password: "",
        }
       
        
    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u)
        }).catch
    }


handleChange(e){
    this.setState({[e.target.name]: e.target.value});
}

render() {
    return(
        <div>
            <form>
                <input 
                type="email"
                id="email"
                placeholder="Enter your e-mail address"
                onChange={this.handleChange}
                value={this.state.email}
                />
                <input 
                type="password"
                id="password"
                placeholder="enter password"
                value={this.state.password}
                />
                <button onClick={this.login}> Login </button>
                <button onClick={this.state.signup}>Signup</button>
            </form>
        </div>
    )
}
}

export default login;