import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounty, deleteBounty, editBounty } from "../../actions/bounties";
import { timeSince } from "../../actions/utility";
import { Link, Redirect } from "react-router-dom";
import RefArtViewModal from "./RefArtViewModal";

export class Bounty extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getBounty: PropTypes.func.isRequired,
    editBounty: PropTypes.func.isRequired,
    bounty: PropTypes.object
  };

  state = {
    deleted: false,
    viewModal: "viewPic",
    imageSrc: "",
    imageDesc: ""
  };

  componentDidMount() {
    this.props.getBounty(this.props.match.params.id);
  }

  onDelete = e => {
    e.preventDefault();
    this.props.deleteBounty(this.props.bounty.id);
    this.setState({ deleted: true });
  };

  onComplete = e => {
    e.preventDefault();
    const { id } = this.props.bounty;
    const completed = !this.props.bounty.completed;
    const bounty = { id, completed };
    this.props.editBounty(bounty);
  };

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  render() {
    if (this.state.deleted) {
      return <Redirect to="/bounties" />;
    }

    if (this.props.bounty == null) {
      return <p>No such bounty exists.</p>;
    }

    const { isAuthenticated, user } = this.props.auth;

    const authButtons = (
      <div className="row p-2 border-top">
        <div className="col">
          <Link
            className="btn btn-primary m-1"
            to={`/bounties/edit/${this.props.bounty.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={this.onDelete}
          >
            Delete
          </button>
          {this.props.bounty.completed ? (
            <button
              type="button"
              className="btn btn-info m-1"
              onClick={this.onComplete}
            >
              Mark as Incomplete
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success m-1"
              onClick={this.onComplete}
            >
              Mark as Complete
            </button>
          )}
        </div>
      </div>
    );

    const guestButtons = (
      <div className="row p-2 border-top">
        <div className="col">
          <a
            className="btn btn-primary"
            href={`mailto: ${this.props.bounty.user.email}`}
          >
            Contact
          </a>
        </div>
      </div>
    );

    return (
      <div className="container">
        <RefArtViewModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row m-2">
          <div className="col">
            <h2>{this.props.bounty.title}</h2>
            <p className="d-inline">
              posted by {this.props.bounty.user.username} |{" "}
              {timeSince(new Date(this.props.bounty.timestamp))} |{" "}
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
                  alt={refArt.description}
                  className="img-fluid img-thumbnail clickable"
                  data-toggle="modal"
                  data-target={`#${this.state.viewModal}`}
                  onClick={this.selectImage}
                />
              </div>
              <div className="col-7">
                <p className="text-center font-italic">{refArt.description}</p>
              </div>
            </div>
          );
        })}
        {isAuthenticated && user.id === this.props.bounty.user.id
          ? authButtons
          : guestButtons}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bounty: state.bounties.bounty,
  auth: state.auth
});

const mapDispatchToProps = { getBounty, deleteBounty, editBounty };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bounty);
