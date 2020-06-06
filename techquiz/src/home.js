import React, { Component } from 'react';
import fire from './config/fire';
import { QuizData } from './QuizData';

class home extends React.Component{
    state = {
        userAnswers: null,
        currentQuestion: 0,
        options: []
    }
 
    logout(){
        fire.auth().signOut();
    }

    loadQuiz = () =>{
        const {currentQuestion} = this.state;
        this.setState(() => {
            return{
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            };
        });
    }


    componentDidMount(){
        this.loadQuiz();
        console.log("quiz load");
    }

    nextQestionHandler = () => {
        this.setState ({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion)
    }

    //update the component
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion } = this.state;
        if(this.state.currentQuestion !== prevState.currentQuestion)
        this.setState(() => {
            return{
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            };
        })
    }


    render() {
        const {questions, options} = this.state;
        return(
            <div>
              <h1>You are logged in</h1>
              {questions}
              { options.map(option =>(
                  <p
                  key={option.id}
                  className="ui floating message"
                  >
                      {option}

                  </p>
              ))}
              <button onClick={this.nextQestionHandler}>Next Question</button>
              <button onClick={this.logout}>Logout</button>
            </div>
           
        )
    }

}

export default home;