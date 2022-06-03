import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { styles } from "./Login-css";
import Card from "../Custom/Card";
import * as auth from "../../Actions/AuthAction";
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: props.user,
      error: props.error,
    };
  }

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  login = async () => {
    try {
      await this.props.login(this.state.username, this.state.password);
      this.setState({
        user: this.props.user,
        error: this.props.error,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div style={styles.bg}>
        {this.state.user ? <Navigate to="/" /> : null}
        <Card style={styles.card}>
          <h3 style={styles.h1}>Login to Spendee</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={styles.label}>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={(e) => this.changeHandler(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={styles.label}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={(e) => this.changeHandler(e)}
              />
            </Form.Group>
            <Button style={styles.btn} onClick={() => this.login()}>
              Login
            </Button>
            <span style={{ color: "red", marginLeft: "10px" }}>
              {this.state.error}
            </span>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    user: state.Auth.user,
    error: state.Auth.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    login: (username, password) => dispatch(auth.login(username, password)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Login);
