// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import type { User, LoginDTO } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({} as User)
  // 2. 定义获取接口数据的action函数
  const saveUserInfo = (user: User) => {
    userInfo.value = user
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {} as User;
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    saveUserInfo,
    clearUserInfo
  }
}, 
{
  persist: true,
})