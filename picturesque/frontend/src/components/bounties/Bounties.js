import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounties } from "../../actions/bounties";

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
          <div className="row" key={bounty.id}>
            <h4>{bounty.title}</h4>
            <h6>posted by {bounty.user}</h6>
            <div className="scrolling-wrapper">
              {bounty.reference_arts.map(bounty_art => (
                <div className="card"></div>
              ))}
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
