import React, { useRef } from "react";
import "./styles.css";

interface Props {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addNewTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ newTask, setNewTask, addNewTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        addNewTask(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input__submit">
        ADD
      </button>
    </form>
  );
};

export default InputField;
