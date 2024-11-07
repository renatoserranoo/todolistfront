import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTaskModal = ({
  show,
  onHide,
  formData,
  onInputChange,
  onSave,
  selectedTask,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedTask ? "Editar Tarefa" : "Nova Tarefa"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Tarefa</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Custo (R$)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="custo"
              value={formData.custo}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Limite</Form.Label>
            <Form.Control
              type="date"
              name="data_limite"
              value={formData.data_limite}
              onChange={onInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
