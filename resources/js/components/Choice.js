import React from 'react';
import ReactDOM from 'react-dom';

function Choice(props) {
  return (
    <div className="choice" onClick={()=>{props.onClick(props.id, props.text)}}>
      {props.text}
    </div>
  );
}

export default Choice;