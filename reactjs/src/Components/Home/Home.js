import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../Account/Account";

import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar.";
import Transaction from "../Transaction/Transaction";
import Dashboard from "./Dashboard";
import * as AuthActions from "../../Actions/AuthAction";

import "./style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "/",
      pageElement: <Dashboard />,
    };
  }
  componentDidMount() {
    this.props.getUser();
  }
  setActivelink = (link) => {
    let result = null;
    switch (link) {
      case "/":
        result = <Dashboard />;
        break;
      case "/transaction":
        result = <Transaction />;
        break;
      case "/account":
        result = <Account />;
        break;
      default:
        result = <h1>Something went wrong!</h1>;
    }
    this.setState({
      activeLink: link,
      pageElement: result,
    });
  };

  render() {
    return (
      <>
        {this.props.user ? null : <Navigate to="/login" />}
        <Header user={this.props.userData?.username} />
        <div id="page">
          <Sidebar
            activeLink={this.state.activeLink}
            setActivelink={this.setActivelink}
          />

          {this.state.pageElement}
        </div>
      </>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    user: state.Auth.user,
    userData: state.Auth.userData,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getUser: () => dispatch(AuthActions.getUser()),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);
