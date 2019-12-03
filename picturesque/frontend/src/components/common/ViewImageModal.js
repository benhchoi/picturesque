import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ViewImageModal extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!this.props.image ? (
                <p className="text-center">Image not found</p>
              ) : (
                <div>
                  <div className="row align-items-center">
                    <div className="col">
                      <img
                        src={this.props.image}
                        alt={this.props.description}
                        className="img-fluid img-thumbnail"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col">
                      <p className="text-center font-italic">
                        {this.props.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
