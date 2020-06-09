import React, { useEffect, useState } from "react";
import "./App.css";
import fire from './config/fire';

 //new quiz part
  const quiz = ({quizData}) => {
 
  
  const [quizData, setQuiz] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const db = fire.firestore();
      const quizData = await db.collection("quizData").get();
      setQuiz(quizData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);



 //const Questions = ({quizData}) => {
    //const [score, setScore] = useState([]);
    var inputA=0;

      return (
        <div>
            
          {quiz.map((quiz) => (
            <div key={quizData.qTitle}>
              <h4>{quizData.qTitle}</h4>
              
                <input type="radio" name="ans" value="1" onChange={(e) => inputA=e.target.value}/> {quizData.qOption1}
                <input type="radio" name="ans" value="2" onChange={(e) => inputA=e.target.value}/> {quizData.qOption2}
                <input type="radio" name="ans" value="3" onChange={(e) => inputA=e.target.value}/> {quizData.qOption3}
                

                <button onClick={
                        function onSubmit({}){
                         
                            if(inputA==quizData.qAnswer){                            
                              console.log("correct answer selected");
                            }
                            else{
                                console.log("wrong one!");  
                            }
                          }
                    }>I'm Done</button>                       
            </div>
          ))}
          
        </div>
      );
}
  

  export default quiz;
 //export default Questions;