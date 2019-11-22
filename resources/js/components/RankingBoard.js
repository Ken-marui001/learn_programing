import React from 'react';
import ReactDOM from 'react-dom';

function RankingBoard(props) {
  let rankings = props.ranking.map((val, i)=>
    <List key={i} num={i} data={val} rank={props.rank}/>
  );

  return (
      <ul className="rankings">
        {rankings}
      </ul>
  );
}

function List(props){
  let rankIn= props.num+1 === props.rank ? 'rankIn' : "";
  console.log('hi');
  return(
    <li className={rankIn}>
      <div className="rankings__num">
        第<span>{String(props.num+1)}</span>位
      </div>
      <div className="rankings__time">
        {parseFloat(props.data.time).toFixed(1)}秒
      </div>
      <div className="rankings__name">
        {props.data.name}
      </div>
    </li>
  );
}

export default RankingBoard;