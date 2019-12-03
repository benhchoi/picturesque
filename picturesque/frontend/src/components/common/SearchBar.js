import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export default class SearchBar extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      search: this.props.search,
      redirect: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.redirect) {
      this.setState({
        redirect: false
      });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSearch = e => {
    e.preventDefault();
    const { search } = this.state;
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      const qs = require("query-string");
      const stringified = qs.stringify({ search: this.state.search });
      return <Redirect to={`${this.props.url}?${stringified}`} />;
    }

    return (
      <form className="form-inline my-1" onSubmit={this.onSearch}>
        <input
          className="form-control form-control-sm mr-sm-2"
          type="text"
          placeholder="Search"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
        />
        <button className="btn btn-sm btn-primary my-1" type="submit">
          Search
        </button>
      </form>
    );
  }
}
