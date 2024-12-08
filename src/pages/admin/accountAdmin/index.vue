<script setup>
import tableAdmin from '@/components/admin/table/tableAdmin.vue';
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useAccountStore } from '@/stores/admin/account';
import { debounce } from 'lodash';

const loading = ref(false)
const accountStore = useAccountStore();

const userAccounts = ref([]);
const employerAccounts = ref([]);
const listAccount = ref([]);
const query = ref('');
const queryUser = ref('');
const queryEmployer = ref('');

const pagination = reactive({
    current: 1,
    total:0,
    pageSize: 3
})

const paginationUser = reactive({
    current: 1,
    total:0,
    pageSize: 3
})

const paginationEmployer = reactive({
    current: 1,
    total:0,
    pageSize: 3
})


async function getAccountAllFuc(queryFuc,currentFuc,pageSizeFuc){
    await accountStore.getAccountAll(queryFuc,currentFuc,pageSizeFuc);
    if(accountStore.listAccount.total){
        pagination.total = accountStore.listAccount.total;
       
    }else{
        pagination.total = 0;
    }
    if(accountStore.listAccount.accountUser){
        listAccount.value = accountStore.listAccount.accountUser;
     
    }else{
        listAccount.value = [];
    }
}

async function getAccountUser(queryFuc,currentFuc,pageSizeFuc){
    await accountStore.getAccountUserorEmployerAll(queryFuc,currentFuc,pageSizeFuc,'User');
    if(accountStore.listAccount.total){
        paginationUser.total = accountStore.listAccount.total;
       
    }else{
        paginationUser.total = 0;
    }
    if(accountStore.listAccount.accountUser){
        userAccounts.value = accountStore.listAccount.accountUser;
     
    }else{
        userAccounts.value = [];
    }
}

async function getAccountEmployer(queryFuc,currentFuc,pageSizeFuc){
    await accountStore.getAccountUserorEmployerAll(queryFuc,currentFuc,pageSizeFuc,'Employer');
    if(accountStore.listAccount.total){
        paginationEmployer.total = accountStore.listAccount.total;
       
    }else{
        paginationEmployer.total = 0;
    }
    if(accountStore.listAccount.accountUser){
        employerAccounts.value = accountStore.listAccount.accountUser;
     
    }else{
        employerAccounts.value = [];
    }
}


onMounted(async () => {
   
    await getAccountAllFuc(query.value,pagination.current,pagination.pageSize);
})


// Theo dõi `pagination`
watch(
  () => pagination,
  async (newPagination) => {
    console.log(newPagination.current, newPagination.pageSize);

    
    await getAccountAllFuc(
        query.value,
        newPagination.current,
        newPagination.pageSize
    )
  },
  { deep: true }
);

// Theo dõi `paginationUser`
watch(
  () => paginationUser,
  async (newPaginationUser) => {
    console.log(newPaginationUser.current, newPaginationUser.pageSize);

  
    await getAccountUser(
        queryUser.value,
        newPaginationUser.current,
        newPaginationUser.pageSize,
    )
  },
  { deep: true }
);

// Theo dõi `paginationEmployer`
watch(
  () => paginationEmployer,
  async (newPaginationEmployer) => {
    console.log(newPaginationEmployer.current, newPaginationEmployer.pageSize);

   
    await getAccountEmployer(
        queryEmployer.value,
      newPaginationEmployer.current,
      newPaginationEmployer.pageSize,
    )
  },
  { deep: true }
);


const handleSearchAll = debounce(async () => {
    pagination.current = 1;
    await getAccountAllFuc(
        query.value,
        pagination.current,
        pagination.pageSize
    )
}, 300)



const handleSearchUser = debounce(async () => {
    paginationUser.current = 1
    await getAccountUser(
        queryUser.value,
        paginationUser.current,
        paginationUser.pageSize
    )
}, 300)

const handleSearchEmployer = debounce(async () => {
    paginationEmployer.current = 1;
    await getAccountEmployer(
        queryEmployer.value,
        paginationEmployer.current,
        paginationEmployer.pageSize
    )
}, 300)

const updateQuery = (newQuery) => {
    query.value = newQuery
}

const updateQueryUser = (newQuery) => {
    queryUser.value = newQuery
}

const updateQueryEmployer = (newQuery) => {
    queryEmployer.value = newQuery
}

const handleGetAll = async() => {
  
    await getAccountAllFuc(
        query.value,
        pagination.current,
        pagination.pageSize
    )
}

const handleGetUser = async() => {
    console.log('click get user')
   
    await getAccountUser(
        queryUser.value,
        paginationUser.current,
        paginationUser.pageSize
    )
}

const handleGetEmployer = async() => {
    console.log('click get employer')
  
    await getAccountEmployer(
        queryEmployer.value,
        paginationEmployer.current,
        paginationEmployer.pageSize
    )
}

const handleRefreshData = async() => {
    await getAccountAllFuc(
        query.value,
        pagination.current,
        pagination.pageSize
    )
}

const handleRefreshDataUser = async() => {
    await getAccountUser(
        queryUser.value,
        paginationUser.current,
        paginationUser.pageSize
    )
}

const handleRefreshDataEmployer = async() => {
    await getAccountEmployer(
        queryEmployer.value,
        paginationEmployer.current,
        paginationEmployer.pageSize
    )
}

</script>
<template>
    <div class="row g-4">
        <!-- <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h6 class="mb-4">Responsive Table</h6>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">ZIP</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>John</td>
                                <td>Doe</td>
                                <td>jhon@email.com</td>
                                <td>USA</td>
                                <td>123</td>
                                <td>Member</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mark@email.com</td>
                                <td>UK</td>
                                <td>456</td>
                                <td>Member</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>jacob@email.com</td>
                                <td>AU</td>
                                <td>789</td>
                                <td>Member</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> -->
        <div class="col-12">
            <div class="bg-light rounded p-4"  style="height: 75vh;">
                <h4 class="mb-4 mb-0 fw-bold text-primary">Account Management</h4>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                            aria-selected="true" @click="handleGetAll" >Account All</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false" @click="handleGetUser">User
                            Account</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false"@click="handleGetEmployer">Employer
                            Account</button>
                    </div>
                </nav>
                <div class="tab-content pt-3" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <tableAdmin :accounts="listAccount" :pagination="pagination" @handleSearch="handleSearchAll" @refreshData="handleRefreshData"   @updateQuery="updateQuery"/>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <tableAdmin :accounts="userAccounts" :pagination="paginationUser" @handleSearch="handleSearchUser" @refreshData="handleRefreshDataUser"   @updateQuery="updateQueryUser" />
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <tableAdmin :accounts="employerAccounts" :pagination="paginationEmployer" @handleSearch="handleSearchEmployer" @refreshData="handleRefreshDataEmployer" @updateQuery="updateQueryEmployer"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>