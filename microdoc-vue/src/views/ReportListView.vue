<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import type { Report } from '@/types/report'
import { reportQueryAllAPI } from '@/apis/report'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Report[]>([])

const handleSelectionChange = (val: Report[]) => {
    multipleSelection.value = val
}


// 报告列表
const reportList = ref<Report[]>([])

// 挂载后触发
onMounted(() => {
    reportQueryAllData()
})


// 获取报告列表
const reportQueryAllData = async () => {
    const res = await reportQueryAllAPI()
    reportList.value = res.data
    console.log(res.data)
}

</script>


<template>
    <div style="padding-left:1.2rem;height:1rem;margin-bottom:0.8rem;margin-top:0.5rem">
        <el-link type="danger"
                 :underline="false"
                 v-if="multipleSelection.length > 0">
            批量删除
            <el-icon>
                <DeleteFilled />
            </el-icon>
        </el-link>
    </div>
    <el-card>
        <el-table ref="multipleTableRef"
                  :data="reportList"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="55" />
            <el-table-column property="id"
                             label="数据编号"
                             width="120">
            </el-table-column>
            <el-table-column label="上传时间"
                             property="uploadTime"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="120">
                <template #default="scope">
                    <router-link :to="`/chart-show/${scope.row.id}`">
                        <el-link type="primary"
                                 :underline="false">
                            查看
                        </el-link>
                    </router-link>
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

<style scope lang="scss">
.example-pagination-block .example-demonstration {
    margin-bottom: 16px;
}

.el-card {
    width: 94vw;
    margin: 1rem 1rem;
}
</style>