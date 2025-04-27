import { useTasks } from "../contexts/TaskContext"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { ColDef, ICellRendererParams } from "ag-grid-community"
import { useState, useMemo } from "react"

const Dashboard = () => {
    const { tasks, clearTasks, deleteTask, toggleTask } = useTasks()
    const [columnDefs] = useState<ColDef[]>([
        {
            field: "name",
            headerName: "Nombre",
            filter: true,
            sortable: true,
        },
        {
            field: "description",
            headerName: "Descripción",
            filter: true,
            sortable: true,
            width: 300,
        },
        {
            field: "finishDate",
            headerName: "Fecha Fin",
            valueFormatter: (params) => params.value.toLocaleDateString(),
            sortable: true,
        },
        {
            field: "magnitude",
            headerName: "Magnitud",
            filter: true,
            sortable: true,
        },
        {
            field: "difficulty",
            headerName: "Dificultad",
            filter: true,
            sortable: true,
        },
        {
            field: "completed",
            headerName: "Completada",
            cellRenderer: (params: ICellRendererParams) =>
                params.value ? "✅" : "❌",
            filter: true,
            sortable: true,
        },
        {
            headerName: "Acciones",
            cellRenderer: ActionsRenderer,
            cellRendererParams: {
                toggleTask,
                deleteTask,
            },
            width: 200,
        },
    ])

    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            resizable: true,
            filter: true,
            sortable: true,
        }),
        []
    )

    return (
        <div style={{ padding: "20px", height: "100%" }}>
            <h1>Dashboard</h1>
            <div
                className="ag-theme-alpine"
                style={{
                    height: "calc(100vh - 180px)",
                    width: "100%",
                    marginTop: "20px",
                }}
            >
                <AgGridReact
                    rowData={tasks}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            {tasks.length > 0 && (
                <button
                    onClick={clearTasks}
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
                    Limpiar Todas las Tareas
                </button>
            )}
        </div>
    )
}

// Componente para renderizar acciones
const ActionsRenderer = (
    params: ICellRendererParams & {
        toggleTask: (id: string) => void
        deleteTask: (id: string) => void
    }
) => {
    const taskId = params.data.id

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button
                onClick={() => params.toggleTask(taskId)}
                style={{
                    padding: "5px 10px",
                    backgroundColor: params.data.completed
                        ? "#FFA500"
                        : "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                }}
            >
                {params.data.completed ? "Reactivar" : "Completar"}
            </button>
            <button
                onClick={() => params.deleteTask(taskId)}
                style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                }}
            >
                Eliminar
            </button>
        </div>
    )
}

export default Dashboard
