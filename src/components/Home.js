import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <div className="jumbotron">
              <h1 className="display-4">NASA home</h1>
              <p>Welcome to the NASA web portal. 
                The objective of this site is to make NASA data, including imagery, accessible to astronomy enthusiasts. 
                The media catalog is growing everyday.
              </p>
              <p>Start with <Link to="/apod">Astronomy Picture of Day</Link></p>
            </div>
          </div>
        </div>
        {/* <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/> */}
      </React.Fragment>
    )
  }
}

export default Home;