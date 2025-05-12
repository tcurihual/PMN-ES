import { Difficulty, Magnitude } from "../contexts/TaskContext"

export const translateMagnitudeToBackend = (
    spanishValue: string
): Magnitude => {
    switch (spanishValue) {
        case "Importante":
            return "Important"
        case "Trivial":
            return "Trivial"
        case "No Trivial":
            return "NotTrivial"
        default:
            throw new Error(`Valor de magnitud no válido ${spanishValue}`)
    }
}

export const translateMagnitudeToFrontend = (
    backendValue: Magnitude
): string => {
    switch (backendValue) {
        case "Important":
            return "Importante"
        case "Trivial":
            return "Trivial"
        case "NotTrivial":
            return "No Trivial"
    }
}

export const translateDifficultyToBackend = (
    spanishValue: string
): Difficulty => {
    switch (spanishValue) {
        case "Difícil":
            return "Hard"
        case "Medio":
            return "Medium"
        case "Fácil":
            return "Easy"
        default:
            throw new Error(`Valor de dificultad no válido, ${spanishValue}`)
    }
}

export const translateDifficultyToFrontend = (
    backendValue: Difficulty
): string => {
    switch (backendValue) {
        case "Hard":
            return "Difícil"
        case "Medium":
            return "Medio"
        case "Easy":
            return "Fácil"
    }
}
