<script setup>
import { onMounted, ref, watch } from 'vue';
import { useSkillAdminStore } from '@/stores/admin/skillAdmin';
import { formatDate, closeModal } from '@/assets/js/jsUtils';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';


const loading = ref(false)
const pageSize = ref(4);
const total = ref(0);
const current = ref(1)
const query = ref('');
const skillStore = useSkillAdminStore();
const skillList = ref([]);

async function getSkillAdminAllFuc(queryfuc, currentfuc, pageSizefuc) {
    await skillStore.getSkillAdminAll(queryfuc, currentfuc, pageSizefuc);
    if (skillStore.listSkill.skills) {
        skillList.value = skillStore.listSkill.skills;
    } else {
        skillList.value = []
    }
    if (skillStore.listSkill.total) {
        total.value = skillStore.listSkill.total
    } else {
        total.value = 0
    }
}

const nameSkill = ref('');
const errorNameSkill = ref('');
const idSkill = ref();
const status = ref();


onMounted(async () => {
    await getSkillAdminAllFuc(query.value, current.value, pageSize.value)
})



watch([current, pageSize], async ([newCurrent, newPageSize]) => {

    console.log(newCurrent, newPageSize);
    // await jobStore.getJob(newPageSize, newCurrent);
    await getSkillAdminAllFuc(query.value, newCurrent, newPageSize)

});

const handleSearch = debounce(async () => {
    current.value = 1;
    await getSkillAdminAllFuc(query.value, current.value, pageSize.value)
}, 300)


const handleUpdate = async (item,status) => {
    // status = true nghĩa là xóa 
   const isSuccess =  await skillStore.updateSkill(item.id,item.name, status)
    if(isSuccess){
        await getSkillAdminAllFuc(query.value, current.value, pageSize.value)
    }
}


const handleAddSkill = async() => {
    if(nameSkill.value === ''){
        errorNameSkill.value = 'field cannot be left blank';
    }else{
        errorNameSkill.value = '';
        const isSuccess = await skillStore.addSkill(nameSkill.value);
        if(isSuccess){
            closeModal('#addSkillModal')
            nameSkill.value = ''
            await getSkillAdminAllFuc(query.value, current.value, pageSize.value)
        }else{
            
        }
    }
   
}

const handleGetData = (item) => {
    idSkill.value = item.id;
    status.value = item.isDelete;
    nameSkill.value = item.name;

}
const handleEditSkill = async() => {
    if(nameSkill.value === ''){
        errorNameSkill.value = 'field cannot be left blank';
    }else{
        errorNameSkill.value = '';
        const isSuccess =  await skillStore.updateSkill(idSkill.value,nameSkill.value,status.value)
        if(isSuccess){
            closeModal('#editSkillModal')
            nameSkill.value = ''
            await getSkillAdminAllFuc(query.value, current.value, pageSize.value)
            Swal.fire({
                title: 'Edit Skill Job!',
                text: 'Success',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }else{
            Swal.fire({
                title: 'Edit Skill Job!',
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }
}

const resetData = () => {
    idSkill.value = null;
    status.value = null;
    nameSkill.value = ''
    errorNameSkill.value = ''
}

</script>

<template>
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 mb-0 fw-bold text-primary">Skill Job</h4>
                <div class="mb-4 d-flex">
                    <div class="col-4">
                        <input class="form-control form-control-md" type="text" placeholder="Search..." v-model="query"
                            @input="handleSearch" aria-label=".form-control-md example">
                    </div>
                    <div class="ms-auto">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSkillModal">
                            <i class="fa-solid fa-plus me-2"></i> Skill Job
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                               
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in skillList">
                               
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ !item.isDelete }}</td>
                              
                                <td>
                                    <div class="w-75 d-flex gap-1" role="">
                                        <!-- <a class="btn btn-sm btn-warning mx-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a> -->
                                        <!-- <button v-if="item.status === 0" type="button"
                                            class="btn btn-sm btn-primary mx-1">
                                            <i class="fa-solid fa-check"></i>
                                        </button> -->
                                        <button v-if="item.isDelete === false" type="button" @click="handleUpdate(item,true)"
                                            class="btn btn-sm btn-danger mx-1">
                                            <i class="fa-solid fa-lock"></i>
                                        </button>
                                        <button v-else-if="item.isDelete === true" type="button" @click="handleUpdate(item,false)"
                                            class="btn btn-sm btn-success mx-1">
                                            <i class="fa-solid fa-unlock"></i>
                                        </button>
                                        <button type="button" @click="handleGetData(item)" data-bs-toggle="modal" data-bs-target="#editSkillModal"
                                            class="btn btn-sm btn-warning mx-1">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                     
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="pagination d-flex justify-content-center">
                    <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" show-less-items  :showSizeChanger="false" />
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addSkillModal" tabindex="-1" aria-labelledby="addSkillModalLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-bottom border-1">
                    <h5 class="modal-title pb-0 fw-bold text-primary" id="addSkillModalLabel">Add New Skill</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="resetData()"></button>
                </div>
                <div class="modal-body">
                    <form>                    
                        <div class="mb-3">
                            <label for="nameSkill" class="form-label">Name Skill</label>
                            <input v-model="nameSkill" type="text" class="form-control" id="nameSkill" name="nameSkill"  >
                            <span class="text-danger">{{ errorNameSkill }}</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary mx-3" @click="handleAddSkill" >Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  @click="resetData()">Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editSkillModal" tabindex="-1" aria-labelledby="editSkillModalLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-bottom border-1">
                    <h5 class="modal-title pb-0 fw-bold text-primary" id="editSkillModalLabel">Edit Skill</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="resetData()"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="idSkill" class="form-label">Id Skill</label>
                            <input readonly v-model="idSkill" type="text" class="form-control" id="nameSkill" name="nameSkill"  >
                        </div>
                        <div class="mb-3">
                            <label for="nameSkill" class="form-label">Name Skill</label>
                            <input v-model="nameSkill" type="text" class="form-control" id="nameSkill" name="nameSkill"  >
                            <span class="text-danger">{{ errorNameSkill }}</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary mx-3" @click="handleEditSkill" >Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetData()">Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>