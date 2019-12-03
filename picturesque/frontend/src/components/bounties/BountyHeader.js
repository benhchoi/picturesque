import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CompleteButton from "../common/CompleteButton";
import ContactButton from "../common/ContactButton";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import FavoriteButton from "../common/FavoriteButton";
import { editBounty, deleteBounty } from "../../actions/bounties";
import { updateFavorites } from "../../actions/favorites";
import { timeSince } from "../../actions/utility";

export class BountyHeader extends Component {
  static propTypes = {
    bounty: PropTypes.object.isRequired,
    linkTitle: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    editBounty: PropTypes.func.isRequired,
    deleteBounty: PropTypes.func.isRequired,
    updateFavorites: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired
  };

  state = {
    redirect: false
  };

  onComplete = e => {
    e.preventDefault();
    const id = this.props.bounty.id;
    const completed = !this.props.bounty.completed;
    const bounty = { id, completed };
    this.props.editBounty(bounty);
  };

  onDelete = e => {
    e.preventDefault();
    const { id } = this.props.bounty;
    this.props.deleteBounty(id);
  };

  onFavorite = e => {
    e.preventDefault();

    if (!this.props.auth.isAuthenticated) {
      this.setState({
        redirect: true
      });
      return;
    }

    const id = this.props.auth.user.id;
    const bountyId = this.props.bounty.id;
    const bounties = this.props.favorites.includes(bountyId)
      ? this.props.favorites.filter(favorite => bountyId !== favorite)
      : [...this.props.favorites, bountyId];
    const favorites = { id, bounties };
    this.props.updateFavorites(favorites);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const { isAuthenticated, user } = this.props.auth;
    const bounty = this.props.bounty;

    const buttons =
      isAuthenticated && user.id === bounty.user.id ? (
        <div className="col-auto">
          <div className="btn-group" role="group">
            <CompleteButton
              completed={bounty.completed}
              id={`${bounty.id}`}
              onClick={this.onComplete}
            />
            <EditButton url={`/bounties/edit/${bounty.id}`} />
            <DeleteButton id={`${bounty.id}`} onClick={this.onDelete} />
          </div>
        </div>
      ) : (
        <div className="col-auto">
          <div className="btn-group" role="group">
            <FavoriteButton
              favorited={this.props.favorites.includes(bounty.id)}
              id={`${bounty.id}`}
              onClick={this.onFavorite}
            />
            <ContactButton email={bounty.user.email} />
          </div>
        </div>
      );

    return (
      <Fragment>
        <div className="row">
          <div className="col-auto mr-auto">
            <h4>
              {this.props.linkTitle ? (
                <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
              ) : (
                bounty.title
              )}
            </h4>
          </div>
          {buttons}
        </div>
        <div className="row">
          <div className="col">
            <p className="d-inline">
              posted by{" "}
              <Link to={`/u/${bounty.user.username}`}>
                {bounty.user.username}
              </Link>{" "}
              |{" "}
              {this.props.linkTitle ? (
                <Link to={`/bounties/view/${bounty.id}`}>
                  {timeSince(new Date(bounty.timestamp))}
                </Link>
              ) : (
                timeSince(new Date(bounty.timestamp))
              )}{" "}
              |{" "}
            </p>
            <a href={`mailto:${bounty.user.email}`}>
              <p className="d-inline text-success">${bounty.price}</p>
            </a>
            {bounty.tags.length == 0
              ? ""
              : bounty.tags.map(tag => {
                  return (
                    <div key={tag} className="d-inline">
                      <p className="d-inline"> | </p>
                      <Link to={`/bounties?search=${tag}`}>
                        <p className="d-inline text-info">#{tag}</p>
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  favorites: state.favorites.bounties.map(bounty => bounty.id)
});

const mapDispatchToProps = { editBounty, deleteBounty, updateFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(BountyHeader);
