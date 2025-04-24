const TaskFooter = ({ taskCount }) => {
    return (
        <div className="shadow p-2 text-center rounded w-control">
            {taskCount > 0
                ? `${taskCount} tareas pendientes`
                : "No hay tareas, añadir tareas"}
        </div>
    );
};

export default TaskFooter;