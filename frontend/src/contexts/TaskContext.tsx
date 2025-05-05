// contexts/TaskContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react"

type Magnitude = "Importante" | "Trivial" | "No Trivial"
type Difficulty = "Dificil" | "Medio" | "Facil"

export type Task = {
    id: string
    name: string
    description: string
    finishDate: Date
    completed: boolean
    magnitude: Magnitude
    difficulty: Difficulty
    createdAt: Date
    assignedMemberId?: string
}

type SerializedTask = Omit<Task, "finishDate" | "createdAt"> & {
    finishDate: string
    createdAt: string
}

type TaskContextType = {
    tasks: Task[]
    addTask: (task: Omit<Task, "id" | "createdAt">) => void
    clearTasks: () => void
    deleteTask: (id: string) => void
    toggleTask: (id: string) => void
    editTask: (
        id: string,
        updatedFields: Partial<Omit<Task, "id" | "createdAt">>
    ) => void
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    addTask: () => {},
    clearTasks: () => {},
    deleteTask: () => {},
    toggleTask: () => {},
    editTask: () => {},
})

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            try {
                const parsedTasks: SerializedTask[] = JSON.parse(savedTasks)
                const tasksWithDates = parsedTasks.map((task) => ({
                    ...task,
                    finishDate: new Date(task.finishDate),
                    createdAt: new Date(task.createdAt),
                }))
                if (
                    tasksWithDates.some(
                        (task) =>
                            isNaN(task.finishDate.getTime()) ||
                            tasksWithDates.some((task) =>
                                isNaN(task.createdAt.getTime())
                            )
                    )
                ) {
                    throw new Error("Fechas inválidas en localStorage")
                }
                setTasks(tasksWithDates)
            } catch (error) {
                console.error("Error cargando tareas:", error)
                localStorage.removeItem("tasks")
                setTasks([])
            }
        }
    }, [])

    // Guardar tareas cuando cambian
    useEffect(() => {
        try {
            const tasksToSave: SerializedTask[] = tasks.map((task) => ({
                ...task,
                finishDate: task.finishDate.toISOString(),
                createdAt: task.createdAt.toISOString(),
            }))
            localStorage.setItem("tasks", JSON.stringify(tasksToSave))
        } catch (error) {
            console.error("Error guardando tareas:", error)
        }
    }, [tasks])

    useEffect(() => {
        if (tasks.length > 0) {
            const tasksToSave: SerializedTask[] = tasks.map((task) => ({
                ...task,
                finishDate: task.finishDate?.toISOString(),
                createdAt: task.createdAt?.toISOString(),
            }))
            localStorage.setItem("tasks", JSON.stringify(tasksToSave))
        }
    }, [tasks])

    const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
        const newTask: Task = {
            id: Date.now().toString(),
            ...taskData,
            createdAt: new Date(),
            finishDate: taskData.finishDate,
            assignedMemberId: taskData.assignedMemberId ?? undefined,
        }
        setTasks((prev) => [...prev, newTask])
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const clearTasks = () => {
        setTasks([])
    }

    const editTask = (
        id: string,
        updatedFields: Partial<Omit<Task, "id" | "createdAt">>
    ) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        ...updatedFields,
                        finishDate: updatedFields.finishDate
                            ? new Date(updatedFields.finishDate)
                            : task.finishDate,
                    }
                }
                return task
            })
        )
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                clearTasks,
                deleteTask,
                toggleTask,
                editTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext)
