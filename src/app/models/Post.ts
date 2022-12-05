import { Comment } from './Comment'
import { User } from './User'
export interface Post {
    id?: number
    title: string
    caption: string
    location: string
    personDto?: User
    image?: File
    peopleLikedPost?: User[]
    comments?: Comment[]
}