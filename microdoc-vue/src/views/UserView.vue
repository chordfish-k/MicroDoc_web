<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import { userQueryAllAPI, userSetEnableAPI } from '@/apis/user';
import type { User } from '@/types/user';
import { useUserStore } from '@/stores/userStore';

// 用户信息
const userStore = useUserStore();

// 所有用户集合
const userList = ref<User[]>([])

// 查询所有用户
const userQueryAllData = async () => {
    const res = await userQueryAllAPI()
    userList.value = res.data
    console.log(userList.value)
}

// 挂载后触发
onMounted(() => {
    // 获取用户信息
    userQueryAllData()
})

// 用户启禁用
const enableOrDisable = async (user: User) => {
    const res = await userSetEnableAPI(!user.enable, user.id)
    // 更改成功
    user.enable = !user.enable
}

</script>

<template>
    <div style="padding-left:1.2rem;height:1rem;margin-bottom:0.8rem;margin-top:0.5rem"></div>
    <el-card>
        <el-table ref="multipleTableRef"
                  :data="userList"
                  style="width: 100%">
            <el-table-column property="id"
                             label="id"
                             sortable
                             width="80">
            </el-table-column>
            <el-table-column property="phone"
                             label="账号"
                             width="240">
            </el-table-column>
            <el-table-column property="name"
                             label="用户名"
                             sortable
                             show-overflow-tooltip />
            <el-table-column fixed="right"
                             label="操作"
                             width="120">
                <template #default="scope">

                    <el-link type="primary"
                             :underline="false"
                             :disabled="scope.row.id === userStore.userInfo.id || scope.row.isAdmin"
                             @click="enableOrDisable(scope.row)">
                        {{ scope.row.enable ? '禁用' : '启用' }}
                    </el-link>

                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="example-pagination-block"
             style="float: right;margin: 1rem 0;">
            <el-pagination layout="prev, pager, next"
                           :total="10" />
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.el-card {
    width: 94vw;
    margin: 1rem 1rem;
}
</style>