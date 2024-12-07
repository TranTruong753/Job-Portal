<script setup>
import { onMounted, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import Swal from 'sweetalert2';


onMounted(()=>{
    if(authStore.role ){
        router.push('/');
    }else{
        authStore.$reset
    }
})

const router = useRouter(); // Sử dụng router

// Định nghĩa schema validation với Yup
const schema = yup.object({
    username: yup.string().required('User Name is required').test(
        'no-whitespace',
        'User Name must not contain spaces',
        (value) => !/\s/.test(value) // Kiểm tra không có khoảng trắng
    ),
    password: yup
        .string()
        .required('Password is required'),
});

// Khởi tạo form và các trường với validation schema
const { handleSubmit, handleReset } = useForm({
    validationSchema: schema,
});


const { value: username, errorMessage: usernameError } = useField('username');
const { value: password, errorMessage: passwordError } = useField('password');

const loading = ref(false);

// Trạng thái ẩn/hiện mật khẩu
const isPasswordVisible = ref(false);
// Lấy store auth
const authStore = useAuthStore();

// Hàm submit form
const onSubmit = handleSubmit(async (values) => {
    console.log('Form submitted:', values);
    try {
        loading.value = true;
        await authStore.login('/api/account/login', values);
        loading.value = false;
        console.log(authStore.role);
        if (authStore.isAuthenticated) {

            if (authStore.role === 'Admin') {
                await authStore.getUserData();
            }
            else if(authStore.role === 'User'){
                await authStore.getUserData();
            }else if(authStore.role === 'Employer'){
                await authStore.getEmployer()
            }
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                // timerProgressBar: true,
                didOpen: (toast) => {
                    // toast.onmouseenter = Swal.stopTimer;
                    // toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });

            router.push('/');
            
        }

    } catch (error) {
        loading.value = false;
        console.error('Đăng nhập thất bại:', error);
    }


});

</script>

<template>
    <div :class="{ overlay: loading }" id="overlay"></div>
    <div v-if="loading" class="loading ">
        <a-spin size="large" tip="Loading..." />
    </div>
    <!-- <section class="section-5">
        <div class="container my-5">
            <div class="py-lg-2">&nbsp;</div>
            <div class="row d-flex justify-content-center g-0 border-1 border ">
                <div class="col-md-5">
                    <div class="card border-0 p-5">
                        <h1 class="h3">Login</h1>
                        <form @submit.prevent="onSubmit" autocomplete="off">

                            <div class="">
                                <label for="username" class="mb-2">User Name <span
                                        class="text-danger d-inline fs-5">*</span></label>
                                <input type="text" v-model="username" class="form-control"
                                    placeholder="Enter User Name">
                                <span class="text-danger ">{{ usernameError }}</span>
                            </div>


                            <div class="">
                                <label for="password" class="mb-2">Password <span
                                        class="text-danger d-inline fs-5">*</span></label>
                                <div class="input__password">
                                    <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password"
                                        class="form-control " placeholder="Enter Password" autocomplete="new-password">
                                    <div class="password-toggle" @click="isPasswordVisible = !isPasswordVisible">
                                        <i :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </div>
                                </div>
                                <span class="text-danger ">{{ passwordError }}</span>

                            </div>


                            <button class="btn btn-primary mt-2" type="submit">Login</button>
                        </form>
                    </div>
                    <div class="mt-4 text-center">
                        <p>Do not have an account? <router-link class="" to="/register">Register</router-link></p>
                    </div>
                </div>
            </div>
            <div class="py-lg-5">&nbsp;</div>
        </div>
    </section> -->
    <section class="vh-100" style="">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-lg-center align-items-start h-100 mt-5 mt-lg-0">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-6 d-none d-md-block ">
                                <img src="../../assets/img/banner5.jpg" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;" />
                            </div>
                            <div class="col-md-6 col-lg-6 d-flex align-items-center my-3">
                                <div class="card-body p-4 p-lg-5 text-black">


                                    <form @submit.prevent="onSubmit" autocomplete="off" class="">
                                        <div class="d-flex align-items-center mb-3 pb-1">

                                            <span class="h1 fw-bolder mb-0 ">CareerVibe</span>
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your
                                            account</h5>

                                        <div class="">
                                            <label for="username" class="mb-2">User Name <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <input type="text" v-model="username" class="form-control"
                                                placeholder="Enter User Name">
                                            <span class="text-danger ">{{ usernameError }}</span>
                                        </div>


                                        <div class="">
                                            <label for="password" class="mb-2">Password <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <div class="input__password">
                                                <input :type="isPasswordVisible ? 'text' : 'password'"
                                                    v-model="password" class="form-control "
                                                    placeholder="Enter Password" autocomplete="new-password">
                                                <div class="password-toggle"
                                                    @click="isPasswordVisible = !isPasswordVisible">
                                                    <i
                                                        :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                </div>
                                            </div>
                                            <span class="text-danger ">{{ passwordError }}</span>

                                        </div>


                                        <button class="btn btn-primary mt-2" type="submit">Login</button>
                                    </form>
                                    <div class="mt-4 text-start">
                                        <router-link class="small text-muted" to="/forgotPass">Forgot password?</router-link>
                                        <p>Do not have an account? <router-link class="" to="/register">Register</router-link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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


.password-toggle {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);

}

.input__password {
    position: relative;
}

.col-md-6 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 10px 10px 0;
    /* Bo góc phải phù hợp */
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