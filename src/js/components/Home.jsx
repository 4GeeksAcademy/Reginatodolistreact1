import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container my-5 p-4 shadow-lg rounded bg-white">
      <h1 className="text-center text-dark">Todos :D</h1>
      <input
        className="form-control mt-3"
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {tasks.length === 0 ? (
        <p className="text-center text-muted mt-4">No hay tareas, añadir tareas</p>
      ) : (
        <ul className="list-unstyled mt-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="position-relative p-3 mb-2 bg-light rounded"
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector("button").style.display = "inline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector("button").style.display = "none")
              }
            >
              {task}
              <button
                className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-danger"
                style={{ display: "none" }}
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 d-flex justify-content-between">
        <h5 className="text-muted">Total tasks: {tasks.length}</h5>
      </div>
    </div>
  );
}

export default TodoApp;
