import type { List } from "echarts/core"

export type PageParm = {
    page: number
    pageSize: number
}

export type PageResult<T> = {
    total: number
    records: T[]
}