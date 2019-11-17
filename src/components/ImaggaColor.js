import React from 'react';
import axios from 'axios';

import request from 'request';

const apiKey = 'acc_8b53ec2350da7df';
const apiSecret = 'd283b8c3856c5ccf79f5338ee5c62932';

const auth = 'Basic YWNjXzhiNTNlYzIzNTBkYTdkZjpkMjgzYjhjMzg1NmM1Y2NmNzlmNTMzOGVlNWM2MjkzMg==';

const imageUrl = 'https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';




//const url = 'https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageUrl)



class ImaggaColor extends React.Component {

  state = {
    imgURL: '',
    imgData: '',
  }

  getImageData = () => {
    console.log('getImageData:');
    console.log('imgURL:', this.props.imgURL);


    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(this.props.imgURL);

    console.log(url);

    // request.get(url, (error, response, body) => {
    //   console.log('Status:', response.statusCode);
    //   console.log('Headers:', JSON.stringify(response.headers));
    //   console.log('Response:', body);
    // }).auth(apiKey, apiSecret, true);


    // axios.get(url)
    //   .then((res)=>{
    //     console.log('res: ',res);
    //   })
    //   .catch((err)=>{
    //     this.setState({err:err.message})
    //   })
  }

  componentDidMount() {
    this.getImageData();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Booo</h1>
      </React.Fragment>
    )
  }

}
export default ImaggaColor;