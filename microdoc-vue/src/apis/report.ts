import type { Report, ReportDetail } from '@/types/report'
import { http } from '@/utils/http'

/**
 * 查询所有报告
 * @returns 
 */
export const reportQueryAllAPI = () => {
    return http<Report[]>({
        url: '/report',
        method: 'GET',
    })
}


/**
 * 查询单个详细报告
 * @returns 
 */
export const reportQueryDetailAPI = (reportId: number) => {
    return http<ReportDetail>({
        url: '/report/' + reportId,
        method: 'GET',
    })
}