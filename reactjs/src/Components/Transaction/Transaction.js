import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as transActions from "../../Actions/TransactionAction";
import * as accountActions from "../../Actions/AccountAction";
import Form from "react-bootstrap/Form";
import Card from "../Custom/Card";

import { styles } from "./Transaction-css";
import { ExpenseTags, TransactionTypes } from "../../Constants";
import CustomModal from "../Custom/CustomModal";

const Transaction = () => {
  const transactions = useSelector((state) => state.Transaction.transactions);

  const transactionTypes = useSelector(
    (state) => state.Transaction.transactionTypes
  );
  const expenseTags = useSelector((state) => state.Transaction.expenseTags);
  const accounts = useSelector((state) => state.Account.accounts);

  const initialFilters = {
    account: "-1",
    type: "-1",
    tag: "-1",
    amountFilter: "-1",
    amount: "-1",
  };

  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formError, setFormError] = useState({});
  const [typeValue, setTypeValue] = useState("");
  const [filterValues, setFilterValue] = useState(initialFilters);
  const [filterTypeValue, setFilterTypeValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transActions.getAllTransactions());
    dispatch(transActions.getAllTransactionTypes());
    dispatch(transActions.getAllExpenseTags());
    dispatch(accountActions.getAllAccounts());
  }, []);

  const showHandle = () => {
    setShow(true);
  };

  const hideHandle = () => {
    dispatch(transActions.getAllTransactions());
    setShow(false);
    setFormValues({});
    setTypeValue("");
    setFormError({});
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "transactionTypeId") {
      let data = value.split("+");
      value = data[0];
      setTypeValue(data[1]);
    }

    let form = { ...formValues, [name]: value };

    setFormValues(form);
  };
  const validate = (values) => {
    let form = {};
    let e = false;
    if (!values.transactionTypeId || values.transactionTypeId == "-1") {
      e = true;
      form = { ...form, transactionTypeId: "Select valid transaction type" };
    }

    if (typeValue == TransactionTypes.Expense) {
      if (!values.expenseTagId || values.expenseTagId == "-1") {
        e = true;
        form = { ...form, expenseTagId: "Select valid Expense tag" };
      }
    }

    if (
      typeValue == TransactionTypes.Expense ||
      typeValue == TransactionTypes.Transfer
    ) {
      if (!values.from || values.from == "-1") {
        e = true;
        form = { ...form, from: "Select valid account" };
      }
    }

    if (
      typeValue == TransactionTypes.Income ||
      typeValue == TransactionTypes.Transfer
    ) {
      if (!values.to || values.to == "-1") {
        e = true;
        form = { ...form, to: "Select valid account" };
      }
    }

    if (!values.amount || values.amount == "") {
      e = true;
      form = { ...form, amount: "Amount is required" };
    }

    setFormError(form);

    return e;
  };

  const handleAdd = () => {
    const e = validate(formValues);

    if (!e) {
      dispatch(transActions.addTransaction(formValues));
      dispatch(transActions.getAllTransactions());
      hideHandle();
      setShow(false);
    }
  };

  const handleFilter = (e) => {
    let { name, value } = e.target;
    let filters = { ...filterValues };
    if (name == "type") {
      if (value == "-1") {
        setFilterTypeValue("");
        filters = { ...filters, tag: "-1" };
      } else {
        let data = value.split("+");
        value = data[0];
        let type = data[1];
        if (type == TransactionTypes.Expense) {
          filters = { ...filters, tag: "-1" };
        }
        setFilterTypeValue(type);
      }
    }
    if (name == "amountFilter" && value == "-1") {
      filters = { ...filters, amount: "-1" };
    }

    if (filterTypeValue != TransactionTypes.Expense) {
      filters = { ...filters, tag: "-1" };
    }

    filters = { ...filters, [name]: value };

    setFilterValue(filters);
  };

  const applyFilter = (e) => {
    e.preventDefault();

    const keys = Object.keys(filterValues);

    // get filters without -1 value
    let queryValues = [];
    keys.map((k) => {
      if (filterValues[k] != "-1") {
        queryValues.push(k);
      }
    });

    // build query string
    let queryString = "";
    queryValues.map((q) => {
      if (q == "amount") {
      } else if (q == "amountFilter") {
        queryString +=
          filterValues["amountFilter"] + "=" + filterValues["amount"] + "&";
      } else {
        queryString += q + "=" + filterValues[q] + "&";
      }
    });

    dispatch(transActions.getAllTransactions(queryString));
  };

  return (
    <div style={{ width: "100%", paddingBottom: "30px", overflowY: "scroll" }}>
      <div style={styles.header}>
        <span style={styles.pageTitle}>Transactions</span>
        <div>
          <Button style={styles.btn} onClick={() => showHandle()}>
            Add +{" "}
          </Button>
        </div>
      </div>

      <Form.Label style={styles.formTitle}>filters :</Form.Label>
      <div style={styles.filterSelect}>
        <Form.Select
          size="sm"
          style={styles.filters}
          name="account"
          key="01"
          onChange={(e) => handleFilter(e)}
        >
          <option value="-1">By account/wallet</option>
          {accounts.map((t) => {
            return <option value={t._id}>{t.name}</option>;
          })}
        </Form.Select>
        <Form.Select
          size="sm"
          style={styles.filters}
          name="type"
          key="02"
          onChange={(e) => handleFilter(e)}
        >
          <option value="-1">By transaction type</option>
          {transactionTypes.map((t) => {
            return <option value={t._id + "+" + t.type}>{t.type}</option>;
          })}
        </Form.Select>
        {filterTypeValue == TransactionTypes.Expense ? (
          <Form.Select
            size="sm"
            style={styles.filters}
            name="tag"
            key="03"
            onChange={(e) => handleFilter(e)}
          >
            <option value="-1">By expense tag</option>
            {expenseTags.map((e) => {
              return <option value={e._id}>{e.tag}</option>;
            })}
          </Form.Select>
        ) : null}
        <Form.Select
          size="sm"
          style={styles.filters}
          name="amountFilter"
          key="04"
          onChange={(e) => handleFilter(e)}
        >
          <option value="-1">By amount</option>
          <option value="lt">Less than</option>
          <option value="gt">Greater than</option>
        </Form.Select>
        {!filterValues.amountFilter || filterValues?.amountFilter != "-1" ? (
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter amount"
            key="05"
            style={styles.filters}
            onChange={(e) => handleFilter(e)}
          />
        ) : null}
        <Button style={styles.yelloBtn} onClick={(e) => applyFilter(e)}>
          Apply
        </Button>
      </div>

      <div style={styles.tbl}>
        {transactions.length == 0 ? (
          <Card>
            <h6 style={{ color: "red" }}> No Transactions Found.</h6>
          </Card>
        ) : (
          <Table
            bordered
            hover
            style={{ borderColor: "black", marginTop: "15px" }}
          >
            <thead style={styles.tblHeader}>
              <tr>
                <th>#</th>
                <th>Transaction type</th>
                <th>Expense tag</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => {
                return (
                  <tr
                    key={t._id}
                    style={
                      t.transactionTypeId.type == TransactionTypes.Expense
                        ? styles.trExpense
                        : t.transactionTypeId.type == TransactionTypes.Income
                        ? styles.trIncome
                        : null
                    }
                  >
                    <td>{i + 1}</td>
                    <td>{t.transactionTypeId.type}</td>
                    <td>
                      {t.transactionTypeId.type == TransactionTypes.Expense
                        ? t.expenseTagId.tag
                        : "-"}
                    </td>
                    <td>{t.from?.name}</td>
                    <td>
                      {t.transactionTypeId.type == TransactionTypes.Transfer ||
                      t.transactionTypeId.type == TransactionTypes.Income
                        ? t.to?.name
                        : "-"}
                    </td>
                    <td>{t.amount}</td>
                    <td>{t.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      <CustomModal
        show={show}
        hide={hideHandle}
        title={"Add Transaction"}
        btnText={"Add"}
        click={handleAdd}
      >
        <Form>
          <Form.Group className="mb-3" key="1">
            <Form.Label style={styles.formTitle}>Transaction Type</Form.Label>
            <Form.Select
              name="transactionTypeId"
              onChange={(e) => handleChange(e)}
            >
              <option value="-1">--Select transaction type--</option>
              {transactionTypes.map((t) => {
                return <option value={t._id + "+" + t.type}>{t.type}</option>;
              })}
            </Form.Select>
            <span style={{ color: "red" }}>{formError.transactionTypeId}</span>
          </Form.Group>
          {typeValue == TransactionTypes.Expense ? (
            <Form.Group className="mb-3" key="2">
              <Form.Label style={styles.formTitle}>Expense Tag</Form.Label>
              <Form.Select
                name="expenseTagId"
                onChange={(e) => handleChange(e)}
              >
                <option value="-1">--Select expense tag--</option>
                {expenseTags.map((e) => {
                  return <option value={e._id}>{e.tag}</option>;
                })}
              </Form.Select>
              <span style={{ color: "red" }}>{formError.expenseTagId}</span>
            </Form.Group>
          ) : null}
          {typeValue == TransactionTypes.Expense ||
          typeValue == TransactionTypes.Transfer ? (
            <Form.Group className="mb-3" key="3">
              <Form.Label style={styles.formTitle}>From</Form.Label>
              <Form.Select name="from" onChange={(e) => handleChange(e)}>
                <option value="-1">--Select Account--</option>
                {accounts.map((t) => {
                  return <option value={t._id}>{t.name}</option>;
                })}
              </Form.Select>
              <span style={{ color: "red" }}>{formError.from}</span>
            </Form.Group>
          ) : null}
          {typeValue == TransactionTypes.Income ||
          typeValue == TransactionTypes.Transfer ? (
            <Form.Group className="mb-3" key="4">
              <Form.Label style={styles.formTitle}>To</Form.Label>
              <Form.Select name="to" onChange={(e) => handleChange(e)}>
                <option value="-1">--Select Account--</option>
                {accounts.map((t) => {
                  return <option value={t._id}>{t.name}</option>;
                })}
              </Form.Select>
              <span style={{ color: "red" }}>{formError.to}</span>
            </Form.Group>
          ) : null}
          <Form.Group className="mb-3" key="5">
            <Form.Label style={styles.formTitle}>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="Enter amount"
              onChange={(e) => handleChange(e)}
            />
            <span style={{ color: "red" }}>{formError.amount}</span>
          </Form.Group>
          <Form.Group className="mb-3" key="6">
            <Form.Label style={styles.formTitle}>Note</Form.Label>
            <Form.Control
              type="text"
              name="note"
              placeholder="Enter note"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Transaction;
