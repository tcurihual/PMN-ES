import React, { createContext, useContext, useState, ReactNode } from "react"

type ModalType = {
    component: ReactNode
    title?: string
    size?: "sm" | "md" | "lg" | "xl"
    onClose?: () => void
}

type ModalContextType = {
    showModal: (modal: ModalType) => void
    hideModal: () => void
    isVisible: boolean
    currentModal: ModalType | null
}

const ModalContext = createContext<ModalContextType>({
    showModal: () => {},
    hideModal: () => {},
    isVisible: false,
    currentModal: null,
})

export const useModal = () => useContext(ModalContext)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentModal, setCurrentModal] = useState<ModalType | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    const showModal = (modalConfig: ModalType) => {
        setCurrentModal(modalConfig)
        setIsVisible(true)
    }

    const hideModal = () => {
        setIsVisible(false)
        if (currentModal?.onClose) {
            currentModal.onClose()
        }
        setTimeout(() => setCurrentModal(null), 300)
    }

    return (
        <ModalContext.Provider
            value={{ showModal, hideModal, isVisible, currentModal }}
        >
            {children}

            {/* Modal renderizado */}
            {currentModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: isVisible ? "all" : "none",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            width:
                                currentModal.size === "sm"
                                    ? "300px"
                                    : currentModal.size === "md"
                                      ? "500px"
                                      : currentModal.size === "lg"
                                        ? "800px"
                                        : currentModal.size === "xl"
                                          ? "1140px"
                                          : "500px",
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            overflow: "auto",
                            transform: isVisible
                                ? "translateY(0)"
                                : "translateY(-20px)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        {/* Header del modal */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "1rem",
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            <h3 style={{ margin: 0 }}>
                                {currentModal.title || "Modal"}
                            </h3>
                            <button
                                onClick={hideModal}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div style={{ padding: "1rem" }}>
                            {currentModal.component}
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}
