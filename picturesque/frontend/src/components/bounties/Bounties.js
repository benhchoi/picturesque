import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounties, timeSince } from "../../actions/bounties";
import ScrollingImages from "../common/ScrollingImages";

export class Bounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getBounties: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getBounties();
  }

  render() {
    return (
      <div className="container">
        {this.props.bounties.map(bounty => (
          <div className="row m-2" key={bounty.id}>
            <div className="col">
              <h4>{bounty.title}</h4>
              <p className="d-inline">
                posted by {bounty.user.username} |{" "}
                {timeSince(new Date(bounty.timestamp))} ago |{" "}
              </p>
              <p className="d-inline text-success">${bounty.price}</p>
              <p className="d-inline">
                {bounty.tags.length == 0 ? "" : ` | #${bounty.tags}`}
              </p>
              <ScrollingImages
                images={bounty.reference_arts}
                onClick={() => {
                  return;
                }}
              />
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

const mapDispatchToProps = { getBounties };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bounties);
