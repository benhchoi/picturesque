import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyPortfolios } from "../../actions/portfolios";
import { checkUsername } from "../../actions/auth";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class MyPortfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array.isRequired,
    getMyPortfolios: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    checkUsername: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.checkUsername(username);
    this.props.getMyPortfolios(username);
  }

  render() {
    if (this.props.auth.isLoading) {
      return <p>Loading...</p>;
    } else if (!this.props.auth.validUsername) {
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
            <h2 className="text-center">{displayName} portfolios</h2>
          </div>
        </div>
        {this.props.portfolios.length == 0 ? (
          <div className="row align-items-center">
            <div className="col">
              <h4>No portfolios to show</h4>
            </div>
          </div>
        ) : (
          this.props.portfolios.map((portfolio, i) => (
            <div
              className={
                i == 0
                  ? "row align-items-center"
                  : "row align-items-center pt-2 border-top"
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
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolios.portfolios,
  auth: state.auth
});

const mapDispatchToProps = { getMyPortfolios, checkUsername };

export default connect(mapStateToProps, mapDispatchToProps)(MyPortfolios);
