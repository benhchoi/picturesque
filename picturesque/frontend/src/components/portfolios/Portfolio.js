import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolio, deletePortfolio } from "../../actions/portfolios";
import { updateFavorites } from "../../actions/favorites";
import { timeSince } from "../../actions/utility";
import { Link, Redirect } from "react-router-dom";
import ViewImageModal from "../common/ViewImageModal";
import Breadcrumbs from "../layout/Breadcrumbs";
import PortfolioHeader from "./PortfolioHeader";

export class Portfolio extends Component {
  static propTypes = {
    getPortfolio: PropTypes.func.isRequired,
    portfolio: PropTypes.object
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
    this.props.getPortfolio(this.props.match.params.id);
  }

  render() {
    if (this.props.portfolio == null) {
      return <p>No such portfolio exists</p>;
    }

    return (
      <div className="container">
        <Breadcrumbs path={this.props.location.pathname} />
        <ViewImageModal
          id={this.state.viewModal}
          image={this.state.imageSrc}
          description={this.state.imageDesc}
        />
        <PortfolioHeader portfolio={this.props.portfolio} linkTitle={false} />
        <div className="row">
          <div className="col">
            <p className="text-secondary">{this.props.portfolio.description}</p>
          </div>
        </div>
        {this.props.portfolio.artworks.map(art => {
          return (
            <div key={art.id} className="row p-2 align-items-center border-top">
              <div className="col-5">
                <img
                  src={art.image}
                  alt={art.description}
                  data-toggle="modal"
                  data-target={`#${this.state.viewModal}`}
                  onClick={this.selectImage}
                  className="img-fluid img-thumbnail clickable"
                />
              </div>
              <div className="col-7">
                <p className="text-center font-italic">{art.description}</p>
                {art.price == null ? (
                  <p className="text-danger text-center">
                    This item is not for sale
                  </p>
                ) : (
                  <p className="text-success text-center">
                    Buy this piece for ${art.price}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  portfolio: state.portfolios.portfolio,
  favorites: state.favorites.portfolios.map(portfolio => portfolio.id)
});

const mapDispatchToProps = {
  getPortfolio,
  deletePortfolio,
  updateFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
