import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "../common/UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { getRefArt, addBounty } from "../../actions/bounties";

export class CreateBounty extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    refArts: PropTypes.array.isRequired,
    getRefArt: PropTypes.func.isRequired,
    addBounty: PropTypes.func.isRequired
  };

  state = {
    selected: new Set(),
    modalId: "uploadPic",
    title: "",
    description: "",
    tags: "",
    price: ""
  };

  componentDidMount() {
    this.props.getRefArt();
  }

  clickImage = e => {
    const key = e.target.id;
    if (this.state.selected.has(key)) {
      e.target.className = "img-thumbnail scrolling-card";
      this.state.selected.delete(key);
    } else {
      e.target.className = "img-thumbnail scrolling-card selected";
      this.state.selected.add(key);
    }
  };

  onPublish = e => {
    e.preventDefault();
    const { title, description, tags, price, selected } = this.state;
    const user = this.props.user.id;
    const reference_arts = [...selected].map(Number);
    const bounty = { user, title, description, tags, price, reference_arts };
    this.props.addBounty(bounty);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container">
        <h2>Let us help you find the perfect artist for your needs!</h2>
        <form onSubmit={this.onPublish}>
          <div className="form-group">
            <label>First, give a name to your bounty:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Pencil sketch on paper..."
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label>
              Provide a more detailed description of what you're looking for:
            </label>
            <textarea
              name="description"
              rows="5"
              className="form-control"
              placeholder="Looking for an artist to make a black and white pencil sketch of my dog ..."
              onChange={this.onChange}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label>
              Help artists get a feel for what you're looking for with some
              reference art:
            </label>
            <br></br>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              type="button"
              data-target={`#${this.state.modalId}`}
              onSubmit={e => e.preventDefault()}
            >
              Upload
            </button>
            <ScrollingImages
              images={this.props.refArts}
              onClick={this.clickImage}
            />
          </div>
          <div className="form-group">
            <label>
              Now let's add some tags to describe what you're looking for:
            </label>
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="pencil, black and white, sketch, paper, ..."
              onChange={this.onChange}
              value={this.state.tags}
            />
          </div>
          <div className="form-group">
            <label>Around how much are you willing to spend?</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
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
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </div>
        </form>
        <UploadModal id={this.state.modalId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  refArts: state.bounties.refArts
});

const mapDispatchToProps = { getRefArt, addBounty };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBounty);
