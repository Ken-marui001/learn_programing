import React from 'react';
import ReactDOM from 'react-dom';
import RankingBoard from './RankingBoard';

function Result(props) {
  let message = <div></div>;

  if(props.rank>100){
    message = <p>ランク外です。100位目指して頑張りましょう!!</p>;
  }else if(props.rank>20){
    message = <p><span>{props.rank}位</span>です。入賞を目指しましょう!!</p>;
  }else{
    message = <p><span>{props.rank}位</span>です。入賞おめでとうございます!!</p>;
  }

  return (
    <div className="result">
      <div className="your-record">
        <p>あなたの記録は{props.time.toFixed(1)}秒です</p>
        {message}
      </div>
      <RankingBoard ranking={props.ranking_board} rank={props.rank}/>
    </div>
  );
}

export default Result;