import { AiOutlinePlus } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"

const Dashboard = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div
                style={{
                    backgroundColor: "#e2e2df",
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
                                style={{ height: "100%", width: "100%" }}
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
                            <p style={{ fontSize: "20px" }}>Juan Perez</p>
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                            width: "100%",
                            height: "17%",
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                    >
                        <div style={{ width: "80%" }}>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Inicio
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                            width: "100%",
                            height: "17%",
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                    >
                        <div style={{ width: "80%" }}>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Workspaces
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                            width: "100%",
                            height: "17%",
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                    >
                        <div style={{ width: "80%" }}>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Calendario
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                            width: "100%",
                            height: "17%",
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                    >
                        <div style={{ width: "80%" }}>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Configuracion
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    style={{
                        position: "absolute",
                        bottom: "7.31481%",
                        width: "10.416%",
                        height: "6.944%",
                        left: "3.38542%",
                        backgroundColor: "#449B13",
                        border: "none",
                        borderRadius: 15,
                        cursor: "pointer",
                    }}
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
                                color: "white",
                                fontSize: "25px",
                                width: "15%",
                                margin: "5px",
                            }}
                        />
                        <p
                            style={{
                                color: "white",
                                fontSize: "18px",
                                fontWeight: 500,
                                width: "85%",
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
                hola
            </div>
        </div>
    )
}

export default Dashboard
