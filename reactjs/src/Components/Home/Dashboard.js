import React from "react";
import Card from "../Custom/Card";
import { Colors } from "../../Constants";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsFillWalletFill,
  BsPatchPlusFill,
  BsPatchMinusFill,
} from "react-icons/bs";

import "./style.css";

const Dashboard = () => {
  const styles = {
    card: {
      margin: "20px  0px",
      width: "100%",
    },
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{ backgroundColor: Colors.yellow, ...styles.card }}>
              <div className="card-title">
                <BsFillWalletFill />
                <span style={{ marginLeft: "10px" }}>Accounts/Wallets</span>
              </div>
              <div className="card-body">4</div>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: Colors.lightBlue, ...styles.card }}>
              <div className="card-title">
                <BsPatchPlusFill />
                <span style={{ marginLeft: "10px" }}>Income</span>
              </div>
              <div className="card-body">25,000</div>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: Colors.yellow, ...styles.card }}>
              <div className="card-title">
                <BsPatchMinusFill />
                <span style={{ marginLeft: "10px" }}>Expense</span>
              </div>
              <div className="card-body">15,000</div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
