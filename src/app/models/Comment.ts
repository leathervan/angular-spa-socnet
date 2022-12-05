import { User } from "./User"

export interface Comment {
    id: number
    message: string
    personDto: User
}