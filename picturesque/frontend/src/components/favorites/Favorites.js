import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";
import { getUsernameFavorites } from "../../actions/favorites";

export class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object,
    getUsernameFavorites: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    if (
      this.props.favorites == null ||
      this.props.favorites.user.username !== username
    ) {
      this.props.getUsernameFavorites(username);
    }
  }

  render() {
    if (this.props.favorites == null) {
      return <p>No such user exists</p>;
    }

    const { username } = this.props.match.params;
    const { isAuthenticated, user } = this.props.auth;
    const displayName =
      isAuthenticated && user.username === username ? "My" : `${username}'s`;

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <div className="row">
          <div className="col">
            <h2 className="text-center">{displayName} Favorites</h2>
          </div>
        </div>
        <div className="accordian">
          <div className="card">
            <div
              className="card-header clickable"
              data-toggle="collapse"
              data-target="#bounties"
            >
              <h3 className="text-info">Bounties</h3>
            </div>
            <div className="collapse show" id="bounties">
              <div className="card-body">
                {this.props.favorites.bounties.length == 0 ? (
                  <div className="row align-items-center">
                    <div className="col">
                      <h4>No bounties have been favorited</h4>
                    </div>
                  </div>
                ) : (
                  this.props.favorites.bounties.map((bounty, i, bounties) => (
                    <div
                      className={
                        i == bounties.length - 1
                          ? "row align-items-center p-2"
                          : "row align-items-center p-2 border-bottom"
                      }
                      key={bounty.id}
                    >
                      <div className="col">
                        <h4>
                          {bounty.completed ? (
                            <del>
                              <Link to={`/bounties/view/${bounty.id}`}>
                                {bounty.title}
                              </Link>
                            </del>
                          ) : (
                            <Link to={`/bounties/view/${bounty.id}`}>
                              {bounty.title}
                            </Link>
                          )}
                        </h4>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header clickable"
              data-toggle="collapse"
              data-target="#portfolios"
            >
              <h3 className="text-info">Portfolios</h3>
            </div>
            <div className="collapse show" id="portfolios">
              <div className="card-body">
                {this.props.favorites.portfolios.length == 0 ? (
                  <div className="row align-items-center">
                    <div className="col">
                      <h4>No portfolios have been favorited</h4>
                    </div>
                  </div>
                ) : (
                  this.props.favorites.portfolios.map(
                    (portfolio, i, portfolios) => (
                      <div
                        className={
                          i == portfolios.length - 1
                            ? "row align-items-center p-2"
                            : "row align-items-center p-2 border-bottom"
                        }
                        key={portfolio.id}
                      >
                        <div className="col">
                          <h4>
                            <Link to={`/portfolios/view/${portfolio.id}`}>
                              {portfolio.title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.accountFavorites,
  auth: state.auth
});

const mapDispatchToProps = { getUsernameFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
