import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadRefArt } from "../../actions/bounties";

export class UploadModal extends Component {
  static propTypes = {
    uploadRefArt: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  };

  state = {
    image: null,
    description: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  selectImage = e => this.setState({ image: e.target.files[0] });

  onUpload = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("user", this.props.user.id);
    fd.append("image", this.state.image);
    fd.append("description", this.state.description);
    this.props.uploadRefArt(fd);
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
                    placeholder="I wanted the shading to resemble the shading in this picture ..."
                    onChange={this.onChange}
                    value={this.state.description}
                  ></textarea>
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

const mapDispatchToProps = { uploadRefArt };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadModal);
