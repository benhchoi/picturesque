import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Favorites extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired
  };

  render() {
    if (this.props.favorites == null) {
      return <p>You have no favorites</p>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center">My Favorites</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="text-info">Bounties</h3>
          </div>
        </div>
        {this.props.favorites.bounties.length == 0 ? (
          <div className="row p-2 border-top align-items-center">
            <div className="col">
              <h4>You have no favorite bounties</h4>
            </div>
          </div>
        ) : (
          this.props.favorites.bounties.map(bounty => (
            <div
              className="row p-2 border-top align-items-center"
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
        <div className="row">
          <div className="col">
            <h3 className="text-info mt-5">Portfolios</h3>
          </div>
        </div>
        {this.props.favorites.portfolios.length == 0 ? (
          <div className="row p-2 border-top align-items-center">
            <div className="col">
              <h4>You have no favorite portfolios</h4>
            </div>
          </div>
        ) : (
          this.props.favorites.portfolios.map(portfolio => (
            <div
              className="row p-2 border-top align-items-center"
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
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.favorites,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
