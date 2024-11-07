import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Card.css"

const Card = ({
  task,
  index,
  totalTasks,
  onEdit,
  onDelete,
  onMove,
  formatCurrency,
  formatDate,
}) => {
  return (
    <div className="task-item p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div
        className="card h-100 shadow-sm"
        style={{
          border: "0",
          backgroundColor: "#f9e5e6",
        }}
      >
        <div
          style={{
            backgroundColor: "#c4273f",
            color: "#fff",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-title" style={{ margin: "0" }}>
            {task.nome}
          </h5>
          <div className="d-flex gap-1 align-items-center">
            <Button
              variant="link"
              size="sm"
              className="move-button-up d-flex align-items-center p-2"
              onClick={() => onMove(task.id, "up")}
              disabled={index === 0}
              style={{ color: "#fff" }}
            >
              <i className="fas fa-arrow-up"></i>
            </Button>
            <Button
              variant="link"
              size="sm"
              className="move-button-down d-flex align-items-center p-2"
              onClick={() => onMove(task.id, "down")}
              disabled={index === totalTasks - 1}
              style={{ color: "#fff" }}
            >
              <i className="fas fa-arrow-down"></i>
            </Button>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-2">
            <small className="text-muted d-block mb-1">Custo:</small>
            <span
              className={`badge ${
                Number(task.custo) >= 1000 ? "bg-warning" : "bg text-dark"
              } p-2`}
              style={{ fontSize: "1rem" }}
            >
              {formatCurrency(task.custo)}
            </span>
          </div>

          <div className="mb-2">
            <small className="text-muted d-block mb-1">Data Limite:</small>
            <span className="text-secondary">
              {formatDate(task.data_limite)}
            </span>
          </div>
        </div>

        <div className="card-footer bg-transparent border-top-0">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="outline-primary"
              size="sm"
              className="d-flex align-items-center p-2"
              onClick={() => onEdit(task)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className="d-flex align-items-center p-2"
              onClick={() => onDelete(task)}
            >
              <FaTrash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
