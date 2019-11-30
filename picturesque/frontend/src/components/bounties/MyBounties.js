import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyBounties } from "../../actions/bounties";
import { checkUsername } from "../../actions/auth";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class MyBounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getMyBounties: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    checkUsername: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.checkUsername(username);
    this.props.getMyBounties(username);
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
            <h2 className="text-center">{displayName} Bounties</h2>
          </div>
        </div>
        {this.props.bounties.map(bounty => (
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
                  <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
                )}
              </h4>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bounties: state.bounties.bounties,
  auth: state.auth
});

const mapDispatchToProps = { getMyBounties, checkUsername };

export default connect(mapStateToProps, mapDispatchToProps)(MyBounties);
