import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounties } from "../../actions/bounties";
import { timeSince } from "../../actions/utility";
import ScrollingImages from "../common/ScrollingImages";
import { Link } from "react-router-dom";

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
          <div className="row p-2 border-bottom" key={bounty.id}>
            <div className="col">
              <h4>
                <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
              </h4>
              <p className="d-inline">
                posted by {bounty.user.username} |{" "}
                {timeSince(new Date(bounty.timestamp))} ago |{" "}
              </p>
              <p className="d-inline text-success">${bounty.price}</p>
              {bounty.tags.length == 0
                ? ""
                : bounty.tags.map(tag => {
                    return (
                      <div key={tag} className="d-inline">
                        <p className="d-inline"> | </p>
                        <p className="d-inline text-info">#{tag}</p>
                      </div>
                    );
                  })}
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
