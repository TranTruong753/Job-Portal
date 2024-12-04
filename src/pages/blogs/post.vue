<script setup>
import { ref } from 'vue';
import { initializeTinyMCE } from '@/assets/js/blog.js';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { closeModal,resetTiny } from '@/assets/js/jsUtils.js'
import { useBlogStore } from '@/stores/blog';
import Editor from '@tinymce/tinymce-vue'




const blogStore = useBlogStore();





const schema = yup.object({
  img: yup.string().required('img is required'),
  title: yup.string().required('title is required'),
  content: yup.string().required('content is required'),

});


const { handleSubmit, resetForm } = useForm({
    validationSchema: schema, // Áp dụng schema  // Gán giá trị ban đầu từ userObj
    validateOnBlur: true,
});

const { value: img, errorMessage: imgError } = useField('img');
const { value: title, errorMessage: titleError } = useField('title');
const { value: content, errorMessage: contentError } = useField('content');

// Thêm ref cho src của img
const imgSrc = ref('');
const errorSrc = ref('')


const editorConfig = {
  height: 400,
  menubar: false,
  plugins: ['link', 'image', 'lists'],
  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
};


const onSubmit = handleSubmit(
        async values => {
         console.log('submit:',values)
         blogStore.postBlog(values);
     
         imgSrc.value = ''
         resetTiny('content')
         resetForm();
         
   
           
        },
        ({ errors }) => {
            // const firstError = Object.keys(errors)[0];
            // const el = document.querySelector(`[name="${firstError}"]`);
            // el?.scrollIntoView({
            //     behavior: 'smooth',
            // });
            // el.focus();
        },
);

const handleFileChange = (event) => {
    const fileInput = document.getElementById("imgSrc"); 
    const file = event.target.files[0];  // Lấy file đã chọn
    if (file && file instanceof File) {
        // Kiểm tra xem file có phải là hình ảnh hay không
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (allowedImageTypes.includes(file.type)) {
            img.value = file;
          
            errorSrc.value = '';
        } else {
            // Thông báo nếu không phải là hình ảnh
            errorSrc.value = 'Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF)'
            // img.value = null; // Xóa giá trị file nếu không phải hình ảnh
           
            if (fileInput) { 
                fileInput.value = ''; // Reset input file thực sự 
            }
        }
    }
};

const handleAddFile = () => {
    console.log(img.value)
    console.log(errorSrc.value)
    if( img.value || errorSrc.value === ''){
        imgSrc.value = URL.createObjectURL(img.value); // Tạo URL tạm thời từ file
        console.log(imgSrc.value, 'imgSrc.value');
        closeModal('#changeBlog');
        errorSrc.value = ''
    }else{
         errorSrc.value = 'Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF)'
         
    }
}

</script>

<template>
    <div class="card border-0 shadow mb-4 ">
        <div class="card-body card-form p-4">
            <h3 class="fs-4 mb-1">Blog</h3>
            
            <div class="row">
                <div class="col-md-9 mb-4">
                    <label for="" class="mb-2">Title<span class="req">*</span></label>
                    <input v-model="title" type="text" placeholder="Job Title" id="title" name="title" class="form-control">
                    <span class="text-danger">{{ titleError }}</span>
                    
                    <!-- <label for="" class="mb-2">Description<span class="req">*</span></label>
                    <textarea v-model="content" class="form-control" name="description" id="description" cols="5" rows="5"
                        placeholder="Description"></textarea>
                        <span class="text-danger">{{ contentError }}</span> -->
                         <!-- Quill Editor -->
                         <label for="content" class="mb-2">Content<span class="req">*</span></label>
                        <Editor
                            v-model="content"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="content"
                            id="content"
                        />
                        <span class="text-danger">{{ contentError }}</span>
                                
                </div>

                  <div class="col-lg-3">
                    <div class="d-flex flex-column m-2 mt-4 align-items-center gap-2">
                        <div class="border rounded border-1 w-100">
                            <img class="img-thumbnai object-fit-cover shadow" :src="imgSrc"
                                alt="chưa có hình">
                                
                            </div>
                            <span class="text-danger">{{ imgError }}</span>
                        <button class=" btn btn-primary w-75" data-bs-toggle="modal" data-bs-target="#changeBlog"
                            type="button">Add</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary" @click="onSubmit">Create Blog</button>
        </div>
    </div>


       <!-- modal change blog img -->
       <div class="modal fade" id="changeBlog" tabindex="-1" aria-labelledby="changeBlogLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="changeBlogLabel">Add Picture Blog</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form >
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Logo Image</label>
                                <input  type="file" class="form-control" id="imgSrc" name="image"  @change="handleFileChange">
                                <span class="text-danger">{{errorSrc}}</span>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary mx-3" @click="handleAddFile">Update</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>

textarea {
        height: 50vh !important; 
        resize: none;
    }

</style>