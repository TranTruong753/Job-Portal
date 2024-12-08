<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCompanyAdminStore } from '@/stores/admin/companyAdmin';
import { formatDate } from '@/assets/js/jsUtils';
import { debounce } from 'lodash';


const loading = ref(false)
const pageSize = ref(4);
const total = ref(0);
const current = ref(1)
const query = ref('');
const companyStore = useCompanyAdminStore();
const companyList = ref([]);

async function getCompanyAdminAllFuc(queryfuc, currentfuc, pageSizefuc) {
    await companyStore.getCompanyAdminAll(queryfuc, currentfuc, pageSizefuc);
    if (companyStore.listCompany.company) {
        companyList.value = companyStore.listCompany.company;
    } else {
        companyList.value = []
    }
    if (companyStore.listCompany.total) {
        total.value = companyStore.listCompany.total
    } else {
        total.value = 0
    }
}



onMounted(async () => {
    await getCompanyAdminAllFuc(query.value, current.value, pageSize.value)
})



watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await getCompanyAdminAllFuc(query.value, newCurrent, newPageSize)

});

const handleSearch = debounce(async () => {
    current.value = 1;
    await getCompanyAdminAllFuc(query.value, current.value, pageSize.value)
}, 300)


const handleUpdateStatus = async(item,status) => {
    loading.value = true;
   const isSuccess = await companyStore.updateStatusCompany(item.id,status);
   loading.value = false;
   if(isSuccess){
        await getCompanyAdminAllFuc(query.value, current.value, pageSize.value)
   }
}

</script>

<template>
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 mb-0 fw-bold text-primary">Company</h4>
                <div class="mb-4 d-flex ">
                    <div class="col-4">
                        <input class="form-control form-control-md" type="text" placeholder="Search..." v-model="query"
                            @input="handleSearch" aria-label=".form-control-md example">
                    </div>
                  
                    <div class="ms-auto">
                        <router-link  to="/admin/company/upsert" class="btn btn-primary"><i class="fa-solid fa-plus me-2"></i> Company</router-link>
                    </div>
                  
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Industry</th>
                                <th scope="col">Email</th>
                                <th scope="col">Create</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in companyList">
                                <th scope="row">{{ item.id}}</th>
                                <td>{{ item.name }}</td>
                                <td>{{ item.industry }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ formatDate(item.create) }}</td>
                                <td>
                                    <div class="w-75 d-flex gap-1" role="">
                                        <router-link  :to="`/admin/company/upsert/${item.id}`" class="btn btn-sm btn-warning mx-1">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </router-link>
                                        <!-- <button v-if="item.status === 0" type="button"
                                            class="btn btn-sm btn-primary mx-1">
                                            <i class="fa-solid fa-check"></i>
                                        </button> -->
                                        <button v-if="item.status === true" type="button" @click="handleUpdateStatus(item,false)"
                                            class="btn btn-sm btn-danger mx-1">
                                            <i class="fa-solid fa-lock"></i>
                                        </button>
                                        <button v-else-if="item.status === false" type="button"  @click="handleUpdateStatus(item,true)"
                                            class="btn btn-sm btn-success mx-1">
                                            <i class="fa-solid fa-unlock"></i>
                                        </button>
                                        <router-link :to="`/admin/company/detail/${item.id}`"
                                            class="btn btn-sm btn-info mx-1">
                                            <i class="fa-solid fa-eye"></i>
                                        </router-link>
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="pagination d-flex justify-content-center">
                    <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" show-less-items   :showSizeChanger="false"/>
                </div>
            </div>
        </div>
    </div>
</template>