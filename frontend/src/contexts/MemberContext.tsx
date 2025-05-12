import React, { createContext, useContext, useState, useEffect } from "react"
import { useTasks } from "./TaskContext"
import { faker } from "@faker-js/faker"

type Member = {
    id: string
    firstName: string
    lastName: string
    email: string
    age: number
    taskIds: number[]
    color: string
}

type MemberContextType = {
    members: Member[]
    generateMembers: (count: number) => void
    clearMembers: () => void
    deleteMember: (id: string) => void
}

const MemberContext = createContext<MemberContextType>({
    members: [],
    generateMembers: () => {},
    clearMembers: () => {},
    deleteMember: () => {},
})

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { tasks } = useTasks()
    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        const savedMembers = localStorage.getItem("members")
        if (savedMembers) {
            setMembers(JSON.parse(savedMembers))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("members", JSON.stringify(members))
    }, [members])

    useEffect(() => {
        setMembers((prevMembers) => {
            return prevMembers.map((member) => {
                const assignedTasks = tasks
                    .filter((task) => task.assignedMemberId === member.id)
                    .map((task) => task.id)
                return { ...member, taskIds: assignedTasks }
            })
        })
    }, [tasks])

    const generateMembers = (count: number) => {
        const newMembers: Member[] = []

        for (let i = 0; i < count; i++) {
            const memberId = faker.string.uuid()
            const assignedTasks = tasks
                .filter(() => Math.random() < 0.5)
                .map((task) => task.id)

            const newMember: Member = {
                id: memberId,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 60 }),
                taskIds: assignedTasks,
                color: getRandomColor(),
            }

            newMembers.push(newMember)
        }

        setMembers((prevMembers) => [...prevMembers, ...newMembers])
    }

    const clearMembers = () => {
        setMembers([])
        localStorage.removeItem("members")
    }

    const deleteMember = (id: string) => {
        setMembers((prevMembers) =>
            prevMembers.filter((member) => member.id !== id)
        )
    }

    return (
        <MemberContext.Provider
            value={{ members, generateMembers, clearMembers, deleteMember }}
        >
            {children}
        </MemberContext.Provider>
    )
}

export const useMembers = () => useContext(MemberContext)

const getRandomColor = () => {
    const colors = [
        "#FF6B6B",
        "#6BCB77",
        "#4D96FF",
        "#FFD93D",
        "#FF922B",
        "#845EC2",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}
