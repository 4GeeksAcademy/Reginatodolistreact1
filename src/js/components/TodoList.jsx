export const TaskList = ({ tasks, removeTask }) => {
    return (
        <ul className="w-control list-group">
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className="task-item list-group-item py-3 d-flex justify-content-between"
                >
                    {task.label}
                    <button
                        onClick={() => {
                            removeTask(task.id);
                        }}
                        className="btn btn-danger btn-sm"
                    >
                        Eliminar
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;