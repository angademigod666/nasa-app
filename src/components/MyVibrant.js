import React, { Component, Fragment } from 'react';
import PicsResemble from './PicsResemble';

import * as Vibrant from 'node-vibrant';

export default class extends Component {

  state = {
    palette: "",
    showPicsResemble: false,
  }

  componentDidMount = () => {
    const opts = {
      colorCount: 256,
      quality:119,
      ImageClass: Image.Browser,
      quantizer: Vibrant.Quantizer.MMCQ,
      generator: Vibrant.Generator.Default,
    }
    const herokoCORSurl = 'https://cors-anywhere.herokuapp.com/' + this.props.imgURL;
     
    console.log(herokoCORSurl);
    
    const vib = new Vibrant(herokoCORSurl, opts);
    console.log(vib);
    vib.getPalette()
      .then((palette) => {
        console.log('got the palette');
        console.log(palette.Vibrant);
        this.setState({ palette, });
      });
  }

  render() {
    const { palette, showPicsResemble } = this.state;
    return (
      <Fragment>
        {(palette!=="" && palette.Vibrant) && (
          <Fragment>
            <Fragment>
              <div className='row'>
                <h4 className='col-md-3 col-xs-4' style={{
                  color: palette.Vibrant.getHex(),
                  textShadow: `1px 1px 3px ${palette.Vibrant.getHex()}`
                }}>Color analysis
                </h4>
                <div className="col-md-9 col-xs-4">
                  <div className="card" style={{
                    color: palette.Vibrant.getTitleTextColor(),
                    backgroundColor: palette.Vibrant.getHex(),
                    fontSize: '1.3rem'
                  }}><span className='text-center'>Vibrant color</span>
                    {/* {JSON.stringify(palette)} */}
                  </div>
                </div>
              </div>
              <br/>
              <button className='btn btn-outline-success'
                onClick={() => this.setState({ showPicsResemble: true })}>
                Find similar photos
                  </button>
            </Fragment>
            <br />
            {showPicsResemble && <PicsResemble hex={palette.Vibrant.getHex()} />}
          </Fragment>
        )}
        <br />
      </Fragment>
    );
  }
}