import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {isAuthenticated ? `${user.username}` : ""}
          </a>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to={isAuthenticated ? "/create" : "#"}
            >
              Create
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to={isAuthenticated ? `/u/${user.username}/favorites` : "#"}
            >
              My Favorites
            </Link>
            <Link
              className="dropdown-item"
              to={isAuthenticated ? `/u/${user.username}/bounties` : "#"}
            >
              My Bounties
            </Link>
            <Link
              className="dropdown-item"
              to={isAuthenticated ? `/u/${user.username}/portfolios` : "#"}
            >
              My Portfolios
            </Link>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={this.props.logout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Picturesque
          </a>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
