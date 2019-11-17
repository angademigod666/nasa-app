import React, { Component, Fragment } from 'react';
import 'colorify.js/styles/colorify.css';

import colorify from 'colorify.js';

//const colorify = require('colorify.js/scripts/colorify.js');

class MyColorify extends Component {


  componentDidMount = () => {
    console.log('componentDidMount')
    //colorify({});
    // colorify({
    //   container: 'colorify-main-color',
    //   accuracy: 10
    // });
    colorify({
      id : 1,
      container: 'colorify',
      attr: 'colorify', 
      accuracy: 50,
      color:true,
      gradient: true,
      gradientDirection: 'to bottom right',
      give: {
        property: 'fill',
        target: '#output',
      },
      revealOn: {
        trigger: '#clickMe',
        event: 'click',
      }
    });

    console.log("end");
    
  }

  render() {
    console.log('render')
    const { imgURL } = this.props;
    return (
      <Fragment>
        <h1>MyColorify: </h1>
        {imgURL}
        <div id="colorify">
          <img id="colorify" src="image666.jpg" width="100px" />
          <div className="colorify visible all-loaded" id="output" style={{border: '1px solid black'}}>
            TARGET COLOR
          </div>
          
        </div>
        <button id="clickMe">Hover</button>
        <br />
      </Fragment>
    );
  }
}

export default MyColorify;