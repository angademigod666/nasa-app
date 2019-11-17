import React from 'react';
import axios from 'axios';



//import ImaggaColor from './ImaggaColor';
//import MyColorify from './MyColorify';
import MyVibrant from './MyVibrant';

import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



const nasaAPI = {
  nasaAPIRoot: 'https://api.nasa.gov',
  apiName: '/planetary/apod',
  api_key: 'FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv',
};

const nasaURL = `${nasaAPI.nasaAPIRoot}${nasaAPI.apiName}?api_key=${nasaAPI.api_key}`;

//const nasaURLstatic = 'https://api.nasa.gov/planetary/apod?api_key=FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv'


let goBack = 0;

class APOD extends React.Component {

  state = {
    data: '',
    date: new Date(),
    err: '',
  }

  getAPOD = () => {

    const today = this.state.date;
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - goBack}`;
    console.log(goBack);

    const dynURL = `${nasaURL}&date=${dateString}`;
    // console.log("GOing To", dynURL);
    this.setState({ data: '', err: '', }, () => {
      axios.get(dynURL)
        .then(({ data }) => {
          // console.log('success', res);
          if (data !== undefined) {
            this.setState({ data, });
          } else {
            this.setState({ err: 'Sorry we are taking time...' }, () => {
              goBack = goBack + 1;
              console.log("GOing Back to", goBack);
              this.getAPOD();
            });
          }

        })
        .catch(err => {
          console.log(err);
          this.setState({ err: err.message }, () => {
            goBack = goBack + 1;
            console.log("GOing Back to", goBack);
            this.getAPOD();
          });
        });
    });

  }

  componentDidMount = () => {
    const predefinedDate = this.props.match.params.urlPassedDate;
    if (predefinedDate !== undefined) {
      console.log(predefinedDate);
      this.setState({ date: new Date(predefinedDate) }, () => {
        this.getAPOD();
      });
    }
    this.getAPOD();
  }

  handleChange = (e) => {
    //const date = e.target.value;
    const date = e.value;

    // ONly the below code actually works!!!
    // The third way of using setState({},{}=>{});
    if (date >= new Date('1995-11-07')) {
      this.setState({ date, err: '', }, () => {
        this.getAPOD();
      });
    }
    else {
      this.setState({ err: "Can't go beyond 7th November 1995!" })
    }


    // THIS code will not work, beloW:
    // this.setState({date: input,});
    // this.getAPOD();

    // Nor will this!!!!!
    // this.setState(()=>{
    //   return {
    //     date:input,
    //   }
    // });
    // this.getAPOD();
  }


  render() {
    const { data, err, date } = this.state;
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <div className="jumbotron">
              <h1 className="display-4" style={{ fontSize: '3rem' }}>Astronomy Photo Of the Day</h1>

              {!data && (
                <div>
                  <br />
                  <br />
                  <br />
                  <span className="spinner-grow text-muted"></span>
                  <span className="spinner-grow text-success"></span>
                  <span className="spinner-grow text-info"></span>
                  <span className="spinner-grow text-warning"></span>
                  <span className="spinner-grow text-danger"></span>
                  <span className="spinner-grow text-secondary"></span>
                  <span className="spinner-grow text-dark"></span>
                </div>
              )}
              {data && (
                <div>
                  <p className="text-danger">{err}</p>
                  <label>Date:</label>&nbsp;&nbsp;
                  <Calendar readOnlyInput={true} dateFormat="yy-mm-dd"
                    placeholder="Choose a date!" className="p-calendar"
                    monthNavigator={true} yearNavigator={true} yearRange="1995:2025"
                    value={date} onChange={this.handleChange}
                    maxDate={new Date()} touchUI={true}>
                  </Calendar>
                  {/* <span className="text-success">Try changing it!</span> */}
                  <br />
                  <br />
                  {/* <ImaggaColor imgURL={data.url}/> */}
                  {/* <MyColorify imgURL = {data.url}/> */}
                  <MyVibrant imgURL = {data.url}/>
                  <br/>
                  <div className="row">
                    <div className="col-md-6">
                      <a href={data.url} target="_blank" rel="noopener noreferrer">
                        <img alt={data.explanation} className="img-fluid rounded"
                          src={data.url} />
                      </a>
                    </div>
                    <div className="col-md-6">
                      <h2>{data.title}</h2>
                      <p>{data.copyright}</p>
                      <p><a target="_blank" rel="noopener noreferrer" href={data.hdurl}>View HD</a></p>
                      <p>{data.explanation}</p>
                      <p>Media type: {data.media_type}</p>
                      <p>Service version: {data.service_version}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default APOD;