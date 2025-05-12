import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react"

export type Magnitude = "NotTrivial" | "Trivial" | "Important"
export type Difficulty = "Easy" | "Medium" | "Hard"

export type Task = {
    id: number
    name: string
    description: string
    finishDate: Date
    completed: boolean
    magnitude: Magnitude
    difficulty: Difficulty
    createdAt: Date
    assignedMemberId?: string
}

type TaskContextType = {
    tasks: Task[]
    loading: boolean
    error: string | null
    addTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>
    clearTasks: () => Promise<void>
    deleteTask: (id: number) => Promise<void>
    toggleTask: (id: number) => Promise<void>
    editTask: (
        id: number,
        updatedFields: Partial<Omit<Task, "id" | "createdAt">>
    ) => Promise<void>
    fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    loading: false,
    error: null,
    addTask: async () => {},
    clearTasks: async () => {},
    deleteTask: async () => {},
    toggleTask: async () => {},
    editTask: async () => {},
    fetchTasks: async () => {},
})

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL = import.meta.env.API_URL || "http://localhost:8000"

    const fetchTasks = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/tasks`)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()

            const formattedTasks = data.map((task: any) => ({
                ...task,
                id: task.id,
                finishDate: new Date(task.finish_date),
                createdAt: new Date(task.created_at),
                assignedMemberId: task.assigned_member_id || undefined,
            }))

            setTasks(formattedTasks)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido")
            console.error("Error fetching tasks:", err)
        } finally {
            setLoading(false)
        }
    }, [API_URL])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const addTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: taskData.name,
                    description: taskData.description,
                    finish_date: taskData.finishDate.toISOString(),
                    completed: taskData.completed,
                    magnitude: taskData.magnitude,
                    difficulty: taskData.difficulty,
                    assigned_member_id: taskData.assignedMemberId,
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            await fetchTasks()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al agregar tarea"
            )
            console.error("Error adding task:", err)
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            setTasks((prev) => prev.filter((task) => task.id !== id))
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al eliminar tarea"
            )
            console.error("Error deleting task:", err)
        } finally {
            setLoading(false)
        }
    }

    const toggleTask = async (id: number) => {
        setLoading(true)
        try {
            const taskToUpdate = tasks.find((task) => task.id === id)
            if (!taskToUpdate) throw new Error("Tarea no encontrada")

            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: taskToUpdate.name,
                    description: taskToUpdate.description,
                    finish_date: taskToUpdate.finishDate.toISOString(),
                    completed: !taskToUpdate.completed,
                    magnitude: taskToUpdate.magnitude,
                    difficulty: taskToUpdate.difficulty,
                    assigned_member_id: taskToUpdate.assignedMemberId,
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            await fetchTasks()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al actualizar tarea"
            )
            console.error("Error toggling task:", err)
        } finally {
            setLoading(false)
        }
    }

    const editTask = async (
        id: number,
        updatedFields: Partial<Omit<Task, "id" | "createdAt">>
    ) => {
        setLoading(true)
        try {
            const taskToUpdate = tasks.find((task) => task.id === id)
            if (!taskToUpdate) throw new Error("Tarea no encontrada")
            console.log(taskToUpdate)
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedFields.name ?? taskToUpdate.name,
                    description:
                        updatedFields.description ?? taskToUpdate.description,
                    finish_date: updatedFields.finishDate
                        ? updatedFields.finishDate.toISOString()
                        : taskToUpdate.finishDate.toISOString(),
                    completed:
                        updatedFields.completed ?? taskToUpdate.completed,
                    magnitude:
                        updatedFields.magnitude ?? taskToUpdate.magnitude,
                    difficulty:
                        updatedFields.difficulty ?? taskToUpdate.difficulty,
                    assigned_member_id:
                        updatedFields.assignedMemberId ??
                        taskToUpdate.assignedMemberId,
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            console.log("god")
            await fetchTasks()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al editar tarea"
            )
            console.error("Error editing task:", err)
        } finally {
            setLoading(false)
        }
    }

    const clearTasks = async () => {
        setLoading(true)
        try {
            // Esto debería ser una operación en el backend que elimine todas las tareas
            // Asumiendo que tienes un endpoint DELETE /tasks
            const response = await fetch(`${API_URL}/tasks`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            setTasks([])
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al limpiar tareas"
            )
            console.error("Error clearing tasks:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                addTask,
                clearTasks,
                deleteTask,
                toggleTask,
                editTask,
                fetchTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext)
