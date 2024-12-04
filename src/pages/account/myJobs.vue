<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, watch } from 'vue';
import { formatDateV2 } from '@/assets/js/jsUtils'
import { debounce } from 'lodash';

const pageSize = ref(5);
const current = ref(1);
const total = ref(0);
const loading = ref(true);

const authStore = useAuthStore();
onMounted(async () => {
    loading.value = true;
    try {
        await authStore.getListJobPost(query.value, current.value, pageSize.value);
        const totalResult = await authStore.getTotalListJobPost(query.value, current.value, pageSize.value);
        total.value = totalResult; // Gán kết quả thực tế
          // Kiểm tra trạng thái dữ liệu
        loading.value = !(total.value && authStore.listJobPost.length !== 0);
        if (!loading.value) {
            console.log("authStore.listJobPost", authStore.listJobPost);
        }
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        // loading.value = false;
    }
})

const query = ref('');

const handleQuery = debounce(async () => {
    await Promise.all([
        authStore.getListJobPost(query.value, current.value, pageSize.value),
        authStore.getTotalListJobPost(query.value, current.value, pageSize.value).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
}, 300)


watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await Promise.all([
        authStore.getListJobPost(query.value, newCurrent, newPageSize),
        authStore.getTotalListJobPost(query.value, newCurrent, newPageSize).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
    // console.log(total.value)
    // await jobStore.searchJobs(queryTextSearch.value, querylocationSearch.value, queryJobType.value, queryJobLevel.value, pageSize.value, current.value);



});

const handleCheck = async (item) => {
    console.log(item.title);
    await authStore.isShowJobPost(item.id, item.isShow);
}


</script>
<template>
    <div class="card border-0 shadow mb-4 p-3">
        <div class="card-body card-form">
            <div class="d-flex justify-content-between">
                <div>
                    <h3 class="fs-4 mb-1">My Jobs</h3>
                </div>
                <div style="margin-top: -10px;">
                    <router-link to="/account/post-job" class="btn btn-primary">Post a Job</router-link>
                </div>

            </div>
            <div class="mb-4 row">

                <div class="col-lg-4">
                    <input v-model="query" type="text" placeholder="Keywords" class="form-control"
                        @input="handleQuery" />
                </div>
            </div>
            <div class="table-responsive pt-3 pe-3 position-relative " style="height: 70vh;overflow: auto">
                <div v-if="loading" class="d-flex align-items-center justify-content-center"  style="height: 60vh;">
                    <div v-if="authStore.listJobPost.length !== 0" class="">
                        <a-spin size="large" tip="Loading..."/>
                    </div>
                    <div v-else>
                        <h3 class="text-center text-primary">NOT FUND MY JOBS </h3>
                    </div>
                </div>
                <table v-else class="table"  >
                    <thead class="bg-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Job Created</th>
                            <th scope="col">Status</th>
                            <th scope="col">Is Show</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-0">
                       
                        <tr v-for="(item, index) in authStore.listJobPost">
                            <td v-if="item.isShowEmployer">
                                <div class="job-name fw-500">{{ item.title }}</div>
                                <div class="info1">{{ item.jobLevel }}</div>
                            </td>
                            <td v-if="item.isShowEmployer">{{ formatDateV2(item.createOn) }}</td>
                          
                            <td v-if="item.isShowEmployer">
                                <div class="job-status text-capitalize">
                                    {{ item.jobStatus }}

                                </div>
                            </td>
                            <td v-if="item.isShowEmployer"><a-switch v-model:checked="item.isShow" @change="handleCheck(item)"  :disabled="item.jobStatus !== 'Approved'" /></td>
                            <td v-if="item.isShowEmployer">
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <router-link :to="`/job/detailEmployer/${item.id}`" class="dropdown-item"> <i
                                                    class="fa fa-eye" aria-hidden="true"></i> View</router-link>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#"
                                                @click="authStore.updateIsShowUserForJobPost(item.id)">
                                                <i class="fa fa-trash" aria-hidden="true"></i> Remove
                                            </a>
                                        </li>
                                        <li >
                                            <router-link :to="`/account/list-applicants/${item.id}`"
                                                class="dropdown-item">
                                                <i class="fa-solid fa-list" aria-hidden="true"></i> List Applicants
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                 
                    </tbody>





                </table>
                <div class="pagination d-flex justify-content-center position-absolute">
                    <a-pagination v-model:current="current" :total="total"  :pageSize="pageSize"  show-less-items />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pagination {
    left: 50%;
    bottom: 1%;
    translate: -50%;
}

</style>
