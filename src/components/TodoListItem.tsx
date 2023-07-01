import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Task } from "../taskModel";
import "./styles.css";
interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  index: number;
}
const TodoListItem: React.FC<Props> = ({ task, tasks, setTasks, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newBody, setNewBody] = useState<string>(task.body);
  // Mark task as read function
  const markDone = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete function
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task
  const updateTask = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, body: newBody } : task))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  // Focust the input box whenever the edit value changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todosListItem"
          onSubmit={(e) => updateTask(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="updateField"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
          ) : task.isDone ? (
            <s className="taskBody">{task.body}</s>
          ) : (
            <div className="taskBody">{task.body}</div>
          )}
          <div className="taskActions">
            <span
              className="icon"
              onClick={(e) => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => deleteTask(task.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => markDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoListItem;
