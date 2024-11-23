<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useCompanyStore } from '@/stores/company.js';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import CardProduct from '@/components/jobs/cardJob.vue';
import { calculateDaysAgo } from '@/assets/js/jsUtils.js'

    const route = useRoute();

    const companyId = route.params.id; // '19'
   
    const authStore = useAuthStore();
    const companyStore = useCompanyStore();
    const listJob = ref([]);
    const companyDto = ref([]);

    onMounted(async () => {
    await companyStore.getDetailComapany(companyId);
    if (companyStore.company) {
        console.log('get company thành công!')
        console.log('company', companyStore.company);
        companyDto.value = companyStore.company
        listJob.value = companyStore.company.jobs;
        // companyInfo.value = companyStore.job.employer.company;
        // employer.value = companyStore.job.employer;
        console.log("listjob",listJob.value);
    } else {
        console.log('get company thất bại!')
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
                                <RouterLink to="/company" >
                                    <i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;Back to companys</RouterLink>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container job_details_area">
            <div class="row pb-5">
                <div class="col-lg-8 col-md-12">

                    <div class="card shadow border-0">
                        <div class="job_details_header">
                            <div class="single_jobs white-bg d-flex justify-content-between">
                                <div class="jobs_left d-flex align-items-sm-center gap-4">
                                    <div class="" style="max-width: 150px;">
                                        <a href="#!" class="card-img ">
                                            <img class="center rounded border object-fit-cover"
                                            :src="companyDto.logo" :alt="companyDto.name"
                                                >
                                        </a>
                                    </div>
                                    <div class="jobs_conetent">
                                        <a href="#">
                                            <h4>{{companyDto.name}}</h4>
                                        </a>
                                        <div class="mb-3">
                                            <a href="#!">
                                                <p class="card-title text-black-50 mb-0">{{ companyDto.industry }}</p>
                                            </a>

                                            <!-- <div class="mt-3">
                                                <a class="card-link " href="#!">
                                                    <button type="button" class="btn btn-primary w-100">
                                                        <span>Follow </span>
                                                    </button>
                                                </a>
                                            </div> -->
                                        </div>

                                    </div>
                                </div>
                                <div class="jobs_right">
                                    <div class="apply_now">
                                        <a class="heart_mark" href="#"> <i class="fa fa-heart-o"
                                                aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- General information --  Company overview -->
                    <div class="card shadow border-0 my-4">
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>General information</h4>
                                <div class="border-bottom mb-3"></div>
                               <p>{{ companyDto.description }}</p>
                            </div>
                            <!-- <div class="single_wrap">
                                <h4>Company overview</h4>
                                <div class="border-bottom mb-3"></div>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which
                                    don't look even slightly believable. If you are going to use a passage of Lorem
                                    Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                <p>Variations of passages of lorem Ipsum available, but the majority have suffered
                                    alteration in some form, by injected humour, or randomised words which don't look
                                    even slightly believable. If you are going to use a passage of Lorem Ipsum, you need
                                    to be sure there isn't anything embarrassing.</p>
                            </div> -->
                        </div>

                    </div>


                    <!-- Our key skills -->
                    <div class="card shadow border-0 my-4">
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>Our key skills</h4>
                                <div class="border-bottom mb-3"></div>
                                <p>
                                    * Digital Experience/Product Engineering/ Application Modernization...
                                </p>
                                <p>
                                    * IoT/ Data Management/ Analyst/ Smart Space..
                                </p>
                                <p>
                                    * SAP/ ERP/AWS/ Oracle... (Consultancy & Implementations)</p>
                                <p>
                                    * Embedded Application/ Firmware….

                                </p>
                                <p>
                                    * Automation/Functional/ system/ integration tests ....
                                </p>
                                <p>
                                    * Application Management / Cloud / Infrastructure Services...
                                </p>
                            </div>
                        </div>

                    </div>

                    <!-- Why you'll love working here -->
                    <div class="card shadow border-0 my-4">
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>Why you'll love working here</h4>
                                <div class="border-bottom mb-3"></div>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which
                                    don't look even slightly believable. If you are going to use a passage of Lorem
                                    Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                <p>Variations of passages of lorem Ipsum available, but the majority have suffered
                                    alteration in some form, by injected humour, or randomised words which don't look
                                    even slightly believable. If you are going to use a passage of Lorem Ipsum, you need
                                    to be sure there isn't anything embarrassing.</p>

                            </div>
                            <!-- <div class="pt-3 text-end">
                                <a href="#" class="btn btn-secondary">Save</a>
                                <a href="#" class="ms-2 btn btn-primary">Follow</a>
                            </div> -->
                        </div>

                    </div>
                </div>
                <!-- column right -->
                <div class="col-lg-4 col-md-12">
                    <h2 >job openings</h2>
                    <div v-if="listJob.length !== 0" class="list-jobs my-4 p-2" style="height: 100vh; overflow: auto ;">
                        <div class="row g-3">
                            <CardProduct
                                v-for="(job, index) in listJob"
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
                                styleCss: 'card-h-100 col-12 ',
                                styleCard: 'card-h-100 card border-1'
                                }"
                            
                            />
                            <!-- card 01 -->
                            <!-- <div class="col-12">
                                <div class="card-h-100 card shadow border-0">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <p class="small mb-1">Posted 2 days ago</p>
                                            <button class="border-0 bg-transparent p-0">
                                                <span>
                                                    <svg stroke="currentColor" fill="none" stroke-width="1.5"
                                                        viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <a href="job-detail.html" class="card-link mb-2 ">
                                            <p class="card-title h5 fw-bolder ">
                                                Fullstack Dev & Support (Java, Spring,Angular)
                                            </p>
                                        </a>
                                        <div class="card-img__grou d-flex gap-3 align-items-center">
                                            <a href="#!" class="card-img" style="width: 60px;">
                                                <img class="center border rounded object-fit-cover"
                                                    src="/src/assets/img/fpt_corporation_logo.jpg" alt="">
                                            </a>
                                            <a href="#!" class="card-img-title ">
                                                <p class="small  fw-bolder mb-0 text-black">Bosch Global Software
                                                    Technologies Company Limited</p>
                                            </a>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 mt-2">
                                            <svg fill="none" height="20" stroke="currentColor" viewBox="0 0 24 24"
                                                width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.0044 6V18" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"></path>
                                                <path
                                                    d="M14.9287 7.90332H10.5395C9.99625 7.90332 9.47527 8.11912 9.09114 8.50325C8.70701 8.88738 8.49121 9.40836 8.49121 9.9516C8.49121 10.4948 8.70701 11.0158 9.09114 11.4C9.47527 11.7841 9.99625 11.9999 10.5395 11.9999H13.4656C14.0088 11.9999 14.5298 12.2157 14.914 12.5998C15.2981 12.9839 15.5139 13.5049 15.5139 14.0482C15.5139 14.5914 15.2981 15.1124 14.914 15.4965C14.5298 15.8806 14.0088 16.0964 13.4656 16.0964H8.49121"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    stroke="currentColor"></path>
                                                <circle cx="12.0002" cy="12.0002" r="9.3" stroke-width="2"
                                                    stroke="currentColor"></circle>
                                            </svg>
                                            <a class="card-link " href="#!"> <span
                                                    class="text-black fs-6 fw-bolder text-decoration-underline">Sign in
                                                    to view salary</span></a>
                                        </div>

                                    </div>

                                    <div class="card-body pt-2 pb-3">
                                        <div class="mb-1">
                                            <p class="mb-0">
                                                <span class="fw-bolder fs-5"><i class="fa fa-map-marker"></i></span>
                                                <span class="ps-1">HCM</span>
                                            </p>
                                            <p class="mb-0">
                                                <span class="fw-bolder "><i class="fa fa-clock-o"></i></span>
                                                <span class="ps-1">Remote</span>
                                            </p>
                                        </div>
                                        <div class="d-flex gap-1">
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Java
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Spring
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Angular
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div> -->

                            <!-- card 02 -->
                            <!-- <div class="card-h-100 col-12">
                                <div class="card shadow border-0">
                                    <div class="card-header  bg-white ">
                                        <div class="d-flex justify-content-between">
                                            <p class="small mb-1">Posted 2 days ago</p>
                                            <button class="border-0 bg-transparent p-0">
                                                <span>
                                                    <svg stroke="currentColor" fill="none" stroke-width="1.5"
                                                        viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <a class="card-link mb-2 " href="job-detail.html">
                                            <p class="card-title h5 fw-bolder ">
                                                Middle - Senior Full Stack Developer (Nodejs, ReactJS)
                                            </p>
                                        </a>
                                        <div class="card-img__grou d-flex gap-3 align-items-center">
                                            <a href="#!" class="card-img" style="width: 60px;">
                                                <img class="center border rounded object-fit-cover"
                                                    src="/src/assets/img/future_energy_logo.png" alt="">
                                            </a>
                                            <a href="#!" class="card-img-title ">
                                                <p class="small  fw-bolder mb-0 text-black">Solashi Vietnam</p>
                                            </a>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 mt-2">
                                            <svg fill="none" height="20" stroke="currentColor" viewBox="0 0 24 24"
                                                width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.0044 6V18" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"></path>
                                                <path
                                                    d="M14.9287 7.90332H10.5395C9.99625 7.90332 9.47527 8.11912 9.09114 8.50325C8.70701 8.88738 8.49121 9.40836 8.49121 9.9516C8.49121 10.4948 8.70701 11.0158 9.09114 11.4C9.47527 11.7841 9.99625 11.9999 10.5395 11.9999H13.4656C14.0088 11.9999 14.5298 12.2157 14.914 12.5998C15.2981 12.9839 15.5139 13.5049 15.5139 14.0482C15.5139 14.5914 15.2981 15.1124 14.914 15.4965C14.5298 15.8806 14.0088 16.0964 13.4656 16.0964H8.49121"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    stroke="currentColor"></path>
                                                <circle cx="12.0002" cy="12.0002" r="9.3" stroke-width="2"
                                                    stroke="currentColor"></circle>
                                            </svg>
                                            <a class="card-link " href="#!"> <span
                                                    class="text-black fs-6 fw-bolder text-decoration-underline">Sign in
                                                    to view salary</span></a>
                                        </div>

                                    </div>

                                    <div class="card-body pt-2">
                                        <div class="mb-1">
                                            <p class="mb-0">
                                                <span class="fw-bolder fs-5"><i class="fa fa-map-marker"></i></span>
                                                <span class="ps-1">HCM</span>
                                            </p>
                                            <p class="mb-0">
                                                <span class="fw-bolder "><i class="fa fa-clock-o"></i></span>
                                                <span class="ps-1">Remote</span>
                                            </p>
                                        </div>
                                        <div class="d-flex gap-1">
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Java
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Spring
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary btn-skill"> Angular
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div> -->

                        </div>
                    </div>
                    <div v-else class="card shadow border-0 my-4">
                        <div class="p-3">
                            <h5 class="text-center p-0">Not update Job</h5>
                        </div>
                    </div>
                    <h2 >Contact</h2>
                    <div class="card shadow border-0 my-4">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Company Location</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Name: <span>{{ companyDto.name }}</span></li>
                                    <li>phone: <span>{{companyDto.phone}}</span></li>
                                    <li>Webite: <span>{{ companyDto.website }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>