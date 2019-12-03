import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounty } from "../../actions/bounties";
import ViewImageModal from "../common/ViewImageModal";
import Breadcrumbs from "../layout/Breadcrumbs";
import BountyHeader from "./BountyHeader";

export class Bounty extends Component {
  static propTypes = {
    getBounty: PropTypes.func.isRequired,
    bounty: PropTypes.object
  };

  state = {
    viewModal: "viewPic",
    imageSrc: "",
    imageDesc: ""
  };

  componentDidMount() {
    this.props.getBounty(this.props.match.params.id);
  }

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  render() {
    if (this.props.bounty == null) {
      return <p>No such bounty exists</p>;
    }

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <BountyHeader bounty={this.props.bounty} linkTitle={false} />
        <div className="row">
          <div className="col">
            <p className="text-secondary">{this.props.bounty.description}</p>
          </div>
        </div>
        {this.props.bounty.reference_arts.map((refArt, i) => {
          return (
            <div
              key={refArt.id}
              className={
                i === 0
                  ? "row py-2 align-items-center"
                  : "row py-2 align-items-center border-top"
              }
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bounty: state.bounties.bounty
});

const mapDispatchToProps = {
  getBounty
};

export default connect(mapStateToProps, mapDispatchToProps)(Bounty);
