import type { LoginDTO, User } from '@/types/user'
import { http } from '@/utils/http'

/**
 * 用户登录
 * @param loginDTO 
 * @returns 
 */
export const loginAPI = (loginDTO : LoginDTO) => {
    return http<User>({
        url: '/user/login',
        method: 'POST',
        data: loginDTO
    });
}

/**
 * 查询所有用户
 * @returns 
 */
export const userQueryAllAPI = () => {
    return http<User[]>({
        url: '/user',
        method: 'GET',
    })
}


/**
 * 用户启禁用
 * @param enable 
 * @returns 
 */
export const userSetEnableAPI = (enable: boolean, id: number) => {
    return http<User[]>({
        url: '/user/enable/'+(enable ? 1 : 0)+"?id="+id,
        method: 'PUT',
    })
}