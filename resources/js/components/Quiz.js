import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


class Quiz extends React.Component {
  render(){
    request.get("/api/quizzes/10").end(function(err, quiz){
      //  console.log(err, data)
      if(err === null){
        return (
          <article className="quiz" quiz-id={quiz.id}>
            <div className="quiz__counter">1/10</div>
            <div className="quiz__text">
              <pre><p>{quiz.text}</p></pre>
              <div className="codes"><pre><code>{quiz.code}</code></pre></div>
            </div>
            <section className="quiz__choice">
              <div className="choice">test</div>
              <div className="choice">test</div>
              <div className="choice">test</div>
              <div className="choice">test</div>
            </section>
          </article>
        );
      }else{
        alert(err)
      }
    })
  }
}

export default Quiz;