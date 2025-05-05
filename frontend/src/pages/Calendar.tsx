import { useTasks } from "../contexts/TaskContext"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

const CalendarPage = () => {
    const { tasks } = useTasks()

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
                    Calendario
                </h1>
            </div>

            {/* Calendario */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflowY: "auto",
                }}
            >
                <Calendar
                    tileContent={({ date, view }) => {
                        if (view === "month") {
                            const dayTasks = tasks.filter(
                                (task) =>
                                    new Date(task.finishDate).toDateString() ===
                                    date.toDateString()
                            )
                            return (
                                <div style={{ marginTop: "5px" }}>
                                    {dayTasks.length > 0 && (
                                        <span
                                            style={{
                                                backgroundColor: "#4B0082",
                                                color: "white",
                                                borderRadius: "50%",
                                                padding: "2px 6px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {dayTasks.length}
                                        </span>
                                    )}
                                </div>
                            )
                        }
                        return null
                    }}
                />
            </div>
        </div>
    )
}

export default CalendarPage
