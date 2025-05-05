import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Workspaces from "./Workspaces"
import Calendar from "./Calendar"
import Settings from "./Settings"

const WebRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}

export default WebRouter
