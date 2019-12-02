import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export default class EditButton extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  state = {
    redirect: false
  };

  onClick = e => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.props.url} />;
    }

    return (
      <button
        type="button"
        className="btn btn-xs btn-outline-primary"
        id={this.props.id}
        onClick={this.onClick}
      >
        <span className="far fa-edit" />
      </button>
    );
  }
}
