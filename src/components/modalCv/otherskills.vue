<script setup>
    import { useDataCvStore } from '@/stores/cv';
    import { useForm, useField } from 'vee-validate';
    import { closeModal } from '@/assets/js/jsUtils';
    import * as yup from 'yup';

    const schema = yup.object({
        nameSkills: yup.string().required('Name skills is required'),
    });


    const { handleSubmit, resetForm } = useForm({
        validationSchema: schema,
    });

    const { value: nameSkills, errorMessage: nameSkillsError } = useField('nameSkills');

    const storeDataCv = useDataCvStore();

    const OtherSkills = "OtherSkills";

    // Hàm submit form
    const onSubmit = handleSubmit((values) => {
        // Lưu dữ liệu vào store
        storeDataCv.addItem({ ...values }, OtherSkills);
        console.log("datas", storeDataCv.datas[OtherSkills]);

        closeModal('#otherSkillsModal')

        resetForm();

    });


    const handleClick = (index) => {
        console.log('Index của phần tử con được nhấp:', index);
        // Bạn có thể làm gì đó với index này
    }

    const deleteItem = (index) => {
        //  modalStore.deleteItem(index);
        storeDataCv.deleteItemByIndex(OtherSkills, index);
    }

    const deleteForm = () => {
        resetForm();
    }
</script>

<template>

    <!-- Specialized skills -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Other skills</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#otherSkillsModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 ">
                    <div class="mb-0 " v-if="storeDataCv.datas[OtherSkills].length"
                    v-for="(item, index) in storeDataCv.datas[OtherSkills]" :key="index">
                       
                        <div class=" mx-1 mt-3 " @click="handleClick(index)" >
                            <div class="d-flex  align-items-center ">
                    
                                <span class="me-2">-</span>
                                <p class="fs-6 fw-bolder p-0 m-0 lh-base text-capitalize">{{ item.nameSkills }}</p>
                
                        
                                <a href="#!" class="ms-auto d-flex align-items-center p-0" @click="deleteItem(index)"><i
                                        class="fs-5 fa-solid fa-trash text-danger"></i></a>
                            </div>
                            <span class="mt-3 d-block border-bottom border-1"></span>
                                    
                        </div>
                        
                    </div>

                    <p class="card-text"  v-else>you often add specialized skills</p>

                </div>
              
            </div>
        </div>
    </div>

    <!-- Specialized skills -->
    <div class="modal fade" id="otherSkillsModal" tabindex="-1" aria-labelledby="otherSkillsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="otherSkillsModalLabel">Other skills</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="deleteForm()"></button>
                </div>
                <div class="modal-body">
                    <form id="formOtherSkills" @submit.prevent="onSubmit">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="nameSkills" class="mb-2">Name other skill<span class="text-primary">*</span></label>
                                <input id="nameSkills" v-model="nameSkills" type="text" placeholder="name skill..." class="form-control">
                                <span class="text-danger">{{ nameSkillsError }}</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  @click="deleteForm()">Close</button>
                    <button type="submit" class="btn btn-primary" form="formOtherSkills">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>