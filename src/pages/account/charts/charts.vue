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

const dateFormat = 'YYYY/MM/DD';
const now = dayjs(); // Lấy ngày hiện tại
console.log(now)
const authStore = useAuthStore();

const date = ref([dayjs(now.subtract(20,'day'), dateFormat), dayjs(now, dateFormat)]);



const dataChart = ref([]);
const dataAplly = ref([]);

onMounted(async () => {

  dataChart.value = await authStore.GetStatisticalJobStatus();
  dataAplly.value = await authStore.GetApplyAndDateRange(date.value[0].format(dateFormat),date.value[1].format(dateFormat));
  console.log(typeof dataAplly.value.apply)

   // Cập nhật giá trị cho biểu đồ sau khi dữ liệu đã sẵn sàng
  //  option.value.series.data = [
  //   {
  //     value: dataAplly.value.apply || 0, // Giá trị ứng tuyển
  //     groupId: 'apply',
  //   },
  //   {
  //     value: dataAplly.value.approve || 0,// Giá trị phê duyệt
  //     groupId: 'approve',
  //   },
  //   {
  //     value: dataAplly.value.reject || 0,
  //     groupId: 'reject',
  //   },
  // ];

  option2.value.series[0].data = [
    
      dataAplly.value.apply || 0, // Giá trị ứng tuyển   
      dataAplly.value.approve || 0,// Giá trị phê duyệt 
      dataAplly.value.reject || 0,
     
    
  ];
})

watch(dataAplly, (newVal) => {
  // if (newVal) {
  //   option.value.series.data = [
  //     {
  //       value: newVal.apply || 0, // Giá trị ứng tuyển
  //       groupId: 'apply',
  //     },
  //     {
  //       value: newVal.approve, // Giá trị phê duyệt
  //       groupId: 'approve',
  //     },
  //     {
  //       value: newVal.reject, // Giá trị từ chối
  //       groupId: 'reject',
  //     },
  //   ];
  // }
  if (newVal) {
    option2.value.series[0].data = [
      newVal.apply || 0,
      newVal.approve || 0,
      newVal.reject || 0,
    ];
  }
});

const onRangeChange = async (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
  if(value){

    dataAplly.value = await authStore.GetApplyAndDateRange(dateString[0],dateString[1]);
    option2.value.series[0].data = [
    
      dataAplly.value.apply || 0, // Giá trị ứng tuyển   
      dataAplly.value.approve || 0,// Giá trị phê duyệt 
      dataAplly.value.reject || 0,
     
    
  ];
  }
};

// Đăng ký theme "dark"
provide(THEME_KEY, 'light');

// Đăng ký các thành phần cần thiết
use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, // Hỗ trợ xAxis và yAxis
]);

// Cấu hình biểu đồ
// const option = ref({
//   xAxis: {
//     data: ['Apply', 'Approve', 'Reject'],
//   },
//   yAxis: {
//     type: 'value'
//   },
//   dataGroupId: '',
//   animationDurationUpdate: 700,
//   series: {
//     type: 'bar',
//     id: 'sales',
//     data: [
//       {
//         value: 0,
//         groupId: 'apply'
//       },
//       {
//         value: 0,
//         groupId: 'approve'
//       },
//       {
//         value: 0,
//         groupId: 'reject'
//       }
//     ],
//     universalTransition: {
//       enabled: true,
//       divideShape: 'clone'
//     }
//   }
// });

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
      data: ['Apply', 'Approve', 'Reject'],
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
        0,0,0
      ]
    }
  ]
})
</script>

<template>
  <div class="bg-white mx-1 py-3 px-3">
    <div class="row">
      <div class=" col-lg-6">
  
        <div class="card shadow border-0 my-3 me-0 ms-lg-3 ms-xl-4">
          <div class="card-header bg-white">
            <h6 class="card-title p-0 text-primary"> Job Approval</h6>
          </div>
          <div class="card-body ">
            <div class="d-flex align-items-center gap-2">
              <span class="p-0 fs-5">{{ dataChart.approval }} <small>Jobs</small></span>
              <i class="text-success fa-solid fa-check" ></i>
            </div>
          </div>
        </div>
  
      </div>
      <div class=" col-lg-6">
  
        <div class="card shadow border-0 my-3 ms-0 me-lg-3  me-xl-4">
          <div class="card-header bg-white">
            <h6 class="card-title p-0 text-primary"> Job Pending</h6>
          </div>
          <div class="card-body ">
            <div class="d-flex align-items-center gap-2">
              <span class="p-0 fs-5 ">{{ dataChart.pending }} <small>Jobs</small></span>
              <i class="fa-solid fa-clock text-warning"></i>
            </div>
          </div>
        </div>
  
      </div>
    </div>
   <div class="row">
      <div class=" col-lg-6">
  
        <div class="card shadow border-0 my-3 me-0 ms-lg-3 ms-xl-4">
          <div class="card-header bg-white">
            <h6 class="card-title p-0 text-primary "> Job Expired</h6>
          </div>
          <div class="card-body ">
            <div class="d-flex align-items-center gap-2">
              <span class="p-0 fs-5">{{ dataChart.expired }} <small>Jobs</small></span>
              <i class="fa-solid fa-exclamation text-danger"></i>
            </div>
          </div>
        </div>
  
      </div>
      <div class=" col-lg-6">
  
        <div class="card shadow border-0 my-3 ms-0 me-lg-3 me-xl-4">
          <div class="card-header bg-white">
            <h6 class="card-title p-0 text-primary"> Job Reject</h6>
          </div>
          <div class="card-body ">
            <div class="d-flex align-items-center gap-2">
              <span class="p-0 fs-5 ">{{ dataChart.reject }} <small>Jobs</small></span>
              <i class="text-primary fa-solid fa-circle-xmark"></i>
            </div>
          </div>
        </div>
  
      </div>
   </div>

   <div class="row">
      <div class="col-lg-12">
        <div class="card shadow border-0 mx-lg-3 mx-xl-4 p-2"> 
          <h6 class="card-title p-0 mx-2 text-primary">Statistics on Job Application Submissions</h6>
          <a-space direction="vertical" :size="12" class="mx-2 mt-2">
            <a-range-picker v-model:value="date" size="large"  @change="onRangeChange"/>
          </a-space>
          <v-chart class="chart" :option="option2" autoresize />
        </div>
      </div>
   </div>
  </div>

</template>

<style scoped>
.chart {
  height: 60vh;
}
</style>
