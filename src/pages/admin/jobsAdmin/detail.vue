<script setup>
import { useJobAdminStore } from '@/stores/admin/jobAdmin';
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateForInput, convertToUrlV2, formatCurrencyVND } from '@/assets/js/jsUtils'
 import {initializeTinyMCE} from '@/assets/js/tiny'

const route = useRoute()
const jobStore = useJobAdminStore();
const jobAdminData = ref('')
const idJob = route.params.id;
const dateCreate = ref('');
const expiredDate = ref('')
const img = ref('')
const companyData = ref('')
const salary = ref('')

const editorConfig = {
    height: 400,
    menubar: false,
    plugins: ['link', 'image', 'lists'],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
    readonly: true,
};

onMounted(async () => {
    await jobStore.getJobById(idJob);
    if(jobStore.jobData){
        jobAdminData.value = jobStore.jobData;
        console.log('jobAdminData.value',jobAdminData.value)
        dateCreate.value = formatDateForInput(jobStore.jobData.createOn)
        expiredDate.value = formatDateForInput(jobStore.jobData.expiredDate)
        salary.value = formatCurrencyVND(jobStore.jobData.salary) + " VNĐ"
        img.value = convertToUrlV2(jobStore.jobData.img)
    
        companyData.value = jobStore.jobData.employer.company
    }else{
        img.value = '/src/assets/img/avatar7.png'
        jobAdminData.value = [];
    }
})


</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-12 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Detail Job</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-12">
                        <input readonly v-model="jobAdminData.title"type="text" class="form-control" id="floatingJobName" placeholder="Name...">
                        <label for="floatingJobName">Job Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="companyData.name" type="text" class="form-control" id="floatingCompanyName" placeholder="Công ty xyz..">
                        <label for="floatingCompanyName">Company Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="salary" type="text" class="form-control" id="floatingSalary" placeholder="5000000...">
                        <label for="floatingSalary">Salary</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="jobAdminData.jobType" type="text" class="form-control" id="floatingJobType" placeholder="Type...">
                        <label for="floatingJobType">Job Type</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="jobAdminData.jobLevel" type="text" class="form-control" id="floatingJobLevel" placeholder="Inter...">
                        <label for="floatingJobLevel">JobLevel</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="dateCreate" type="Date" class="form-control" id="floatingCreate" placeholder="Create">
                        <label for="floatingCreate">Create</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="expiredDate" type="Date" class="form-control" id="floatingExpiredDate" placeholder="ExpiredDate">
                        <label for="floatingExpiredDate">Expired Date</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-12">
                        <input readonly v-model="jobAdminData.location" type="Text" class="form-control" id="floatingLocation" placeholder="Location">
                        <label for="floatingLocation">Location</label>
                    </div>
                    <div class="col-lg-12">
                        <label for="description" class="mb-2">Description</label>
                        <Editor
                            v-model="jobAdminData.description"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="description"
                            id="description"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-lg-12">
                        <label for="requirements" class="mb-2">Requirements</label>
                        <Editor
                            v-model="jobAdminData.requirements"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="requirements"
                            id="requirements"
                            :disabled="true"
                        />
                       
                    </div>
                    <div class="col-lg-12">
                        <label for="benefits" class="mb-2">Benefits</label>
                        <Editor
                            v-model="jobAdminData.benefits"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="benefits"
                            id="benefits"
                            :disabled="true"
                        />
                       
                    </div>
                    <div>
                        <router-link to="/admin/jobs" type="button" class="btn btn-danger">Back To List</router-link>
                    </div>
                </div>

            </div>
        </div>
        <!-- <div class="col-lg-3">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Imge</h4>
                <div class="card">
                    <img :src="img" class="card-img-top" alt="...">

                </div>
            </div>
        </div> -->
    </div>
</template>