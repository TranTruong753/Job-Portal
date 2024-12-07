<script setup>
import { useBlogAdminStore } from '@/stores/admin/blogAdmin';
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateForInput, convertToUrlV2 } from '@/assets/js/jsUtils'

const route = useRoute()
const blogStore = useBlogAdminStore();
const blogAdminData = ref('')
const idBlog = route.params.id;
const dateCreate = ref('');
const userName = ref('')
const img = ref('')


const editorConfig = {
    height: 400,
    menubar: false,
    plugins: ['link', 'image', 'lists'],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
    readonly: true,
};

onMounted(async () => {
    await blogStore.getBlogById(idBlog);
    if(blogStore.blogData){
        blogAdminData.value = blogStore.blogData;
        dateCreate.value = formatDateForInput(blogStore.blogData.createAt)
        img.value = convertToUrlV2(blogStore.blogData.img)
        userName.value = blogStore.blogData.user.fullname
    }else{
        img.value = '/src/assets/img/avatar7.png'
        blogAdminData.value = [];
    }
})


</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-9 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Detail Blog</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-12">
                        <input readonly v-model="blogAdminData.title"type="text" class="form-control" id="floatingBlogName" placeholder="Name...">
                        <label for="floatingBlogName">Blog Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="userName" type="text" class="form-control" id="floatingFullName" placeholder="Nguyen Van A...">
                        <label for="floatingFullName">User Name Post Blog</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="dateCreate" type="Date" class="form-control" id="floatingCreate" placeholder="Create">
                        <label for="floatingCreate">Create</label>
                    </div>
                    <div class="col-lg-12">
                        <label for="description" class="mb-2">Description</label>
                        <Editor
                            v-model="blogAdminData.content"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="description"
                            id="description"
                            :disabled="true"
                        />
                    </div>
                    <div>
                        <router-link to="/admin/blog" type="button" class="btn btn-danger">Back To List</router-link>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-3">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Imge</h4>
                <div class="card">
                    <img :src="img" class="card-img-top" alt="...">

                </div>
            </div>
        </div>
    </div>
</template>