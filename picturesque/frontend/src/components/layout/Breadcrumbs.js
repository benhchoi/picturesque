import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  uppercaseFirst,
  makePathString,
  makePathArray,
  pathExclusions
} from "../../actions/utility";

export default class Breadcrumbs extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      path: makePathArray(this.props.path)
    };
  }

  render() {
    return (
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {this.state.path.map((route, i, path) =>
            i == path.length - 1 ? (
              <li key={route} className="breadcrumb-item active">
                {uppercaseFirst(route)}
              </li>
            ) : pathExclusions.has(route) ? null : (
              <li key={route} className="breadcrumb-item">
                <Link to={makePathString(path, i)}>
                  {uppercaseFirst(route)}
                </Link>
              </li>
            )
          )}
        </ol>
      </div>
    );
  }
}
