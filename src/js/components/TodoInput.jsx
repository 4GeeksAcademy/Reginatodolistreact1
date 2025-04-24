import { useState } from "react";

const TaskInput = ({ addTask }) => {
    const [task, setTask] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            addTask(task);
            setTask("");
        }
    };

    return (
        <input
            type="text"
            placeholder="Agregar nueva tarea..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control w-control text-center shadow p-3"
        />
    );
};

export default TaskInput;