import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import actions from "./redux/actions/user";
import actions2 from "./redux/actions/admin";
import actions3 from "./redux/actions/permission_management"
import Layout from "./component/sidebar/Layout";
import messages from "./langs/messages";
import "./styles/App.scss";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./containers/LoginPageContainer";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Component } from "react";

class App extends Component {
  
  componentDidMount(){
    const {fetchAuthInfo} = this.props
    fetchAuthInfo()
  }

  render(){
    const {user} = this.props
    return (
      <IntlProvider >
        {user.isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
        {/* <Redirect to="/" /> */}
        <Switch>
          <Route exact path="/">
            <Layout logout={user.isAuthenticated} />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout(params) {
    dispatch(actions.logout(params));
  },
  fetchAuthInfo:(callback)=>{
    dispatch(actions2.userAuthorInfoAction(callback))
  },
  getPermission: (callback) => {
    dispatch(actions3.getPermission(callback));
  },
  getAction:(callback)=>{
    dispatch(actions3.getAction(callback))
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
