<script setup>
import { useAccountStore } from '@/stores/admin/account';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateForInput, convertToUrlV2 } from '@/assets/js/jsUtils'


    const route = useRoute();
    const idAccount = route.params.id;
    const accountStore = useAccountStore();
    const date = ref('')
    const img = ref('')

    const accountData = ref([]);
    onMounted(async ()=>{
        await accountStore.getAccountById(idAccount);
        if(accountStore.userData){
            console.log('accountStore.userData',accountStore.userData.username)
            accountData.value = accountStore.userData;
            date.value = formatDateForInput(accountStore.userData.birthdate)
            img.value = convertToUrlV2(accountStore.userData.img)
        }else{
            img.value = '/src/assets/img/avatar7.png'
            accountData.value = [];
        }
    })



</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-9 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Detail Account</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="accountData.username" type="text" class="form-control" id="floatingUserName" placeholder="username123">
                        <label for="floatingUserName">User Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="accountData.fullname" type="text" class="form-control" id="floatingFullName" placeholder="FullName123">
                        <label for="floatingFullName">Full Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="accountData.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email </label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly :disabled="accountData.phone === null" v-model="accountData.phone" type="tel" class="form-control" id="floatingPhone" placeholder="Not update Phone">
                        <label for="floatingSex"> {{ accountData.phone ? 'Phone' : 'Not update Phone' }}</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="date" type="Date" class="form-control" id="floatingDate" placeholder="Date">
                        <label for="floatingDate">Birth Date</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly :disabled="accountData.sex === null" v-model="accountData.sex" type="Text" class="form-control" id="floatingSex" placeholder="Not update Sex" >
                        <label for="floatingSex"> {{ accountData.sex ? 'Sex' : 'Not update Sex' }}</label>
                    </div>
                
                    <div class="form-floating mb-3 col-lg-6">
                        <input readonly v-model="accountData.role" type="Text" class="form-control" id="floatingRole" placeholder="Role">
                        <label for="floatingRole">Role</label>
                    </div>
                    
                    <div>
                        <router-link to="/admin/account" type="button" class="btn btn-danger">Back To List</router-link>
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