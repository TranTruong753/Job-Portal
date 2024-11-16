<script setup>
    import { useDataCvStore } from '@/stores/cv';
    import { jsPDF } from 'jspdf'; // Import jsPDF
    import { useForm, useField } from 'vee-validate';
    import { formatDate, closeModal } from '@/assets/js/jsUtils';
    import * as yup from 'yup';


    const schema = yup.object({
        jobTitle: yup.string().required('Job Title is required'),
        companyName: yup.string().required('Company Name is required'),
        startDate: yup
            .date()
            .required('Start Date is required')
            .max(new Date(), 'Start Date must not be in the future'), // Kiểm tra ngày bắt đầu <= ngày hiện tại
        endDate: yup
            .date()
            .required('End Date is required')
            .min(yup.ref('startDate'), 'End Date must be after Start Date') // Kiểm tra ngày kết thúc >= ngày bắt đầu
            .max(new Date(), 'End Date must not be in the future'), // Kiểm tra ngày kết thúc <= ngày hiện tại
        description: yup.string(),
    });


    const { handleSubmit, resetForm } = useForm({
        validationSchema: schema,
    });

    const { value: jobTitle, errorMessage: jobTitleError } = useField('jobTitle');
    const { value: companyName, errorMessage: companyNameError } = useField('companyName');
    const { value: startDate, errorMessage: startDateError } = useField('startDate');
    const { value: endDate, errorMessage: endDateError } = useField('endDate');
    const { value: description, errorMessage: descriptionError } = useField('description');

    const storeDataCv = useDataCvStore();

    const workexperience = "workexperience";

    // Hàm submit form
    const onSubmit = handleSubmit((values) => {
        // Lưu dữ liệu vào store
        storeDataCv.addItem({ ...values }, workexperience);
        console.log("datas", storeDataCv.datas[workexperience]);

        closeModal('#workExperienceModal')

        resetForm();

    });


    const handleClick = (index) => {
        console.log('Index của phần tử con được nhấp:', index);
        // Bạn có thể làm gì đó với index này
    }

    const deleteItem = (index) => {
        //  modalStore.deleteItem(index);
        storeDataCv.deleteItemByIndex(workexperience, index);
    }

    // Hàm tạo CV và xuất file PDF
    const generateCV = () => {
        const doc = new jsPDF();

        // Thêm tiêu đề CV
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Curriculum Vitae', 20, 20);

        // Duyệt qua các mục trong modalStore.items và thêm vào PDF
        let yPosition = 30;
        storeDataCv.datas[workexperience].forEach((item) => {
            doc.setFontSize(14);
            doc.text(item.title, 20, yPosition); // Thêm tiêu đề
            yPosition += 10;
            doc.setFontSize(12);
            doc.text(item.description, 20, yPosition); // Thêm mô tả
            yPosition += 20; // Dịch xuống cho mục tiếp theo
        });

        // Xuất file PDF
        doc.save('cv.pdf');
    };

</script>

<template>
    <!-- work experience -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Work experience</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#workExperienceModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 " v-if="storeDataCv.datas[workexperience].length"
                    v-for="(item, index) in storeDataCv.datas[workexperience]" :key="index">
                    <!-- <p class="card-text">you often add demo</p> -->
                    <div class="mb-0 " @click="handleClick(index)">
                        <div class="d-flex gap-3 align-items-center">
                            <span class="rounded-circle bg-1" style="height: 13px; width: 13px;"></span>
                            <p class="m-0 small text-black-50 fst-italic">{{ formatDate(item.startDate) }} -
                                {{ formatDate(item.endDate) }} </p>
                        </div>
                        <div class="mx-1 mt-3 border-2 border-start pb-3 ps-3">
                            <h5 class="p-0 lh-base mb-2 text-uppercase text-primary">{{ item.jobTitle }}</h5>
                            <p class="fs-6 p-0 m-0 lh-base mb-2">
                                <b>Company</b>: {{ item.companyName }}
                            </p>
                            <p class="fs-6  p-0 m-0 lh-base truncate-3"><b>Description</b>: <span class="fst-italic ">{{
                                    item.description }}</span></p>
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
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="workExperienceModal" tabindex="-1" aria-labelledby="workExperienceModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="workExperienceModalLabel">Work experience</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="onSubmit" id="formWorkExperience">
                        <div class="row g-3 ">
                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Job Title/Position<span class="text-primary">*</span></label>
                                <input v-model="jobTitle" type="text" placeholder="Job Title or Position...."
                                    class="form-control">
                                <span class="text-danger">{{ jobTitleError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Company Name<span class="text-primary">*</span></label>
                                <input v-model="companyName" type="text" placeholder="Company Name...."
                                    class="form-control">
                                <span class="text-danger">{{ companyNameError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input v-model="startDate" type="date" placeholder="not updated" class="form-control">
                                <span class="text-danger">{{ startDateError }}</span>
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control" v-model="endDate">
                                <span class="text-danger">{{ endDateError }}</span>
                            </div>

                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 22vh; resize: none;" v-model="description"></textarea>
                                <span class="text-danger">{{ descriptionError }}</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="submitWork" fqorm="formWorkExperience" type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Create CV Button -->
    <!-- <button @click="generateCV" class="btn btn-success">Create CV</button> -->
</template>



