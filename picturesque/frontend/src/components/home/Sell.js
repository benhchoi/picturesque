import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export default class Sell extends Component {
  render() {
    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <div className="row vertical-center">
          <div className="col">
            <div className="row">
              <div className="col">
                <h1 className="text-center">I would like to...</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="jumbotron">
                  <Link to="/bounties">
                    <h2 className="text-center">Browse commission requests</h2>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="jumbotron">
                  <Link to="/create/portfolio">
                    <h2 className="text-center">Make a portfolio</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
