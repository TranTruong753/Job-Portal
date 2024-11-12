<script setup>
import CardCompany from '@/components/companies/cardCompany.vue';
import CardProduct from '@/components/jobs/cardJob.vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const apiData = ref(null);
const error = ref(null);


onMounted(() => {
  
});


</script>




<template>
    <!-- <div>
        <h1>Chi tiết sản phẩm</h1>
        Kiểm tra nếu có lỗi khi gọi API
        <div v-if="error">
            <p class="error-message">Lỗi khi tải dữ liệu: {{ error.message }}</p>
        </div>

      Kiểm tra nếu dữ liệu chưa tải xong 
        <div v-else-if="!apiData">
            <p>Đang tải dữ liệu...</p>
        </div>

         Hiển thị dữ liệu sau khi tải xong 
        <div v-else>
            <p><strong>ID:</strong> {{ apiData.id }}</p>
            <p><strong>Tên:</strong> {{ apiData.name }}</p>
            <p><strong>Giá:</strong> {{ apiData.price }} VND</p>
        </div>
    </div> -->
    <!-- hero -->
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

    <!-- slide Company-->
    <section class="section-3  py-5 py-sm-4 bg-2">
        <div class="container">
            <h2>Top Company</h2>
            <div id="companySlideID" class="carousel slide pt-5 pt-sm-4 g-3" data-bs-ride="carousel"
                data-bs-pause="hover" data-bs-wrap="true">
                <div class="carousel-inner w-80 m-auto">
                    <div class="carousel-item active" data-bs-interval="5000">
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

    <!-- Featured Jobs -->
    <section class="section-3  py-5 py-sm-4">
        <div class="container">
            <h2>Featured Jobs</h2>
            <div class="row pt-5 pt-sm-4">
                <div class="job_listing_area">
                    <div class="job_lists">
                        <div class="row g-3">
                            <!-- card 01 -->            
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                            <!-- card 02 -->
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/fpt_corporation_logo.jpg',
                                imgAlt: 'FPT',
                                name: 'Frontend development',
                                nameCompany: 'FPT',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Slide top job  -->
    <section class="section-3  py-5 py-sm-4 bg-2">
        <div class="container">
            <h2>Top jobs</h2>
            <div id="TopJobSlideId" class="carousel slide pt-5 pt-sm-4 g-3">

                <div class="carousel-inner ">
                    <div class="carousel-item active mb-2 pb-5 ">
                        <div class="row g-4">
                            <!-- card 01 -->                       
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                            <!-- card 02 -->          
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                        </div>

                    </div>
                    <div class="carousel-item  mb-2 pb-5">
                        <div class="row g-4">
                            <!-- card 01 -->                           
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                            <!-- card 02 -->           
                            <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                        </div>
                    </div>
                    <div class="carousel-item  mb-2 pb-5">
                        <div class="row g-4">
                           <!-- card 01 -->            
                           <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />

                            <!-- card 02 -->          
                           <CardProduct :cardData="{
                                imgSrc: '/src/assets/img/edutech_logo.png',
                                imgAlt: 'Edutech',
                                name: 'Frontend development',
                                nameCompany: 'Edutech',
                                timePost: 'Posted 3 days ago',
                                salary: 'Salary negotiable',
                                location: 'Default Location',
                                type: 'Default Type',
                                skill: [
                                    { msg: 'HTML' },
                                    { msg: 'CSS' },
                                    { msg: 'JS' },
                                    { msg: 'REACT' },
                                    { msg: 'BOOSTRAP 5' },

                                ],
                                isShow: true,
                                styleCss: 'card-h-100 col-12 col-lg-6'
                            }" />
                        </div>
                    </div>
                </div>

                <div class="carousel-indicators">
                    <button class="btn-icon-chevron-left" type="button" data-bs-target="#TopJobSlideId"
                        data-bs-slide="prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button type="button" data-bs-target="#TopJobSlideId" data-bs-slide-to="0" class="active"
                        aria-label="Slide 1" aria-current="true"></button>
                    <button type="button" data-bs-target="#TopJobSlideId" data-bs-slide-to="1" aria-label="Slide 2"
                        class=""></button>
                    <button type="button" data-bs-target="#TopJobSlideId" data-bs-slide-to="2" aria-label="Slide 3"
                        class=""></button>
                    <button class="btn-icon-chevron-right" type="button" data-bs-target="#TopJobSlideId"
                        data-bs-slide="next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

            </div>
        </div>
    </section>

    <!-- Latest Jobs -->
    

    <!-- Slide job hot -->
    
</template>
