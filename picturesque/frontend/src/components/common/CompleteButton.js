import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";

export default class CompleteButton extends Component {
  static propTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmModal: `complete${this.props.id}`
    };
  }

  onClick = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <Fragment>
        <ConfirmModal
          id={this.state.confirmModal}
          message={`Are you sure you want to mark this bounty as ${
            this.props.completed ? "incomplete" : "completed"
          }?`}
          onClick={this.onClick}
        />
        <button
          type="button"
          className="btn btn-xs btn-outline-success"
          id={this.props.id}
          data-target={`#${this.state.confirmModal}`}
          data-toggle="modal"
        >
          <span
            className={
              this.props.completed
                ? "fas fa-check-circle"
                : "far fa-check-circle"
            }
          />
        </button>
      </Fragment>
    );
  }
}
