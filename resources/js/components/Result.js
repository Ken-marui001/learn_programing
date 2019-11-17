import React from 'react';
import ReactDOM from 'react-dom';

function Result() {
  return (
    <div class="result">
      <div class="your-record">
        <p>あなたの記録は20.0秒です</p>
        <p>順位は5位です。入賞おめでとうございます!!</p>
      </div>
      <ul class="rankings">
        <li>１位</li>
        <li>２位</li>
      </ul>
    </div>
  );
}

export default Result;