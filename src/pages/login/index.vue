<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.js'; 



const router = useRouter(); // Sử dụng router
let cancelRequest;  // Định nghĩa cancelRequest ở phạm vi này
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


// Trạng thái ẩn/hiện mật khẩu
const isPasswordVisible = ref(false);

 // Lấy store auth
 const authStore = useAuthStore();

// Hàm submit form
const onSubmit = handleSubmit((values) => {
    console.log('Form submitted:', values);
    try {
        authStore.login('/api/account/login',values);
        if(authStore.isAuthenticated){
            if(authStore.role === 'Admin'){
            window.location.href = 'https://localhost:7283/home'; 
            }else {
                router.push('/');
            }
        }
    }catch (error) {
        console.error('Đăng nhập thất bại:', error);
    }

   
});

// onUnmounted(() => {
//     if (cancelRequest) {
//         cancelRequest('Component unmounted, request canceled');
//     }
// });
</script>

<template>
    <section class="section-5">
        <div class="container my-5">
            <div class="py-lg-2">&nbsp;</div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-5">
                    <div class="card shadow border-0 p-5">
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
</style>