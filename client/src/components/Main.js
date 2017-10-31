import React from 'react';
import Splash from './Splash.js';

export default (props) => (
  <div>
    { !props.userId ? <Splash /> : (
      <h1>MAIN</h1>
    )}
  </div>
);
