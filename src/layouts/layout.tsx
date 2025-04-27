import React from "react"

import { useNavigate } from "react-router-dom"
import MenuData from "../components/MenuData"

import { AiOutlinePlus } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { BiHomeAlt } from "react-icons/bi"
import { AiOutlineProduct } from "react-icons/ai"
import { BsCalendarEvent } from "react-icons/bs"
import { BsGear } from "react-icons/bs"
import { useModal } from "../contexts/ModalContext"
import CreateTaskModal from "../contexts/CreateTaskModal"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()

    const handleMenuClick = (route: string) => {
        navigate(route)
    }

    const { showModal, hideModal } = useModal()

    const handleShowModal = () => {
        console.log("hoal")
        showModal({
            title: "Agregar Nueva Tarea",
            size: "md",
            component: <CreateTaskModal onClose={hideModal} />,
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div
                style={{
                    backgroundColor: "#08040c",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        width: "13%",
                        height: "9.26%",
                        position: "absolute",
                        top: "5%",
                        left: "2.083%",
                        borderBottomWidth: "1px",
                        borderColor: "#daddd3",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "25%",
                                height: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            {" "}
                            <BsFillPersonFill
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "#daddd3",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                width: "70%",
                                height: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <p style={{ fontSize: "20px", color: "#daddd3" }}>
                                Juan Perez
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "15.625%",
                        height: "41.7%",
                        top: "14.26%",
                        position: "absolute",
                        paddingTop: "2.8%",
                        paddingBottom: "2.8%",
                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <MenuData
                        name="Dashboard"
                        route="/"
                        isActive={location.pathname === "/"}
                        onClick={() => handleMenuClick("/")}
                        icon={BiHomeAlt}
                    />
                    <MenuData
                        name="Workspaces"
                        route="/workspaces"
                        isActive={location.pathname === "/workspaces"}
                        onClick={() => handleMenuClick("/workspaces")}
                        icon={AiOutlineProduct}
                    />
                    <MenuData
                        name="Calendario"
                        route="/calendar"
                        isActive={location.pathname === "/calendar"}
                        onClick={() => handleMenuClick("/calendar")}
                        icon={BsCalendarEvent}
                    />
                    <MenuData
                        name="Configuración"
                        route="/settings"
                        isActive={location.pathname === "/settings"}
                        onClick={() => handleMenuClick("/settings")}
                        icon={BsGear}
                    />
                </div>
                <button
                    style={{
                        position: "absolute",
                        bottom: "7.31481%",
                        width: "10.416%",
                        height: "6.944%",
                        left: "3.38542%",
                        backgroundColor: "#4B0082",
                        border: "none",
                        borderRadius: 15,
                        cursor: "pointer",
                    }}
                    onClick={handleShowModal}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <AiOutlinePlus
                            style={{
                                color: "#daddd3",
                                fontSize: "25px",
                                width: "15%",
                            }}
                        />
                        <p
                            style={{
                                color: "#daddd3",
                                fontSize: "18px",
                                fontWeight: 500,
                                width: "70%",
                                margin: 0,
                            }}
                        >
                            Agregar Tarea
                        </p>
                    </div>
                </button>
            </div>
            <div
                style={{
                    backgroundColor: "#f0f0f0",
                    width: "80%",
                    height: "90%",
                    position: "fixed",
                    top: "5%",
                    left: "17.1875%",
                    borderRadius: 15,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Layout
