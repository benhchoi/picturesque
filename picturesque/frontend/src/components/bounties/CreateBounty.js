import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "./UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { getRefArts, addBounty } from "../../actions/bounties";
import { makeTagsArray } from "../../actions/utility";
import { Redirect } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class CreateBounty extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    refArts: PropTypes.array.isRequired,
    refArt: PropTypes.object,
    getRefArts: PropTypes.func.isRequired,
    addBounty: PropTypes.func.isRequired,
    Bounty: PropTypes.object
  };

  state = {
    uploadModal: "uploadPic",
    viewModal: "viewPic",
    title: "",
    description: "",
    tags: "",
    price: "",
    created: false,
    selected: new Set()
  };

  componentDidMount() {
    this.props.getRefArts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bounty !== this.props.bounty) {
      this.setState({ created: true });
    }
    if (this.props.refArt != null && prevProps.refArt !== this.props.refArt) {
      this.setState(state => {
        state.selected.add(this.props.refArt.id);

        return {
          selected: state.selected
        };
      });
    }
  }

  onPublish = e => {
    e.preventDefault();
    const { title, description, price, selected } = this.state;
    const user = this.props.user.id;
    const tags = makeTagsArray(this.state.tags);
    const reference_arts = [...selected];
    const bounty = { user, title, description, tags, price, reference_arts };
    this.props.addBounty(bounty);
    this.setState({ created: true });
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
    if (this.state.created && this.props.bounty) {
      return <Redirect to={`/bounties/view/${this.props.bounty.id}`} />;
    }

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <UploadModal id={this.state.uploadModal} />
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
              data-target={`#${this.state.uploadModal}`}
              onSubmit={e => e.preventDefault()}
            >
              Upload
            </button>
            <ScrollingImages
              images={this.props.refArts}
              onClick={this.selectImage}
              modalTarget={""}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  refArts: state.bounties.refArts,
  refArt: state.bounties.refArt,
  bounty: state.bounties.bounty
});

const mapDispatchToProps = { getRefArts, addBounty };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBounty);
