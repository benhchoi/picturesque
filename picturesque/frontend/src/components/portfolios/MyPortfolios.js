import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyPortfolios } from "../../actions/portfolios";
import { Link } from "react-router-dom";

export class MyPortfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array.isRequired,
    getMyPortfolios: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getMyPortfolios();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center">My portfolios</h2>
          </div>
        </div>
        {this.props.portfolios.map(portfolio => (
          <div
            className="row p-2 border-top align-items-center"
            key={portfolio.id}
          >
            <div className="col">
              <h4>
                <Link to={`/portfolios/view/${portfolio.id}`}>
                  {portfolio.title}
                </Link>
              </h4>
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

const mapDispatchToProps = { getMyPortfolios };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPortfolios);
