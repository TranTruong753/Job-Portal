 <script setup>
import CardCompany from '@/components/companies/cardCompany.vue';
import { onMounted, ref, watch } from 'vue';
import { useCompanyStore } from '@/stores/company.js';
import { debounce } from 'lodash';
import { convertToUrlV2 } from '@/assets/js/jsUtils';

const companyStore = useCompanyStore();
const pageSize = ref(6);
const current = ref(1);

const loading = ref(true);

const queryTextSearch = ref('')
const queryIndustry = ref('')


onMounted(async ()=>{
 
    pageSize.value = 6;
    current.value = 1;
    loading.value = true; // Mặc định bật loading trước khi lấy dữ liệu
    try {
        await Promise.all([
            companyStore.getCompany(pageSize.value, current.value),
            companyStore.getTotal()
  
        ]);
        // Kiểm tra trạng thái dữ liệu
        loading.value = !(companyStore.total && companyStore.listcompany.length !== 0);
        if (!loading.value) {
            console.log("companyStore.listcompany", companyStore.listcompany);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        loading.value = true; // Giữ trạng thái loading khi có lỗi
    }
})

const onShowSizeChange = async (current, pageSize) => {

// await jobStore.getJob(pageSize, current);
await Promise.all([
        companyStore.searchJobs(queryTextSearch.value, queryIndustry.value, pageSize, current),
        companyStore.getTotalWithConditions(queryTextSearch.value, queryIndustry.value)
    ]);

};

watch([current, pageSize], async ([newCurrent, newPageSize]) => {

console.log(newCurrent,newPageSize);
// await jobStore.getJob(newPageSize, newCurrent);
await Promise.all([
        companyStore.searchJobs(queryTextSearch.value, queryIndustry.value, newPageSize, newCurrent),
        companyStore.getTotalWithConditions(queryTextSearch.value, queryIndustry.value)
    ]);

});


// Hàm debounce để trì hoãn tìm kiếm
const debounceSearch = debounce(async () => {
    current.value = 1;
await Promise.all([
        companyStore.searchJobs(queryTextSearch.value, queryIndustry.value, pageSize.value, current.value),
        companyStore.getTotalWithConditions(queryTextSearch.value, queryIndustry.value)
    ]);
}, 300);

const hangleSearch = async () => {
    debounceSearch(); 
}

</script> 


<template>
    <section class="section-1 py-5 ">
        <div class="container">
            <div class="card border-0 shadow p-5">
                <div class="row">
                    <div class="col-md-7 mb-3 mb-sm-3 mb-lg-0">
                        <input  v-model="queryTextSearch" type="text" class="form-control" name="search" id="search" placeholder="Keywords">
                    </div>

                    <!-- <div class="col-md-2 mb-3 mb-sm-3 mb-lg-0">
                        <select name="location" id="location" class="form-control">
                            <option value="">Select a location</option>
                            <option value="">Hồ Chí Minh</option>
                            <option value="">Hà Nội</option>
                            <option value="">Đà Nẵng</option>
                        </select>
                    </div> -->

                    <div class=" col-md-3 mb-xs-3 mb-sm-3 mb-lg-0">
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-primary btn-block" @click="hangleSearch" >Search</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- slide Company-->
    <!-- <section class="section-3  py-5 py-sm-4 bg-2">
        <div class="container">
            <h2>Top Company</h2>
            <div id="companySlideID" class="carousel slide pt-5 pt-sm-4 g-3" data-bs-ride="carousel"
                data-bs-pause="hover" data-bs-wrap="true">
                <div class="carousel-inner w-80 m-auto">
                    <div class="carousel-item active " data-bs-interval="5000">
                        <div class="row g-4">
             
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
    </section> -->

    <!-- Most followed company -->
    <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>List company</h2>
            <div class="row pt-5 pt-sm-4 g-3">
                <div v-if="loading && companyStore.listcompany.length !== 0" class="text-center">
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
                        imgSrc: convertToUrlV2(company.logo) ,  
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
                v-model:current="current"
                v-model:pageSize="pageSize"
                v-model:total="companyStore.total"
                show-size-changer
                @showSizeChange="onShowSizeChange"
            />
            </div>
        </div>
    </section>
   

    <!-- Company with latest jobs -->
    <!-- <section class="section-2 bg-2 py-5 py-sm-4">
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
    </section> -->

     <!-- Featured Company -->
     <!-- <section class="section-2 py-5 py-sm-4">
        <div class="container">
            <h2>Featured Company</h2>
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
    </section> -->

    
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