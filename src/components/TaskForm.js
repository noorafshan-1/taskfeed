import React, { useState } from "react";

const TaskForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name, description);
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-container">
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{padding: "10px", width:"20%"}}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{padding: "30px", width:"20%"}}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
