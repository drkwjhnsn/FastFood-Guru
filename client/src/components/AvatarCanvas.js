import React, { Component } from 'react';

export default class AvatarCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'defaultAvatar.png'
    }

    this.img = new Image();
    this.handleLoad = this.handleLoad.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.img.onload = this.handleLoad;
  }

  handleAvatar(e) {
    var objectUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ src: objectUrl });
  }

  handleLoad() {
    var { width, height } = this.img;
    if (width > height) {
      var factor = height / 180;
      var sWidth = factor * 171;
      var sx = (width - sWidth) / 2;
      var sy = 0;
      var sHeight = height;
    } else {
      var factor = width / 171;
      var sHeight = factor * 180;
      var sy = (height - sHeight) / 2;
      var sx = 0;
      var sWidth = width;
    }
    this.ctx.drawImage(this.img, sx, sy, sWidth, sHeight, 0, 0, 171, 180);
    if (this.state.src !== 'defaultAvatar.png') {
      var b64 = this.canvas.toDataURL("image/png");
      this.props.postImage(b64);
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d');
  }

  render() {
    this.img.src = this.state.src;
    return (
      <div>
        <canvas width="171px" height="180px" id="canvas"></canvas>
        <input id="avatar-input" type="file" onChange={this.handleAvatar}/>
        <label id="avatar-button" htmlFor="avatar-input">Choose Profile Picture</label>
      </div>
    )
  }
}
