import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ViewImageModal from "../common/ViewImageModal";
import { editBounty, deleteBounty } from "../../actions/bounties";
import { updateFavorites } from "../../actions/favorites";
import CompleteButton from "../common/CompleteButton";
import ContactButton from "../common/ContactButton";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import FavoriteButton from "../common/FavoriteButton";
import { createMessage } from "../../actions/messages";

export class MyBountyHeader extends Component {
  static propTypes = {
    bounty: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    editBounty: PropTypes.func.isRequired,
    deleteBounty: PropTypes.func.isRequired,
    updateFavorites: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  state = {
    redirect: false,
    viewModal: `view${this.props.bounty.id}`,
    imageSrc: "",
    imageDesc: ""
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
      this.props.createMessage({
        favoriteFail: "You must be logged in to favorite a bounty"
      });
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

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const bounty = this.props.bounty;
    const refArt = bounty.reference_arts[0];
    const { isAuthenticated, user } = this.props.auth;
    const sameUser = isAuthenticated && user.id === bounty.user.id;

    const buttons = sameUser ? (
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
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row">
          <div className="col-4">
            <img
              src={refArt.image}
              alt={refArt.description}
              className="img-fluid img-thumbnail clickable"
              data-toggle="modal"
              data-target={`#${this.state.viewModal}`}
              onClick={this.selectImage}
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-auto mr-auto">
                <h4>
                  <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
                </h4>
              </div>
              <div className="col-auto">{buttons}</div>
            </div>
            <div className="row">
              <div className="col">
                <p className="text-secondary">{bounty.description}</p>
              </div>
            </div>
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

const mapDispatchToProps = {
  editBounty,
  deleteBounty,
  updateFavorites,
  createMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBountyHeader);
