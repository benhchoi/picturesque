import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ContactButton from "../common/ContactButton";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import FavoriteButton from "../common/FavoriteButton";
import { deletePortfolio } from "../../actions/portfolios";
import { updateFavorites } from "../../actions/favorites";
import { timeSince } from "../../actions/utility";
import { createMessage } from "../../actions/messages";

export class PortfolioHeader extends Component {
  static propTypes = {
    portfolio: PropTypes.object.isRequired,
    linkTitle: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    deletePortfolio: PropTypes.func.isRequired,
    updateFavorites: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  state = {
    redirect: false
  };

  onDelete = e => {
    e.preventDefault();
    const { id } = this.props.portfolio;
    this.props.deletePortfolio(id);
  };

  onFavorite = e => {
    e.preventDefault();

    if (!this.props.auth.isAuthenticated) {
      this.props.createMessage({
        favoriteFail: "You must be logged in to favorite a portfolio"
      });
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const { isAuthenticated, user } = this.props.auth;
    const portfolio = this.props.portfolio;

    const buttons =
      isAuthenticated && user.id === portfolio.user.id ? (
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
        <div className="row">
          <div className="col-auto mr-auto">
            <h4>
              {this.props.linkTitle ? (
                <Link to={`/portfolios/view/${portfolio.id}`}>
                  {portfolio.title}
                </Link>
              ) : (
                portfolio.title
              )}
            </h4>
          </div>
          {buttons}
        </div>
        <div className="row">
          <div className="col">
            <p className="d-inline">
              posted by{" "}
              <Link to={`/u/${portfolio.user.username}`}>
                {portfolio.user.username}
              </Link>{" "}
              |{" "}
              {this.props.linkTitle ? (
                <Link to={`/portfolios/view/${portfolio.id}`}>
                  {timeSince(new Date(portfolio.timestamp))}
                </Link>
              ) : (
                timeSince(new Date(portfolio.timestamp))
              )}{" "}
              |{" "}
            </p>
            <a href={`mailto:${portfolio.user.email}`}>
              <p className="d-inline text-success">${portfolio.rate}</p>
            </a>
            {portfolio.tags.length == 0
              ? ""
              : portfolio.tags.map(tag => {
                  return (
                    <div key={tag} className="d-inline">
                      <p className="d-inline"> | </p>
                      <Link to={`/portfolios?search=${tag}`}>
                        <p className="d-inline text-info">#{tag}</p>
                      </Link>
                    </div>
                  );
                })}
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

const mapDispatchToProps = { deletePortfolio, updateFavorites, createMessage };

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioHeader);
