import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Start from './Start';
import Quiz from './Quiz';
import Result from './Result';

function arr_shuffle(array){
  for(var i = array.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      step: 0,  //0: start, 1: quiz, 2: result
      quiz: [], //get a quiz with ajax
      quiz_count: 0,
      id_array: arr_shuffle([...Array(num).keys()].map(i => ++i)).slice(0, 10),
    };
    this.getQuiz();
  }
  
  getQuiz(){
    let url = "/api/quizzes/" + this.state.id_array[this.state.quiz_count];
    request.get(url).end((err, res)=>{
       console.log(err, JSON.parse(res.text))
      if(err === null){
        let quiz = JSON.parse(res.text);
        this.setState({quiz: quiz, quiz_count: this.state.quiz_count+1});
      }else{
        alert(err)
      }
    });
  }

  handleStepMove(){
    console.log(this.state.step)
    this.setState({step: this.state.step+1});
  }

  judgeAnswer(id, val){
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
    switch (this.state.step) {
      case 0:
        return(<Start onClick={()=>{this.handleStepMove()}}/>);
      case 1:
        return(<Quiz quiz={this.state.quiz} quiz_count={this.state.quiz_count} onClick={(id, val)=>{this.judgeAnswer(id, val)}} />);
      case 2:
        return(<Result />);
    }
  }
}

export default Game;

if (document.getElementsByClassName('quiz-board')) {
  ReactDOM.render(<Game />, document.getElementsByClassName('quiz-board')[0]);
}