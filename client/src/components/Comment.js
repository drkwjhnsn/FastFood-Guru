import React from 'react';

export default (props) => (
  <div className="comment">
    <h6>{props.title}</h6>
    {props.text}
    <div className="author">
      <a href="#">{`—${props.author}`}</a>
    </div>
  </div>
);
