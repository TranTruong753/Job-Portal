<script setup>
    import { useDataCvStore } from '@/stores/cv';
    import { useForm, useField } from 'vee-validate';
    import { formatDate, closeModal } from '@/assets/js/jsUtils';
    import * as yup from 'yup';

    const schema = yup.object({
        certificateName: yup.string().required('Name of Degree or Certificate is required'),
        nameTrainingCenter: yup.string().required('Name School or Training Center is required'),
        startDate: yup
            .date()
            .required('Start Date is required')
            .max(new Date(), 'Start Date must not be in the future'), // Kiểm tra ngày bắt đầu <= ngày hiện tại
        endDate: yup
            .date()
            .min(yup.ref('startDate'), 'End Date must be after Start Date') // Kiểm tra ngày kết thúc >= ngày bắt đầu
            .max(new Date(), 'End Date must not be in the future'), // Kiểm tra ngày kết thúc <= ngày hiện tại
    });


    const { handleSubmit, resetForm } = useForm({
        validationSchema: schema,
    });

    const { value: certificateName, errorMessage: certificateNameError } = useField('certificateName');
    const { value: nameTrainingCenter, errorMessage: nameTrainingCenterError } = useField('nameTrainingCenter');
    const { value: startDate, errorMessage: startDateError } = useField('startDate');
    const { value: endDate, errorMessage: endDateError } = useField('endDate');

    const storeDataCv = useDataCvStore();

    const certificate = "certificate";

    // Hàm submit form
    const onSubmit = handleSubmit((values) => {
        // Lưu dữ liệu vào store
        storeDataCv.addItem({ ...values }, certificate);
        console.log("datas", storeDataCv.datas[certificate]);

        closeModal('#certificateModal')

        resetForm();

    });


    const handleClick = (index) => {
        console.log('Index của phần tử con được nhấp:', index);
        // Bạn có thể làm gì đó với index này
    }

    const deleteItem = (index) => {
        //  modalStore.deleteItem(index);
        storeDataCv.deleteItemByIndex(certificate, index);
    }

    const deleteForm = () => {
        resetForm();
    }
</script>

<template>
    <!-- certificate -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Certificate</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#certificateModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 " v-if="storeDataCv.datas[certificate].length"
                    v-for="(item, index) in storeDataCv.datas[certificate]" :key="index">
                    <div class="mb-0 " @click="handleClick(index)">
                        <div class="d-flex gap-3 align-items-center">
                            <span class="rounded-circle bg-1" style="height: 13px; width: 13px;"></span>
                            <p class="m-0 small text-black-50 fst-italic">{{ formatDate(item.startDate) }} -
                                {{ item.endDate ? formatDate(item.endDate) : 'indefinitely' }} </p>
                        </div>
                        <div class="mx-1 mt-3 border-2 border-start pb-3 ps-3">
                            <h5 class="p-0 lh-base mb-2 text-uppercase text-primary">{{ item.certificateName }}</h5>
                            <p class="fs-6 p-0 m-0 lh-base mb-2">
                                <b>School/Training Center</b>: {{ item.nameTrainingCenter }}
                            </p>
            
                            <div class="mt-3 d-flex align-items-center gap-3">
                                <!-- <a href="#!" class="p-1"> <i class="fs-5 fa-solid fa-pen text-warning"></i></a> -->
                                <a href="#!" class="p-1" @click="deleteItem(index)"><i
                                        class="fs-5 fa-solid fa-trash text-danger"></i></a>
                            </div>
                            <span class="mt-3 d-block border-bottom border-1"></span>

                        </div>
                    </div>

                </div>
                <div class="p-3 " v-else>
                    <p class="card-text">you often add certificate</p>
                </div>
            </div>
        </div>
    </div>

     <!-- modal certificate -->
     <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="certificateModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="certificateModalLabel">Certificate</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="deleteForm()"></button>
                </div>
                <div class="modal-body">
                    <form  @submit.prevent="onSubmit" id="formCertificate">
                        <div class="row g-3 ">
                            <div class=" col-lg-6">
                                <label for="certificateName" class="mb-2">Certificate Name<span class="text-primary">*</span></label>
                                <input id="certificateName" v-model="certificateName" type="text" placeholder="Certificate Name...." class="form-control">
                                 <span class="text-danger">{{ certificateNameError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="nameTrainingCenter" class="mb-2">School/Training Center<span class="text-primary">*</span></label>
                                <input id="nameTrainingCenter" v-model="nameTrainingCenter" type="text" placeholder="School/Training Center...." class="form-control">
                                 <span class="text-danger">{{ nameTrainingCenterError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="startDate" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input id="startDate" v-model="startDate" type="date" placeholder="not updated" class="form-control">
                                 <span class="text-danger">{{ startDateError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="endDate" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input id="endDate"  v-model="endDate" type="date" placeholder="not updated" class="form-control">
                                 <span class="text-danger">{{ endDateError }}</span>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteForm()">Close</button>
                    <button type="submit" class="btn btn-primary" form="formCertificate">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>