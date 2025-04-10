import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const USER = "Regina";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    checkAndFetchTasks();
  }, []);

  const checkAndFetchTasks = () => {
    fetch(`https://playground.4geeks.com/todo/todos/user/${USER}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.todos) {
          setTasks(data.todos);
        } else {
          createUser();
        }
      })
      .catch(() => {
        createUser();
      });
  };

  const createUser = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: "Initial Task", is_done: false }),
    })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error al crear el usuario:", error));
  };

  const fetchTasks = () => {
    fetch(`https://playground.4geeks.com/todo/todos/user/${USER}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.todos) {
          setTasks(data.todos);
        }
      })
      .catch((error) => console.error("Error al obtener las tareas:", error));
  };

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      label: input.trim(),
      is_done: false,
    };

    fetch(`https://playground.4geeks.com/todo/todos/${USER}`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.log(error);
      });

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${USER}/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error al eliminar la tarea:", error));
  };

  const clearAllTasks = () => {
    fetch(`https://playground.4geeks.com/todo/todos/user/${USER}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks([]);
      })
      .catch((error) => console.error("Error al limpiar las tareas:", error));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      addTask();
    }
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
          {tasks.map((task) => (
            <li
              key={task.id}
              className="position-relative p-3 mb-2 bg-light rounded"
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector("button").style.display = "inline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector("button").style.display = "none")
              }
            >
              {task.label}
              <button
                className="position-absolute top-50 end-0 translate-middle-y btn btn-danger"
                style={{ display: "none" }}
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 d-flex justify-content-between">
        <h5 className="text-muted">Total tasks: {tasks.length}</h5>
        <button
          className="btn btn-danger"
          onClick={clearAllTasks}
        >
          Limpiar todas
        </button>
      </div>
    </div>
  );
}

export default TodoApp;
