<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import Swal from 'sweetalert2';


// Lấy store auth
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter(); // Sử dụng router

// Định nghĩa schema validation với Yup
const schema = yup.object({
    username: yup.string().required('User Name is required').test(
        'no-whitespace',
        'User Name must not contain spaces',
        (value) => !/\s/.test(value) // Kiểm tra không có khoảng trắng
    ),
});

// Khởi tạo form và các trường với validation schema
const { handleSubmit, handleReset } = useForm({
    validationSchema: schema,
});


const { value: username, errorMessage: usernameError } = useField('username');


const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    loading.value = true;
    const isSucces = await authStore.fogotPass(values.username);
    loading.value = false;
    if(isSucces){
        Swal.fire({
            title: 'Send Email Success!',
            text: 'Do you want to go to the login page?.',
            icon: 'success',
            confirmButtonText: 'YES',
            cancelButtonText: 'CANCEL',
            showCancelButton: true,  // Hiển thị nút "No"
        }).then((result) => {
            // Chuyển trang sau khi người dùng đóng thông báo
            if (result.isConfirmed) {
                router.push('/login'); 
            }else if(result.dismiss === Swal.DismissReason.cancel){
    
            }
        });
    }
    handleReset();
})


</script>
<template>
    <div :class="{ overlay: loading }" id="overlay"></div>
    <div v-if="loading" class="loading ">
        <a-spin size="large" tip="Loading..." />
    </div>
      <section class="section-5">
        <div class="container my-5">
            <div class="py-lg-2">&nbsp;</div>
            <div class="row d-flex justify-content-center ">
                <div class="col-md-5">
                    <div class="card border-0 p-5 shadow">
                        <h1 class="h3">Get Password</h1>
                        <form @submit.prevent="onSubmit" autocomplete="off">

                            <div class="">
                                <label for="username" class="mb-2">User Name <span
                                        class="text-danger d-inline fs-5">*</span></label>
                                <input type="text"  class="form-control"
                                   v-model="username"  placeholder="Enter User Name" name="username" >
                                <span class="text-danger ">{{ usernameError }}</span>
                            </div>



                            <button class="btn btn-primary mt-2" type="submit">Send Email</button>
                        </form>
                    </div>
                    <div class="mt-4 text-center">
                        <p>Have an account? <router-link to="/login">Login</router-link></p>
                        <p>Do not have an account? <router-link class="" to="/register">Register</router-link></p>
                    </div>
                </div>
            </div>
            <div class="py-lg-5">&nbsp;</div>
        </div>
    </section>
</template>

<style>
.text-danger {
    display: block;
    height: 24px;
    padding: 8px 0;
    font-size: 13px;
}

.overlay {
  position: fixed; /* Gắn cố định với màn hình */
  top: 0;
  left: 0;
  width: 100%; /* Phủ toàn màn hình */
  height: 100%;
  background: rgba(0, 0, 0, 0.05); /* Màu đen mờ */
  z-index: 999; /* Nổi trên các thành phần khác */
  display: block; /* Ẩn mặc định */
}

.loading {
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%
}
</style>