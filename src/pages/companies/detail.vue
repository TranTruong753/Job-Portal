<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useCompanyStore } from '@/stores/company.js';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import CardProduct from '@/components/jobs/cardJob.vue';
import { calculateDaysAgo, convertToUrlV2 } from '@/assets/js/jsUtils.js'

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
                                            :src="convertToUrlV2(companyDto.logo)" :alt="companyDto.name"
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
                                        <!-- <a class="heart_mark" href="#"> <i class="fa fa-heart-o"
                                                aria-hidden="true"></i></a> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- General information --  Company overview -->
                    <div class="card shadow border-0 my-4">
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                              
                             
                               <span v-html="companyDto.description "></span>
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
                                imgSrc: convertToUrlV2(job.employer.company.logo),
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