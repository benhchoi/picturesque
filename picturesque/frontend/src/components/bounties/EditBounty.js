import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "./UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { getRefArts, editBounty, getBounty } from "../../actions/bounties";
import { makeTagsArray, makeTagsString } from "../../actions/utility";
import { Redirect } from "react-router-dom";

export class EditBounty extends Component {
  static propTypes = {
    bounty: PropTypes.object,
    refArts: PropTypes.array.isRequired,
    getRefArts: PropTypes.func.isRequired,
    editBounty: PropTypes.func.isRequired,
    getBounty: PropTypes.func.isRequired
  };

  state = {
    uploadModal: "uploadPic",
    title: "",
    description: "",
    tags: "",
    price: "",
    initialized: false,
    selected: new Set(),
    edited: false
  };

  componentDidMount() {
    this.props.getRefArts();
    this.props.getBounty(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (!this.state.initialized && this.props.bounty != null) {
      const {
        title,
        description,
        tags,
        price,
        reference_arts
      } = this.props.bounty;

      this.setState({
        title: title,
        description: description,
        tags: makeTagsString(tags),
        price: price,
        selected: new Set(reference_arts.map(refArt => refArt.id)),
        initialized: true
      });
    }
  }

  onPublish = e => {
    e.preventDefault();
    const { title, description, price, selected } = this.state;
    const id = this.props.bounty.id;
    const tags = makeTagsArray(this.state.tags);
    const reference_arts = [...selected].map(Number);
    const bounty = { id, title, description, tags, price, reference_arts };
    this.props.editBounty(bounty);
    this.setState({
      edited: true
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  selectImage = e => {
    const id = Number(e.target.id);
    this.setState(state => {
      if (state.selected.has(id)) state.selected.delete(id);
      else state.selected.add(id);
      return {
        selected: state.selected
      };
    });
  };

  render() {
    if (this.props.bounty == null) {
      return <p>No such bounty exists.</p>;
    }

    if (this.state.edited) {
      return <Redirect to={`/bounties/view/${this.props.bounty.id}`} />;
    }

    return (
      <div className="container">
        <h2>Let us help you edit your bounty to match your new needs!</h2>
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
              onClick={this.selectImage}
              modalTarget=""
              selected={this.state.selected}
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
        <UploadModal id={this.state.uploadModal} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  refArts: state.bounties.refArts,
  bounty: state.bounties.bounty
});

const mapDispatchToProps = { getRefArts, editBounty, getBounty };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBounty);
