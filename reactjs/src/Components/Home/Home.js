import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar.";
import Dashboard from "./Dashboard";

import "./style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "/",
      pageElement: <Dashboard />,
    };
  }
  setActivelink = (link) => {
    let result = null;
    switch (link) {
      case "/":
        result = <Dashboard />;
        break;
      case "/transaction":
        result = <h1>transaction</h1>;
        break;
      case "/account":
        result = <h1>account</h1>;
        break;
      case "/report":
        result = <h1>report</h1>;
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
        <Header />
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
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);
