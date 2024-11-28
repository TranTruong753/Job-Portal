<script setup>

import CardProduct from '@/components/jobs/cardJob.vue';
import CardCompany from '@/components/companies/cardCompany.vue';
import { useJobtore } from '@/stores/jobs.js'
import { ref, watch, onMounted } from 'vue';
import { calculateDaysAgo } from '@/assets/js/jsUtils.js'
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useCompanyStore } from '@/stores/company.js';

const router = useRouter();

const jobStore = useJobtore();
const pageSize = ref(6);
const current = ref(1);

const companyStore = useCompanyStore();
const currentCompany = ref(6);
const pageSizeCompany = ref(1);


const loading = ref(true);
const loadingCompany = ref(true);

const queryTextSearch = ref('')
const querylocationSearch = ref('')
const queryJobType = ref('')
const queryJobLevel = ref('')
const IsDecsending = ref(true);

const queryTextSearchCompany = ref('')
const queryIndustry = ref('')


onMounted(async () => {
    pageSize.value = 10;
    current.value = 1;
    loading.value = true; // Mặc định bật loading trước khi lấy dữ liệu

    pageSizeCompany.value = 10;
    currentCompany.value = 1;
    loadingCompany.value = true; // Mặc định bật loading trước khi lấy dữ liệu
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

    try {
        await Promise.all([
            companyStore.getCompany(pageSizeCompany.value, currentCompany.value),
            companyStore.getTotal()
  
        ]);
        // Kiểm tra trạng thái dữ liệu
        loadingCompany.value = !(companyStore.total && companyStore.listcompany.length !== 0);
        if (!loadingCompany.value) {
            console.log("companyStore.listcompany", companyStore.listcompany);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        loadingCompany.value = true; // Giữ trạng thái loading khi có lỗi
    }
});


watch([current, pageSize], async ([newCurrent, newPageSize]) => {

console.log(newCurrent,newPageSize);
 // await jobStore.getJob(newPageSize, newCurrent);
 await Promise.all([
         jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value, newPageSize, newCurrent),
         jobStore.getTotalWithConditions(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, IsDecsending.value)
     ]);



});


watch([currentCompany, pageSizeCompany], async ([newCurrent, newPageSize]) => {

console.log(newCurrent,newPageSize);
// await jobStore.getJob(newPageSize, newCurrent);
await Promise.all([
        companyStore.searchJobs(queryTextSearchCompany.value, queryIndustry.value, newPageSize, newCurrent),
        companyStore.getTotalWithConditions(queryTextSearchCompany.value, queryIndustry.value)
    ]);
// await jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, pageSize.value, current.value);



});



// Hàm debounce để trì hoãn tìm kiếm
const debounceSearch = debounce(async () => {
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
  
    <section class="section-0 lazy d-flex bg-image-style dark align-items-center "
        data-bg="/src/assets/img/banner5.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h1>Find your dream job</h1>
                    <p>Thounsands of jobs available.</p>
                    <div class="banner-btn mt-5">
                        <a asp-area="EndUser" asp-controller="Job" asp-action="Index"
                            class="btn btn-primary mb-4 mb-sm-0">Explore Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Search -->
    <section class="section-1 py-5 ">
        <div class="container">
            <div class="card border-0 shadow p-5">
                <div class="row">
                    <div class="col-md-3 mb-3 mb-sm-3 mb-lg-0">
                        <input type="text" class="form-control" name="search" id="search" placeholder="Keywords">
                    </div>
                    <div class="col-md-3 mb-3 mb-sm-3 mb-lg-0">
                        <input type="text" class="form-control" name="search" id="search" placeholder="Location">
                    </div>
                    <div class="col-md-3 mb-3 mb-sm-3 mb-lg-0">
                        <select name="category" id="category" class="form-control">
                            <option value="">Select a Category</option>
                            <option value="">Engineering</option>
                            <option value="">Accountant</option>
                            <option value="">Information Technology</option>
                            <option value="">Fashion designing</option>
                        </select>
                    </div>

                    <div class=" col-md-3 mb-xs-3 mb-sm-3 mb-lg-0">
                        <div class="d-grid gap-2">
                            <a href="jobs.html" class="btn btn-primary btn-block">Search</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>List Job</h2>
            <div class="row pt-5 pt-sm-4 g-3">
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
                      imgSrc: job.employer.company.logo,
                      imgAlt: job.employer.company.name,
                      name: job.title,
                      nameCompany: job.employer.company.name,
                      timePost: calculateDaysAgo(job.createOn),
                      salary: job.salary + ' VNĐ',
                      location: job.locationShort,
                      type: job.jobType,
                      skill: job.skills.map(skill => ({ msg: skill.name })),
                      level: job.jobLevel,
                      isShow: true,
                      styleCss: 'card-h-100 col-12 col-lg-6',
                      styleCard: 'card-h-100 card border-0 shadow'
                    }"
                   
                  />
               

            </div>
            <!-- pagination -->
          
            <div class="mt-3 d-flex justify-content-center">
            <a-pagination
            v-model:current="current"
            v-model:pageSize="pageSize"
            v-model:total="jobStore.total"
             

            />
            </div>
        </div>
    </section>

    <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>List company</h2>
            <div class="row pt-5 pt-sm-4 g-3">
                <div v-if="loadingCompany" class="text-center">
                    <div class="loading">
                      <a-spin size="large" tip="Loading..."/>
                    </div>
                </div>
                <div v-else-if="companyStore.listcompany.length === 0">
                    <h1 class="text-center text-primary">NOT FUND COMPANY </h1>
                  </div>
                <CardCompany v-else
                    v-for="(company, index) in companyStore.listcompany"
                    :key="index"
                    :cardData="{
                        id: company.id,
                        imgSrc: company.logo ,  
                        imgAlt: company.name || 'Default Company',
                        name: company.name || 'Default Position',
                        title: company.industry || 'Default Title',
                        location: company.location || 'Default Location',
                        type: company.type || 'Default Type',
                        jobs: 4,
                        cssStyle: 'col-12 col-lg-4 col-md-6',
                        isShow: true,
                        isSave: false
                    }"
                />
               

            </div>
            <!-- pagination -->
          
            <div class="mt-3 d-flex justify-content-center">
            <a-pagination
                v-model:current="currentCompany"
                v-model:pageSize="pageSizeCompany"
                v-model:total="companyStore.total"
           
            />
            </div>
        </div>
    </section>
   

   
</template>
