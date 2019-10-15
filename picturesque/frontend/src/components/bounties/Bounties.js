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
      <Fragment>
        <h1>Bounties</h1>
      </Fragment>
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
