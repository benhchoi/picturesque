import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPortfolios, searchPortfolios } from "../../actions/portfolios";
import ScrollingImages from "../common/ScrollingImages";
import ViewImageModal from "../common/ViewImageModal";
import Breadcrumbs from "../layout/Breadcrumbs";
import PortfolioHeader from "./PortfolioHeader";
import SearchBar from "../common/SearchBar";

export class Portfolios extends Component {
  static propTypes = {
    portfolios: PropTypes.array.isRequired,
    getPortfolios: PropTypes.func.isRequired,
    searchPortfolios: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const qs = require("query-string");
    const parsed = qs.parse(this.props.location.search);
    const search = parsed.search == null ? "" : parsed.search;

    this.state = {
      viewModal: "viewPic",
      imageSrc: "",
      imageDesc: "",
      search: search
    };
  }

  selectImage = e => {
    const { src, alt } = e.target;
    this.setState({
      imageSrc: src,
      imageDesc: alt
    });
  };

  componentDidMount() {
    if (this.state.search) {
      this.props.searchPortfolios(this.state.search);
    } else {
      this.props.getPortfolios();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.location.search &&
      prevProps.location.search !== this.props.location.search
    ) {
      const qs = require("query-string");
      const parsed = qs.parse(this.props.location.search);
      const search = parsed.search == null ? "" : parsed.search;
      this.setState({ search });
      this.props.searchPortfolios(search);
    }
  }

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
            <SearchBar url="/portfolios" search={this.state.search} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="text-center">Portfolios</h2>
          </div>
        </div>
        {this.props.portfolios.map((portfolio, i) => (
          <div
            className={i === 0 ? "row py-2" : "row py-2 border-top"}
            key={portfolio.id}
          >
            <div className="col">
              <PortfolioHeader portfolio={portfolio} linkTitle={true} />
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

const mapDispatchToProps = { getPortfolios, searchPortfolios };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
