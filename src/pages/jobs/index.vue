<script setup>

import CardProduct from '@/components/jobs/cardJob.vue';
import { useJobtore } from '@/stores/jobs.js'
import { ref, watch, onMounted } from 'vue';
import { calculateDaysAgo,formatCurrencyVND,convertToUrlV2 } from '@/assets/js/jsUtils.js'
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';

const router = useRouter();

const jobStore = useJobtore();
const pageSize = ref(8);
const current = ref(1);


const loading = ref(true);

const queryTextSearch = ref('')
const querylocationSearch = ref('')
const queryJobType = ref('')
const queryJobLevel = ref('')
const IsDecsending = ref(true);



onMounted(async () => {
    pageSize.value = 6;
    current.value = 1;
    loading.value = true; // Mặc định bật loading trước khi lấy dữ liệu
    try {
        await Promise.all([
            jobStore.getJob(pageSize.value, current.value),
            jobStore.getTotal()
  
        ]);
        // Kiểm tra trạng thái dữ liệu
        loading.value = !(jobStore.total && jobStore.listjobs.length !== 0);
        if (!loading.value) {
            console.log("jobStore.listjobs", jobStore.listjobs);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        loading.value = true; // Giữ trạng thái loading khi có lỗi
    }
});



// const onShowSizeChange = async (current, pageSize) => {

//     // await jobStore.getJob(pageSize, current);
//     await Promise.all([
//             jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value, pageSize, current),
//             jobStore.getTotalWithConditions(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value)
//         ]);
//     // await jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, pageSize.value, current.value);



// };

watch([current, pageSize], async ([newCurrent, newPageSize]) => {

   console.log(newCurrent,newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await Promise.all([
            jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value, newPageSize, newCurrent),
            jobStore.getTotalWithConditions(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value)
        ]);
   // await jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, pageSize.value, current.value);

 

});



// Hàm debounce để trì hoãn tìm kiếm
const debounceSearch = debounce(async () => {
  current.value = 1;
  await Promise.all([
            jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value,  IsDecsending.value, pageSize.value, current.value),
            jobStore.getTotalWithConditions(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value,  IsDecsending.value,)
        ]);
  }, 300);

const hangleSearch = async () => {
  debounceSearch(); 
}

</script> 


<template>


    <section class="section-3 py-5 bg-2">
      <div class="container">
        <!-- Header -->
        <div class="row">
          <div class="col-6 col-md-10">
            <h2>Find Jobs</h2>
          </div>
          <div class="col-6 col-md-2">
            <select v-model="IsDecsending" name="IsDecsending" id="IsDecsending" class="form-control" @change="hangleSearch">
              <option value="true">Latest</option>
              <option value="false">Oldest</option>
            </select>
          </div>
        </div>
  
        <!-- Content -->
        <div class="row pt-5">
          <!-- Sidebar -->
          <div class="col-md-4 col-lg-3 sidebar mb-4">
            <div class="card border-0 shadow p-4">
              <div class="mb-4">
                <h2>Keywords</h2>
                <input v-model="queryTextSearch" type="text" placeholder="Keywords" class="form-control" @input="hangleSearch" />
              </div>
  
              <div class="mb-4">
                <h2>Location</h2>
                <input v-model="querylocationSearch" type="text" placeholder="Location" class="form-control" @input="hangleSearch"/>
              </div>
  
              <div class="mb-4">
                <h2>Job Level</h2>
                <select name="jobLevel" id="jobLevel" class="form-control" v-model="queryJobLevel" @change="hangleSearch">
                  <option  value="">Select a Job Level</option>
                  <option value="Intern">Intern</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div class="mb-4">
                <h2>Job Type</h2>
                <select name="jobType" id="jobType" class="form-control" v-model="queryJobType"  @change="hangleSearch">
                  <option  value="">Select a Job Type</option>
                  <option value="In Office">In Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="fashion">Oversea</option>
                </select>
              </div>
  
              <!-- <div class="mb-4">
                <h2>Job Type</h2>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    name="job_type"
                    type="checkbox"
                    value="1"
                    id=""
                  
                  />
                  <label class="form-check-label" for="">Full Time</label>
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    name="job_type"
                    type="checkbox"
                    value="2"
                    id=""
                  
                  />
                  <label class="form-check-label" for="">Part Time</label>
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    name="job_type"
                    type="checkbox"
                    value="3"
                    id=""
                  
                  />
                  <label class="form-check-label" for="">Freelance</label>
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    name="job_type"
                    type="checkbox"
                    value="4"
                    id=""
                  
                  />
                  <label class="form-check-label" for="">Remote</label>
                </div>
              </div> -->
            </div>
          </div>
  
          <!-- Job Listings -->
          <div class="col-md-8 col-lg-9 overflow-auto vh-100" >
            <div class="job_listing_area">
              <div class="job_lists">
                <div class="row g-3 ">

                  <div v-if="loading && jobStore.listjobs.length !== 0" class="text-center">
                    <div class="loading">
                      <a-spin size="large" tip="Loading..."/>
                    </div>
                  </div>

                  <div v-else-if="jobStore.listjobs.length === 0">
                    <h1 class="text-center text-primary">NOT FUND JOB </h1>
                  </div>

                  <CardProduct
                  v-else-if="jobStore.listjobs.length !== 0"
                    v-for="(job, index) in jobStore.listjobs"
                    :key="index"
                    :card-data="{
                      id: job.id,
                      imgSrc: convertToUrlV2(job.employer.company.logo),
                      imgAlt: job.employer.company.name,
                      name: job.title,
                      nameCompany: job.employer.company.name,
                      timePost: calculateDaysAgo(job.createOn),
                      salary: formatCurrencyVND(job.salary) + ' VNĐ',
                      location: job.locationShort,
                      type: job.jobType,
                      skill: job.skills.map(skill => ({ msg: skill.name })),
                      level: job.jobLevel,
                      isShow: true,
                      styleCss: 'card-h-100 col-12 col-lg-6',
                      styleCard: ' border-0 shadow'
                    }"
                   
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <div class="mt-3 d-flex justify-content-center">
          <a-pagination
            v-model:current="current"
            v-model:pageSize="pageSize"
            v-model:total="jobStore.total"
         
          />
        </div>
      </div>
    </section>
  </template>

<style scoped>
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
  height: 60vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: transparent;
  border-radius: 4px;
 
  padding: 30px 50px;
  
  height: 50vh;
}
</style>