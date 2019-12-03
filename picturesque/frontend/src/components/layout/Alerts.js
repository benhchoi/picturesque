import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username)
        alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.password)
        alert.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.title) alert.error(`Title: ${error.msg.title.join()}`);
      if (error.msg.description)
        alert.error(`Description: ${error.msg.description.join()}`);
      if (error.msg.price) alert.error(`Price: ${error.msg.price.join()}`);
      if (error.msg.rate) alert.error(`Rate: ${error.msg.rate.join()}`);
      if (error.msg.reference_arts)
        alert.error(`Reference Art: ${error.msg.reference_arts.join()}`);
      if (error.msg.artworks)
        alert.error(`Artwork: ${error.msg.artworks.join()}`);
      if (error.msg.image) alert.error(`Image: ${error.msg.image.join()}`);
      if (error.msg.tags) alert.error(`Tags: ${error.msg.tags.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.userDNE) alert.error(message.userDNE);
      if (message.login) alert.success(message.login);
      if (message.register) alert.success(message.register);
      if (message.logout) alert.success(message.logout);
      if (message.uploadRefArt) alert.success(message.uploadRefArt);
      if (message.deleteBounty) alert.success(message.deleteBounty);
      if (message.addBounty) alert.success(message.addBounty);
      if (message.editBounty) alert.success(message.editBounty);
      if (message.updateFavorites) alert.success(message.updateFavorites);
      if (message.uploadArtwork) alert.success(message.uploadArtwork);
      if (message.deletePortfolio) alert.success(message.deletePortfolio);
      if (message.addPortfolio) alert.success(message.addPortfolio);
      if (message.editPortfolio) alert.success(message.editPortfolio);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(Alerts));
