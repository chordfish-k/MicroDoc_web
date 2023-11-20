import type { ReportType } from "@/apis/constants"
import type { Page, PageResult } from "./page"

export type Report = {
    id: number
    userId: number
    uploadTime: string
}

export type ReportData = {
    type: ReportType
    x: string
    y: string
}

export type ReportCapture = {
    imgB64: string
    before: number
    after: number
    time: string
    beforeStr: string
    afterStr: string
}

export type ReportDetail = Report & {
    datas: ReportData[]
    captures: ReportCapture[]
}
