import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBounties, searchBounties } from "../../actions/bounties";
import ScrollingImages from "../common/ScrollingImages";
import ViewImageModal from "../common/ViewImageModal";
import Breadcrumbs from "../layout/Breadcrumbs";
import BountyHeader from "./BountyHeader";
import SearchBar from "../common/SearchBar";

export class Bounties extends Component {
  static propTypes = {
    bounties: PropTypes.array.isRequired,
    getBounties: PropTypes.func.isRequired,
    searchBounties: PropTypes.func.isRequired
  };

  state = {
    viewModal: "viewPic",
    imageSrc: "",
    imageDesc: ""
  };

  componentDidMount() {
    this.props.getBounties();
  }

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  render() {
    return (
      <div className="container">
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <div className="row">
          <div className="col-auto mr-auto">
            <Breadcrumbs path={this.props.location.pathname} />
          </div>
          <div className="col-auto">
            <SearchBar searchFunc={this.props.searchBounties} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="text-center">Bounties</h2>
          </div>
        </div>
        {this.props.bounties
          .filter(bounty => !bounty.completed)
          .map((bounty, i) => (
            <div
              className={i === 0 ? "row py-2" : "row py-2 border-top"}
              key={bounty.id}
            >
              <div className="col">
                <BountyHeader bounty={bounty} linkTitle={true} />
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

const mapDispatchToProps = { getBounties, searchBounties };

export default connect(mapStateToProps, mapDispatchToProps)(Bounties);
