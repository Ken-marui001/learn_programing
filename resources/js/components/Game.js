import React from 'react';
import ReactDOM from 'react-dom';
import Start from './Start';
import Quiz from './Quiz';
import Result from './Result';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      step: 0,  //0: start, 1: quiz, 2: result
    };
  }
  
  handleStepMove(){
    console.log(this.state.step)
    this.setState({step: this.state.step+1});
  }
  render(){
    switch (this.state.step) {
      case 0:
        return(<Start onClick={()=>{this.handleStepMove()}}/>);
      case 1:
        return(<Quiz />);
      case 2:
        return(<Result />);
    }
  }
}

export default Game;

if (document.getElementsByClassName('quiz-board')) {
  ReactDOM.render(<Game />, document.getElementsByClassName('quiz-board')[0]);
}