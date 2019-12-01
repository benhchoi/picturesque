import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";
import { checkUsername } from "../../actions/auth";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    checkUsername: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.checkUsername(this.props.match.params.username);
  }

  render() {
    if (this.props.auth.isLoading) {
      return <p>Loading...</p>;
    } else if (!this.props.auth.isLoading && !this.props.auth.validUsername) {
      return <p>No such user exists</p>;
    }

    const { username } = this.props.match.params;
    const { isAuthenticated, user } = this.props.auth;

    const displayName =
      isAuthenticated && username === user.username ? "my" : `${username}'s`;

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <div className="row vertical-center">
          <div className="col">
            <div className="row">
              <div className="col">
                <h1 className="text-center">
                  I would like to see {displayName}...
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="jumbotron">
                  <Link to={`/u/${username}/favorites`}>
                    <h2 className="text-center">Favorites</h2>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="jumbotron">
                  <Link to={`/u/${username}/bounties`}>
                    <h2 className="text-center">Bounties</h2>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="jumbotron">
                  <Link to={`/u/${username}/portfolios`}>
                    <h2 className="text-center">Portfolios</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { checkUsername };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
