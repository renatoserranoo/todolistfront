import React from 'react';
import { Modal, Button } from "react-bootstrap";

const DeleteTaskModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja realmente excluir esta tarefa?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Não
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTaskModal;