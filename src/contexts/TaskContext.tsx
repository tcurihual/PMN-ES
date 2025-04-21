import React, { createContext, useState, useContext, useEffect } from "react"

type TaskContextType = {
    tasks: string[]
    addTask: () => void
    clearTask: () => void
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    addTask: () => {},
    clearTask: () => {},
})

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<string[]>([])

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
    }, [])

    const addTask = () => {
        const newTask = `Tarea ${tasks.length + 1}`
        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }

    const clearTask = () => {
        setTasks([])
        localStorage.removeItem("tasks")
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, clearTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext)
