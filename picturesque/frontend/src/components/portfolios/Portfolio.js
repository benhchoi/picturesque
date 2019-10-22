import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolio } from "../../actions/portfolios";
import { timeSince } from "../../actions/utility";

export class Portfolio extends Component {
  static propTypes = {
    getPortfolio: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPortfolio(this.props.match.params.id);
  }

  render() {
    if (this.props.portfolio == null) {
      return null;
    }

    return (
      <div className="container">
        <div className="row m-2">
          <div className="col">
            <h2>{this.props.portfolio.title}</h2>
            <p className="d-inline">
              posted by {this.props.portfolio.user.username} |{" "}
              {timeSince(new Date(this.props.portfolio.timestamp))} ago |{" "}
            </p>
            <p className="d-inline text-success">
              ${this.props.portfolio.rate}
            </p>
            {this.props.portfolio.tags.length == 0
              ? ""
              : this.props.portfolio.tags.map(tag => {
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
            <p className="text-secondary">{this.props.portfolio.description}</p>
          </div>
        </div>
        {this.props.portfolio.artworks.map(art => {
          return (
            <div key={art.id} className="row p-2 align-items-center border-top">
              <div className="col-5">
                <img
                  src={art.image}
                  alt={art.id}
                  className="img-fluid img-thumbnail"
                />
              </div>
              <div className="col-7">
                <p className="text-center font-italic">{art.description}</p>
                {art.price == null ? (
                  <p className="text-danger text-center">
                    "This item is not for sale"
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
  portfolio: state.portfolios.portfolio
});

const mapDispatchToProps = { getPortfolio };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
