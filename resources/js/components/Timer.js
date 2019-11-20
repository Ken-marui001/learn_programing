import React from 'react';
import ReactDOM from 'react-dom';

function Result(props) {
  return (
    <div id="timer">{props.time}</div>
  );
}

export default Result;