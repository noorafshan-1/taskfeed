import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';


const TaskColumn = ({ status, tasks, onDelete }) => (
    <Droppable droppableId={status}>
        {(provided) => (
            <div className="task-column" 
            ref={provided.innerRef}
             {...provided.droppableProps}
             >
                <h3>{status}</h3>
                {tasks.map((task, index) => (
                <TaskCard 
                     key={task._id}
                     task={task}
                     index={index} 
                     onDelete={onDelete} />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default TaskColumn;
