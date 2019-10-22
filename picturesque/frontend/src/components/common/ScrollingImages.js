import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScrollingImages extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    if (this.props.images.length == 0) {
      return (
        <div className="scrolling-wrapper border m-2 p-2">
          <p className="text-center">Your pictures will appear here</p>
        </div>
      );
    }

    return (
      <div className="scrolling-wrapper border m-2">
        {this.props.images.map(image => (
          <img
            key={image.id}
            id={image.id}
            src={image.image}
            alt={image.description}
            className="img-thumbnail scrolling-card"
            onClick={this.props.onClick}
          />
        ))}
      </div>
    );
  }
}
