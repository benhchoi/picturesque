import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import Home from "./home/Home";
import Buy from "./home/Buy";
import Sell from "./home/Sell";
import Bounties from "./bounties/Bounties";
import CreateBounty from "./bounties/CreateBounty";
import Bounty from "./bounties/Bounty";
import EditBounty from "./bounties/EditBounty";
import MyBounties from "./bounties/MyBounties";
import Portfolios from "./portfolios/Portfolios";
import CreatePortfolio from "./portfolios/CreatePortfolio";
import Portfolio from "./portfolios/Portfolio";
import EditPortfolio from "./portfolios/EditPortfolio";
import MyPortfolios from "./portfolios/MyPortfolios";
import Favorites from "./favorites/Favorites";
import Profile from "./accounts/Profile";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/buy" component={Buy} />
                  <Route exact path="/sell" component={Sell} />

                  <Route exact path="/bounties" component={Bounties} />
                  <PrivateRoute
                    exact
                    path="/bounties/create"
                    component={CreateBounty}
                  />
                  <PrivateRoute
                    exact
                    path="/bounties/edit/:id"
                    component={EditBounty}
                  />
                  <Route exact path="/bounties/view/:id" component={Bounty} />
                  <Route
                    exact
                    path="/u/:username/bounties"
                    component={MyBounties}
                  />
                  <Route exact path="/portfolios" component={Portfolios} />
                  <PrivateRoute
                    exact
                    path="/portfolios/create"
                    component={CreatePortfolio}
                  />
                  <PrivateRoute
                    exact
                    path="/portfolios/edit/:id"
                    component={EditPortfolio}
                  />
                  <Route
                    exact
                    path="/portfolios/view/:id"
                    component={Portfolio}
                  />
                  <Route
                    exact
                    path="/u/:username/portfolios"
                    component={MyPortfolios}
                  />
                  <Route
                    exact
                    path="/u/:username/favorites"
                    component={Favorites}
                  />
                  <Route exact path="/u/:username" component={Profile} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
