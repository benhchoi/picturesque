import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolio, deletePortfolio } from "../../actions/portfolios";
import { updateFavorites } from "../../actions/favorites";
import { timeSince } from "../../actions/utility";
import { Link, Redirect } from "react-router-dom";
import ViewImageModal from "../common/ViewImageModal";

export class Portfolio extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getPortfolio: PropTypes.func.isRequired,
    portfolio: PropTypes.object,
    favorites: PropTypes.array.isRequired,
    updateFavorites: PropTypes.func.isRequired
  };

  state = {
    deleted: false,
    viewModal: "viewPic",
    imageSrc: "",
    imageDesc: "",
    redirect: false
  };

  onDelete = e => {
    e.preventDefault();
    this.props.deletePortfolio(this.props.portfolio.id);
    this.setState({ deleted: true });
  };

  onFavorite = e => {
    e.preventDefault();

    if (!this.props.auth.isAuthenticated) {
      this.setState({
        redirect: true
      });
      return;
    }

    const id = this.props.auth.user.id;
    const portfolioId = this.props.portfolio.id;
    const portfolios = this.props.favorites.includes(portfolioId)
      ? this.props.favorites.filter(favorite => portfolioId !== favorite)
      : [...this.props.favorites, portfolioId];
    const favorites = { id, portfolios };
    this.props.updateFavorites(favorites);
  };

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  componentDidMount() {
    this.props.getPortfolio(this.props.match.params.id);
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to="/portfolios" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    if (this.props.portfolio == null) {
      return <p>No such portfolio exists</p>;
    }

    const { isAuthenticated, user } = this.props.auth;

    const authButtons = (
      <div className="row p-2 border-top">
        <div className="col">
          <Link
            className="btn btn-primary m-1"
            to={`/portfolios/edit/${this.props.portfolio.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={this.onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );

    const guestButtons = (
      <div className="row p-2 border-top">
        <div className="col">
          <a
            className="btn btn-primary"
            href={`mailto: ${this.props.portfolio.user.email}`}
          >
            Contact
          </a>
          <button
            type="button"
            className="btn btn-info m-1"
            onClick={this.onFavorite}
          >
            {this.props.favorites.includes(this.props.portfolio.id)
              ? "Unfavorite"
              : "Favorite"}
          </button>
        </div>
      </div>
    );

    return (
      <div className="container">
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row m-2">
          <div className="col">
            <h2>{this.props.portfolio.title}</h2>
            <p className="d-inline">
              posted by {this.props.portfolio.user.username} |{" "}
              {timeSince(new Date(this.props.portfolio.timestamp))} |{" "}
            </p>
            <p className="d-inline text-success">
              ${this.props.portfolio.rate}
            </p>
            {this.props.portfolio.tags.length == 0
              ? ""
              : this.props.portfolio.tags.map(tag => {
                  return (
                    <div key={tag} className="d-inline">
                      <p className="d-inline"> | </p>
                      <p className="d-inline text-info">#{tag}</p>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            <p className="text-secondary">{this.props.portfolio.description}</p>
          </div>
        </div>
        {this.props.portfolio.artworks.map(art => {
          return (
            <div key={art.id} className="row p-2 align-items-center border-top">
              <div className="col-5">
                <img
                  src={art.image}
                  alt={art.description}
                  data-toggle="modal"
                  data-target={`#${this.state.viewModal}`}
                  onClick={this.selectImage}
                  className="img-fluid img-thumbnail clickable"
                />
              </div>
              <div className="col-7">
                <p className="text-center font-italic">{art.description}</p>
                {art.price == null ? (
                  <p className="text-danger text-center">
                    This item is not for sale
                  </p>
                ) : (
                  <p className="text-success text-center">
                    Buy this piece for ${art.price}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {isAuthenticated && user.id === this.props.portfolio.user.id
          ? authButtons
          : guestButtons}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  portfolio: state.portfolios.portfolio,
  favorites: state.favorites.portfolios.map(portfolio => portfolio.id)
});

const mapDispatchToProps = {
  getPortfolio,
  deletePortfolio,
  updateFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
