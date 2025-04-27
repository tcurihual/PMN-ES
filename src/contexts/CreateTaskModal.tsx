import React, { useState } from "react"
import { useTasks } from "../contexts/TaskContext"

const CreateTaskModal = ({ onClose }: { onClose: () => void }) => {
    const { addTask } = useTasks()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        finishDate: "",
        magnitude: "No Trivial" as "Importante" | "Trivial" | "No Trivial",
        difficulty: "Medio" as "Dificil" | "Medio" | "Facil",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addTask({
            ...formData,
            finishDate: new Date(formData.finishDate),
            completed: false,
        })
        onClose()
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // Estilo común para todos los inputs
    const inputStyle = {
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #cccccc",
        borderRadius: "10px",
        outline: "none",
        transition: "border-color 0.3s ease",
        ":focus": {
            borderColor: "#4B0082",
        },
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                paddingLeft: "5%",
                paddingRight: "5%",
            }}
        >
            <div>
                <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                >
                    Nombre:
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                >
                    Descripción:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                        ...inputStyle,
                        minHeight: "100px",
                        resize: "vertical",
                    }}
                />
            </div>

            <div>
                <label
                    htmlFor="finishDate"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                >
                    Fecha de finalización:
                </label>
                <input
                    id="finishDate"
                    name="finishDate"
                    type="date"
                    value={formData.finishDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div>
                <label
                    htmlFor="magnitude"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                >
                    Magnitud:
                </label>
                <select
                    id="magnitude"
                    name="magnitude"
                    value={formData.magnitude}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="Importante">Importante</option>
                    <option value="No Trivial">No Trivial</option>
                    <option value="Trivial">Trivial</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="difficulty"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                >
                    Dificultad:
                </label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="Dificil">Difícil</option>
                    <option value="Medio">Medio</option>
                    <option value="Facil">Fácil</option>
                </select>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    marginTop: "1rem",
                }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                >
                    Crear Tarea
                </button>
            </div>
        </form>
    )
}

export default CreateTaskModal
