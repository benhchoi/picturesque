import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">What would you like to do?</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <Link to="/buy">
                <h2 className="text-center">Buy Art</h2>
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="jumbotron">
              <Link to="/sell">
                <h2 className="text-center">Sell Art</h2>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    );
  }
}
