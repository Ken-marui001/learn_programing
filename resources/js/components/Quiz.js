import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Choice from './Choice';

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
  handleJudge(id, val){
    const url = "/api/quizzes/" + String(id) + "/check/" + String(val);
    request.get(url).end((err, res)=>{
      // console.log(err, JSON.parse(res.text))
      if(err === null){
        this.getQuiz();
      }else{
        alert(err)
      }
    });
  }

  render(){
    let arr_choices = [this.props.quiz.answer, this.props.quiz.wrong1, this.props.quiz.wrong2, this.props.quiz.wrong3];
    console.log(arr_choices);
    arr_choices = arr_shuffle(arr_choices);
    let choices = [...Array(4).keys()].map(i=><Choice key={i} id={this.props.quiz.id} text={arr_choices[i]} onClick={(id, val)=>{this.props.onClick(id, val)}}/>)
    return (
      <article className="quiz" quiz-id={this.props.quiz.id}>
        <div className="quiz__counter">{this.props.quiz_count}/10</div>
        <div className="quiz__text">
          <pre><p>{this.props.quiz.text}</p></pre>
          <div className="codes"><pre><code>{this.props.quiz.code}</code></pre></div>
        </div>
        <section className="quiz__choice">
          {choices}
        </section>
      </article>
    );
  }
}

export default Quiz;