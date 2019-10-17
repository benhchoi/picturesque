import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Buy extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Would you like to...</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <Link to="/portfolios">
                <h2 className="text-center">Search for the perfect artist</h2>
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="jumbotron">
              <Link to="/bounties/create">
                <h2 className="text-center">Create a bounty</h2>
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
