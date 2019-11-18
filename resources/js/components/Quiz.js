import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

function arr_shuffle(array){
  for(var i = array.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

class Quiz extends React.Component {
  getQuiz(){
    request.get("/api/quizzes/10").end((err, res)=>{
       console.log(err, JSON.parse(res.text))
      if(err === null){
        let quiz = JSON.parse(res.text);
        let choices = [quiz.answer, quiz.wrong1, quiz.wrong2, quiz.wrong3];

        choices = arr_shuffle(choices);
        this.setState({quiz: quiz, choices: choices})
      }else{
        alert(err)
      }
    });
  }
  constructor(props){
    super(props);
    this.state={
      quiz: [],
      choices: [],
    };
    this.getQuiz();
  }
  render(){
    return (
      <article className="quiz" quiz-id={this.state.quiz.id}>
        <div className="quiz__counter">1/10</div>
        <div className="quiz__text">
          <pre><p>{this.state.quiz.text}</p></pre>
          <div className="codes"><pre><code>{this.state.quiz.code}</code></pre></div>
        </div>
        <section className="quiz__choice">
          <div className="choice">{this.state.choices[0]}</div>
          <div className="choice">{this.state.choices[1]}</div>
          <div className="choice">{this.state.choices[2]}</div>
          <div className="choice">{this.state.choices[3]}</div>
        </section>
      </article>
    );
  }
}

export default Quiz;