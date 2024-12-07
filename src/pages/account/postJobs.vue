<script setup>
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { useCompanyStore } from '@/stores/company.js';
    import { useLocationStore } from '@/stores/locationStore';
    import {useAuthStore} from '@/stores/auth';
    import {useSkillStore} from '@/stores/skill';
    import {resetTiny} from '@/assets/js/jsUtils'
    import { useForm, useField } from 'vee-validate';
    import {initializeTinyMCE} from '@/assets/js/tiny'
    import Editor from '@tinymce/tinymce-vue'
    import * as yup from 'yup';
// Sử dụng Pinia store
    const locationStore = useLocationStore();

    const skillStore = useSkillStore();
    
    const companyStore = useCompanyStore();

    const authStore = useAuthStore();

    onMounted( async ()=>{
        locationStore.$reset();
        await companyStore.getUserCompany();
        await skillStore.getSkill();

        //mới sửa
        // Lấy danh sách tỉnh/thành khi component được mount
        await locationStore.fetchProvinces();
            
        options.value = skillStore.list.map(skill => ({
            value: skill.name, // Gán trực tiếp tên kỹ năng vào giá trị option
            id: skill.id  // 
        }));

        if(companyStore.address){

            locationCity.value = companyStore.address.street + ', ' + companyStore.address.province + ', ' + companyStore.address.ward + ', ' + companyStore.address.district;
        }

        

    })


    // Hàm xử lý thay đổi
    const onProvinceChange = (event) => {
        locationStore.fetchDistricts(locationStore.selectedProvince);
        locationStore.updateResult();

        const selectedProvince = locationStore.provinces.find(province => province.code === locationStore.selectedProvince);
     
        // console.log(selectedProvince.name);
      
        // const selectedOption = event.target.selectedOptions[0];
        // console.log(selectedOption.getAttribute('data-name'));
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


  
    const schema = yup.object({
        title: yup.string().required('Job title is required'),
        description: yup.string().required('Description is required'),
        requirements: yup.string().required('Requirements are required'),
        benefits: yup.string().required('Benefits are required'),
        salary: yup
        .string()
        .required('Salary is required')
        .test(
            'is-valid-salary',
            'Chỉ được nhập số.',
            (value) => /^\d+(\.\d{3})*$/.test(value) // Cho phép số có định dạng như 1.000 hoặc 1000
        ),
        // salary: yup.number().positive('Salary must be a positive number').required('Salary is required'),
        jobLevel: yup.string().required('Job level is required'),
        jobType: yup.string().required('Job type is required'),
        street: yup.string().required('Street is required'),
        province: yup.string().required('Province is required'),
        district: yup.string().required('District is required'),
        ward: yup.string().required('Ward is required'),
        jobskill: yup.array().required('Jobskill is required'),
        expiredDate: yup
        .date()
        .required('Expired date is required')
        .test(
            'is-future-date',
            'Expired date must be later than today',
            (value) => value && value > new Date()
        ),
    });

    const { handleSubmit, errors, validateField, resetForm } = useForm({
        validationSchema: schema,  
        validateOnBlur: true,
    });

    
    const editorConfig = {
    height: 400,
    menubar: false,
    plugins: ['link', 'image', 'lists'],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
    };


    const onSubmit = handleSubmit(
        async values => {
            // console.log('Form submitted:', values);
            const parsedSalary = parseCurrencyVND(values.salary); // Chuyển giá trị về số
            const selectedIds = value.value.map(value => {
                const selectedOption = options.value.find(option => option.value === value);
                return selectedOption ? selectedOption.id : null;
            });
            const dataToSubmit = {
            ...values,  // Spread all the form values
                createOn: new Date().toISOString(),
                updatedOn: new Date().toISOString(),
                skillIds: selectedIds,  // Include the selected skill IDs
                salary: parsedSalary,
            };

             
            try{
                const isSuccess = await authStore.postJob(dataToSubmit);
             
                if(isSuccess){
                    
                    resetTiny('benefits');
                    resetTiny('requirements');
                    resetTiny('description');
                    resetForm();
                    locationStore.$reset();
                    await locationStore.fetchProvinces();
                    value.value = [];
                }
               
            }catch(e){
                console.error('Error creating job:', e.message);
                throw e;
            }
             
             
            console.log('Form submitted with data:', dataToSubmit);
           
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

        const value = ref([]);
        const options = ref([]); // Để lưu danh sách các option của skills
         const locationCity  = ref('not update location city');
        // console.log(companyStore.address);
    //  const locationCity = ref(companyStore.address.street + ', ' + companyStore.address.province + ', ' + companyStore.address.ward + ', ' + companyStore.address.district)

    const { value: title, errorMessage: titleError, setValue: setTitle } = useField('title');
    const { value: description, errorMessage: descriptionError, setValue: setDescription } = useField('description');
    const { value: requirements, errorMessage: requirementsError, setValue: setRequirements } = useField('requirements');
    const { value: benefits, errorMessage: benefitsError, setValue: setBenefits } = useField('benefits');
    const { value: salary, errorMessage: salaryError, setValue: setSalary } = useField('salary');
    const { value: jobLevel, errorMessage: jobLevelError, setValue: setJobLevel } = useField('jobLevel');
    const { value: jobType, errorMessage: jobTypeError, setValue: setJobType } = useField('jobType');
    const { value: expiredDate, errorMessage: expiredDateError, setValue: setexpiredDate } = useField('expiredDate');

    const { value: jobStatus, errorMessage: jobStatusError, setValue: setJobStatus } = useField('jobStatus');
    jobStatus.value = 0;

    const { value: street, errorMessage: streetError, setValue: setStreet } = useField('street');
    const { value: province, errorMessage: provinceError, setValue: setProvince } = useField('province');
    const { value: ward, errorMessage: wardError, setValue: setWard } = useField('ward');
    const { value: district, errorMessage: districtError, setValue: setDistrict } = useField('district');
    const { value: jobskill, errorMessage: jobskillError, setValue: setjobskill } = useField('jobskill');
    // setjobskill(value);

// select

    const handleChange = value => {
        // console.log(`selected ${value}`);

         // Lọc ra các id từ các giá trị đã chọn
        const selectedIds = value.map(value => {
            const selectedOption = options.value.find(option => option.value === value);
            return selectedOption ? selectedOption.id : null;
        });

       

        setjobskill(value);
    };

    const parseCurrencyVND = (value) => {
        return parseInt(value.replace(/\./g, ""), 10) || 0; // Loại bỏ dấu "." và chuyển thành số
    };


    const onJoblevelChange = (event) => {
        setJobLevel(event.target.value); //
        // console.log(event.target.value);
    }; 

    const onJobTypeChange = (event) => {
        setJobType(event.target.value); //
        // console.log(event.target.value);
    };

    const changeSalary = (event) => {
        const rawValue = event.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm cũ
        salary.value = formatCurrencyVND(rawValue); // Cập nhật lại với định dạng mới

        }

    const formatCurrencyVND = (value) => {
        if (!value) return ""; // Trả về chuỗi rỗng nếu không có giá trị
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

</script>

<template>
    <div class="card border-0 shadow mb-4 ">
        <div class="card-body card-form p-4">
            <h3 class="fs-4 mb-1">Job Details</h3>
            <form @submit.prevent="onSubmit" id="formPostJob" autocomplete="off">
                <div class="row">
                    <div class="col-md-6">
                        <label for="title" class="mb-2">Title<span class="req">*</span></label>
                        <input :id="title" v-model="title" type="text" placeholder="Job Title" id="title" name="title" class="form-control">
                        <span class="text-danger ">{{ titleError }}</span>
                    </div>
                    <!-- <div class="col-md-6  mb-4">
                        <label for="" class="mb-2">Category<span class="req">*</span></label>
                        <select name="category" id="category" class="form-control">
                            <option value="">Select a Category</option>
                            <option value="">Engineering</option>
                            <option value="">Accountant</option>
                            <option value="">Information Technology</option>
                            <option value="">Fashion designing</option>
                        </select>
                    </div> -->
                    <div class="col-md-6">
                        <label for="jobType" class="mb-2">Job Nature<span class="req">*</span></label>
            
                        <select :value="jobType" name="jobType" class="form-control" @change="onJobTypeChange">
                            <option disabled value="">--Select Job Type--</option>
                            <option value="0">In Office</option>
                            <option value="1">Remote</option>
                            <option value="2">Hybrid</option>
                            <option value="3">Oversea</option>
                        </select>
                        <span class="text-danger ">{{ jobTypeError  }}</span>
                    </div>
                </div>
    
                <div class="row">
                    
                    <div class="col-md-3 ">
                        <label for="jobLevel" class="mb-2">Job level<span class="req">*</span></label>
                    
                        <select :value="jobLevel" name="jobLevel" class="form-control" @change="onJoblevelChange">
                            <option disabled value="">--Select Job level--</option>
                            <option value="0">Intern</option>
                            <option value="1">Fresher</option>
                            <option value="2">Junior</option>
                            <option value="3">Middle</option>
                            <option value="4">Senior</option>
                        </select>
                        <span class="text-danger ">{{ jobLevelError }}</span>
                    </div>
    
                    <div class="mb-4 col-md-4">
                        <label for="salary" class="mb-2">Salary<span class="req">*</span></label>
                        <input :id="salary" v-model="salary" type="text" placeholder="Salary" id="salary" name="salary" class="form-control" @input="changeSalary">
                        <span class="text-danger ">{{ salaryError }}</span>
                    </div>
                    <div class="mb-4 col-md-5">
                        <label for="expiredDate" class="mb-2">Expired Date<span class="req">*</span></label>
                        <input :id="expiredDate" v-model="expiredDate" type="date" placeholder="expiredDate" id="expiredDate" name="expiredDate" class="form-control">
                        <span class="text-danger ">{{ expiredDateError }}</span>
                    </div>
            
                </div>
    
                <div class="row">
                
                    <div class="mb-4 col-md-4">
                        <label for="province">Province<span class="req">*</span></label>
                        <select class="form-select" id="province" v-model="locationStore.selectedProvince" @change="onProvinceChange">
                            <option disabled value="">Chọn tỉnh/thành</option>
                            <option v-for="province in locationStore.provinces" :key="province.code" :value="province.code"  :data-name="province.name">
                            {{ province.name }}
                            </option>
                        </select>
                        <span class="text-danger ">{{ provinceError }}</span>
                    </div>
                    <div class="mb-4 col-md-4">
                        <label for="district">District<span class="req">*</span></label>
                        <select class="form-select" id="district" v-model="locationStore.selectedDistrict" @change="onDistrictChange">
                            <option disabled value="">Chọn quận/huyện</option>
                            <option v-for="district in locationStore.districts" :key="district.code" :value="district.code"  :data-name="district.name">
                            {{ district.name }}
                            </option>
                        </select>
                        <span class="text-danger ">{{ districtError }}</span>
                    </div>
                    <div class="mb-4 col-md-4">
                        <label for="ward">Ward<span class="req">*</span></label>
                        <select class="form-select" id="ward" v-model="locationStore.selectedWard" @change="onWardChange">
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
                    <textarea :id="street" v-model="street" class="form-control" name="Street" id="Street" cols="5" rows="5"
                        placeholder="Street"></textarea>
                    <span class="text-danger ">{{ streetError }}</span>
                </div>
    
                <div class="">
                    <label for="description" class="mb-2">Description<span class="req">*</span></label>
                    <!-- <textarea v-model="description" class="form-control" name="description" id="description" cols="5" rows="5"
                        placeholder="Description"></textarea> -->
                        <Editor
                            v-model="description"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="description"
                            id="description"
                        />
                    <span class="text-danger ">{{ descriptionError }}</span>
                </div>
    
                <div class="">
                    <label for="benefits" class="mb-2">Benefits<span class="req">*</span></label>
                    <!-- <textarea v-model="benefits" class="form-control" name="benefits" id="benefits" cols="5" rows="5"
                        placeholder="Benefits"></textarea> -->
                    <Editor
                        v-model="benefits"
                        apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                        :init="editorConfig"
                        name="benefits"
                        id="benefits"
                    />
                    <span class="text-danger ">{{ benefitsError }}</span>
                </div>
                
                <div class="">
                    <label for="requirements" class="mb-2">Requirements<span class="req">*</span></label>
                    <!-- <textarea id="requirements" v-model="requirements" class="form-control" name="requirements" cols="5" rows="5"
                        placeholder="requirements"></textarea> -->
                        <Editor
                        v-model="requirements"
                        apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                        :init="editorConfig"
                        name="requirements"
                        id="requirements"
                    />
                    <span class="text-danger ">{{ requirementsError }}</span>
                </div>
     
    
                <div class="">
                    <label for="" class="mb-2">Job Skills<span class="req">*</span></label>
                    <!-- <input type="text" placeholder="keywords" id="keywords" name="keywords" class="form-control"> -->
                 
                       
                        <div class="col-md-12">
                                   
                            <a-select v-model:value="value" mode="multiple" style="width: 100%" placeholder="Job Skills" :options="options"
                                @change="handleChange"  name="jobskill" ></a-select>   

                            <span class="text-danger ">{{ jobskillError  }}</span>
                          
                        </div>
                    
                </div>
            </form>

            <h3 class="fs-4 mb-1 mt-3 border-top pt-5">Info Company </h3>

            <div class="row">
                <div class="mb-4 col-md-6">
                    <label for="" class="mb-2">Name</label>
                    <input readonly type="text" placeholder="Company Name" id="company_name" name="company_name" :value="companyStore.userCompany.name"
                        class="form-control">
                </div>

                <div class="mb-4 col-md-6">
                    <label for="" class="mb-2">Location</label>
                    <input readonly type="text" placeholder="Location" id="location" name="location" class="form-control" :value="locationCity">
                </div>
            </div>

            <div class="mb-4">
                <label for="" class="mb-2">Website</label>
                <input readonly type="text" placeholder="Website" id="website" name="website" class="form-control" :value="companyStore.userCompany.website">
            </div>
        </div>
        <div class="card-footer  p-4">
            <button type="submit" form="formPostJob" class="btn btn-primary">Post Job</button>
        </div>
    </div>
</template>

<style>
  

    .jobLevelTable {
        overflow: auto;
        height: 15vh; 
    }
</style>