<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import type { Report } from '@/types/report'
import { reportDeleteAPI, reportPageQueryAllAPI, reportQueryAllAPI } from '@/apis/report'
import type { PageParm, PageResult } from '@/types/page';

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Report[]>([])

const handleSelectionChange = (val: Report[]) => {
    multipleSelection.value = val
}

// 分页参数
const pageParam: PageParm = {
    page: 1,
    pageSize: 10
}

// 报告列表
const reportPage = ref<PageResult<Report>>({
    total: 0,
    records: []
})

// 挂载后触发
onMounted(() => {
    reportQueryAllData()
})


// 获取报告列表
const reportQueryAllData = async () => {
    const res = await reportPageQueryAllAPI(pageParam)
    reportPage.value = res.data
    console.log(res.data)
}

// 页码改变
const handleCurrentPageChange = (page: number) => {
    pageParam.page = page
    reportQueryAllData()
}

// 批量删除
const handleDelete = async () => {
    const ids = multipleSelection.value.map((x: Report) => x.id).join(",")
    await reportDeleteAPI(ids)
    // 删除后重新获取数据
    reportQueryAllData()
}

</script>


<template>
    <div style="padding-right:1.2rem;height:1rem;margin-bottom:0.8rem;margin-top:0.5rem; float: right;">
        <el-link type="danger"
                 :underline="false"
                 v-if="multipleSelection.length > 0"
                 @click="handleDelete">
            批量删除
            <el-icon>
                <DeleteFilled />
            </el-icon>
        </el-link>
    </div>
    <el-card class="table">
        <div>
            <el-table ref="multipleTableRef"
                      :data="reportPage?.records"
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
        </div>

        <!-- 页码 -->
        <div class="pagination-block"
             style="float: right;margin: 1rem 0;">
            <el-pagination layout="prev, pager, next"
                           :total="reportPage?.total"
                           :page-size="pageParam.pageSize"
                           @current-change="handleCurrentPageChange" />
        </div>
    </el-card>
</template>

<style scope lang="scss">
.pagination-block {
    margin-bottom: 16px;
    bottom: 10vh;
    right: 2vw;
    position: fixed;
}

.table {
    height: 80vh;
}

.el-card {
    width: 94vw;
    margin: 1rem 1rem;

}
</style>