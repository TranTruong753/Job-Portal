<script setup>
import { onMounted, ref, watch } from 'vue';
import { useJobAdminStore } from '@/stores/admin/jobAdmin';
import { formatDateV2 } from '@/assets/js/jsUtils';
import { debounce } from 'lodash';


const loading = ref(false)
const pageSize = ref(4);
const total = ref(0);
const current = ref(1)
const query = ref('');
const jobStore = useJobAdminStore();
const jobList = ref([]);

async function getJobAdminAllFuc(queryfuc, currentfuc, pageSizefuc) {
    await jobStore.getJobAdminAll(queryfuc, currentfuc, pageSizefuc);
    if (jobStore.listJob.jobs) {
        jobList.value = jobStore.listJob.jobs;
    } else {
        jobList.value = []
    }
    if (jobStore.listJob.total) {
        total.value = jobStore.listJob.total
    } else {
        total.value = 0
    }
}



onMounted(async () => {
    await getJobAdminAllFuc(query.value, current.value, pageSize.value)
})



watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await getJobAdminAllFuc(query.value, newCurrent, newPageSize)

});

const handleSearch = debounce(async () => {
    current.value = 1 
    await getJobAdminAllFuc(query.value, current.value, pageSize.value)
}, 300)

const handleUpdateStatus = async(item,status) => {
   const isSuccess = await jobStore.updateStatusJob(item.id,status)
   if(isSuccess){
    await getJobAdminAllFuc(query.value, current.value, pageSize.value)
   }
}

</script>

<template>
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 mb-0 fw-bold text-primary">Jobs</h4>
                <div class="mb-4">
                    <div class="col-4">
                        <input class="form-control form-control-md" type="text" placeholder="Search..." v-model="query"
                            @input="handleSearch" aria-label=".form-control-md example">
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Job level</th>
                                <th scope="col">Job type</th>
                                <th scope="col">Create At</th>
                                <th scope="col">Job Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in jobList">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.title }}</td>
                                <td>{{ item.jobLevel }}</td>
                                <td>{{ item.jobType }}</td>
                                <td>{{ formatDateV2(item.createOn) }}</td>
                                <td>{{ item.jobStatus }}</td>
                                <td>
                                    <div class="w-75 d-flex gap-1" role="">
                                        <!-- <a class="btn btn-sm btn-warning mx-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a> -->
                                        <button v-if="item.jobStatus === 'Pending'" type="button" @click="handleUpdateStatus(item,'Approved')"
                                            class="btn btn-sm btn-primary mx-1">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-else-if="item.jobStatus === 'Approved'" type="button" @click="handleUpdateStatus(item,'Rejected')"
                                            class="btn btn-sm btn-danger mx-1">
                                            <i class="fa-solid fa-lock"></i>
                                        </button>
                                        <button v-else-if="item.jobStatus === 'Rejected'" type="button" @click="handleUpdateStatus(item,'Approved')"
                                            class="btn btn-sm btn-success mx-1">
                                            <i class="fa-solid fa-unlock"></i>
                                        </button>
                                        <router-link :to="`/admin/job/detail/${item.id}`"
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
                    <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" show-less-items   :showSizeChanger="false" />
                </div>
            </div>
        </div>
    </div>
</template>