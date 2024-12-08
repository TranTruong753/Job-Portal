<script setup>
import { onMounted, ref, watch } from 'vue';
import { useBlogAdminStore } from '@/stores/admin/blogAdmin';
import { formatDate } from '@/assets/js/jsUtils';
import { debounce } from 'lodash';


const loading = ref(false)
const pageSize = ref(4);
const total = ref(0);
const current = ref(1)
const query = ref('');
const blogStore = useBlogAdminStore();
const blogList = ref([]);

async function getBlogAdminAllFuc(queryfuc, currentfuc, pageSizefuc) {
    await blogStore.getBlogAdminAll(queryfuc, currentfuc, pageSizefuc);
    if (blogStore.listBlog.blogs) {
        blogList.value = blogStore.listBlog.blogs;
    } else {
        blogList.value = []
    }
    if (blogStore.listBlog.total) {
        total.value = blogStore.listBlog.total
    } else {
        total.value = 0
    }
}

const status = ref({
    0: 'Pending',
    1: 'Approved',
    2: 'Rejected'

})

onMounted(async () => {
    await getBlogAdminAllFuc(query.value, current.value, pageSize.value)
})



watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await getBlogAdminAllFuc(query.value, newCurrent, newPageSize)

});

const handleSearch = debounce(async () => {
    current.value = 1;
    await getBlogAdminAllFuc(query.value, current.value , pageSize.value)
}, 300)

const handleUnlock = async(item) => {
   const isSuccess = await blogStore.acceptStatusBlog(item.id)
   if(isSuccess){
        getBlogAdminAllFuc(query.value, current.value, pageSize.value)
   }

}

const handleLock = async(item) => {
    const isSuccess = await blogStore.refuseStatusBlog(item.id)
   if(isSuccess){
        getBlogAdminAllFuc(query.value, current.value, pageSize.value)
   }
}
</script>

<template>
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 mb-0 fw-bold text-primary">Blog</h4>
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
                                <th scope="col">Employer Post</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in blogList">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.title }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ status[item.status] }}</td>
                                <td>
                                    <div class="w-75 d-flex gap-1" role="">
                                        <!-- <a class="btn btn-sm btn-warning mx-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a> -->
                                        <button v-if="item.status === 0" type="button" @click="handleUnlock(item)"
                                            class="btn btn-sm btn-primary mx-1">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-if="item.status === 1" type="button" @click="handleLock(item)"
                                            class="btn btn-sm btn-danger mx-1">
                                            <i class="fa-solid fa-lock"></i>
                                        </button>
                                        <button v-else-if="item.status === 2" type="button" @click="handleUnlock(item)"
                                            class="btn btn-sm btn-success mx-1">
                                            <i class="fa-solid fa-unlock"></i>
                                        </button>
                                        <router-link :to="`/admin/blog/detail/${item.id}`"
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