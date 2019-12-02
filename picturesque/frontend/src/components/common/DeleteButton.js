import React, { Component } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";

export default class DeleteButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  state = {
    confirmModal: "confirmModal"
  };

  onClick = e => {
    e.preventDefault();
    e.target.id = this.props.id;
    this.props.onClick(e);
  };

  render() {
    return (
      <div>
        <ConfirmModal
          id={this.state.confirmModal}
          message="Are you sure you want to delete?"
          onClick={this.onClick}
        />
        <button
          type="button"
          className="btn btn-xs btn-outline-danger"
          id={this.props.id}
          data-target={`#${this.state.confirmModal}`}
          data-toggle="modal"
        >
          <span className="fas fa-times" />
        </button>
      </div>
    );
  }
}
