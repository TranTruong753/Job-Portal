<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, watch } from 'vue';
import { formatDateV2 } from '@/assets/js/jsUtils'
import { debounce } from 'lodash';
import Swal from 'sweetalert2';

const pageSize = ref(5);
const current = ref(1);
const total = ref(0);
const loading = ref(true);

const authStore = useAuthStore();
onMounted(async () => {
    loading.value = true;
    try {
        await authStore.getListBlogPost(query.value, current.value, pageSize.value);
        const totalResult = await authStore.getTotalListBlogPost(query.value, current.value, pageSize.value);
        total.value = totalResult; // Gán kết quả thực tế
          // Kiểm tra trạng thái dữ liệu
        loading.value = !(total.value && authStore.listBlogPost.length !== 0);
        if (!loading.value) {
            console.log("authStore.listBlogPost", authStore.listBlogPost);
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
        authStore.getListBlogPost(query.value, current.value, pageSize.value),
        authStore.getTotalListBlogPost(query.value, current.value, pageSize.value).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
}, 300)


watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await Promise.all([
        authStore.getListBlogPost(query.value, newCurrent, newPageSize),
        authStore.getTotalListBlogPost(query.value, newCurrent, newPageSize).then(result => {
            total.value = result; // Đảm bảo gán kết quả sau khi hoàn tất
        }),
    ]);
   

});

const handleCheck = async (item) => {
    // console.log(item.title);
    await authStore.isShowBlogPost(item.id, item.isShow);
}

const status = ref({
    0: 'Pending',
    1: 'Approved',
    2: 'Rejected'

})

const handleRemove = async (item) => {
    console.log(item.id)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            await authStore.deleteBlog(item.id);
          
        }
    });
}
</script>

<template>
  <div class="card border-0 shadow mb-4 p-3">
        <div class="card-body card-form">
            <div class="d-flex justify-content-between">
                <div>
                    <h3 class="fs-4 mb-1">My BLog</h3>
                </div>

            </div>
            <div class="mb-4 row">

                <div class="col-lg-4">
                    <input v-model="query" type="text" placeholder="Keywords" class="form-control"
                        @input="handleQuery" />
                </div>
            </div>
            <div class="table-responsive pt-3 pe-3  position-relative" style="height: 70vh;overflow: auto">
                <div v-if="loading" class="d-flex align-items-center justify-content-center"  style="height: 60vh;">
                    <div v-if="authStore.listBlogPost.length !== 0" class="">
                        <a-spin size="large" tip="Loading..."/>
                    </div>
                    <div v-else>
                        <h3 class="text-center text-primary">NOT FUND MY BLOGS </h3>
                    </div>
                </div>
                <table v-else class="table "  >
                    <thead class="bg-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Blog Created</th>
                            <th scope="col">Status</th>
                            <th scope="col">Is Show</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-0">
                       
                        <tr v-for="(item, index) in authStore.listBlogPost">
                            <td>
                                <div class="job-name fw-500">{{ item.title }}</div>
                                <div class="info1">{{ item.companyname }}</div>
                            </td>
                            <td>{{ formatDateV2(item.createOn) }}</td>
                          
                            <td>
                                <div class="job-status text-capitalize">
                                    {{ status[item.status]}}

                                </div>
                            </td>
                            <td><a-switch v-model:checked="item.isShow" @change="handleCheck(item)"  :disabled="item.status !== 1" /></td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li >
                                            <router-link :to="`/blog/detailEmployer/${item.id}`" class="dropdown-item"> <i
                                                    class="fa fa-eye" aria-hidden="true"></i> View</router-link>
                                        </li>
                                        <li><a @click="handleRemove(item)" class="dropdown-item"><i class="fa fa-trash"
                                            aria-hidden="true"></i> Remove</a></li>
                                        <!-- <li>
                                            <a class="dropdown-item" href="#"
                                                @click="authStore.updateIsShowUserForJobPost(item.id)">
                                                <i class="fa fa-trash" aria-hidden="true"></i> Remove
                                            </a>
                                        </li> -->
                
                                    </ul>
                                </div>
                            </td>
                        </tr>

                    </tbody>





                </table>
                <div class="d-flex justify-content-center">
                    <a-pagination class="pagination position-absolute" v-model:current="current" :total="total"  :pageSize="pageSize"  show-less-items />
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