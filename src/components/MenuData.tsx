import { useNavigate } from "react-router-dom"

import { IconType } from "react-icons"

type MenuDataProps = {
    name: string
    route: string
    isActive: boolean
    onClick: () => void
    icon?: IconType
}

const MenuData = ({
    name,
    route,
    isActive,
    onClick,
    icon: Icon,
}: MenuDataProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        onClick()
        navigate(route)
    }

    return (
        <div
            onClick={handleClick}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 20,
                background: isActive ? "#4B0082" : "transparent",
                width: "100%",
                height: "20%",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                cursor: "pointer",
                transition: "background 0.3s ease",
                paddingLeft: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4B0082")}
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = isActive
                    ? "#4B0082"
                    : "transparent")
            }
        >
            {Icon && <Icon size={36} color="#daddd3" />}
            <div style={{ width: "100%" }}>
                <p style={{ fontSize: 20, fontWeight: 600, color: "#daddd3" }}>
                    {name}
                </p>
            </div>
        </div>
    )
}

export default MenuData
