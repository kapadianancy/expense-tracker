import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styles } from "./Header-css";
import { BsPersonCircle } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as AuthAction from "../../Actions/AuthAction";

const Header = () => {
  const path = "../assets/images/logo-1.png";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const logut = () => {
    dispatch(AuthAction.logout());
  };

  return (
    <header style={styles.header}>
      <img src={path} style={styles.logo} />
      <h2 style={styles.title}>Spendee</h2>
      <h3 style={styles.user}>
        <BsPersonCircle onClick={() => setShow(true)} />
      </h3>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            NO
          </Button>
          <Button style={styles.btn} variant="primary" onClick={() => logut()}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
