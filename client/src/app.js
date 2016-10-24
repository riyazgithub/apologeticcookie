import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import { Entity, Scene, Image } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>

        <Sky src="url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"/>

        <Image src="another-image.png"></Image>

        <Text
          text='Hello World!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

        <Entity
          animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          geometry='primitive: box'
          material={{color: this.state.color, opacity: 0.6}}
          position='0 -0.5 -3'
          onClick={this.changeColor.bind(this)}>
          <Entity
            animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}/>
        </Entity>
      </Scene>
    );
  }
}

// The only purpose of this target variable is so that when running the client
// tests inside Chrome with Karma, where OUR index.html is not loaded, React
// won't try to render to a nonexistent DOM element .scene-container and will
// instead just render on the document body (which is guaranteed to exist on
// any given page, I think)
let target = document.querySelector('.scene-container');

if (!target) {
  target = document.querySelector('body');
}

ReactDOM.render(<VRScene/>, target);

module.exports.VRScene = VRScene;
