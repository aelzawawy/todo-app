import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TodosList from "./components/TodosList";
import useLocalStorage from "./customeHooks/useLocalStorage";

const App: React.FC = () => {
  // New input value
  const [newTask, setNewTask] = useState<string>("");

  // Saving tasks to local storage
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [completedTasks, setCompletedTasks] = useLocalStorage("completed", []);

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
      selectedTask = {...selectedTask, isDone: true}
      active.splice(source.index, 1);
    } else {
      selectedTask = completed[source.index];
      selectedTask = {...selectedTask, isDone: false}
      completed.splice(source.index, 1);
    }

    // Add selected task to destination
    if (destination.droppableId === "Active") {
      active.splice(destination.index, 0, selectedTask);
    } else {
      completed.splice(destination.index, 0, selectedTask);
    }
    
    //! These don't trigger the hook because React does not detect a change in the state references
    //! setTasks(active);
    //! setCompletedTasks(completed);

    // By creating new arrays, new references are provided
    setTasks([...active]);
    setCompletedTasks([...completed]);
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
