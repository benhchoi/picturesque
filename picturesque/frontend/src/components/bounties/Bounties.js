import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounties } from "../../actions/bounties";
import { timeSince } from "../../actions/utility";
import ScrollingImages from "../common/ScrollingImages";
import ViewImageModal from "../common/ViewImageModal";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class Bounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getBounties: PropTypes.func.isRequired
  };

  state = {
    viewModal: "viewPic",
    imageSrc: "",
    imageDesc: ""
  };

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  componentDidMount() {
    this.props.getBounties();
  }

  render() {
    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row">
          <div className="col">
            <h2 className="text-center">Bounties</h2>
          </div>
        </div>
        {this.props.bounties
          .filter(bounty => !bounty.completed)
          .map(bounty => (
            <div className="row p-2 border-top" key={bounty.id}>
              <div className="col">
                <h4>
                  <Link to={`/bounties/view/${bounty.id}`}>{bounty.title}</Link>
                </h4>
                <p className="d-inline">
                  posted by{" "}
                  <Link to={`/u/${bounty.user.username}`}>
                    {bounty.user.username}
                  </Link>{" "}
                  | {timeSince(new Date(bounty.timestamp))} |{" "}
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
                  onClick={this.selectImage}
                  modalTarget={this.state.viewModal}
                  selected={new Set()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Bounties);
