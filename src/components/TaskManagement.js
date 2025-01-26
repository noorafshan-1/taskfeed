import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Import Droppable and Draggable
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import "./TaskManagement.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Create a new task and update the state
  const createTask = async (name, description) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        name,
        description,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Update the status of a task
  const updateTaskStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = (result) => {
    console.log(result); // Log the result to see the structure
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    console.log(
      `Dragging from ${source.droppableId} to ${destination.droppableId}`
    );

    // Check if the droppableId exists
    if (
      destination.droppableId !== "Pending" &&
      destination.droppableId !== "Completed" &&
      destination.droppableId !== "Done"
    ) {
      console.error(`Invalid droppableId: ${destination.droppableId}`);
      return;
    }

    // Update the task status
    const taskId = draggableId;
    const newStatus = destination.droppableId;
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="task-management">
      <h1>Task Management System</h1>
      <TaskForm onCreate={createTask} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-columns">
          {["Pending", "Completed", "Done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-column"
                >
                  <h2>{status}</h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card"
                          >
                            <div className="task-info">
                              <p>{task.name}</p>
                              <p>{task.description}</p>
                            </div>
                            <button onClick={() => deleteTask(task._id)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
