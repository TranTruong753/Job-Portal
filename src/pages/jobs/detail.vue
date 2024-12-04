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

const checkStatusJob = reactive({
    isSave: '',
    isApply: 0
})



onMounted(async () => {
    if(authStore.role === 'User'){

        const dataSaveOrApply = await authStore.checkJobIsSaveOrApply(jobId);
        if(dataSaveOrApply){
        checkStatusJob.isSave = dataSaveOrApply.issave ;
        checkStatusJob.isApply = dataSaveOrApply.status ;

        console.log('checkStatusJob',checkStatusJob)
    }
    }
    await jobStore.getDetailJobs(jobId);
    if (jobStore.job) {
        console.log('get job thành công!')
        console.log('job', jobStore.job);
        companyInfo.value = jobStore.job.employer.company;
        employer.value = jobStore.job.employer;
        console.log("companyInfo",companyInfo);
    } else {
        console.log('get job thất bại!')
    }

   
})


const handleApply = async() => {
    if (file.value) {
        const isSucces = await authStore.applyJob(jobId, file.value);
        if(isSucces){
            checkStatusJob.isApply = 1;
        }
        file.value = null;
        const fileInput = document.getElementById("cv"); 
        if (fileInput) { 
            fileInput.value = ''; // Reset input file thực sự 
        }

        closeModal('#addCvJob')
    } else {
        errorText.value = "Please select a file to upload.";
    }
}

const handleFileChange = (event) => {
    file.value = event.target.files[0]; // Lưu trữ file đã chọn
    if (file.value) {
        // Kiểm tra nếu file không phải PDF
        if (file.value.type !== 'application/pdf' || !file.value.name.endsWith('.pdf')) {
            errorText.value = "Please upload a valid PDF file.";
            file.value = null; // Reset file nếu không hợp lệ
            const fileInput = document.getElementById("cv");
            if (fileInput) {
                fileInput.value = ''; // Reset input file
            }
        } else {
            errorText.value = ""; // Reset lỗi nếu file hợp lệ
        }
    }
};

const handleSaveJob = async() => {
    if(checkStatusJob.isSave){
        checkStatusJob.isSave = false;
        authStore.SavedJobs(jobId, false);
    }else{
        checkStatusJob.isSave = true;
        authStore.SavedJobs(jobId, true);
    }
}

</script>

<template>
    <section class="section-4 bg-2">
        <div class="container pt-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class=" rounded-3 p-3">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <RouterLink to="/job">
                                    <i class="fa fa-arrow-left" aria-hidden="true">
                                    </i> &nbsp;Back to Jobs
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
                                        <RouterLink  :to="`/company/detail/${companyInfo.id}`" class="card-img ">
                                            <img class="center rounded border object-fit-cover" :src="convertToUrlV2(companyInfo.logo)" :alt=" companyInfo.name ">
                                        </RouterLink>
                                    </div>
                                    <div class="jobs_conetent">

                                        <RouterLink :to="`/company/detail/${companyInfo.id}`">
                                            <h4>{{ companyInfo.name }}</h4>
                                        </RouterLink>
                                        <div class="mb-3">
                                            <a href="#!">
                                                <p class="card-title text-black-50 mb-0">{{ companyInfo.industry }}</p>
                                            </a>

                                            <div class="d-flex align-items-center gap-2 mt-2">
                                                <!-- <svg fill="none" height="20" stroke="currentColor" viewBox="0 0 24 24"
                                                    width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0044 6V18" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"></path>
                                                    <path
                                                        d="M14.9287 7.90332H10.5395C9.99625 7.90332 9.47527 8.11912 9.09114 8.50325C8.70701 8.88738 8.49121 9.40836 8.49121 9.9516C8.49121 10.4948 8.70701 11.0158 9.09114 11.4C9.47527 11.7841 9.99625 11.9999 10.5395 11.9999H13.4656C14.0088 11.9999 14.5298 12.2157 14.914 12.5998C15.2981 12.9839 15.5139 13.5049 15.5139 14.0482C15.5139 14.5914 15.2981 15.1124 14.914 15.4965C14.5298 15.8806 14.0088 16.0964 13.4656 16.0964H8.49121"
                                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        stroke="currentColor"></path>
                                                    <circle cx="12.0002" cy="12.0002" r="9.3" stroke-width="2"
                                                        stroke="currentColor"></circle>
                                                </svg> -->
                                                <!-- <span class="fw-bolder fs-5"><i class="fa fa-map-marker"></i></span>
                                                 <span class="text-black fs-6 fw-bolder ">
                                                    {{ employer.location }}  
                                                </span> -->
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="jobs_right">
                                    <div class="apply_now">
                                        <!-- <a class="heart_mark" href="#"> <i class="fa fa-heart-o"
                                                aria-hidden="true"></i></a> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- info -->
                    <div class="card shadow border-0 my-4">
                        <!-- <div class="job_details_header">
                        <div class="single_jobs white-bg d-flex justify-content-between">
                            <div class="jobs_left d-flex align-items-center">
                                
                                <div class="jobs_conetent">
                                    <a href="#">
                                        <h4>Software Engineer</h4>
                                    </a>
                                    <div class="links_locat d-flex align-items-center">
                                        <div class="location">
                                            <p> <i class="fa fa-map-marker"></i> Noida, India</p>
                                        </div>
                                        <div class="location">
                                            <p> <i class="fa fa-clock-o"></i> Part-time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jobs_right">
                                <div class="apply_now">
                                    <a class="heart_mark" href="#"> <i class="fa fa-heart-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>Job description</h4>
                                <p v-html="jobStore.job.description"></p>
                            </div>
                            <div class="single_wrap">
                                <h4>Requirements</h4>

                                <p v-html="jobStore.job.requirements"></p>
                            </div>

                            <div class="single_wrap">
                                <h4>Benefits</h4>
                                <p v-html="jobStore.job.benefits"></p>
                            </div>

                            <div class="single_wrap">
                                <h4>Skills Requirements</h4>
                                <ul v-for="(item, index) in jobStore.job.skills" :key="index">
                                    <li>{{ item.name }}</li>
                                </ul>
                            </div>

                            <div class="border-bottom"></div>
                            <div class="pt-3 text-end">
                                <button type="button" :class="checkStatusJob.isSave ? 'btn btn-outline-primary' : 'btn btn-secondary'" @click="handleSaveJob">
                                    {{ checkStatusJob.isSave ? 'saved' : 'save' }}
                                </button>
                                
                                <button v-if="authStore.role === 'User' && checkStatusJob.isApply === 0" type="button" class="ms-2 btn btn-primary" @click="handleApply" data-bs-toggle="modal" data-bs-target="#addCvJob">Apply</button>
                                <button v-else-if="authStore.role === 'User' && checkStatusJob.isApply !== 1" type="button" class="ms-2 btn btn-primary" disabled>Applied</button>
                         
                            </div>
                        </div>
                    </div>
                </div>
                <!-- column right -->
                <div class="col-lg-4 col-md-12 ">
                    <div class="">
                        <button v-if="authStore.role === 'User' && checkStatusJob.isApply === 0" type="button" class="mb-4 btn btn-primary w-100 p-lg-3" data-bs-toggle="modal" data-bs-target="#addCvJob">
                            <span> Apply Now </span>
                        </button>
                        <button v-else-if="authStore.role === 'User' " type="button" class="mb-4 btn btn-primary w-100 p-lg-3" disabled>
                            <span> Applied </span>
                        </button>
                        <router-link v-else-if="authStore.role !== 'Employer'" to="/login"
                            class="mb-4 btn btn-primary w-100 p-lg-3">
                            <span>Login Now</span>
                        </router-link>
                    </div>
                    <div class="card shadow border-0 my-4 mt-0">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Job Summery</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Published on: <span>{{ formatDateV2(jobStore.job.createOn) }}</span></li>

                                    <li>Salary: <span>{{ formatCurrencyVND(jobStore.job.salary) }} VNĐ</span></li>
                                    <li>Location: <span>{{ jobStore.job.location }}</span></li>
                                    <li>Street: <span>{{ jobStore.job.locationShort }}</span></li>
                                    <li>Job Nature: <span> {{ jobStore.job.jobType }}</span></li>
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
                                    <li>Name: <span>{{ companyInfo.name }}</span></li>
                                    <li>Industry: <span>{{ companyInfo.industry }}</span></li>
                                    <li>Email: <span>{{ companyInfo.email }}</span></li>
                                    <li>Phone: <span>{{ companyInfo.phone }}</span></li>
                                    <li>Webite: <span>{{ companyInfo.website }}</span></li>
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