<script setup lang="ts">
import type { ReportData } from '@/types/report';
import TestChart from '@/views/components/TestChart.vue'
import RateChart from '@/views/components/RateChart.vue'
import type { Report, ReportDetail } from '@/types/report'
import { reportQueryDetailAPI } from '@/apis/report'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ReportType } from '@/apis/constants';
import { type ECOption } from "@/views/components/echarts"
import echarts from "@/views/components/echarts"

// 使用ref创建虚拟DOM引用，使用时用main.value
const chart1 = ref()
const chart2 = ref()
const chart3 = ref()
// 图表对象
let myChart1: echarts.ECharts
let myChart2: echarts.ECharts
let myChart3: echarts.ECharts

const router = useRoute()

// 报告列表
const report = ref<ReportDetail>()

// 图表数据
let positiveData: ReportData
let negativeData: ReportData
let statusData: ReportData

// 用于echart的数据源
const option1 = ref<ECOption>({})
const option2 = ref<ECOption>({})

// 获取报告数据
const reportQueryDetailData = async () => {
    const res = await reportQueryDetailAPI(Number.parseInt(router.params.id as string))
    report.value = res.data
}

// 挂载后触发
onMounted(async () => {
    // 初始化图表
    myChart1 = echarts.init(chart1.value)
    myChart2 = echarts.init(chart2.value)

    // 获取图表数据
    await reportQueryDetailData()
    console.log(report.value)

    // 处理图表数据
    report.value!.datas.forEach(x => {
        switch (x.type) {
            case ReportType.CHART1_POSITIVE:
                positiveData = x
                break
            case ReportType.CHART1_NEGATIVE:
                negativeData = x
                break
            case ReportType.CHART2_STATUS:
                statusData = x
                break
        }
    })

    const data_P = dataProcess(positiveData)
    const data_N = dataProcess(negativeData)
    const data_S = dataProcess(statusData)
    // netural
    const data_C = []
    for (let i = 0; i < data_P.length; i++) {
        data_C.push([data_P[i][0], 1.0 - data_P[i][1] - data_N[i][1]])
    }

    // chart1
    option1.value = chart1OptionProcess(data_P, data_N, data_C, data_P.length)
    myChart1.setOption(option1.value)

    // chart2
    option2.value = chart2OptionProcess(data_S, data_S.length)
    myChart2.setOption(option2.value)


    // 双表联动datazoom
    echarts.connect([myChart1, myChart2])

    // 当大小改变后，重画
    const resizeObserver = () => {
        setTimeout(() => {
            myChart1?.resize()
            myChart2?.resize()
        }, 200)
    };
    window.addEventListener('resize', resizeObserver)
})



// 处理图表数据
const dataProcess = (data: ReportData) => {
    const x: number[] = data.x.split(',').map((x) => { return Number.parseInt(x) }) || []
    const y: number[] = data.y.split(',').map((y) => { return Number.parseInt(y) / 1000.0 }) || []
    let dataSource = []
    if (x.length) {

        for (let i = 0; i < x.length; i++) {
            dataSource.push([x[i], y[i]])
        }
    }
    return dataSource
}

const chart1OptionProcess = (
    data_P: number[][],
    data_N: number[][],
    data_C: number[][],
    maxX: number) => {
    const option: ECOption = {
        title: {
            text: 'chart1',
        },
        legend: {
            data: ['positive', 'negative', 'netural'],
        },
        animation: false,
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            name: '帧',
            min: 0,
            max: maxX,
            boundaryGap: false,
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
            max: 1,
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
                name: 'positive',
                //显示数据点标记
                showSymbol: false,
                //是否裁剪超出坐标系部分的图形
                clip: false,
                //数据
                data: data_P,
                smooth: true,
            },
            {
                type: 'line',
                name: 'negative',
                showSymbol: false,
                clip: false,
                data: data_N,
                smooth: true,
            },
            {
                type: 'line',
                name: 'netural',
                showSymbol: false,
                clip: false,
                data: data_C,
                smooth: true,
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


const chart2OptionProcess = (
    data_S: number[][],
    maxX: number) => {
    const option: ECOption = {
        title: {
            text: 'chart2',
        },
        animation: false,
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            name: '帧',
            min: 0,
            max: maxX,
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
            max: 1,
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
                data: data_S,
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
    <div style="display: flex"
         id="box">
        <div style="display: block;">
            <el-card class="card">
                <div ref="chart1"
                     style="width:100%; height:35vh"></div>
            </el-card>
            <el-card class="card">
                <div ref="chart2"
                     id="chart2"
                     style="width:100%; height:35vh"></div>
            </el-card>
        </div>
        <el-card class="card">
            <el-scrollbar>
                <el-table ref="multipleTableRef"
                          :data="report?.captures"
                          style="width: 100%; height: 75vh;">
                    <el-table-column label="捕获图片">
                        <template #default="scope">
                            <img :src="scope.row.imgB64"
                                 width="64"
                                 height="64"
                                 @click="console.log(scope.row.imgB64)">
                        </template>
                    </el-table-column>
                    <el-table-column property="before"
                                     label="变化前"
                                     width="120">
                    </el-table-column>
                    <el-table-column property="after"
                                     label="变化后"
                                     width="120">
                    </el-table-column>
                    <el-table-column property="time"
                                     label="时间"
                                     sortable
                                     show-overflow-tooltip />
                </el-table>
            </el-scrollbar>

        </el-card>
    </div>
</template>

<style scoped>
.card {
    max-width: 50vw;
    margin: 1rem 1rem;
}
</style>