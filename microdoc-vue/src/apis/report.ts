import type { PageParm, PageResult } from '@/types/page'
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


/**
 * 分页查询报告
 * @returns 
 */
export const reportPageQueryAllAPI = (pageParm: PageParm) => {
    return http<PageResult<Report>>({
        url: '/report/page?page=' + pageParm.page + '&pageSize=' + pageParm.pageSize,
        method: 'GET',
    })
}


/**
 * 批量删除报告
 * @returns 
 */
export const reportDeleteAPI = (ids: String) => {
    return http<PageResult<Report>>({
        url: '/report?ids=' + ids,
        method: 'DELETE',
    })
}