import React, { useState, useEffect } from "react"
import { useTasks } from "../contexts/TaskContext"
import {
    translateDifficultyToBackend,
    translateDifficultyToFrontend,
    translateMagnitudeToBackend,
    translateMagnitudeToFrontend,
} from "../utils/translator"

type FormMagnitude = "Importante" | "Trivial" | "No Trivial"
type FormDifficulty = "Difícil" | "Medio" | "Fácil"

type TaskFormData = {
    name: string
    description: string
    finishDate: string
    magnitude: FormMagnitude
    difficulty: FormDifficulty
    assignedMemberId?: string
}

const CreateTaskModal = ({
    onClose,
    taskToEdit,
}: {
    onClose: () => void
    taskToEdit?: any
}) => {
    const { addTask, editTask } = useTasks()
    const [formData, setFormData] = useState<TaskFormData>({
        name: "",
        description: "",
        finishDate: "",
        magnitude: "No Trivial",
        difficulty: "Medio",
    })

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                name: taskToEdit.name,
                description: taskToEdit.description,
                finishDate: new Date(taskToEdit.finishDate)
                    .toISOString()
                    .split("T")[0],
                magnitude: translateMagnitudeToFrontend(
                    taskToEdit.magnitude
                ) as FormMagnitude,
                difficulty: translateDifficultyToFrontend(
                    taskToEdit.difficulty
                ) as FormDifficulty,
            })
        }
    }, [taskToEdit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const finalFinishDate = new Date(formData.finishDate)

        try {
            if (taskToEdit) {
                await editTask(taskToEdit.id, {
                    name: formData.name,
                    description: formData.description,
                    finishDate: finalFinishDate,
                    magnitude: translateMagnitudeToBackend(formData.magnitude),
                    difficulty: translateDifficultyToBackend(
                        formData.difficulty
                    ),
                    assignedMemberId: formData.assignedMemberId,
                })
            } else {
                await addTask({
                    name: formData.name,
                    description: formData.description,
                    finishDate: finalFinishDate,
                    magnitude: translateMagnitudeToBackend(formData.magnitude),
                    difficulty: translateDifficultyToBackend(
                        formData.difficulty
                    ),
                    completed: false,
                    assignedMemberId: formData.assignedMemberId,
                })
            }
            onClose()
        } catch (error) {
            console.error("Error al guardar la tarea:", error)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const inputStyle = {
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #cccccc",
        borderRadius: "10px",
        outline: "none",
    }

    // const toLocalDate = (dateString: string) => {
    //     const [year, month, day] = dateString.split("-").map(Number)
    //     return new Date(year, month - 1, day) // Mes empieza en 0
    // }

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
                <label htmlFor="name">Nombre:</label>
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
                <label htmlFor="description">Descripción:</label>
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
                <label htmlFor="finishDate">Fecha de finalización:</label>
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
                <label htmlFor="magnitude">Magnitud:</label>
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
                <label htmlFor="difficulty">Dificultad:</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="Difícil">Difícil</option>
                    <option value="Medio">Medio</option>
                    <option value="Fácil">Fácil</option>
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
                    }}
                >
                    {taskToEdit ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    )
}

export default CreateTaskModal
