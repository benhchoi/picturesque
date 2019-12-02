import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CompleteButton extends Component {
  static propTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-xs btn-outline-success"
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <span
          className={
            this.props.completed ? "fas fa-check-circle" : "far fa-check-circle"
          }
        />
      </button>
    );
  }
}
