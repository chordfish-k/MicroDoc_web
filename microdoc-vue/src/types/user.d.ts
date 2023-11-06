export type LoginDTO = {
    phone: string
    pwd: string
}

export type User = {
    id: number
    phone: string
    name: string
    isAdmin: boolean
    enable: boolean
    token: string
}