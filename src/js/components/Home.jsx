import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
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
    <div style={styles.container}>
      <h1 style={styles.title}>Todos :D</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {tasks.length === 0 ? (
        <p style={styles.empty}>No hay tareas, añadir tareas</p>
      ) : (
        <ul style={styles.ul}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={styles.li}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector("button").style.display = "inline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector("button").style.display = "none")
              }
            >
              {task}
              <button
                style={{ ...styles.deleteBtn, display: "none" }}
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    margin: "50px auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    marginTop: "10px",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  li: {
    position: "relative",
    padding: "12px",
    marginBottom: "10px",
    background: "#eee",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  deleteBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#888",
    fontSize: "16px",
    cursor: "pointer",
  },
  empty: {
    color: "#999",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default TodoApp;
