import { useEffect, useState } from "react";
import { Task } from "../taskModel";

const loadTasks = (key: string, initialValue: Task[]) => {
  const savedValue = JSON.parse(localStorage.getItem(key)!);
  if (savedValue) return savedValue;
  return initialValue;
};

const useLocalStorage = (key: string, initialValue: Task[]) => {
  // Passing a function so that it executes only once during the initial render.
  // The return value of that function becomes the initial state value.
  // This is because we don't want to call localStorage every time we render the component.
  const [value, setValue] = useState(() => {
    return loadTasks(key, initialValue);
  });
  // Update storage whenever the key or the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
