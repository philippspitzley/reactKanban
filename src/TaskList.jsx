import { Trash2, ArrowBigRightDash } from "lucide-react";

function TaskList({ tasks, status, updateTask, deleteTask }) {
  let buttonStatus;
  if (status === "todo") {
    buttonStatus = "doing";
  } else if (status === "doing") {
    buttonStatus = "done";
  } else {
    buttonStatus = null;
  }
  return (
    <div className="task-list-wrapper">
      <h2>{status[0].toUpperCase() + status.slice(1)}</h2>
      <ul>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <li key={task.id}>
              {task.text}
              <div className="button-wrapper">
                {buttonStatus && (
                  <button
                    className="icon"
                    onClick={() =>
                      updateTask({ ...task, status: buttonStatus })
                    }
                  >
                    <ArrowBigRightDash size={24} />
                  </button>
                )}
                <button className="icon" onClick={() => deleteTask(task.id)}>
                  <Trash2 size={24} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TaskList;
