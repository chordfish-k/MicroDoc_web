<script lang="ts" setup>
import { ref, onMounted, onUpdated } from "vue";
//  按需引入 echarts
import { type ECOption } from "@/views/components/echarts"
import echarts from "@/views/components/echarts"
import type { ReportData } from "@/types/report";

defineProps<{
    data?: ReportData
}>();

const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

// 指定图表的配置项和数据
const option = ref<ECOption>({
    title: {
        text: 'ECharts 入门示例',

    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            animation: false,
        }
    ]
});


let myChart: any = null;

onMounted(() => {
    myChart = echarts.init(main.value);
    myChart.setOption(option.value);
})

onUpdated(() => {
    myChart.setOption(option.value);
})

function init() {
    // 基于准备好的dom，初始化echarts实例
}
</script>

<template>
    <el-card class="card">
        <div ref="main"
             style="width:100%; height:250px"></div>
    </el-card>
</template>

<style scoped>
.card {
    margin: 1rem 1rem;
}
</style>

