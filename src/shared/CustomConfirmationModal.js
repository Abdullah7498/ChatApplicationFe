import React from "react";
import { Modal, Button } from "antd";

const CustomConfirmationModal = ({ visible, onConfirm, onCancel, message }) => {
  return (
    <Modal
      title="Confirmation"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          onClick={onConfirm}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          Confirm
        </Button>,
      ]}
      className="modal-custom"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default CustomConfirmationModal;
