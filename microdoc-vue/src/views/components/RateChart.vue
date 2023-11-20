<script lang="ts" setup>
import { ref, onMounted, onUpdated, watch } from "vue";
//  按需引入 echarts
import { type ECOption } from "@/views/components/echarts"
import echarts from "@/views/components/echarts"
import type { ReportData } from "@/types/report";

const props = defineProps<{
    data?: ReportData
}>();
console.log(props.data)
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

const dataSource = ref<number[][]>()
const maxX = ref(0)

// 指定图表的配置项和数据
const option = ref<ECOption>({
    title: {
        text: 'chart1',
        textAlign: 'center'
    },
    animation: false,
    xAxis: {
        name: '帧',
        minorTick: {
            show: true
        },
        minorSplitLine: {
            show: true
        }
    },
    yAxis: {
        name: '概率(%)',
        min: 0,
        max: 10,
        minorTick: {
            show: true
        },
        minorSplitLine: {
            show: true
        }
    },
    series: [
        {
            type: 'line',
            //显示数据点标记
            showSymbol: false,
            //是否裁剪超出坐标系部分的图形
            clip: false,
            //数据
            data: dataSource.value
        }
    ]
});


let myChart: any = null

onMounted(() => {
    console.log(props.data)


    // 初始化图表
    myChart = echarts.init(main.value)

})

onUpdated(() => {

})


const dataProcess = () => {
    const x: number[] = props.data?.x?.split(',').map((x) => { return Number.parseInt(x) / 1000.0 }) || []
    const y: number[] = props.data?.y?.split(',').map((y) => { return Number.parseInt(y) }) || []

    if (x.length) {
        const data = []
        for (let i = 0; i < x.length; i++) {
            data.push([x[i], y[i]])
        }

        dataSource.value = data
        maxX.value = x[x.length - 1]
    }
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

