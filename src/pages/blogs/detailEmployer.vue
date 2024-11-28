<script setup>
import { useBlogStore } from '@/stores/blog';
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {formatDateV2} from '@/assets/js/jsUtils'

const blogStore = useBlogStore(); 
const route = useRoute();
const router = useRouter();
const poster = ref([]);
const blog = ref([]);
const idBlog = route.params.id;
onMounted(async ()=>{
    if(await blogStore.getDetailBlogEmployer(idBlog)){
        console.log(blogStore.detailBlogEmployer)
        blog.value = blogStore.detailBlogEmployer;
        poster.value = blogStore.detailBlogEmployer.user;
    }else{
        console.log('out')
        router.push('/')
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
                                <RouterLink to="/account/my-blogs">
                                    <i class="fa fa-arrow-left" aria-hidden="true">
                                    </i> &nbsp;Back to My Blogs
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
                <div class=" col-md-12">

                    <!-- info -->
                    <div class="card shadow border-0 ">

                        <div class="descript_wrap white-bg">
                            <h4 class="text-primary">{{blog.title}}</h4>

                            <div class="single_Wrap mb-3">
                                <div class="row g-3 d-flex align-items-center">
                                    <div class="col-1">
                                        <img src="/src/assets/img/avatar7.png"
                                            class="img-fluid object-fit-cover rounded-circle shadow" alt="...">
                                    </div>
                                    <div class="col-11">
                                        <h5 class="card-title mb-0 pb-2 fs-6"> {{poster.fullname}}</h5>
                                        <p class="card-text"><small class="text-black-50 fst-italic">
                                            {{ formatDateV2(blog.createAt) }}
                                        </small></p>
                                    </div>
                                </div>
                            </div>

                            <div class="single_wrap">

                                <h4>Nội dung chính</h4>
                                <p v-html="blog.content"></p>
                            </div>

                            <div class="border-bottom"></div>
                            <!-- <div class="pt-3 text-end">
                                <a href="#" class="btn btn-secondary">Save</a>
                                <a href="#" class="ms-2 btn btn-primary">
                                    <i class="fa fa-heart-o"></i> Like
                                </a>
                            </div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>