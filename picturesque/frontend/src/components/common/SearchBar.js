import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  static propTypes = {
    searchFunc: PropTypes.func.isRequired
  };

  state = {
    search: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSearch = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.searchFunc(search);
  };

  render() {
    return (
      <div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch}>
          <input
            className="form-control form-control-sm mr-sm-2"
            type="text"
            placeholder="Search"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
          />
          <button className="btn btn-sm btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}
