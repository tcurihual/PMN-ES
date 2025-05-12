import { Task, useTasks } from "../contexts/TaskContext"
import { useModal } from "../contexts/ModalContext"
import { FiTrash2, FiEdit2 } from "react-icons/fi"
import CreateTaskModal from "../components/CreateTaskModal"
import { useMembers } from "../contexts/MemberContext"
import {
    translateDifficultyToBackend,
    translateDifficultyToFrontend,
    translateMagnitudeToBackend,
    translateMagnitudeToFrontend,
} from "../utils/translator"

const Dashboard = () => {
    const { tasks, deleteTask, toggleTask, editTask } = useTasks()
    const { showModal, hideModal } = useModal()
    const { members } = useMembers()

    const handleEditTaskModal = (task: Task) => {
        showModal({
            title: "Editar Tarea",
            size: "md",
            component: (
                <CreateTaskModal onClose={hideModal} taskToEdit={task} />
            ),
        })
    }

    const handleMagnitudeChange = (id: number, newMagnitude: string) => {
        const translatedValue = translateMagnitudeToBackend(newMagnitude)
        editTask(id, { magnitude: translatedValue })
    }

    const handleDifficultyChange = (id: number, newDifficulty: string) => {
        const translatedValue = translateDifficultyToBackend(newDifficulty)
        editTask(id, { difficulty: translatedValue })
    }

    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                padding: "5%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>DashBoard</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1%",
                    gap: "5px",
                    overflowY: "auto",
                    maxHeight: "calc(100% - 50px)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "lightgray",
                        color: "black",
                        padding: "10px",
                        borderRadius: "5px",
                        gap: "10px",
                        alignItems: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <div style={{ flex: 1, fontWeight: "bold" }}>Nombre</div>
                    <div style={{ flex: 2, fontWeight: "bold" }}>
                        Descripción
                    </div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>Fecha Fin</div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>Magnitud</div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>
                        Dificultad
                    </div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>
                        Asignado a
                    </div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>
                        Completado
                    </div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>Acción</div>
                </div>

                {tasks.map((task) => (
                    <div
                        key={task.id}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: task.completed
                                ? "#a0a0a0"
                                : "#ffffff",
                            padding: "10px",
                            borderRadius: "5px",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ flex: 1 }}>{task.name}</div>
                        <div
                            style={{
                                flex: 2,
                                maxHeight: "100px",
                                overflowY: "auto",
                                padding: "5px",
                            }}
                        >
                            {task.description}
                        </div>
                        <div style={{ flex: 1 }}>
                            {task.finishDate.toLocaleDateString()}
                        </div>

                        <div style={{ flex: 1 }}>
                            <select
                                value={translateMagnitudeToFrontend(
                                    task.magnitude
                                )}
                                onChange={(e) =>
                                    handleMagnitudeChange(
                                        task.id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Importante">Importante</option>
                                <option value="Trivial">Trivial</option>
                                <option value="No Trivial">No Trivial</option>
                            </select>
                        </div>

                        <div style={{ flex: 1 }}>
                            <select
                                value={translateDifficultyToFrontend(
                                    task.difficulty
                                )}
                                onChange={(e) =>
                                    handleDifficultyChange(
                                        task.id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Difícil">Difícil</option>
                                <option value="Medio">Medio</option>
                                <option value="Fácil">Fácil</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <select
                                value={task.assignedMemberId ?? ""}
                                onChange={(e) =>
                                    editTask(task.id, {
                                        assignedMemberId: e.target.value,
                                    })
                                }
                            >
                                <option value="">Sin asignar</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.firstName} {member.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ flex: 1 }}>
                            <input
                                type="checkbox"
                                style={{ width: "10px", height: "10px" }}
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />
                        </div>
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <button onClick={() => handleEditTaskModal(task)}>
                                <FiEdit2
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        cursor: "pointer",
                                    }}
                                />
                            </button>
                            <button onClick={() => deleteTask(task.id)}>
                                <FiTrash2
                                    color="red"
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        cursor: "pointer",
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
