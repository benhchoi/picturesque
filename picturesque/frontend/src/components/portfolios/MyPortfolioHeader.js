import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ViewImageModal from "../common/ViewImageModal";
import { deletePortfolio } from "../../actions/portfolios";
import { updateFavorites } from "../../actions/favorites";
import ContactButton from "../common/ContactButton";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import FavoriteButton from "../common/FavoriteButton";

export class MyPortfolioHeader extends Component {
  static propTypes = {
    portfolio: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    deletePortfolio: PropTypes.func.isRequired,
    updateFavorites: PropTypes.func.isRequired
  };

  state = {
    redirect: false,
    viewModal: `view${this.props.portfolio.id}`,
    imageSrc: "",
    imageDesc: ""
  };

  onDelete = e => {
    e.preventDefault();
    const { id } = this.props.portfolio;
    this.props.deletePortfolio(id);
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const portfolio = this.props.portfolio;
    const artwork = portfolio.artworks[0];
    const { isAuthenticated, user } = this.props.auth;
    const sameUser = isAuthenticated && user.id === portfolio.user.id;

    const buttons = sameUser ? (
      <div className="col-auto">
        <div className="btn-group" role="group">
          <EditButton url={`/portfolios/edit/${portfolio.id}`} />
          <DeleteButton id={`${portfolio.id}`} onClick={this.onDelete} />
        </div>
      </div>
    ) : (
      <div className="col-auto">
        <div className="btn-group" role="group">
          <FavoriteButton
            favorited={this.props.favorites.includes(portfolio.id)}
            id={`${portfolio.id}`}
            onClick={this.onFavorite}
          />
          <ContactButton email={portfolio.user.email} />
        </div>
      </div>
    );

    return (
      <Fragment>
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row">
          <div className="col-4">
            <img
              src={artwork.image}
              alt={artwork.description}
              className="img-fluid img-thumbnail clickable"
              data-toggle="modal"
              data-target={`#${this.state.viewModal}`}
              onClick={this.selectImage}
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-auto mr-auto">
                <h4>
                  <Link to={`/portfolios/view/${portfolio.id}`}>
                    {portfolio.title}
                  </Link>
                </h4>
              </div>
              <div className="col-auto">{buttons}</div>
            </div>
            <div className="row">
              <div className="col">
                <p className="text-secondary">{portfolio.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  favorites: state.favorites.portfolios.map(portfolio => portfolio.id)
});

const mapDispatchToProps = { deletePortfolio, updateFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(MyPortfolioHeader);
