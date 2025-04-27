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
}

type TaskContextType = {
    tasks: Task[]
    addTask: (task: Omit<Task, "id" | "createdAt">) => void
    clearTasks: () => void
    deleteTask: (id: string) => void
    toggleTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    addTask: () => {},
    clearTasks: () => {},
    deleteTask: () => {},
    toggleTask: () => {},
})

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([])

    // Cargar tareas al iniciar
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks)
                // Convertir strings de fecha a objetos Date
                const tasksWithDates = parsedTasks.map((task: any) => ({
                    ...task,
                    finishDate: new Date(task.finishDate),
                    createdAt: new Date(task.createdAt),
                }))
                setTasks(tasksWithDates)
            } catch (error) {
                console.error("Error parsing tasks", error)
            }
        }
    }, [])

    // Guardar tareas cuando cambian
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
        const newTask: Task = {
            id: Date.now().toString(),
            ...taskData,
            createdAt: new Date(),
        }
        setTasks([...tasks, newTask])
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

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, clearTasks, deleteTask, toggleTask }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext)
