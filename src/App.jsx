import { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const ENDPOINT = "https://hermanchrome-evitatropic-3000.codio.io";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = async () => {
      await fetchTasks();
    };
    data();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${ENDPOINT}/tasks`);
      const json = await res.json();
      setTasks(json);
    } catch (error) {
      console.error("Error on fetchTasks:", error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch(`${ENDPOINT}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(task),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error on addTask:", error);
    }
  };

  const updateTask = async (task) => {
    const id = task?.id;
    try {
      const response = await fetch(`${ENDPOINT}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(task),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error on updateTask:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${ENDPOINT}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error on deleteTask", error);
    }
  };

  return (
    <>
      <h1>Kanban</h1>
      <TaskInput addTask={addTask} />
      <section className="task-lists">
        <TaskList
          status="todo"
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <TaskList
          status="doing"
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <TaskList
          status="done"
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </section>
    </>
  );
}

export default App;
