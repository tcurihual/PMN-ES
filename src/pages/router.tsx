import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"

const WebRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
}

export default WebRouter
