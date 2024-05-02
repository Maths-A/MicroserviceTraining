import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Pour accéder au root de votre application

const PopupModal = ({ isOpen, message, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Response</h2>
      <p>{message}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default PopupModal;