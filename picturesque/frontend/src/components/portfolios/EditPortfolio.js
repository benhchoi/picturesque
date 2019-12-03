import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadModal from "./UploadModal";
import ScrollingImages from "../common/ScrollingImages";
import { editPortfolio, getPortfolio } from "../../actions/portfolios";
import { makeTagsArray, makeTagsString } from "../../actions/utility";
import { Redirect } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class EditPortfolio extends Component {
  static propTypes = {
    portfolio: PropTypes.object,
    artworks: PropTypes.array.isRequired,
    artwork: PropTypes.object,
    editPortfolio: PropTypes.func.isRequired,
    getPortfolio: PropTypes.func.isRequired
  };

  state = {
    uploadModal: "uploadPic",
    title: "",
    description: "",
    tags: "",
    rate: "",
    initialized: false,
    selected: new Set(),
    edited: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPortfolio(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.initialized &&
      this.props.portfolio != null &&
      this.props.portfolio.id == this.props.match.params.id
    ) {
      const { title, description, tags, rate, artworks } = this.props.portfolio;

      this.setState({
        title: title,
        description: description,
        tags: makeTagsString(tags),
        rate: rate,
        selected: new Set(artworks.map(artwork => artwork.id)),
        initialized: true
      });
    }

    if (
      this.props.artwork != null &&
      prevProps.artwork !== this.props.artwork
    ) {
      this.setState(state => {
        state.selected.add(this.props.artwork.id);

        return {
          selected: state.selected
        };
      });
    }
  }

  onPublish = e => {
    e.preventDefault();
    const { title, description, rate, selected } = this.state;
    const id = this.props.portfolio.id;
    const tags = makeTagsArray(this.state.tags);
    const artworks = [...selected];
    const portfolio = { id, title, description, tags, rate, artworks };
    this.props.editPortfolio(portfolio);

    this.setState({ edited: true });
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
    if (this.props.portfolio == null) {
      return <p>No such portfolio exists</p>;
    }

    if (this.state.edited) {
      return <Redirect to={`/portfolios/view/${this.props.portfolio.id}`} />;
    }

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <UploadModal id={this.state.uploadModal} />
        <h2>Let us help you edit your portfolio to meet your new needs!</h2>
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
  artworks: state.portfolios.artworks,
  artwork: state.portfolios.artwork,
  portfolio: state.portfolios.portfolio
});

const mapDispatchToProps = { editPortfolio, getPortfolio };

export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolio);
