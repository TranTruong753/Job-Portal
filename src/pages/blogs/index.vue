<script setup>
import Cardblog from '@/components/blogs/cardBlog.vue';
import { useBlogStore } from '@/stores/blog';
import { ref, onMounted, watch } from 'vue';
import { debounce } from 'lodash';
import {convertToUrlV2, calculateDaysAgo} from '@/assets/js/jsUtils'

const current = ref(1);
const total = ref(0);
const loading = ref(true);
const pageSize = ref(6)
const blogStore = useBlogStore();
const query = ref('');

onMounted(async () => {
    loading.value = true;
    try {
        await blogStore.getBlog(query.value, current.value, pageSize.value);
        const totalResult = await blogStore.getTotalBlog(query.value, current.value, pageSize.value);
        total.value = totalResult; // Gán kết quả thực tế
        console.log('total', total.value);
         // Kiểm tra trạng thái dữ liệu
        loading.value = !(total.value && blogStore.listBlog.length !== 0);
        if (!loading.value) {
            console.log("blogStore.listBlog", blogStore.listBlog);
        }

    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        // loading.value = false;
    }
})


const handleQuery = debounce(async () => {
    current.value = 1;
    await Promise.all([
        blogStore.getBlog(query.value, current.value, pageSize.value),
        blogStore.getTotalBlog(query.value, current.value, pageSize.value).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
}, 300)


watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await Promise.all([
        blogStore.getBlog(query.value, newCurrent, newPageSize),
        blogStore.getTotalBlog(query.value, newCurrent, newPageSize).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
  


});




</script>
<template>
    <!-- search -->
    <section class="section-1 py-5 ">
        <div class="container">
            <div class="card border-0 shadow p-5">
                <div class="row">
                    <div class="col-md-7 mb-3 mb-sm-3 mb-lg-0">
                        <input type="text" class="form-control" name="search" id="search" placeholder="Keywords" v-model="query">
                    </div>

                    <div class=" col-md-3 mb-xs-3 mb-sm-3 mb-lg-0">
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-block" @click="handleQuery" >Search</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

   

    <!-- Featured BLOG -->
    <section class="section-3  py-5 py-sm-4">
        <div class="container">
            <h2>List blogs</h2>
            <div class="overflow-auto px-3" style="height: 90vh;">
                <div class="row pt-5 pt-sm-4">
                    <div class="blog_listing_area">
                        <div class="blog_lists">
                            <div class="row g-3">
                                <div v-if="blogStore.listBlog.length === 0">
                                    <h1 class="text-center text-primary">NOT FUND BLOG </h1>
                                </div>
                                <div v-else-if="loading" class="text-center ">
                                    <div class="loading">
                                        <a-spin size="large" tip="Loading..."/>
                                    </div>
                                </div>
                                <!-- card 01 -->
                                <Cardblog v-else v-for="(item,index) in blogStore.listBlog" :key="index"
                                
                                :cardData="{
                                    id: item.id,
                                    imgSrc: convertToUrlV2(item.img),
                                    imgAlt: item.title,
                                    name: item.title,
                                    description: 'Poster: ' + item.username,
                                    timePost: calculateDaysAgo(item.createOn),
                                    isShow: true,
                                    styleCss: 'col-12 col-lg-4 col-md-6 ',
                                    isShowStyle: 'card-h-100 card border-0 shadow overflow-hidden'
                                }" />
                           
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              <!-- pagination -->
          
              <div class="mt-3 d-flex justify-content-center">
                <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" show-less-items />
            </div>
        </div>
    </section>

    <!-- Most read blog -->
    <section class="section-3 bg-2 py-5 py-sm-4">
        <div class="container">
            <h2>Most read blog</h2>
            <div class="row pt-5 pt-sm-4">
                <div class="blog_listing_area">
                    <div class="blog_lists">
                        <div class="row g-3">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

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