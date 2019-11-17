import axios from 'axios';
import * as Vibrant from 'node-vibrant';
import * as convert from 'color-convert';


const nasaImagesAPI = {
  nasaAPIRoot: 'https://images-api.nasa.gov',
  searchAPI: '/search',
  assetAPI: '/asset/', // /asset/{nasa_id}
  api_key: 'FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv',
};

const nasaURL = `${nasaImagesAPI.nasaAPIRoot}${nasaImagesAPI.searchAPI}`;
let gotLab;

export function getMoreImages(gotHex) {
  gotLab = convert.hex.lab.raw(gotHex);
  console.log('getMoreImages():', gotHex, gotLab);
  const URL = nasaURL + '?q=Sun';
  //const URL = nasaURL + "?q=''";
  //const URL = nasaURL;

  console.log(URL);
  return axios.get(URL)
    .then(res => {
      const foundImages = res.data.collection.items;
      
      //console.log('foundImages=> ', foundImages);
      let promiseArr = [];

      //const foundImages2 = [foundImages[0]]; // random check

      foundImages.forEach((anImg, index) => {
        //console.log(index, anImg.links[0].href);
        promiseArr.push(getVibrant(anImg.links[0].href));
      });
      return Promise.all(promiseArr)
        .then((data) => {
          const matchedImages = data.filter(_ => _ !== undefined);
          return new Promise(res => res(matchedImages));
        });
    })
    .catch(err => {
      console.log(err);
    });
}



function getVibrant(anImgURL) {
  const opts = {
    ImageClass: Image.Browser,
    quantizer: Vibrant.Quantizer.MMCQ,
    generator: Vibrant.Generator.Default,
  }
  const herokoCORSurl = 'https://cors-anywhere.herokuapp.com/' + anImgURL;
  console.log(herokoCORSurl);
  const vib = new Vibrant(herokoCORSurl);
  console.log(vib);
  return vib.getPalette()
    .then((palette) => {
      console.log('got the palette');
      const hex = palette.Vibrant.getHex();
      const lab = convert.hex.lab.raw(hex);
      //console.log(hex, lab, gotLab);
      const deltaLabStarSQ = ((lab[0] - gotLab[0]) ** 2) + ((lab[1] - gotLab[1]) ** 2) + ((lab[2] - gotLab[2]) ** 2);
      const deltaLabStarAct = Math.sqrt(deltaLabStarSQ);
      if (deltaLabStarAct <= 20) {
        console.log("FOUND", anImgURL);
        return new Promise((res) => res(anImgURL));
      }
      else {
        return new Promise((res) => res(undefined));
      }
    })
    .catch((e) => {
      console.log('ERROR!!!');
      console.log(e);
    });

}



// function convertTheColor(hexVal) {
//   const data = convert.hex.lab.raw('#ceb630'); 
//   console.log(data);

// }

// convertTheColor();


