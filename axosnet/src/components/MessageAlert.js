import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MessageAlert = ({ message, variant, clearAlert }) => {
  const [visible, setVisible] = useState(variant ? true : false);

  const handleClose = reason => {
    clearAlert();
    setVisible(!visible);
  };

  return (
    <Modal isOpen={visible} toggle={handleClose} backdrop="static" keyboard={false}>
      <ModalHeader>Mensaje</ModalHeader>
      <ModalBody style={{ textAlign: "center" }}>
        <p style={{ textAlign: "left" }}>{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MessageAlert;
