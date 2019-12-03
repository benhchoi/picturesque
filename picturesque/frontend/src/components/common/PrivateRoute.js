import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <p>Loading...</p>;
        } else if (!auth.isAuthenticated) {
          this.props.createMessage({
            privateRouteFail: "You must be logged in to access this page"
          });
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { createMessage };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
