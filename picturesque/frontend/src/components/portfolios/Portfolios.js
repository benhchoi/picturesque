import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolios } from "../../actions/portfolios";
import { timeSince } from "../../actions/utility";
import ScrollingImages from "../common/ScrollingImages";
import { Link } from "react-router-dom";

export class Portfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array.isRequired,
    getPortfolios: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPortfolios();
  }

  render() {
    return (
      <div className="container">
        {this.props.portfolios.map(portfolio => (
          <div className="row p-2 border-bottom" key={portfolio.id}>
            <div className="col">
              <h4>
                <Link to={`/portfolios/view/${portfolio.id}`}>
                  {portfolio.title}
                </Link>
              </h4>
              <p className="d-inline">
                posted by {portfolio.user.username} |{" "}
                {timeSince(new Date(portfolio.timestamp))} ago |{" "}
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
                onClick={() => {
                  return;
                }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolios);
