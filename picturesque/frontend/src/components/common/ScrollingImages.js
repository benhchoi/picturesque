import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScrollingImages extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    modalTarget: PropTypes.string.isRequired,
    selected: PropTypes.object.isRequired
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
      <div className="container">
        <div className="scrolling-wrapper border m-2">
          {this.props.images.map(image => (
            <img
              key={image.id}
              id={image.id}
              src={image.image}
              alt={image.description}
              className={
                this.props.selected.has(image.id)
                  ? "img-thumbnail scrolling-card selected"
                  : "img-thumbnail scrolling-card"
              }
              onClick={this.props.onClick}
              data-toggle="modal"
              data-target={`#${this.props.modalTarget}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
