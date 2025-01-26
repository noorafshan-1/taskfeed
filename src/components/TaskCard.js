import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onDelete }) => (
    <Draggable draggableId={task._id} index={index}>
        {(provided) => (
            <div
                className="task-card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {/* <h3>{task.name}</h3> */}
                <p>{task.name}</p>
                <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        )}
    </Draggable>
);

export default TaskCard;
