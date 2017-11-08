import React from 'react';

export default (props) => (
  <div className="comment-item">
    <img className="comment-avatar" src={`images/avatars/${props.authorAvatar}.png`} width="57px" height="60px" />
    <div className="comment">
      <h6>{props.title}</h6>
      {props.text}
      <div className="author">
        <a href="#">{`—${props.author}`}</a>
      </div>
    </div>
  </div>
);
