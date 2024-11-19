<script setup>
import { onUnmounted,onMounted, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter(); // Sử dụng router
// Định nghĩa schema validation với Yup

// Khởi tạo các giá trị và trạng thái
const companies = ref([]);  // Danh sách công ty
let cancelRequest;  // Định nghĩa cancelRequest ở phạm vi này

const schema = yup.object({
    companyId: yup.string().required('Company is required').notOneOf([''], 'Please select a valid Company'),
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

// Khai báo `useField` cho trường namecompany để kiểm tra lỗi
const { value: companyId, errorMessage: namecompanyError, setValue  } = useField('companyId');
const { value: fullname, errorMessage: fullnameError } = useField('fullname');
const { value: username, errorMessage: usernameError } = useField('username');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: repassword, errorMessage: repasswordError } = useField('repassword');

// Trạng thái ẩn/hiện mật khẩu
const isPasswordVisible = ref(false);
const isRepasswordVisible = ref(false);


onMounted(() => {
    axios.get('/api/company/GetAllForEmployer',{
        cancelToken: new axios.CancelToken(function (c) {
            cancelRequest = c;  // Gán hàm hủy vào biến cancelRequest khi có request
        })
    })
    .then(function (response) {
        // handle success
        companies.value = response.data;
        console.log(companies.value);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.error('Call API Error:', error);
                // Hiển thị thông báo lỗi nếu có lỗi trong quá trình đăng ký
      
            Swal.fire({
                title: 'website error !',
                text: 'Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then((result) => { 
            
                router.push('/'); 
                
            });
    })
    .finally(function () {
        // always executed
    });
})

// Hàm xử lý thay đổi giá trị của select
const onCompanyChange = (event) => {
  setValue(event.target.value); // Cập nhật giá trị của trường namecompany khi thay đổi
};

// Hàm submit form
    const onSubmit = handleSubmit((values) => {
    console.log(values);
    axios.post('/api/account/registeremployer', values, {
        cancelToken: new axios.CancelToken(function (c) {
            cancelRequest = c;  // Gán hàm hủy vào biến cancelRequest khi có request
        })
    })
        .then(response => {
            console.log('Register Success:', response.data);
                // Chuyển trang sau khi đăng ký thành công
                // Hiển thị thông báo thành công
            Swal.fire({
                title: 'Registration has been sent to admin!',
                text: 'Please wait for approval to login!.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then((result) => {
                handleReset();
                    // Chuyển trang sau khi người dùng đóng thông báo
                if (result.isConfirmed) {
                    router.push('/'); 
                }
            });
            
        })
        .catch(error => {
            console.error('Register Error:', error);
                // Hiển thị thông báo lỗi nếu có lỗi trong quá trình đăng ký
            const errorMessage = error.response?.data || 'Please try again later!.'; // Default message if no error data

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

<template>
    <section class="section-5">
        <div class="container my-5">
            <div class="py-lg-2">&nbsp;</div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-5">
                    <div class="card shadow border-0 p-5">
                        <h1 class="h3">Register Employer</h1>
                        <form @submit.prevent="onSubmit" class="">

                            <div>
                                <label for="companyId" class="mb-2">Name Company <span
                                    class="text-danger d-inline fs-5">*</span></label>
                                <select :value="companyId" name="companyId" class="form-control" @change="onCompanyChange">
                                    <option disabled value="">--Select company--</option>
                                    <option v-for="company in companies" :key="company.id" :value="company.id">
                                        {{ company.name }}
                                    </option>
                                </select>
                                <span class="text-danger ">{{ namecompanyError }}</span>
                            </div>

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
                                <input type="text" v-model="email" class="form-control" placeholder="Enter Email">
                                <span class="text-danger ">{{ emailError }}</span>
                            </div>

                            <div class="">
                                <label for="password" class="mb-2">Password <span
                                        class="text-danger d-inline fs-5">*</span></label>
                                <div class="input__password">
                                    <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password"
                                        class="form-control " placeholder="Enter Password">
                                    <div class="password-toggle" @click="isPasswordVisible = !isPasswordVisible">
                                        <i :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </div>
                                </div>
                                <span class="text-danger ">{{ passwordError }}</span>

                            </div>

                            <div class="">
                                <label for="repassword" class="mb-2">Confirm Password <span
                                        class="text-danger d-inline fs-5">*</span></label>
                                <div class="input__repassword">
                                    <input :type="isRepasswordVisible ? 'text' : 'password'" v-model="repassword"
                                        class="form-control " placeholder="Confirm Password">
                                    <div class="password-toggle" @click="isRepasswordVisible = !isRepasswordVisible">
                                        <i
                                            :class="isRepasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </div>
                                </div>
                                <span class="text-danger ">{{ repasswordError }}</span>
                            </div>

                            <button class="btn btn-primary mt-2" type="submit">Register</button>
                        </form>
                    </div>
                    <div class="mt-4 text-center">
                        <p>Have an account? <router-link class="" to="/login">Login</router-link></p>
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

.input__repassword, .input__password {
    position: relative;
}
</style>