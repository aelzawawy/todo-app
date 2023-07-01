import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../taskModel";
import TodoListItem from "./TodoListItem";
import "./styles.css";
interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TodosList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="Active">
        {(provided, snapshot) => (
          <div
            className={`todosList ${
              snapshot.isDraggingOver ? "dragActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="title">Active Tasks :</div>
            {tasks.map((task, index) => (
              <TodoListItem
                key={task.id}
                index={index}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="Completed">
        {(provided, snapshot) => (
          <div
            className={`todosList completed className=todosList ${
              snapshot.isDraggingOver ? "dragActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="title">Completed Tasks :</div>
            {completedTasks.map((task, index) => (
              <TodoListItem
                key={task.id}
                index={index}
                task={task}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodosList;
