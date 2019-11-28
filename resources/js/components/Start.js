import React from 'react';
import ReactDOM from 'react-dom';

function Start(props) {
  return (
    <div className="start-view show">
      <div className="start btn" onClick={props.onClick}>
        START
      </div>
    </div>
  );
}

export default Start;