import React from 'react';
import axios from 'axios';


const nasaInSightAPI = {
  nasaAPIRoot: 'https://api.nasa.gov',
  apiName: '/insight_weather',
  api_key: 'FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv',
};

const nasaInSightURL = `${nasaInSightAPI.nasaAPIRoot}${nasaInSightAPI.apiName}/?api_key=${nasaInSightAPI.api_key}&feedtype=json&ver=1.0`;

//const nasaURLStaticEg = 'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';

class InSight extends React.Component {

  state = {
    data: '',
    date: '',
    show: false,
  }

  getAPOD = () => {
    const dynURL = `${nasaInSightURL}`;
    // console.log("GOing To", dynURL);

    axios.get(dynURL)
      .then((res) => {
        // console.log('success', res);
        this.setState(() => ({ data: res.data, }));
      })
      .catch(err => console.log(err));
  }

  componentDidMount = () => {
    // console.log("Home Mounted");
    this.getAPOD();
  }

  handleChange = (e) => {
    const input = e.target.value;
    this.setState(() => {
      return {
        date: input,
      };
    });
    this.setState((prev) => {
      console.log(prev.date);
      this.getAPOD();
    })
  }


  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="jumbotron">
              <h1 className="display-4">InSight: Mars Weather Service</h1>
              {data.date}

              <p>
                NASA’s InSight Mars lander takes continuous weather measurements (temperature, wind, pressure)
                on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.
              </p>
              <p>
                Here is the per-Sol summary data for each of the last seven available Sols (Martian Days).  
              </p>

              {/* FORM */}

              {/* <div className="form-inline">
                <label htmlFor="date" className="mr-sm-2">
                  {data.date}&nbsp;&nbsp;&nbsp;&nbsp;
                  {!show && 
                    <i onClick={() => this.setState(() => ({ show: true }))}> 
                      Change the date?
                    </i>
                  }
                </label>
                {show && <input type="date" onChange={this.handleChange}
                  className="form-control mb-2 mr-sm-2" id="email" />}
              </div> */}

              {/* FORM */}
              
              {/*
              <div className="row">
                <div className="col-md-6">
                  <img alt={data.explanation} className="img-fluid rounded"
                    src={data.url} />
                </div>
                <div className="col-md-6">
                  <h2>{data.title}</h2>
                  <p>{data.copyright}</p>
                  <p>{data.explanation}</p>
                  <p><a href={data.hdurl}>View HD</a></p>
                  <p>Media type: {data.media_type}</p>
                  <p>Service version: {data.service_version}</p>
                </div>
              </div>
              */}

              <p className='display-4'>Coming Soon</p>
            </div>
            
          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default InSight;