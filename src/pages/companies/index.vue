<script setup>
import CardCompany from '@/components/companies/cardCompany.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { useCompanyStore } from '../../stores/company.js';

const companyStore = useCompanyStore();

onMounted(()=>{
    axios.get('/api/company').then(
        response => {
            const companies = response.data;
            console.log(companies);
            // companies.forEach(company => {
            //     const cardCompany = new CardCompany();
            //     cardCompany.company = company;
            //     cardCompany.$mount('#companySlideID.carousel-inner');
            // });
        }
    );
    companyStore.getCompany("/api/company");
})

</script>

<template>
    <section class="section-1 py-5 ">
        <div class="container">
            <div class="card border-0 shadow p-5">
                <div class="row">
                    <div class="col-md-7 mb-3 mb-sm-3 mb-lg-0">
                        <input type="text" class="form-control" name="search" id="search" placeholder="Keywords">
                    </div>

                    <div class="col-md-2 mb-3 mb-sm-3 mb-lg-0">
                        <select name="location" id="location" class="form-control">
                            <option value="">Select a location</option>
                            <option value="">Hồ Chí Minh</option>
                            <option value="">Hà Nội</option>
                            <option value="">Đà Nẵng</option>
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

    <!-- slide Company-->
    <section class="section-3  py-5 py-sm-4 bg-2">
        <div class="container">
            <h2>Top Company</h2>
            <div id="companySlideID" class="carousel slide pt-5 pt-sm-4 g-3" data-bs-ride="carousel"
                data-bs-pause="hover" data-bs-wrap="true">
                <div class="carousel-inner w-80 m-auto">
                    <div class="carousel-item active " data-bs-interval="5000">
                        <div class="row g-4">
                            <!-- card 01 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />

                            <!-- card 02 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />

                            <!-- card 03 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />

                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div class="row g-4">
                            <!-- card 01 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />

                            <!-- card 02 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />

                            <!-- card 03 -->
                            <CardCompany :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Software Engineer',
                                title: 'FPT Technology',
                                salary: ' Sign in to view salary ',
                                location: 'Default Location',
                                type: 'Default Type',
                                jobs: 4,
                                cssStyle: 'col-12 col-lg-4 col-md-6 ',
                                isShow: true,
                                isSave: false
                            }" />
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#companySlideID"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#companySlideID"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </section>

    <!-- Featured Company -->
    <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>Featured Company</h2>
            <div class="row pt-5 pt-sm-4 g-3">

                 <!-- Lặp qua danh sách các công ty -->
                <CardCompany
                    v-for="(company, index) in companyStore.listcompany"
                    :key="index"
                    :cardData="{
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
                            <!-- card 01 -->
                <!-- <CardCompany :cardData="{
                    imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                    imgAlt: 'FPT',
                    name: 'Software Engineer',
                    title: 'FPT Technology',
                    salary: ' Sign in to view salary ',
                    location: 'Default Location',
                    type: 'Default Type',
                    jobs: 4,
                    cssStyle: 'col-12 col-lg-4 col-md-6 ',
                    isShow: true,
                    isSave: false
                }" /> -->

                <!-- card 02 -->
                <!-- <CardCompany :cardData="{
                    imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                    imgAlt: 'FPT',
                    name: 'Software Engineer',
                    title: 'FPT Technology',
                    salary: ' Sign in to view salary ',
                    location: 'Default Location',
                    type: 'Default Type',
                    jobs: 4,
                    cssStyle: 'col-12 col-lg-4 col-md-6 ',
                    isShow: true,
                    isSave: false
                }" /> -->

                <!-- card 03 -->
                <!-- <CardCompany :cardData="{
                    imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                    imgAlt: 'FPT',
                    name: 'Software Engineer',
                    title: 'FPT Technology',
                    salary: ' Sign in to view salary ',
                    location: 'Default Location',
                    type: 'Default Type',
                    jobs: 4,
                    cssStyle: 'col-12 col-lg-4 col-md-6 ',
                    isShow: true,
                    isSave: false
                }" /> -->

            </div>
        </div>
    </section>

    <!-- Company with latest jobs -->
    <section class="section-2 bg-2 py-5 py-sm-4">
        <div class="container">
            <h2>Company with latest jobs</h2>
            <div class="row pt-5 pt-sm-4 g-3">

                <CardCompany
                    v-for="(company, index) in companyStore.listcompany"
                    :key="index"
                    :cardData="{
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
        </div>
    </section>

    <!-- Most followed company -->
    <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>Most followed company</h2>
            <div class="row pt-5 pt-sm-4 g-3">

                <CardCompany
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
                <nav aria-label="Page navigation ">
                    <ul class="pagination">
                        <li class="page-item disabled">
                            <a class="page-link h-100 d-flex align-items-center" href="#" aria-label="Previous" git="-1"
                                aria-disabled="true">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item active" aria-current="page"><a
                                class="page-link h-100 d-flex align-items-center" href="#">1</a></li>
                        <li class="page-item"><a class="page-link h-100 d-flex align-items-center" href="#">2</a></li>
                        <li class="page-item"><a class="page-link h-100 d-flex align-items-center" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>