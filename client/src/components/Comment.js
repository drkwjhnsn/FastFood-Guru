import React from 'react';

export default (props) => {
  var src = props.authorAvatar.slice(0,4) === 'http' ? props.authorAvatar : `images/avatars/${props.authorAvatar}.png`
  return (
  <div className="comment-item">
    <img className="comment-avatar" src={src} width="60px" height="60px" />
    <div className="comment">
      <div className="comment-body">{props.text}</div>
      <div className="author">
        <a href="#">{`—${props.author}`}</a>
      </div>
    </div>
  </div>
)};
