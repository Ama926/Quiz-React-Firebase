import React, { Component } from 'react';
import fire from './config/fire';
import { QuizData } from './QuizData';

class home extends React.Component{
    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        QuizEnd: false,
        score: 0,
        disabled: true
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
    };


    componentDidMount(){
        this.loadQuiz();
        console.log("quiz load");
    }


    //generate the next question
    nextQestionHandler = () => {
        const {userAnswer, answer, score } = this.state;

        if(userAnswer === answer){
            this.setState({
                score: score + 1
            });
        }

        this.setState ({
            currentQuestion: this.state.currentQuestion + 1
        });
        console.log(this.state.currentQuestion);
    };

    //update the component
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion } = this.state;

        if(this.state.currentQuestion !== prevState.currentQuestion)
        this.setState(() => {
            return{
                disabled: true,
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            };
        });
    }

    //check answers
    chekcAnswer = answer => {
        this.setState ({ userAnswer: answer, disabled: false });

    };

    finishHandler = () => {
        const {userAnswer, answer, score} = this.state

        if(this.setState.currentQuestion === QuizData.length - 1){
            this.setState ({
                QuizEnd: true,
                
            })
           // console.log("finish clicked");
        }
        if (this.state.userAnswer === this.state.correctAnswer) {
            this.setState({
              score: this.state.score + 1
            })
            console.log("Current score: ",this.state.score)

          }
    }
    

    render() {
        const {questions, options,currentQuestion, userAnswer, QuizEnd} = this.state;
      
        if(QuizEnd){
            return (
                <div>
                    <h2> Game Over! Final score is {this.state.score} points </h2>
                     <p>Correct answers for the questions:
                    <ul>
                        {QuizData.map((item,index) => (
                            <li className = "ui floating message options"
                             key = {index} >
                             {item.answer}
                              </li>

                        ))}
                    </ul>
                    </p>
                </div>
            );
        }else{
            return(
                <div>
                  <h1>You are logged in</h1>
                  <h1>{this.state.questions} </h1>
                  <span>{`Questions ${currentQuestion}  out of ${QuizData.length - 1} remaining `}</span>
                  { options.map(option =>(
                      <p
                      key={option.id}
                      className= {`ui floating message options
                      ${userAnswer === option ? "selected" : null }
                      `}
    
                      onClick = {() => this.chekcAnswer(option)}
                      >
                          {option}
    
                      </p>
                  ))}
    
                  {currentQuestion < QuizData.length - 1 &&
                    (
                  <button 
                  //semantic ui button
                  className = "ui inverted button"
                  disabled = {this.state.disabled}
                  onClick={this.nextQestionHandler}>Next Question</button>
    
                     ) }
    
                  {currentQuestion === QuizData.length - 1 &&(
                        <button
                        className = "ui inverted button"
                       // disabled = {this.state.disabled}
                         onClick = {this.finishHandler}
                        >Finish</button>
                    ) }
                  <button onClick={this.logout}>Logout</button>
                </div>
               
            );
        }
      
      
        
    }

}

export default home;