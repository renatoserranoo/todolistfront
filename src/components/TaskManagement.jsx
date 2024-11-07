import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import TaskList from "./task/TaskList";
import EditTaskModal from "./modal/EditTaskModal";
import DeleteTaskModal from "./modal/DeleteTaskModal";
import "./Task.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    custo: "",
    data_limite: "",
  });
  const api = axios.create({
    baseURL: "http://localhost:8080/",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/todos");
      const sortedTasks = response.data.sort((a, b) => a.ordem - b.ordem);
      setTasks(sortedTasks);
    } catch (err) {
      setError("Erro ao carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-br", { timeZone: "UTC" });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setFormData({
      nome: task.nome,
      custo: task.custo,
      data_limite: task.data_limite.split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (selectedTask) {
        const response = await api.put("/todos", {
          ...formData,
          id: parseInt(selectedTask.id),
          ordem: selectedTask.ordem,
        });
        const sortedTasks = response.data.sort((a, b) => a.ordem - b.ordem);
        setTasks(sortedTasks);
      }
      if (!selectedTask) {
        const response = await api.post("/todos", formData);
        const sortedTasks = response.data.sort((a, b) => a.ordem - b.ordem);
        setTasks(sortedTasks);
      }
      setShowEditModal(false);
    } catch (err) {
      setError("Erro ao salvar a tarefa. Verifique se o nome já existe.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/todos/${selectedTask.id}`);
      const sortedTasks = response.data.sort((a, b) => a.ordem - b.ordem);
      setTasks(sortedTasks);
      setShowDeleteModal(false);
    } catch (err) {
      setError("Erro ao excluir a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoveTask = async (taskId, direction) => {
    setLoading(true);
    try {
      const response = await api.put(`/todos/${taskId}/reorder/${direction}`);
      if (response.status === 200) {
        const updatedTasks = await response.data.sort(
          (a, b) => a.ordem - b.ordem
        );
        setTasks(updatedTasks);
      } else {
        console.error("Erro ao reordenar tarefa");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="custom-container py-4 bg-white rounded-lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Tarefas</h1>
        <div className="d-flex">
          {loading ? (
            <div className="load">
              <div className="spinner"></div>
            </div>
          ) : null}
          <Button
            variant="primary"
            onClick={() => {
              setSelectedTask(null);
              setFormData({ nome: "", custo: "", data_limite: "" });
              setShowEditModal(true);
            }}
          >
            <FaPlus className="me-2" /> Nova Tarefa
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      <div className="task-container">
        <TaskList
          tasks={tasks}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onMoveTask={handleMoveTask}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>

      <EditTaskModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        selectedTask={selectedTask}
      />

      <DeleteTaskModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default TaskManagement;
