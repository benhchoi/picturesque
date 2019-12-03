import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";

export default class DeleteButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmModal: `delete${this.props.id}`
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
      </Fragment>
    );
  }
}
