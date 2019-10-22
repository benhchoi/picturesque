import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadArtwork } from "../../actions/portfolios";

export class UploadModal extends Component {
  static propTypes = {
    uploadArtwork: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  };

  state = {
    image: null,
    description: "",
    price: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  selectImage = e => this.setState({ image: e.target.files[0] });

  onUpload = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("user", this.props.user.id);
    fd.append("image", this.state.image);
    fd.append("price", this.state.price);
    fd.append("description", this.state.description);
    this.props.uploadArtwork(fd);
    this.setState({
      image: null,
      description: "",
      price: ""
    });
  };

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        accept="image/*"
                        id="imageInput"
                        onChange={this.selectImage}
                      />
                      <label className="custom-file-label">
                        {this.state.image
                          ? this.state.image.name
                          : "Choose image"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    id="description"
                    rows="3"
                    className="form-control"
                    placeholder="Landscape of the Grand Canyon ..."
                    onChange={this.onChange}
                    value={this.state.description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>
                    Price, if you wish to sell this piece (leaving this field
                    blank will mark it as "not for sale"):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="32767"
                    name="price"
                    className="form-control"
                    placeholder="20"
                    aria-label="Amount (to the nearest dollar)"
                    onChange={this.onChange}
                    value={this.state.price}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onUpload}
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = { uploadArtwork };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadModal);
