import React, { Component } from 'react';
import fire from './config/fire';

class home extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }
       
        
    }


handleChange(e){
    this.setState({[e.target.name]: e.target.value});
}

render() {
    return(
        <div>
           <h1>You are successfully logged in!!</h1>
            <button>Log out</button>
        </div>
    )
}
}

export default home;