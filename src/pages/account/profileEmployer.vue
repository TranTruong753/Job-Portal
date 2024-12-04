<script setup>
import { useCompanyStore } from '@/stores/company';
import { useLocationStore } from "@/stores/locationStore";
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import {formatDateForInput, convertToUrlV2} from '@/assets/js/jsUtils'

const authStore = useAuthStore();
const locationStore = useLocationStore();
// const companyUser = useCompanyStore();
onMounted(async () => {
    // await companyUser.getUserCompany();
    await authStore.getEmployer()
    await locationStore.fetchProvinces();
    console.log('auth employer:', authStore.userData);
    console.log('auth company:', authStore.userCompany);

    fullname.value = authStore.userData.fullname;
    email.value = authStore.userData.email;
   
    if(authStore.userData.birthdate){
        birthdate.value = formatDateForInput(authStore.userData.birthdate);
    }

    if(authStore.userData.sex){
    sex.value = authStore.userData.sex;
    }

    if(authStore.userData.phone){
    phone.value = authStore.userData.phone; 
    }

    if (authStore.userData.address) {
        street.value = authStore.userData.address.street || '';
        province.value = authStore.userData.address.province
        district.value = authStore.userData.address.district
        ward.value = authStore.userData.address.ward
        // Tìm và gán province
        const provinceVar = locationStore.provinces.find(
            (item) => item.name === authStore.userData.address.province
        );
        if (provinceVar) {
            locationStore.selectedProvince = provinceVar.code;
            await locationStore.fetchDistricts(provinceVar.code);

            // Tìm và gán district
            const district = locationStore.districts.find(
                (item) => item.name === authStore.userData.address.district
            );
            if (district) {
                locationStore.selectedDistrict = district.code;
                await locationStore.fetchWards(district.code);

                // Tìm và gán ward
                const ward = locationStore.wards.find(
                    (item) => item.name === authStore.userData.address.ward
                );
                if (ward) {
                    locationStore.selectedWard = ward.code;
                }
            }
        }

        // console.log(street.value + )
    }
   
})

const obj = reactive({
    fullname: '',
    phone: '',
    email: '',
    sex: '',
    birthdate: null,
    street: '',
    province: '',
    ward: '',
    district: ''

});

const schema = yup.object({
    fullname: yup.string().required('Full name is required'),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    birthdate: yup.date().required('Date of birth is required').test(
            'is-future-date',
            'Date of birth must be earlier  than today',
            (value) => value && value < new Date()
        ),
    sex: yup.string().required('Sex is required'),
    phone: yup
        .string()
        .matches(/^\d+$/, 'Phone must be a number')
        .required('Phone is required'),
    street: yup.string().required('Street is required'),
    province: yup.string().required('Province is required'),
    district: yup.string().required('District is required'),
    ward: yup.string().required('Ward is required'),
});


const { handleSubmit, resetForm } = useForm({
    validationSchema: schema, // Áp dụng schema
    initialValues: obj,   // Gán giá trị ban đầu từ userObj
    validateOnBlur: true,
});

const { value: fullname, errorMessage: fullnameError } = useField('fullname');
const { value: email, errorMessage: emailError } = useField('email');
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate');
const { value: sex, errorMessage: sexError } = useField('sex');
const { value: phone, errorMessage: phoneError } = useField('phone');
const { value: street, errorMessage: streetError, setValue: setStreet } = useField('street');
const { value: province, errorMessage: provinceError, setValue: setProvince } = useField('province');
const { value: ward, errorMessage: wardError, setValue: setWard } = useField('ward');
const { value: district, errorMessage: districtError, setValue: setDistrict } = useField('district');


const onProvinceChange = (event) => {
    locationStore.fetchDistricts(locationStore.selectedProvince);
    locationStore.updateResult();

    const selectedProvince = locationStore.provinces.find(province => province.code === locationStore.selectedProvince);


    province.value = selectedProvince.name;
    district.value = "";
    ward.value = "";
};

const onDistrictChange = (event) => {
    locationStore.fetchWards(locationStore.selectedDistrict);
    locationStore.updateResult();

    const selectedDistrict = locationStore.districts.find(districts => districts.code === locationStore.selectedDistrict);

    // console.log(selectedDistrict.name);
    district.value = selectedDistrict.name;
    ward.value = "";

};

const onWardChange = (event) => {
    locationStore.updateResult();

    const selectedWard = locationStore.wards.find(wards => wards.code === locationStore.selectedWard);

    // console.log(selectedWard.name);
    ward.value = selectedWard.name;
};

const onSubmit = handleSubmit(
        async values => {
          await authStore.updateUser(values);
           
        console.log('values',values);
        },
        ({ errors }) => {
            const firstError = Object.keys(errors)[0];
            const el = document.querySelector(`[name="${firstError}"]`);
            el?.scrollIntoView({
                behavior: 'smooth',
            });
            el.focus();
        },
        );
</script>

<template>
    <!-- Personal Information -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">Personal Information</h3>
           <form @submit.prevent="onSubmit" id="formProfileEmployer" autocomplete="off">
                <div class="pt-0 row g-3">
                    <div class="col-lg-6">
                        <label for="" class="mb-2">Full Name<span class="text-primary">*</span></label>
                        <input v-model="fullname" type="text" placeholder="Enter Name" class="form-control" name="fullname">
                        <span class="text-danger">{{ fullnameError }}</span>
                    </div>
                    <div class="col-lg-6">
                        <label for="" class="mb-2">Email<span class="text-primary">*</span></label>
                        <input readonly v-model="email" type="text" placeholder="Enter Email" class="form-control" name="email">
                        <span class="text-danger">{{ emailError }}</span>
                    </div>
                    <div class="col-lg-6">
                        <label for="" class="mb-2">Date of Birth<span class="text-primary">*</span></label>
                        <input v-model="birthdate" type="date" placeholder="Designation" class="form-control" name="birthdate">
                        <span class="text-danger">{{ birthdateError }}</span>
                    </div>
                    <div class="col-lg-6">
                            <label for="" class="mb-2">Sex<span class="text-primary">*</span></label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineRadio1" value="Men" v-model="sex" name="sex" />
                                    <label class="form-check-label" for="inlineRadio1">Men</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineRadio2" value="Women" name="sex"
                                        v-model="sex" />
                                    <label class="form-check-label" for="inlineRadio2">Women</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineRadio3" value="Other" name="sex"
                                        v-model="sex" />
                                    <label class="form-check-label" for="inlineRadio3">Other</label>
                                </div>
                                <span class="text-danger">{{ sexError }}</span>
                            </div>
                        </div>
                    <div class="col-lg-6">
                        <label for="" class="mb-2">Phone<span class="text-primary">*</span></label>
                        <input v-model="phone" type="text" placeholder="Update phone" class="form-control">
                        <span class="text-danger">{{ phoneError }}</span>
                    </div>
                    <div class="row mt-3">
                    
                        <div class="mb-4 col-md-4">
                            <label for="province">Province<span class="text-primary">*</span></label>
                            <select name="province" class="form-select" id="province" v-model="locationStore.selectedProvince" @change="onProvinceChange">
                                <option disabled value="">Chọn tỉnh/thành</option>
                                <option v-for="province in locationStore.provinces" :key="province.code" :value="province.code"  :data-name="province.name">
                                {{ province.name }}
                                </option>
                            </select>
                            <span class="text-danger ">{{ provinceError }}</span>
                        </div>
                        <div class="mb-4 col-md-4">
                            <label for="district">District<span class="text-primary">*</span></label>
                            <select name="district"  class="form-select" id="district" v-model="locationStore.selectedDistrict" @change="onDistrictChange">
                                <option disabled value="">Chọn quận/huyện</option>
                                <option v-for="district in locationStore.districts" :key="district.code" :value="district.code"  :data-name="district.name">
                                {{ district.name }}
                                </option>
                            </select>
                            <span class="text-danger ">{{ districtError }}</span>
                        </div>
                        <div class="mb-4 col-md-4">
                            <label for="ward">Ward<span class="text-primary">*</span></label>
                            <select name="ward"  class="form-select" id="ward" v-model="locationStore.selectedWard" @change="onWardChange">
                                <option disabled value="">Chọn phường/xã</option>
                                <option v-for="ward in locationStore.wards" :key="ward.code" :value="ward.code" :data-name="ward.name">
                                {{ ward.name }}
                                </option>
                            </select>
                            <span class="text-danger ">{{ wardError }}</span>
                        </div>
                    
                    </div>
    
                <div class="">
                    <label for="street" class="mb-2">Street<span class="req">*</span></label>
                    <textarea :id="street" v-model="street" class="form-control" name="street" id="Street" cols="5" rows="5"
                        placeholder="Street"></textarea>
                    <span class="text-danger ">{{ streetError }}</span>
                </div>
                </div>
           </form>

        </div>
        <div class="card-footer  p-4">
            <button type="submit" class="btn btn-primary" form="formProfileEmployer">Update</button>
        </div>
    </div>

    <!-- Company Information -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">Company Information</h3>
            <div class="pt-0 row g-3">
                <div class="col-lg-3">
                    <div class="d-flex flex-column m-4 align-items-center gap-3">
                        <div class="">
                            <!-- /src/assets/img/edutech_logo.png -->
                            <img class="img-thumbnai object-fit-cover shadow" :src="convertToUrlV2(authStore.userCompany.logo)"
                                alt="">
                        </div>
                        <!-- <button class=" btn btn-primary w-75" data-bs-toggle="modal" data-bs-target="#changeLogo"
                            type="button">change</button> -->
                    </div>
                </div>
                <div class="col-lg-12">
                    <label for="" class="mb-2">Name Company<span class="text-primary">*</span></label>
                    <input readonly v-model="authStore.userCompany.name" type="text" placeholder="Enter Name Company"
                        class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Industry<span class="text-primary">*</span></label>
                    <input readonly v-model="authStore.userCompany.industry" type="text" placeholder="Enter tax code"
                        class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Email Company<span class="text-primary">*</span></label>
                    <input readonly v-model="authStore.userCompany.email" type="text" placeholder="Enter Email "
                        class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Phone Company<span class="text-primary">*</span></label>
                    <input readonly v-model="authStore.userCompany.phone" type="text" placeholder="Phone"
                        class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Website<span class="text-primary">*</span></label>
                    <input readonly v-model="authStore.userCompany.website" type="text" placeholder="Enter Item 01"
                        class="form-control" value="">
                </div>

                <!-- <div class="col-lg-12">
                    <label for="" class="mb-2">Description<span class="req">*</span></label>
                    <textarea readonly v-model="authStore.userCompany.description" class="form-control" name="description"
                        id="description" cols="5" rows="5" placeholder="Description"></textarea>

                </div> -->

            </div>

        </div>
        <!-- <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div> -->

        <!-- modal change logo -->
        <!-- <div class="modal fade" id="changeLogo" tabindex="-1" aria-labelledby="changeLogoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="changeLogoLabel">Change Logo Picture</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Logo Image</label>
                                <input type="file" class="form-control" id="image" name="image">
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary mx-3">Update</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div> -->

    </div>

</template>