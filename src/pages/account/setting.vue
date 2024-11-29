<script setup>
import { onMounted, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js'; 

// Lấy store auth
const authStore = useAuthStore();



// const curentPass = ref(authStore.password);

// Định nghĩa schema validation với Yup
const schema = yup.object({
    curentPass: yup
    .string()
    .required('Old Password is required')
    .test('match', 'Old Password is incorrect', (value) => value === authStore.password),
    newPass: yup
        .string()
        .min(6, 'New Password must be at least 6 characters')
        .matches(/[a-z]/, 'New Password must contain at least one lowercase letter') // Kiểm tra chữ thường
        .matches(/[0-9]/, 'New Password must contain at least one number') // Kiểm tra số
        .test('match', 'New password same as current password', (value) => value !== authStore.password)
        .required('Password is required'),
    repassword: yup
        .string()
        .oneOf([yup.ref('newPass'), null], 'Passwords must match') // Kiểm tra khớp mật khẩu
        .required('Confirm Password is required'),
});

// Khởi tạo form và các trường với validation schema
const { handleSubmit, handleReset } = useForm({
    validationSchema: schema,
});

const { value: curentPass, errorMessage: curentPassError } = useField('curentPass');
const { value: newPass, errorMessage: newPassError } = useField('newPass');
const { value: repassword, errorMessage: repasswordError } = useField('repassword');


// Trạng thái ẩn/hiện mật khẩu
const isPasswordVisible = ref(false);
const isRepasswordVisible = ref(false);

// Hàm submit form
const onSubmit = handleSubmit( async (values) => {

    await authStore.changePasswor(values);

      handleReset(); // Reset form để xóa lỗi và làm trống các trường
    curentPass.value = authStore.password; 
  

})

onMounted(() => {
  curentPass.value = authStore.password; // Gán giá trị mặc định cho currentPass
});


</script>

<template>

    <div class="card border-0 shadow mb-4">
        <div class="card-body p-4">
            <form @submit.prevent="onSubmit" id="formChangePass">
                <h3 class="fs-4 mb-1">Change Password</h3>
                <div class="">
                    <label for="curentPass" class="mb-2">Old Password</label>
                    <input readonly id="curentPass" v-model="curentPass" type="password" placeholder="Old Password" class="form-control">
                    <span class="text-danger ">{{ curentPassError }}</span>
                </div>
                <div class="">
                    <label for="password" class="mb-2">New Password <span class="text-danger d-inline fs-5">*</span></label>
                    <div class="input__password">
                        <input :type="isPasswordVisible ? 'text' : 'password'" v-model="newPass" class="form-control "
                            placeholder="Enter Password">
                        <div class="password-toggle-different" @click="isPasswordVisible = !isPasswordVisible">
                            <i :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </div>
                    </div>
                    <span class="text-danger ">{{ newPassError }}</span>

                </div>

                <div class="">
                    <label for="repassword" class="mb-2">Confirm Password <span
                            class="text-danger d-inline fs-5">*</span></label>
                    <div class="input__repassword">
                        <input :type="isRepasswordVisible ? 'text' : 'password'" v-model="repassword"
                            class="form-control " placeholder="Confirm Password">
                        <div class="password-toggle-different" @click="isRepasswordVisible = !isRepasswordVisible">
                            <i :class="isRepasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </div>
                    </div>
                    <span class="text-danger ">{{ repasswordError }}</span>
                </div>
            </form>
        </div>
        <div class="card-footer  p-4">
            <button form="formChangePass" type="submit" class="btn btn-primary">Update</button>
        </div>
    </div>

</template>