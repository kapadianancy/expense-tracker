import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Colors } from "../../Constants";
import { styles } from "./style-css";

const CustomModal = ({ show, hide, title, children, btnText, click }) => {
  return (
    <Modal show={show} onHide={hide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title style={styles.modalTitle}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" style={styles.smokeBtn} onClick={hide}>
          Close
        </Button>
        <Button
          variant="primary"
          style={styles.yelloBtn}
          onClick={(e) => click(e)}
        >
          {btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
