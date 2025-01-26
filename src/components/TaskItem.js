import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task._id);
  };

  return (
    <div
      className="task-item"
      draggable
      onDragStart={handleDragStart}
    >
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
