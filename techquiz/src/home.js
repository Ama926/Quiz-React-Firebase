import React, { useEffect, useState } from 'react';
import fire from './config/fire';
import { QuizData } from './QuizData';

//ama
class home extends React.Component{
    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        QuizEnd: false,
        score: 0,
        disabled: true
    };
 //   const [newSpellName, setNewSpellName] = React.useState();

    logout(){
        fire.auth().signOut();
    }

     refreshPage() {
        window.location.reload(false);
      }

    loadQuiz = () =>{
     //   const {currentQuestion} = this.state;
        this.setState(() => {
            return{
                questions: QuizData[this.state.currentQuestion].question,
                options: QuizData[this.state.currentQuestion].options,
                answers: QuizData[this.state.currentQuestion].answer
            };
        });
    };


    componentDidMount(){
         this. loadQuiz();
        console.log("quiz load");
    }

  

    //generate the next question
    nextQestionHandler = () => {
        const {userAnswer, answers, score } = this.state;

        if(userAnswer === answers){
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
        //const {currentQuestion } = this.state;

        if(this.state.currentQuestion !== prevState.currentQuestion)
        this.setState(() => {
            return{
                disabled: true,
                questions: QuizData[this.state.currentQuestion].question,
                options: QuizData[this.state.currentQuestion].options,
                answers: QuizData[this.state.currentQuestion].answer
            };
        });
    }

    //check answers
    chekcAnswer = answer => {
        this.setState ({ userAnswer: answer, disabled: false });

    };

    finishHandler = () => {
       // const {currentQuestion,userAnswer,  score} = this.state

        if(this.state.currentQuestion === QuizData.length - 1){
            this.setState ({
                QuizEnd: true
                
            });
           // console.log("finish clicked");
        }

        if (this.state.userAnswer === this.state.answers) {
            this.setState({
              score: this.state.score + 1
            })
            //console.log("Current score: ",this.state.score)

          }

          //update score of the user
        /*  const db = fire.firestore();
          var score = db.collection("techQuiz").doc();
          return score.update({
              score: score
          })*/

          //console.log("finish clicked");
    }
    

    render() {
        const {options, userAnswer, currentQuestion,QuizEnd,score } = this.state;
      
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
                    <button onClick={this.logout} className = "ui inverted button">Logout</button>
                    <button onClick={this.refreshPage} className = "ui inverted button">Try again</button>
               
                </div>
            );

        }else{
            return(
                <div className="App">
                  <h1>You are logged in</h1>
                 
                  <h1>{this.state.questions} </h1>
                  <span>{`Questions ${currentQuestion+1}  out of ${QuizData.length}  `}</span>
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
                     
                    )} 
                 
                 <button onClick={this.logout} className = "ui inverted button">Logout</button>
                   
                </div>
               
            );
        }
      
      
        
    }

}

export default home;