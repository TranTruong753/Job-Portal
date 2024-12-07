<script setup>
import { useCompanyAdminStore } from '@/stores/admin/companyAdmin';
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateForInput, convertToUrlV2 } from '@/assets/js/jsUtils'
const route = useRoute()
const companyStore = useCompanyAdminStore();
const companyAdminData = ref('')
const idCompany = route.params.id;
const dateCreate = ref('');
const dateUpdate = ref('');
const img = ref('')


const editorConfig = {
    height: 400,
    menubar: false,
    plugins: ['link', 'image', 'lists'],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
    readonly: true,
};

onMounted(async () => {
    await companyStore.getCompanyById(idCompany);
    if(companyStore.companyData){
        companyAdminData.value = companyStore.companyData;
        dateCreate.value = formatDateForInput(companyStore.companyData.create)
        dateUpdate.value = formatDateForInput(companyStore.companyData.update)
        img.value = convertToUrlV2(companyStore.companyData.logo)
    }else{
        img.value = '/src/assets/img/avatar7.png'
        companyAdminData.value = [];
    }
})


</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-9 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Detail Company</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="companyAdminData.name"type="text" class="form-control" id="floatingCompanyName" placeholder="Công ty xyz...">
                        <label for="floatingCompanyName">Company Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="companyAdminData.industry" type="text" class="form-control" id="floatingIndustry" placeholder="Xây dựng...">
                        <label for="floatingIndustry">Industry</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="companyAdminData.website" type="text" class="form-control" id="floatingInput" placeholder="name.example.com">
                        <label for="floatingInput">Website </label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly  v-model="companyAdminData.email" type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
                        <label for="floatingEmail">Email</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="companyAdminData.phone" type="tel" class="form-control" id="floatingPhone" placeholder="Phone">
                        <label for="floatingPhone">Phone</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="dateCreate" type="Date" class="form-control" id="floatingCreate" placeholder="Create">
                        <label for="floatingCreate">Create</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="dateUpdate" type="Date" class="form-control" id="floatingUpdate" placeholder="Update">
                        <label for="floatingUpdate">Update</label>
                    </div>
                    <div class="col-lg-12">
                        <label for="description" class="mb-2">Description</label>
                        <Editor
                            v-model="companyAdminData.description"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="description"
                            id="description"
                            :disabled="true"
                        />
                    </div>
                    <div>
                        <router-link to="/admin/company" type="button" class="btn btn-danger">Back To List</router-link>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-3">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Imge</h4>
                <div class="card">
                    <img :src="img" class="card-img-top" alt="...">

                </div>
            </div>
        </div>
    </div>
</template>