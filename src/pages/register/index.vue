<script setup>
import { onUnmounted, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const loading = ref(false);
const router = useRouter(); // Sử dụng router
let cancelRequest;  // Định nghĩa cancelRequest ở phạm vi này
// Định nghĩa schema validation với Yup
const schema = yup.object({
    username: yup.string().required('User Name is required').test(
        'no-whitespace',
        'User Name must not contain spaces',
        (value) => !/\s/.test(value) // Kiểm tra không có khoảng trắng
    ),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Kiểm tra chữ thường
        .matches(/[0-9]/, 'Password must contain at least one number') // Kiểm tra số
        .required('Password is required'),
    repassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match') // Kiểm tra khớp mật khẩu
        .required('Confirm Password is required'),
    fullname: yup.string().required('Full Name is required'),
});

// Khởi tạo form và các trường với validation schema
const { handleSubmit, handleReset } = useForm({
    validationSchema: schema,
});

const { value: fullname, errorMessage: fullnameError } = useField('fullname');
const { value: username, errorMessage: usernameError } = useField('username');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: repassword, errorMessage: repasswordError } = useField('repassword');

// Trạng thái ẩn/hiện mật khẩu
const isPasswordVisible = ref(false);
const isRepasswordVisible = ref(false);

// Hàm submit form
const onSubmit = handleSubmit((values) => {
    console.log('Form submitted:', values);
    loading.value = true;
    axios.post('/api/account/registeruser', values, {
        cancelToken: new axios.CancelToken(function (c) {
            cancelRequest = c;  // Gán hàm hủy vào biến cancelRequest khi có request
        })
    })
        .then(response => {
            loading.value = false;
            console.log('Register Success:', response.data);

            Swal.fire({
                title: 'Registration successful!',
                text: 'Do you want to go to the login page?.',
                icon: 'success',
                confirmButtonText: 'YES',
                cancelButtonText: 'NO',
                showCancelButton: true,  // Hiển thị nút "No"
            }).then((result) => {
                console.log('nhấn')
                handleReset();
                // Chuyển trang sau khi người dùng đóng thông báo
                if (result.isConfirmed) {
                    router.push('/login');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    router.push('/home');
                }
            });

        })
        .catch(error => {
            loading.value = false;
            console.error('Register Error:', error);
            // Hiển thị thông báo lỗi nếu có lỗi trong quá trình đăng ký
            const errorMessage = error.response?.data || 'Vui lòng thử lại sau.'; // Default message if no error data

            Swal.fire({
                title: 'Registration failed!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
});

onUnmounted(() => {
    if (cancelRequest) {
        cancelRequest('Component unmounted, request canceled');
    }
});
</script>

<!-- <template>
    <section class="section-5">
        <div class="container my-5">
            <div class="py-lg-2">&nbsp;</div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-5">
                    <div class="card shadow border-0 p-5">
                        <h1 class="h3">Register</h1>
                        <form @submit.prevent="onSubmit">

                            <div class="">
                                <label for="fullname" class="mb-2">Full Name <span class="text-danger d-inline fs-5">*</span></label>
                                <input type="text" v-model="fullname" class="form-control" placeholder="Enter Full Name">
                                <span class="text-danger ">{{ fullnameError }}</span>
                            </div>

                            <div class="">
                                <label for="username" class="mb-2">User Name <span class="text-danger d-inline fs-5">*</span></label>
                                <input type="text" v-model="username" class="form-control" placeholder="Enter User Name">
                                <span class="text-danger ">{{ usernameError }}</span>
                            </div>

                            <div class="">
                                <label for="email" class="mb-2">Email <span class="text-danger d-inline fs-5">*</span></label>
                                <input type="text" v-model="email" class="form-control" placeholder="Enter Email">
                                <span class="text-danger ">{{ emailError }}</span>
                            </div>

                            <div class="">
                                <label for="password" class="mb-2">Password <span class="text-danger d-inline fs-5">*</span></label>
                               <div class="input__password">
                                    <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password" class="form-control "
                                        placeholder="Enter Password">
                                    <div class="password-toggle" @click="isPasswordVisible = !isPasswordVisible">
                                        <i :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </div>
                               </div>
                                <span class="text-danger ">{{ passwordError }}</span>
                               
                            </div>

                            <div class="">
                                <label for="repassword" class="mb-2">Confirm Password <span class="text-danger d-inline fs-5">*</span></label>
                              <div class="input__repassword" >
                                    <input :type="isRepasswordVisible ? 'text' : 'password'" v-model="repassword" class="form-control "
                                        placeholder="Confirm Password">
                                    <div class="password-toggle" @click="isRepasswordVisible = !isRepasswordVisible">
                                        <i :class="isRepasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </div>
                              </div>
                                <span class="text-danger ">{{ repasswordError }}</span>
                            </div>
                             
                            <button class="btn btn-primary mt-2" type="submit">Register</button>
                        </form>
                    </div>

                    <div class="mt-4 text-center">
                        <p>Have an account? <router-link to="/login">Login</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> -->


<template>

    <div :class="{ overlay: loading }" id="overlay"></div>
    <div v-if="loading" class="loading ">
        <a-spin size="large" tip="Loading..." />
    </div>

    <section class="m-4 vh-100" style="">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100 ">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block ">
                                <img src="../../assets/img/banner5.jpg" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center ">
                                <div class="card-body p-3 px-lg-5 text-black">


                                    <form @submit.prevent="onSubmit">
                                        <h1 class="h3 mb-0">Register</h1>
                                        <div class="">
                                            <label for="fullname" class="mb-2">Full Name <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <input type="text" v-model="fullname" class="form-control"
                                                placeholder="Enter Full Name">
                                            <span class="text-danger ">{{ fullnameError }}</span>
                                        </div>

                                        <div class="">
                                            <label for="username" class="mb-2">User Name <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <input type="text" v-model="username" class="form-control"
                                                placeholder="Enter User Name">
                                            <span class="text-danger ">{{ usernameError }}</span>
                                        </div>

                                        <div class="">
                                            <label for="email" class="mb-2">Email <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <input type="text" v-model="email" class="form-control"
                                                placeholder="Enter Email">
                                            <span class="text-danger ">{{ emailError }}</span>
                                        </div>

                                        <div class="">
                                            <label for="password" class="mb-2">Password <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <div class="input__password">
                                                <input :type="isPasswordVisible ? 'text' : 'password'"
                                                    v-model="password" class="form-control "
                                                    placeholder="Enter Password">
                                                <div class="password-toggle"
                                                    @click="isPasswordVisible = !isPasswordVisible">
                                                    <i
                                                        :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                </div>
                                            </div>
                                            <span class="text-danger ">{{ passwordError }}</span>

                                        </div>

                                        <div class="">
                                            <label for="repassword" class="mb-2">Confirm Password <span
                                                    class="text-danger d-inline fs-5">*</span></label>
                                            <div class="input__repassword">
                                                <input :type="isRepasswordVisible ? 'text' : 'password'"
                                                    v-model="repassword" class="form-control "
                                                    placeholder="Confirm Password">
                                                <div class="password-toggle"
                                                    @click="isRepasswordVisible = !isRepasswordVisible">
                                                    <i
                                                        :class="isRepasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                </div>
                                            </div>
                                            <span class="text-danger ">{{ repasswordError }}</span>
                                        </div>

                                        <button class="btn btn-primary mt-1" type="submit">Register</button>
                                    </form>
                                    <div class="mt-4  text-start">
                                        <p class="mb-1">Have an account? <router-link to="/login">Login</router-link></p>
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

.input__repassword,
.input__password {
    position: relative;
}
</style>
