import { useTasks } from "../contexts/TaskContext"

const Dashboard = () => {
    const { tasks, clearTask } = useTasks()

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>
            <div style={{ marginTop: "20px" }}>
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        style={{
                            margin: "10px 0",
                            padding: "10px",
                            background: "#fff",
                            borderRadius: "5px",
                        }}
                    >
                        <h3>{task}</h3>
                    </div>
                ))}
            </div>
            <button
                onClick={clearTask}
                style={{
                    cursor: "pointer",
                    position: "absolute",
                    bottom: "5%",
                    width: "15%",
                    height: "5%",
                    left: "42.5%",
                    backgroundColor: "#4B0082",
                    borderRadius: 20,
                    color: "#daddd3",
                    fontSize: "20px",
                }}
            >
                Limpiar Tareas
            </button>
        </div>
    )
}

export default Dashboard
