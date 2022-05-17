import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import { styles } from "./Login-css";
import Card from "../Custom/Card";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div style={styles.bg}>
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
            <Button style={styles.btn}>Login</Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
