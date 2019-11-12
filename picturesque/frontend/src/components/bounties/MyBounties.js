import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyBounties } from "../../actions/bounties";
import { Link } from "react-router-dom";

export class MyBounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getMyBounties: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getMyBounties();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center">My Bounties</h2>
          </div>
        </div>
        {this.props.bounties.map(bounty => (
          <div
            className="row p-2 border-top align-items-center"
            key={bounty.id}
          >
            <div className="col">
              <h4>
                <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bounties: state.bounties.bounties
});

const mapDispatchToProps = { getMyBounties };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBounties);
