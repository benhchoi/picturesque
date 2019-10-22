import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "./UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { getArtwork, addPortfolio } from "../../actions/portfolios";
import { makeTagsArray } from "../../actions/utility";

export class CreatePortfolio extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    artworks: PropTypes.array.isRequired,
    getArtwork: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired
  };

  state = {
    selected: new Set(),
    modalId: "uploadPic",
    title: "",
    description: "",
    tags: "",
    rate: ""
  };

  componentDidMount() {
    this.props.getArtwork();
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
    const { title, description, rate, selected } = this.state;
    const user = this.props.user.id;
    const tags = makeTagsArray(this.state.tags);
    const artworks = [...selected].map(Number);
    const portfolio = { user, title, description, tags, rate, artworks };
    this.props.addPortfolio(portfolio);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container">
        <h2>
          Let us help you build your portfolio so you can attract buyers to your
          art!
        </h2>
        <form onSubmit={this.onPublish}>
          <div className="form-group">
            <label>First, give a name to your portfolio:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Oil landscapes ..."
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label>Provide a more detailed description of your work:</label>
            <textarea
              name="description"
              rows="5"
              className="form-control"
              placeholder="I specialize in creating oil on canvas paintings ..."
              onChange={this.onChange}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label>
              Choose which of your works you'd like to include in this
              portfolio:
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
              images={this.props.artworks}
              onClick={this.clickImage}
            />
          </div>
          <div className="form-group">
            <label>Now let's add some tags to describe your work:</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="oil, canvas, landscapes, ..."
              onChange={this.onChange}
              value={this.state.tags}
            />
          </div>
          <div className="form-group">
            <label>Around how much do you charge for commissions?</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                min="0"
                max="32767"
                name="rate"
                className="form-control"
                placeholder="20"
                aria-label="Amount (to the nearest dollar)"
                onChange={this.onChange}
                value={this.state.rate}
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
  artworks: state.portfolios.artworks
});

const mapDispatchToProps = { getArtwork, addPortfolio };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePortfolio);
