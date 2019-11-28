import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Start from './Start';
import Quiz from './Quiz';
import Result from './Result';
import Timer from './Timer';
import {Transition} from 'react-transition-group';

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
  /*
    getQuiz(): 非同期通信でクイズの中身を取得しstateを変更する
    registerRanking():非同期通信でテストの結果をデータベースに登録し、順位と上位20名のスコアを返す
    judgeAnswer(id, val): 渡されたクイズの番号(id)と回答(val)を非同期通信に使い、正解なら0を、不正解なら-1を返す
    handleStepMove(): stateに１を追加する事でスタート画面、クイズ画面、結果画面の遷移を実現する
    cuntStart(), countUp(): クイズの経過時間を管理する
  */
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
      isReaction: false,
      reaction: 'maru',
      wrong_count: 0,
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
        this.setState({quiz: quiz, quiz_count: this.state.quiz_count+1, choices: choices, wrong_count: 0});
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
          this.setState({isReaction: true, reaction: "maru"});
          if(this.state.quiz_count==10){
            clearInterval(this.intervalTimer);
            this.registerRanking();
            this.handleStepMove();
          }else{
            this.getQuiz();
          }
        }else{
          console.log(this.state.count + 10**this.state.wrong_count*50);
          this.setState({
            isReaction: true,
            reaction: "batsu",
            count: this.state.count+ 10**this.state.wrong_count*50,
            wrong_count: this.state.wrong_count+1,
          });
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

    //ready for Transition component
    const defaultStyle ={
      transition: `opacity 500ms cubic-bezier(0,1.05,.92,.58)`,
      opacity: 0,
    }
    const transitionStyles ={
      entering: { opacity: 1 },
      entered:  { opacity: 0 },
      exiting:  { opacity: 0 },
      exited:  { opacity: 0 },
    };

    //decide view by 'step' of this 'state'
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
          <Transition in={this.state.isReaction} timeout={300}　onEntered={()=>{this.setState({isReaction: false})}}>
            {(state)=>(
              <div className='reaction-box' style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <div className="reaction">
                  <img src={"https://ken-marui001.s3.ap-northeast-1.amazonaws.com/Heroku/learn_programing/marks/mark_"+this.state.reaction+".png"} width="100" height="100" />
                  <p className={this.state.reaction}>{this.state.reaction==="maru" ? "正　解" : "不正解..."}</p>
                </div>
              </div>
            )}
          </Transition>
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