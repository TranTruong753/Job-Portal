<script setup>
import dayjs from 'dayjs';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts'; // Biểu đồ cột
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent, // Cần thiết cho xAxis và yAxis
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useChartStore } from '@/stores/admin/chart';


import { ToolboxComponent } from 'echarts/components';  // Import ToolboxComponent
import { LineChart } from 'echarts/charts';  // Import LineChart

const dateFormat = 'YYYY/MM/DD';
const now = dayjs(); // Lấy ngày hiện tại
console.log(now)

const chartStore = useChartStore()

const date = ref([dayjs(now.subtract(20, 'day'), dateFormat), dayjs(now, dateFormat)]);
const date3 = ref([dayjs(now.subtract(20, 'day'), dateFormat), dayjs(now, dateFormat)]);



const dataChart = ref([]);
const dataAplly = ref([]);
const dataLast = ref([]);

onMounted(async () => {

    dataChart.value = await chartStore.getStatisticalGetTotalAdmin();
    dataAplly.value = await chartStore.getStatisticalJobAdmin(date.value[0].format(dateFormat), date.value[1].format(dateFormat));
    dataLast.value = await chartStore.getStatisticalRegisterAdmin(date.value[0].format(dateFormat), date.value[1].format(dateFormat))
    console.log('dataAplly.value', dataAplly.value.labels)


    option2.value.xAxis[0].data = dataAplly.value.labels; // Gán nhãn vào xAxis
    option2.value.series[0].data = dataAplly.value.jobData; // Gán dữ liệu vào series

    option3.value.xAxis.data = dataLast.value.labels;  // Gán nhãn vào xAxis
    option3.value.series[0].data = dataLast.value.jobSeekerData;  // Gán dữ liệu vào series
    option3.value.series[1].data = dataLast.value.employerData;
    option3.value.series[0].name = 'jobSeeker'; // Gán dữ liệu vào series
    option3.value.series[1].name = 'employer'; // Gán dữ liệu vào series




})

watch(dataAplly, (newVal) => {
    if (newVal && newVal.labels && newVal.jobData) {
        option2.value.xAxis[0].data = newVal.label; // Gán nhãn vào xAxis
        option2.value.series[0].data = newVal.jobData; // Gán dữ liệu vào series
    }
});

watch(dataLast, (newVal) => {
    if (newVal && newVal.labels && newVal.jobSeekerData && newVal.employerData) {
        option3.value.xAxis.data = dataLast.value.labels;  // Gán nhãn vào xAxis
        option3.value.series[0].data = dataLast.value.jobSeekerData;  // Gán dữ liệu vào series
        option3.value.series[1].data = dataLast.value.employerData;  // Gán dữ liệu vào series

    }
});

const onRangeChange = async (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    if (value) {

        dataAplly.value = await chartStore.getStatisticalJobAdmin(dateString[0], dateString[1]);
        console.log('dataAplly.value range', dataAplly.value)
        option2.value.xAxis[0].data = dataAplly.value.labels; // Gán nhãn vào xAxis
        option2.value.series[0].data = dataAplly.value.jobData; // Gán dữ liệu vào series
    }
};

const onRangeChange3 = async (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    if (value) {
        dataLast.value = await chartStore.getStatisticalRegisterAdmin(dateString[0], dateString[1])
        option3.value.xAxis.data = dataLast.value.labels;  // Gán nhãn vào xAxis
        option3.value.series[0].data = dataLast.value.jobSeekerData;  // Gán dữ liệu vào series
        option3.value.series[1].data = dataLast.value.employerData;

    }
};

// Đăng ký theme "dark"
provide(THEME_KEY, 'light');

// Đăng ký các thành phần cần thiết
use([
    CanvasRenderer,
    BarChart,
    LineChart,  // Register LineChart
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,  // Register ToolboxComponent
]);



const option2 = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Application',
            type: 'bar',
            barWidth: '60%',
            data: [
                0, 0, 0
            ]
        }
    ]
})


const option3 = ref({
    title: {
        text: 'Stacked Line'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [

        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: []
        },
        // {
        //   name: 'Video Ads',
        //   type: 'line',
        //   stack: 'Total',
        //   data: [150, 232, 201, 154, 190, 330, 410]
        // },
        // {
        //   name: 'Direct',
        //   type: 'line',
        //   stack: 'Total',
        //   data: [320, 332, 301, 334, 390, 330, 320]
        // },
        // {
        //   name: 'Search Engine',
        //   type: 'line',
        //   stack: 'Total',
        //   data: [820, 932, 901, 934, 1290, 1330, 1320]
        // }
    ]
})
</script>

<template>
    <div class="row g-4">
        <div class="col-sm-6 col-xl-3">
            <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                    <p class="mb-2">Job Seeker</p>
                    <h6 class="mb-0">{{ dataChart.jobseeker }}</h6>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-bar fa-3x text-primary"></i>
                <div class="ms-3">
                    <p class="mb-2">Employer</p>
                    <h6 class="mb-0">{{ dataChart.employer }}</h6>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                    <p class="mb-2">Job Post</p>
                    <h6 class="mb-0">{{ dataChart.jobpost }}</h6>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                    <p class="mb-2">Apply</p>
                    <h6 class="mb-0">{{ dataChart.apply }}</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row g-4 mt-2">
        <div class="col-sm-12 col-xl-12">
            <div class="bg-light rounded p-4">
                <h6 class="card-title p-0 mx-2 text-primary">Number of jobs posted</h6>
                <a-space direction="vertical" :size="12" class="mx-2 mt-3 mb-3">
                    <a-range-picker v-model:value="date" size="large" @change="onRangeChange" />
                </a-space>
                <v-chart class="chart" :option="option2" autoresize />
            </div>
        </div>

    </div>

    <div class="row g-4 mt-2">
        <div class="col-sm-12 col-xl-12">
            <div class="bg-light rounded p-4">
                <h6 class="card-title p-0 mx-2 text-primary">Number of subscribers</h6>
                <a-space direction="vertical" :size="12" class="mx-2 mt-3 mb-3">
                    <a-range-picker v-model:value="date3" size="large" @change="onRangeChange3" />
                </a-space>
                <v-chart class="chart" :option="option3" autoresize />
            </div>
        </div>

    </div>



</template>

<style scoped>
.chart {
    height: 60vh;
}
</style>
