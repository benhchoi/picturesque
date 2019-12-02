import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FavoriteButton extends Component {
  static propTypes = {
    favorited: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-xs btn-outline-danger"
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <span
          className={this.props.favorited ? "fas fa-heart" : "far fa-heart"}
        />
      </button>
    );
  }
}
