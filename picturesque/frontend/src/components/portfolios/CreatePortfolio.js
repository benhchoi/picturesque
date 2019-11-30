import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "./UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { getArtworks, addPortfolio } from "../../actions/portfolios";
import { makeTagsArray } from "../../actions/utility";
import { Redirect } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class CreatePortfolio extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    artworks: PropTypes.array.isRequired,
    getArtworks: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    portfolio: PropTypes.object
  };

  state = {
    selected: new Set(),
    uploadModal: "uploadPic",
    title: "",
    description: "",
    tags: "",
    rate: "",
    created: false
  };

  componentDidMount() {
    this.props.getArtworks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.portfolio !== this.props.portfolio) {
      this.setState({ created: true });
    }
  }

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

  onPublish = e => {
    e.preventDefault();
    const { title, description, rate, selected } = this.state;
    const user = this.props.user.id;
    const tags = makeTagsArray(this.state.tags);
    const artworks = [...selected];
    const portfolio = { user, title, description, tags, rate, artworks };
    this.props.addPortfolio(portfolio);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.state.created && this.props.portfolio) {
      return <Redirect to={`/portfolios/view/${this.props.portfolio.id}`} />;
    }

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <UploadModal id={this.state.uploadModal} />
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
              data-target={`#${this.state.uploadModal}`}
              onSubmit={e => e.preventDefault()}
            >
              Upload
            </button>
            <ScrollingImages
              images={this.props.artworks}
              onClick={this.selectImage}
              modalTarget={""}
              selected={this.state.selected}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  artworks: state.portfolios.artworks,
  portfolio: state.portfolios.portfolio
});

const mapDispatchToProps = { getArtworks, addPortfolio };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePortfolio);
