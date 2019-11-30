import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolios } from "../../actions/portfolios";
import { timeSince } from "../../actions/utility";
import ScrollingImages from "../common/ScrollingImages";
import ViewImageModal from "../common/ViewImageModal";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export class Portfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array.isRequired,
    getPortfolios: PropTypes.func.isRequired
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
    this.props.getPortfolios();
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
            <h2 className="text-center">Portfolios</h2>
          </div>
        </div>
        {this.props.portfolios.map(portfolio => (
          <div className="row p-2 border-top" key={portfolio.id}>
            <div className="col">
              <h4>
                <Link to={`/portfolios/view/${portfolio.id}`}>
                  {portfolio.title}
                </Link>
              </h4>
              <p className="d-inline">
                posted by{" "}
                <Link to={`/u/${portfolio.user.username}`}>
                  {portfolio.user.username}
                </Link>{" "}
                | {timeSince(new Date(portfolio.timestamp))} |{" "}
              </p>
              <p className="d-inline text-success">${portfolio.rate}</p>
              {portfolio.tags.length == 0
                ? ""
                : portfolio.tags.map(tag => {
                    return (
                      <div key={tag} className="d-inline">
                        <p className="d-inline"> | </p>
                        <p className="d-inline text-info">#{tag}</p>
                      </div>
                    );
                  })}
              <ScrollingImages
                images={portfolio.artworks}
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
  portfolios: state.portfolios.portfolios
});

const mapDispatchToProps = { getPortfolios };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
