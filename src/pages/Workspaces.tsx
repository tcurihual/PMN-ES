import { useMembers } from "../contexts/MemberContext"
import { FiTrash2 } from "react-icons/fi"

const Workspaces = () => {
    const { members, generateMembers, deleteMember } = useMembers()

    const handleAddMember = () => {
        generateMembers(1)
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
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
                    Workspaces
                </h1>
                <button
                    onClick={handleAddMember}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4B0082",
                        color: "#daddd3",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    + Agregar Miembro
                </button>
            </div>

            {/* Cards */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    overflowY: "auto",
                }}
            >
                {members.map((member) => (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "300px",
                            minHeight: "150px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            position: "relative", // 👈 Necesario para posicionar el botón
                        }}
                    >
                        <div
                            style={{
                                width: "5%",
                                backgroundColor: member.color,
                            }}
                        />

                        <div
                            style={{
                                padding: "15px",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            {/* Botón de eliminar */}
                            <button
                                onClick={() => deleteMember(member.id)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <FiTrash2
                                    color="red"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </button>

                            <div
                                style={{ fontWeight: "bold", fontSize: "18px" }}
                            >
                                {member.firstName} {member.lastName}
                            </div>
                            <div style={{ fontSize: "14px", color: "gray" }}>
                                {member.email}
                            </div>
                            <div style={{ fontSize: "14px" }}>
                                Edad: <strong>{member.age}</strong>
                            </div>
                            <div style={{ fontSize: "14px" }}>
                                Tareas asignadas:{" "}
                                <strong>{member.taskIds.length}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Workspaces
