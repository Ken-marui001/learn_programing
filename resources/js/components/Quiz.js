import React from 'react';
import Choice from './Choice';

class Quiz extends React.Component {
  render(){
    let choices = this.props.choices.map((val, i)=><Choice key={i} id={this.props.quiz.id} text={val} onClick={(id, val)=>{this.props.onClick(id, val)}}/>)
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