import React from 'react';
import ReactDOM from 'react-dom';

function Timer(props) {
  return (
    <div id="timer">{(props.count/10).toFixed(1)}s</div>
  );
}

export default Timer;