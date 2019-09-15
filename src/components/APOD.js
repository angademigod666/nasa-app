import React from 'react';
import axios from 'axios';



const nasaAPI = {
  nasaAPIRoot: 'https://api.nasa.gov',
  apiName: '/planetary/apod',
  api_key: 'FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv',
};

const nasaURL = `${nasaAPI.nasaAPIRoot}${nasaAPI.apiName}?api_key=${nasaAPI.api_key}`;

//const nasaURLstatic = 'https://api.nasa.gov/planetary/apod?api_key=FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv'

class APOD extends React.Component {

  state = {
    data: '',
    date: '',
    show: false,
    err:'',
  }

  getAPOD = () => {
    const dynURL = `${nasaURL}&date=${this.state.date}`;
    // console.log("GOing To", dynURL);
    this.setState({ data: '', err:'', }, () => {
      axios.get(dynURL)
        .then((res) => {
          // console.log('success', res);
          this.setState({ data: res.data, });
        })
        .catch(err => {
          console.log(err);
          this.setState({ err:err.message });
        });
    });

  }

  componentDidMount = () => {
    // console.log("Home Mounted");
    this.getAPOD();
  }

  handleChange = (e) => {
    const date = e.target.value;
    // ONly the below code actually works!!!
    // The third way of using setState({},{}=>{});
    if(new Date(date) < new Date() ) {
      this.setState({ date, err:'', }, () => this.getAPOD());
    } else {
      this.setState({err: 'Future dates are not allowed!'})
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
    const { data, show, err } = this.state;
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="jumbotron">
              <h1 className="display-4">Astronomy Photo Of the Day</h1>

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
                  <div className="form-inline">
                    
                    <label htmlFor="date" className="mr-sm-2">
                      {data.date}&nbsp;&nbsp;&nbsp;
                      {!show &&
                        <i onClick={() => this.setState(() => ({ show: true }))}>
                          Change date?</i>}
                    </label>
                    {show && <input type="date" onChange={this.handleChange}
                      className="form-control mb-2 mr-sm-2" id="email" />}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <img alt={data.explanation} className="img-fluid rounded"
                        src={data.url} />
                    </div>
                    <div className="col-md-6">
                      <h2>{data.title}</h2>
                      <p>{data.copyright}</p>
                      <p><a href={data.hdurl}>View HD</a></p>
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