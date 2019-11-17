import React, { Component, Fragment } from 'react';
import { getMoreImages } from './morePics';


import ImageCarousel from './ImageCarousel';
export default class PicsResemble extends Component {

  state = {
    resembleData: [],
    err: '',
  }

  componentDidMount = () => {
    console.log('Getting more pics for this HEX:-', this.props.hex);
    getMoreImages(this.props.hex)
      .then((foundImages) => {
        console.log('Finally found them', foundImages);
        this.setState({ resembleData: foundImages });
      })
      .catch(err => this.setState({ err, }))
  }

  render() {
    const { hex } = this.props;
    const { resembleData } = this.state;
    return (
      <Fragment>
        {resembleData !== undefined && (
          <Fragment>
            <br/>
            {resembleData.length === 0 && (
              <div>
                <span className="spinner-grow text-muted"></span>
                <span className="spinner-grow text-success"></span>
                <span className="spinner-grow text-info"></span>
                <span className="spinner-grow text-warning"></span>
                <span className="spinner-grow text-danger"></span>
                <span className="spinner-grow text-secondary"></span>
                <span className="spinner-grow text-dark"></span>
              </div>
            )}
            {resembleData.length !== 0 && (
            <div className="row">
              <div className="col-md-8 offset-md-2 col-xs-12 jumbotron bg-secondary">
                <ImageCarousel data={resembleData} />
              </div>            
            </div>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}