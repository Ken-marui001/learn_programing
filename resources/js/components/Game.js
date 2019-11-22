import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Start from './Start';
import Quiz from './Quiz';
import Result from './Result';
import Timer from './Timer';

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
      choices: [],
      id_array: arr_shuffle([...Array(num).keys()].map(i => ++i)).slice(0, 10), //array shows these quiz-id
      quiz_count: 0,
      count: 0,
      ranking_board: [],
      your_rank: 0,
    };
    this.getQuiz();
  }
  
  getQuiz(){
    let url = "/api/quizzes/" + this.state.id_array[this.state.quiz_count];
    request.get(url).end((err, res)=>{
      //  console.log(err, JSON.parse(res.text))
      if(err === null){
        let quiz = JSON.parse(res.text);
        let choices = [quiz.answer, quiz.wrong1, quiz.wrong2, quiz.wrong3];
        choices = arr_shuffle(choices);
        this.setState({quiz: quiz, quiz_count: this.state.quiz_count+1, choices: choices});
      }else{
        alert(err)
      }
    });
  }

  registerRanking(){
    request
      .post('/api/ranking')
      .send({name: user_name, time: this.state.count})
      .set('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
      .then(res =>{
        const rank_res = JSON.parse(res.text);
        // console.log(rank_res);
        this.setState({ranking_board: rank_res[0], your_rank: rank_res[1]});
      });
  }
  
  judgeAnswer(id, val){
    const url = "/api/quizzes/" + String(id) + "/check/" + String(val);
    request.get(url).end((err, res)=>{
      if(err === null){
        if(res.text==="0"){
          if(this.state.quiz_count==10){
            clearInterval(this.intervalTimer);
            this.registerRanking();
            this.handleStepMove();
          }else{
            this.getQuiz();
          }
        }
      }else{
        alert(err)
      }
    });
  }
  
  handleStepMove(){
    // console.log(this.state.step)
    this.setState({step: this.state.step+1});
  }

  countStart(){
    this.intervalTimer = setInterval(()=>{this.countUp()}, 100);
  }

  countUp(){
    this.setState({count: this.state.count+1});
  }

  render(){
    let game_view = [];
    switch (this.state.step) {
      case 0:
        game_view = <Start onClick={()=>{this.handleStepMove();this.countStart();}} />;
        break;
      case 1:
        game_view = <Quiz 
                      quiz={this.state.quiz}
                      choices={this.state.choices} 
                      quiz_count={this.state.quiz_count}
                      onClick={(id, val)=>{this.judgeAnswer(id, val)}}
                    />;
        break;
      case 2:
        game_view = <Result
                      time={this.state.count/10}
                      rank={this.state.your_rank}
                      ranking_board={this.state.ranking_board}
                    />;
        break;
    }
    return(
      <div>
        <Timer count={this.state.count} />
        <div className="quiz-board">
          {game_view}
        </div>
      </div>
    );
  }
}

export default Game;

if (document.getElementsByClassName('game')) {
  ReactDOM.render(<Game />, document.getElementsByClassName('game')[0]);
}