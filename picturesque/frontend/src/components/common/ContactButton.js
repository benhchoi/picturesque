import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContactButton extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired
  };

  render() {
    return (
      <a
        className="btn btn-xs btn-outline-primary"
        href={`mailto:${this.props.email}`}
      >
        <span className="far fa-envelope" />
      </a>
    );
  }
}
