import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class Favorites extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    bounties: PropTypes.array.isRequired,
    portfolios: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
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
        {this.props.bounties.length == 0 ? (
          <div className="row p-2 border-top align-items-center">
            <div className="col">
              <h4>You have no favorite bounties</h4>
            </div>
          </div>
        ) : (
          this.props.bounties.map(bounty => (
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
        {this.props.portfolios.length == 0 ? (
          <div className="row p-2 border-top align-items-center">
            <div className="col">
              <h4>You have no favorite portfolios</h4>
            </div>
          </div>
        ) : (
          this.props.portfolios.map(portfolio => (
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
  bounties: state.favorites.bounties,
  portfolios: state.favorites.portfolios,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
