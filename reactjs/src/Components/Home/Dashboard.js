import React, { useState, useEffect } from "react";
import Card from "../Custom/Card";
import { Colors } from "../../Constants";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsFillWalletFill,
  BsPatchPlusFill,
  BsPatchMinusFill,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import * as AccountActions from "../../Actions/AccountAction";
import * as TransactionAction from "../../Actions/TransactionAction";

import "./style.css";

const Dashboard = () => {
  const styles = {
    card: {
      margin: "20px  0px",
      width: "100%",
    },
  };
  const dispatch = useDispatch();
  const count = useSelector((state) => state.Account.count);
  const totalBalance = useSelector((state) => state.Account.totalBalance);
  const totalIncome = useSelector((state) => state.Transaction.totalIncome);
  const totalExpense = useSelector((state) => state.Transaction.totalExpense);

  useEffect(() => {
    dispatch(AccountActions.getAccountCount());
    dispatch(AccountActions.getTotalAccountBalance());
    dispatch(TransactionAction.getTotalIncome());
    dispatch(TransactionAction.getTotalExpense());
  }, []);

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
              <div className="card-body">{count}</div>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: Colors.lightBlue, ...styles.card }}>
              <div className="card-title">
                <BsFillCreditCardFill />
                <span style={{ marginLeft: "10px" }}>Accumulated Balance</span>
              </div>
              <div className="card-body">&#8377; {totalBalance}</div>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: Colors.yellow, ...styles.card }}>
              <div className="card-title">
                <BsPatchPlusFill />
                <span style={{ marginLeft: "10px" }}>Accumulated Income</span>
              </div>
              <div className="card-body">&#8377; {totalIncome}</div>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: Colors.lightBlue, ...styles.card }}>
              <div className="card-title">
                <BsPatchMinusFill />
                <span style={{ marginLeft: "10px" }}>Accumulated Expense</span>
              </div>
              <div className="card-body">&#8377; {totalExpense}</div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
