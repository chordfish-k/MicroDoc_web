<script lang="ts" setup>
import { ref, onMounted, onUpdated, watch } from "vue";
//  按需引入 echarts
import { type ECOption } from "@/views/components/echarts"
import echarts from "@/views/components/echarts"
import type { ReportData } from "@/types/report";
import { da } from "element-plus/es/locale/index.mjs";

const props = defineProps<{
    name?: string
    data?: ReportData
}>();
console.log(props.data)
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

const dataSource = ref<number[][]>()
const maxX = ref(0)

// 指定图表的配置项和数据



let myChart: any = null

onMounted(() => {
    console.log(props.data)


    // 初始化图表
    myChart = echarts.init(main.value)
    let option = getOption()
    console.log(option)
    myChart.setOption(option)

    watch(props, (v) => {
        console.log("????", v)
    })

    // 当大小改变后，重画
    const resizeObserver = () => {
        setTimeout(() => {
            myChart?.resize()
        }, 200)
    };
    window.addEventListener('resize', resizeObserver)
})

onUpdated(() => {

})


const getOption = () => {
    console.log("getOption", props.data)
    const x: number[] = props.data?.x?.split(',').map((x) => { return Number.parseInt(x) }) || []
    const y: number[] = props.data?.y?.split(',').map((y) => { return Number.parseInt(y) / 1000.0 }) || []

    const data = []
    if (x.length) {

        for (let i = 0; i < x.length; i++) {
            data.push([x[i], y[i]])
        }

        // dataSource.value = data
        maxX.value = x[x.length - 1]
    }
    const option = {
        title: {
            text: props.name ? props.name : 'eeg',
            // textAlign: 'center'
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
                data: data
            }
        ],
        dataZoom: [
            {
                type: 'inside',
            },
            {
                start: 0,
                end: 100,
                zoomOnMouseWheel: true,
            }
        ],
    }
    return option
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

