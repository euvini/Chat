import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if (timestamp) {
        const date = new Date(timestamp.toDate())
        const day = date.toLocaleDateString('pt-BR')
        const hour = date.toLocaleTimeString('pt-BR')

        return `${day}`
    }
}

export function hourFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if (timestamp) {
        const date = new Date(timestamp.toDate())
        const day = date.toLocaleDateString('pt-BR')
        const hour = date.toLocaleTimeString('pt-BR').substring(0, 5)

        return `${hour}`
    }
}