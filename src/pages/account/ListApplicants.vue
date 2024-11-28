<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { convertToUrl } from "@/assets/js/jsUtils";
import Swal from 'sweetalert2';

const route = useRoute();
const authStore = useAuthStore();
const idJob = route.params.id;
const listUser = ref([]);
const loading = ref(false);

onMounted(async () => {
    await authStore.getApplycationByJob(idJob);
    listUser.value = authStore.listApplicantsByJob.users;
});

// Hàm cập nhật trạng thái
const updateStatus = async (item) => {
    console.log(`Cập nhật trạng thái cho: ${item.id}, status: ${item.status}`);
    // Gọi API hoặc xử lý logic cập nhật tại đây
    loading.value = true;
    await authStore.ConfirmApplication(idJob, item.id, item.status);
    loading.value = false;
};

const handleRemove = async (item) => {
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
            const isSucces = await authStore.removeApplication(idJob,item.id,0);
            if(isSucces){
                Swal.fire({
                    title: "Deleted!",
                    text: "Applicant has been deleted.",
                    icon: "success"
                });
                await authStore.getApplycationByJob(idJob);
                listUser.value = authStore.listApplicantsByJob[0].users;
                // item.
            }else{
                Swal.fire({
                    title: "Deleted failed!",
                    text: "Applicant hasn't been deleted.",
                    icon: "error"
                });
            }
          
        }
    });
}
</script>
<template>

    <div class="card border-0 shadow mb-4 p-3 position-relative">
        <div :class="{ overlay2: loading }" id="overlay"></div>
        <div v-if="loading" class="loading position-absolute">
            <a-spin size="large" tip="Loading..." />
        </div>
        <div class="card-body card-form">
            <nav class=" rounded-3 mb-3">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <RouterLink to="/account/my-jobs">
                            <i class="fa fa-arrow-left" aria-hidden="true">
                            </i> &nbsp;Back to My Jobs
                        </RouterLink>
                    </li>
                </ol>
            </nav>
            <div class="d-flex justify-content-between">
                <div>
                    <h3 class="fs-4 mb-1">Applicant</h3>
                </div>

            </div>
            <div class="table-responsive">
             
                <table v-if="listUser.length!==0" class="table ">
                    <thead class="bg-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>

                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-0">
                        <tr v-for="(item, index) in listUser">
                            <td>
                                <div class="job-name fw-500">{{ item.fullName }}</div>
                            </td>
                            <td>
                                <div class="job-name fw-500">{{ item.email }}</div>
                            </td>

                            <td>
                                <div class="job-status text-capitalize w-75">

                                    <select class="form-select" v-model="item.status" @change="updateStatus(item)">

                                        <option value="1" disabled>Chờ xác nhận</option>
                                        <option value="2">Đã xác nhận</option>
                                        <option value="3">Hủy xác nhận</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" :href="convertToUrl(item.cv)" target="_blank">
                                                <i class="fa fa-eye" aria-hidden="true"></i> View
                                            </a>
                                        </li>
                                        <li><a @click="handleRemove(item)" class="dropdown-item"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>

                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <!-- <tr class="active">
                            <td>
                                <div class="job-name fw-500">Trần Quang Trường</div>
                            </td>
                            <td>....</td>
                            <td>.....</td>
                            <td>
                                <div class="job-status text-capitalize w-50">
                                    <select class="form-select" aria-label="Default select">
                                        <option selected>Chờ xác nhận</option>
                                        <option value="1">Đã liên hệ</option>
                                        <option value="2">Đã test</option>
                                        <option value="3">Đã phỏng vấn</option>
                                        <option value="4">Trúng tuyển</option>
                                        <option value="5">Không trúng tuyến</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="#!"><i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</a></li>
                                        <li><a class="dropdown-item" href="#!"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>
                                        <li><a class="dropdown-item" href="#!"><i class="fa-solid fa-envelope"></i> Send
                                                Email</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr> -->

                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>

<style>
.overlay2 {
    position: absolute;
    /* Gắn cố định với màn hình */
    top: 0;
    left: 0;
    width: 100%;
    /* Phủ toàn màn hình */
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    /* Màu đen mờ */
    z-index: 999;
    /* Nổi trên các thành phần khác */
    display: block;
    /* Ẩn mặc định */
}

.loading {
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%
}
</style>