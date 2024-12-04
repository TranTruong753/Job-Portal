<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useJobtore } from '@/stores/jobs';
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref, watch } from 'vue';
import { formatDateV2, closeModal, formatCurrencyVND, convertToUrlV2 } from '@/assets/js/jsUtils.js'


const route = useRoute();
const jobId = route.params.id; // '19'
const jobStore = useJobtore();
const authStore = useAuthStore();
const companyInfo = ref([]);
const employer = ref([]);
const file = ref(null);

const errorText = ref("");


onMounted(async () => {


    if(authStore.role === 'Employer'){
        await jobStore.getDetailEmployerJobs(jobId)
        await authStore.getEmployer();
    }

   
})


</script>

<template>
    <section class="section-4 bg-2">
    <div class="container pt-5">
        <div class="row">
            <div class="col">
                <nav aria-label="breadcrumb" class=" rounded-3 p-3">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <RouterLink to="/account/my-jobs">
                                <i class="fa fa-arrow-left" aria-hidden="true">
                                </i> &nbsp;Back to My Jobs
                            </RouterLink>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
        <div class="container job_details_area">
            <div class="row pb-5">
                <!-- column left -->
                <div class="col-lg-8 col-md-12">
                    <!-- header  -->
                    <div class="card shadow border-0">
                        <div class="job_details_header">
                            <div class="single_jobs white-bg d-flex justify-content-between">
                                <div class="jobs_left d-flex align-items-sm-center gap-4">
                                    <div class="" style="max-width: 150px;">
                                        <RouterLink  :to="`/company/detail/${authStore.userCompany.id}`" class="card-img ">
                                            <img class="center rounded border object-fit-cover" :src="convertToUrlV2(authStore.userCompany.logo)" :alt=" authStore.userCompany.name ">
                                        </RouterLink>
                                    </div>
                                    <div class="jobs_conetent">

                                        <RouterLink :to="`/company/detail/${authStore.userCompany.id}`">
                                            <h4>{{ authStore.userCompany.name }}</h4>
                                        </RouterLink>
                                        <div class="mb-3">
                                            <a href="#!">
                                                <p class="card-title text-black-50 mb-0">{{ authStore.userCompany.industry }}</p>
                                            </a>

                                            <div class="d-flex align-items-center gap-2 mt-2">
                                              
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="jobs_right">
                                    <div class="apply_now">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- info -->
                    <div class="card shadow border-0 my-4">
                    
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>Job description</h4>
                    
                                 <p v-html="jobStore.jobEmployer.description"></p>
                            </div>
                            <div class="single_wrap">
                                <h4>requirements</h4>

                       
                                 <p v-html="jobStore.jobEmployer.description"></p>
                            </div>

                            <div class="single_wrap">
                                <h4>Benefits</h4>
                               
                                 <p v-html="jobStore.jobEmployer.description"></p>
                            </div>

                            <div class="single_wrap">
                                <h4>Skills Requirements</h4>
                                <ul v-for="(item, index) in jobStore.jobEmployer.skills" :key="index">
                                    <li>{{ item.name }}</li>
                                </ul>
                            </div>

                            <div class="border-bottom"></div>
                            <div class="pt-3 text-end">
                               
                                
                              
                            </div>
                        </div>
                    </div>
                </div>
                <!-- column right -->
                <div class="col-lg-4 col-md-12 ">
                    <div class="card shadow border-0 my-4 mt-0">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Job Summery</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Published on: <span>{{ formatDateV2(jobStore.jobEmployer.createOn) }}</span></li>

                                    <li>Salary: <span>{{ formatCurrencyVND(jobStore.jobEmployer.salary) }} VNĐ</span></li>
                                    <li>Location: <span>{{ jobStore.jobEmployer.location }}</span></li>
                                    <li>Street: <span>{{ jobStore.jobEmployer.locationShort }}</span></li>
                                    <li>Job Nature: <span> {{ jobStore.jobEmployer.jobType }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card shadow border-0 my-4">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Company Details</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Name: <span>{{ authStore.userCompany.name }}</span></li>
                                    <li>Industry: <span>{{ authStore.userCompany.industry }}</span></li>
                                    <li>Email: <span>{{ authStore.userCompany.email }}</span></li>
                                    <li>Phone: <span>{{ authStore.userCompany.phone }}</span></li>
                                    <li>Webite: <span>{{ authStore.userCompany.website }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      <!-- modal job apply-->
      <div class="modal fade" id="addCvJob" tabindex="-1" aria-labelledby="addCvJobLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="addCvJobLabel">Add File CV</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form enctype="multipart/form-data">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">File PDF</label>
                                <input type="file" class="form-control" id="cv" name="cv" @change="handleFileChange" >
                                <span class="text-danger">{{errorText}}</span>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary mx-3" @click="handleApply" >Apply</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<style>

.text-danger {
    display: block;
    height: 24px;
    padding: 8px 0;
    font-size: 13px;
}

</style>