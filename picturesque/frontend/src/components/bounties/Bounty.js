import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounty } from "../../actions/bounties";
import { timeSince } from "../../actions/utility";

export class Bounty extends Component {
  static propTypes = {
    getBounty: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getBounty(this.props.match.params.id);
  }

  render() {
    if (this.props.bounty == null) {
      return null;
    }

    return (
      <div className="container">
        <div className="row m-2">
          <div className="col">
            <h2>{this.props.bounty.title}</h2>
            <p className="d-inline">
              posted by {this.props.bounty.user.username} |{" "}
              {timeSince(new Date(this.props.bounty.timestamp))} ago |{" "}
            </p>
            <p className="d-inline text-success">${this.props.bounty.price}</p>
            {this.props.bounty.tags.length == 0
              ? ""
              : this.props.bounty.tags.map(tag => {
                  return (
                    <div key={tag} className="d-inline">
                      <p className="d-inline"> | </p>
                      <p className="d-inline text-info">#{tag}</p>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            <p className="text-secondary">{this.props.bounty.description}</p>
          </div>
        </div>
        {this.props.bounty.reference_arts.map(refArt => {
          return (
            <div
              key={refArt.id}
              className="row p-2 align-items-center border-top"
            >
              <div className="col-5">
                <img
                  src={refArt.image}
                  alt={refArt.id}
                  className="img-fluid img-thumbnail"
                />
              </div>
              <div className="col-7">
                <p className="text-center font-italic">{refArt.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bounty: state.bounties.bounty
});

const mapDispatchToProps = { getBounty };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bounty);
