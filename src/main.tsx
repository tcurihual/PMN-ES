import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import WebRouter from "./pages/router.tsx"
import Layout from "./layouts/layout.tsx"
import { TaskProvider } from "./contexts/TaskContext.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TaskProvider>
            <BrowserRouter>
                <Layout>
                    <WebRouter />
                </Layout>
            </BrowserRouter>
        </TaskProvider>
    </StrictMode>
)
