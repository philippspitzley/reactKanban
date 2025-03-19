import { useState } from "react";

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    addTask(formJson);
    setTaskText("");
    setTaskStatus("todo");
  }

  return (
    <div>
      <form className="text-input-wrapper" onSubmit={handleSubmit}>
        <input
          aria-label="Task Text"
          id="task-text"
          name="text"
          type="text"
          placeholder="develope Kanban"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          required
        />
        <select
          aria-label="Task Selection"
          id="status"
          name="status"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default TaskInput;
