import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


class Quiz extends React.Component {
  getQuiz(){
    request.get("/api/quizzes/10").end((err, quiz)=>{
       console.log(err, JSON.parse(quiz.text))
      if(err === null){
        console.log(JSON.parse(quiz.text));
        console.log("hi");
        this.setState({quiz: JSON.parse(quiz.text)})
      }else{
        alert(err)
      }
    });
  }
  constructor(props){
    super(props);
    this.state={
      quiz: {},
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
          <div className="choice">test</div>
          <div className="choice">test</div>
          <div className="choice">test</div>
          <div className="choice">test</div>
        </section>
      </article>
    );
  }
}

export default Quiz;