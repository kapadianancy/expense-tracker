import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { connect } from "react-redux";
import * as AccountActions from "../../Actions/AccountAction";
import Card from "../Custom/Card";
import CustomModal from "../Custom/CustomModal";
import { styles } from "./Account-css";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      showAdd: false,
      formValues: {},
      message: props.message,
      editMode: false,
      editId: "",
      activeClicked: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.getAll();
    this.setState({
      accounts: this.props.accounts,
    });
  };

  handleShowAdd = () => {
    this.setState({ showAdd: true });
  };
  handleHideAdd = () => {
    this.setState({
      showAdd: false,
      formValues: {},
      editMode: false,
      activeClicked: false,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let { formValues } = this.state;
    formValues = { ...formValues, [name]: value };
    this.setState({ formValues });
  };

  handleAdd = (e) => {
    e.preventDefault();
    const { formValues } = this.state;
    this.props.addAccount(formValues);
    this.setState({
      showAdd: false,
      formValues: {},
    });
    this.fetchData();
  };

  handleDelete = (id) => {
    this.props.deleteAccount(id);
    alert("Deactivate Account/Wallet ?");
    this.fetchData();
    this.setState({ showAdd: false });
  };

  handleEdit = (data) => {
    this.setState({
      formValues: {
        name: data.name,
        balance: data.balance,
        isDeleted: data.isDeleted,
      },
      editMode: true,
      showAdd: true,
      editId: data._id,
    });
  };

  editAccount = () => {
    let { showAdd, formValues, activeClicked, editMode } = this.state;

    if (activeClicked) {
      formValues = { ...formValues, isDeleted: false };
    }

    this.props.editAccount(this.state.editId, formValues);
    formValues = {};
    showAdd = false;
    activeClicked = false;
    editMode = false;
    this.setState({ formValues, activeClicked, showAdd, editMode });
    this.fetchData();
  };

  handleActive = () => {
    let { activeClicked } = this.state;
    activeClicked = !activeClicked;
    this.setState({ activeClicked });
  };

  render() {
    return (
      <div
        style={{ width: "100%", paddingBottom: "30px", overflowY: "scroll" }}
      >
        <div style={styles.header}>
          <span style={styles.pageTitle}>Accounts / Wallets</span>
          <div>
            <Button style={styles.btn} onClick={() => this.handleShowAdd()}>
              Add +{" "}
            </Button>
          </div>
        </div>

        <ListGroup style={styles.list}>
          {this.props.accounts?.length == 0 ? (
            <ListGroup.Item>
              <Card>
                <h6 style={{ color: "red" }}> No Accounts/Wallets Found.</h6>
              </Card>
            </ListGroup.Item>
          ) : (
            this.props.accounts.map((a) => {
              return (
                <ListGroup.Item key={a._id}>
                  <Card style={{ marginLeft: "0", width: "100%" }}>
                    <div style={styles.title}>
                      <span style={{ flex: 1 }}>{a.name}</span>

                      <BsPencilFill
                        size="20px"
                        style={{ margin: "0px 5px", cursor: "pointer" }}
                        onClick={() => this.handleEdit(a)}
                      />
                      <BsFillTrashFill
                        size="20px"
                        style={{ margin: "0px 5px", cursor: "pointer" }}
                        onClick={() => this.handleDelete(a._id)}
                      />
                    </div>
                    <hr />
                    <div>Blanace : &#8377; {a.balance}</div>
                    <div>
                      Last Access Date : {new Date(a.updatedAt).toDateString()}
                    </div>
                    {a.isDeleted ? (
                      <span style={{ color: "red" }}>InActive</span>
                    ) : (
                      <span style={{ color: "green" }}>Active</span>
                    )}
                  </Card>
                </ListGroup.Item>
              );
            })
          )}
        </ListGroup>

        <CustomModal
          show={this.state.showAdd}
          hide={this.handleHideAdd}
          title={
            this.state.editMode ? "Edit Account/Wallet" : "Add Account/Wallet"
          }
          btnText={this.state.editMode ? "Edit" : "Add"}
          click={this.state.editMode ? this.editAccount : this.handleAdd}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={styles.formTitle}>
                Account/Wallet's name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={(e) => this.handleChange(e)}
                value={this.state.formValues.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={styles.formTitle}>Balance</Form.Label>
              <Form.Control
                type="number"
                name="balance"
                placeholder="Enter balance"
                onChange={(e) => this.handleChange(e)}
                value={this.state.formValues.balance}
              />
            </Form.Group>

            {this.state.editMode && this.state.formValues.isDeleted ? (
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="active"
                  label="Do you want to activate account/wallet ?"
                  onChange={() => this.handleActive()}
                />
              </Form.Group>
            ) : null}
          </Form>
        </CustomModal>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    accounts: state.Account.accounts,
    message: state.Account.message,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getAll: () => dispatch(AccountActions.getAllAccounts()),
    addAccount: (formValues) => dispatch(AccountActions.addAccount(formValues)),
    deleteAccount: (id) => dispatch(AccountActions.deleteAccount(id)),
    editAccount: (id, data) => dispatch(AccountActions.editAccount(id, data)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Account);
