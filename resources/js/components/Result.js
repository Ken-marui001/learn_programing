import React from 'react';
import ReactDOM from 'react-dom';

function Result() {
  return (
    <div className="result">
      <div className="your-record">
        <p>あなたの記録は20.0秒です</p>
        <p>順位は5位です。入賞おめでとうございます!!</p>
      </div>
      <ul className="rankings">
        <li>１位</li>
        <li>２位</li>
      </ul>
    </div>
  );
}

export default Result;