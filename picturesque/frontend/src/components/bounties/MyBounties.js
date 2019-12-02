import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyBounties } from "../../actions/bounties";
import { checkUsername } from "../../actions/auth";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";
import MyBountyHeader from "./MyBountyHeader";

export class MyBounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getMyBounties: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    checkUsername: PropTypes.func.isRequired
  };

  state = {
    incomplete: [],
    completed: []
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.checkUsername(username);
    this.props.getMyBounties(username);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bounties !== this.props.bounties) {
      this.setState((_, props) => ({
        incomplete: props.bounties.filter(bounty => !bounty.completed),
        completed: props.bounties.filter(bounty => bounty.completed)
      }));
    }
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
        <div className="accordian">
          <div className="card">
            <div
              className="card-header clickable"
              data-toggle="collapse"
              data-target="#incomplete"
            >
              <h3 className="text-info">Incomplete</h3>
            </div>
            <div className="collapse show" id="incomplete">
              <div className="card-body">
                {this.state.incomplete.length == 0 ? (
                  <div className="row align-items-center">
                    <div className="col">
                      <h4>No incomplete bounties to show</h4>
                    </div>
                  </div>
                ) : (
                  this.state.incomplete.map((bounty, i) => (
                    <div
                      className={
                        i == 0
                          ? "row align-items-center p-2"
                          : "row align-items-center p-2 border-top"
                      }
                      key={bounty.id}
                    >
                      <div className="col">
                        <MyBountyHeader bounty={bounty} />
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
              data-target="#completed"
            >
              <h3 className="text-success">Completed</h3>
            </div>
            <div className="collapse show" id="completed">
              <div className="card-body">
                {this.state.completed.length == 0 ? (
                  <div className="row align-items-center">
                    <div className="col">
                      <h4>No completed bounties to show</h4>
                    </div>
                  </div>
                ) : (
                  this.state.completed.map((bounty, i) => (
                    <div
                      className={
                        i == 0
                          ? "row align-items-center p-2"
                          : "row align-items-center p-2 border-top"
                      }
                      key={bounty.id}
                    >
                      <div className="col">
                        <MyBountyHeader bounty={bounty} />
                      </div>
                    </div>
                  ))
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
  bounties: state.bounties.bounties,
  auth: state.auth
});

const mapDispatchToProps = { getMyBounties, checkUsername };

export default connect(mapStateToProps, mapDispatchToProps)(MyBounties);
