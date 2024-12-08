<script setup>
import { ref } from 'vue';
import { useAccountStore } from '@/stores/admin/account';


const accountStore = useAccountStore();
const status = ref({
    0: 'Pending',
    1: 'Approved',
    2: 'Rejected'

})

const loading = ref(false)

// Phát sự kiện handleSearch khi nhấn nút
const emit = defineEmits(['handleSearch', 'updateQuery']);
// Nhận danh sách accounts từ cha
defineProps({
    accounts: {
        type: Array,
        default: () => []
    },
    pagination: {
        type: Object,
        default: () => [{
            current: 1,
            total: 0,
            pageSize: 5
        }]

    },
});

const handleLock = async(account) => {
    let isSucces = false
    if(account.role === 'User'){
        loading.value = true;
        isSucces = await accountStore.lockAccountUser(account.id);
        loading.value = false;
       
    }else if(account.role === 'Employer'){
        loading.value = true;
        isSucces = await accountStore.lockAccountEmployer(account.id);
        loading.value = false;
    }

    if(isSucces){
        emit('refreshData');
    }
}

const handleUnLock = async(account) => {
    let isSucces = false
    if(account.role === 'User'){
        loading.value = true;
        isSucces = await accountStore.unlockAccountUser(account.id);
        loading.value = false;
    }else if(account.role === 'Employer'){
        loading.value = true;
        isSucces = await accountStore.unlockAccountEmployer(account.id);
        loading.value = false;
    }
    if(isSucces){
        emit('refreshData');
    }
}

// Phát sự kiện mỗi khi giá trị query thay đổi
const handleInput = (event) => {
    emit('updateQuery', event.target.value); // Cập nhật query ở component cha
    emit('handleSearch'); // Phát sự kiện tìm kiếm
};

</script>
<template>
    <div class="bg-light rounded p-4 pt-2 h-100">
        <!-- <h6 class="mb-4">Responsive Table</h6> -->
       <div class="mb-4">
           <div class="col-4">
                <input 
                class="form-control form-control-md"
                    type="text"
                    placeholder="Search..."
                    @input="handleInput"
            
                aria-label=".form-control-md example">
           </div>
       </div>
        <div class="table-responsive position-relative" style="height: 40vh;" >
            <div :class="{ overlay2: loading }" id="overlay"></div>
            <div v-if="loading" class="loading position-absolute">
                <a-spin size="large" tip="Loading..." />
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(account, index) in accounts" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ account.username }}</td>
                        <td>{{ account.email }}</td>
                        <td>{{ account.fullname }}</td>
                        <td>{{ account.role }}</td>
                        <td>{{ status[account.status] }}</td>
                        <td>
                            <div v-if="account.statusCompany" class="w-75 d-flex gap-1">
                                <!-- <a class="btn btn-sm btn-warning mx-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a> -->
                                <button v-if="account.status === 0 " type="button" class="btn btn-sm btn-primary mx-1"  @click="handleUnLock(account)">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button v-if="account.status === 1 " type="button" class="btn btn-sm btn-danger mx-1" @click="handleLock(account)" :disabled="account.role === 'Admin'">
                                    <i class="fa-solid fa-lock"></i>
                                </button>
                                <button v-else-if="account.status === 2 " type="button" class="btn btn-sm btn-success mx-1" @click="handleUnLock(account)" :disabled="account.role === 'Admin'" >
                                    <i class="fa-solid fa-unlock"></i>
                                </button>
                                <router-link :to="`/admin/account/detail/${account.id}`"  class="btn btn-sm btn-info mx-1">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </div>
                            <div v-else class="w-75 d-flex gap-1">
                                <!-- <a class="btn btn-sm btn-warning mx-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a> -->
                                <button v-if="account.status === 0 && account.role !== 'Employer'" type="button" class="btn btn-sm btn-primary mx-1"  @click="handleUnLock(account)">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button v-if="account.status === 1 " type="button" class="btn btn-sm btn-danger mx-1" @click="handleLock(account)" :disabled="account.role === 'Admin'">
                                    <i class="fa-solid fa-lock"></i>
                                </button>
                                <button v-else-if="account.status === 2 " type="button" class="btn btn-sm btn-success mx-1" @click="handleUnLock(account)" :disabled="account.role === 'Admin'" >
                                    <i class="fa-solid fa-unlock"></i>
                                </button>
                                <router-link :to="`/admin/account/detail/${account.id}`"  class="btn btn-sm btn-info mx-1">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>
        <div class="pagination d-flex justify-content-center">
            <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize"
                show-less-items />
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