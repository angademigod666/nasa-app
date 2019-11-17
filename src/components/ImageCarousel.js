import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

export default function ImageCarousel(props) {
  const { data } = props;
  return (
    <Fragment>
      {data.length > 0 && (
        <div id="demo" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active"></li>
            {data.map((url, key) => <li key={key} data-target="#demo"
              data-slide-to={`${key + 1}`}></li>)}
            {/* <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li> */}
          </ul>
          {/* <!-- The slideshow --> */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img height="350rem" className="rounded mx-auto d-block"
                src={data[0]} alt="Not found" />
              <div className="carousel-caption">
                <p>{data[0]}</p>
              </div>
            </div>
            {data.map((url, key) => (
              <div key={key} className="carousel-item">
                <img height="350rem" className="rounded mx-auto d-block"
                  src={data[key + 1]} alt="Not found" />
                <div className="carousel-caption">
                  <p>{data[0]}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Left and right controls --> */}
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      )}
    </Fragment>
  )
}