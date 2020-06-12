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
        disabled: true,
        userDetails: false,
        attempt: 1,
    };
 //   const [newSpellName, setNewSpellName] = React.useState();

    logout(){
        fire.auth().signOut();
    }

     refreshPage = () => {
       // window.location.reload(true);
        const { attempt } = this.state.attempt;
        if(attempt > 3){
            this.setState({
                attempt: attempt+1  ,         
            });
            window.location.reload(false);
            //this.setState ({ disabled: false });
             console.log("no more attempts");
        
        }else{
            window.location.reload(true);
            console.log(attempt);
       
        }
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
     
    update = () => {
        this.setState ({
            userDetails: true
        });

        const email = document.querySelector("#updateemail").value;
        const password = document.querySelector("#updatepassword").value;
        var user = fire.auth().currentUser;

        user.updateProfile({
        username:  email,
        password: password,
        }).then(function() {
        // Update successful.
         console.log("update successfully");
        }).catch(function(error) {
        // An error happened.
        console.log(error);
        });
    }

   /* gotData = () => {
        const db = fire.firestore();
        var ref = db.ref('techQuiz');
      //  ref.on('value', gotData, errData);

      // console.log(data.val());
      var scores = data.val();
      var keys = Object.keys(scores);
      console.log(keys);
    }*/

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

    finishHandler = async () => {
        if (this.state.currentQuestion === QuizData.length - 1) {
          this.setState({
            QuizEnd: true,
           
          });
        }
        if (this.state.userAnswer === this.state.answers) {
          this.setState({
            score: this.state.score + 1,
          });
        }
        try {
          const user = fire.auth().currentUser;
          const db = fire.firestore();
          let usersRef = await db.collection("users");
          let { docs } = await usersRef
            .where("userId", "==", user.uid)
            .limit(1)
            .get();
          const { attempts } = docs[0].data();
          await db
            .collection("users")
            .doc(docs[0].id)
            .update({
              attempts: [
                ...attempts,
                { attemptedAt: new Date().getTime(), score: this.state.score },
              ],
            });
        } catch (error) {
          console.log(error);
        }
      };
    
    render() {
        const {options, userAnswer, currentQuestion,QuizEnd,score, userDetails} = this.state;
      
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
                    <button onClick={this.gotData} className = "ui inverted button">View My Score</button>
               
                </div>
            );
        }    

            if(userDetails){
                return(
                    <div>
                        <h1>User Details</h1>
                        <h2>Here you can update your user details</h2>
                        <div style={{ textAlign: 'center' }}>
                            <div className="login">
                            <div>Email</div>
                            <div className ="ui input focus"><input id="updateemail" placeholder="update email" type="text"/></div>
                            </div>
                        <div>
                            <div>Password</div>
                            <div className ="ui input focus"><input id="updatepassword" placeholder="update password" type="password"  /></div>
                        </div>
                        <button style={{margin: '10px'}} onClick={this.update}   className = "ui inverted button">update</button>
                    </div>
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
                 <button onClick={this.update} className = "ui inverted button">Update Userdetails</button>
                   
                </div>
               
            );
        }
      
      
        
    }

}

export default home;