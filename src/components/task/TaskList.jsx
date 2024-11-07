import React from "react";
import Card from "../card/Card";

const TaskList = ({
  tasks,
  onEditClick,
  onDeleteClick,
  onMoveTask,
  formatCurrency,
  formatDate,
}) => {
  return (
    <div className="task-list-container">
      {tasks.map((task, index) => (
        <div key={task.id} className="task-list-item">
          <Card
            task={task}
            index={index}
            totalTasks={tasks.length}
            onEdit={onEditClick}
            onDelete={onDeleteClick}
            onMove={onMoveTask}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
