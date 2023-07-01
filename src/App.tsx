import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TodosList from "./components/TodosList";
import { Task } from "./taskModel";

const App: React.FC = () => {
  // New input value
  const [newTask, setNewTask] = useState<string>("");
  // All tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  // Adding new task
  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask) {
      setTasks([...tasks, { id: Date.now(), body: newTask, isDone: false }]);
      // Empty input field
      setNewTask("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    // Get the selected task and a copy of both task lists
    let selectedTask,
      active = tasks,
      completed = completedTasks;
    
    // Remove selected task from source
    if (source.droppableId === "Active") {
      selectedTask = active[source.index];
      active.splice(source.index, 1);
    } else {
      selectedTask = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Add selected task to destination
    if (destination.droppableId === "Active") {
      active.splice(destination.index, 0, selectedTask);
    } else {
      completed.splice(destination.index, 0, selectedTask);
    }

    setTasks(active);
    setCompletedTasks(completed);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="header">Todo</span>
        <InputField
          newTask={newTask}
          setNewTask={setNewTask}
          addNewTask={addNewTask}
        />
        <TodosList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
