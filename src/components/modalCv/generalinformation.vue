<script setup>
    import { useDataCvStore } from '@/stores/cv';
    import { useForm, useField } from 'vee-validate';
    import { formatDate, closeModal } from '@/assets/js/jsUtils';
    import * as yup from 'yup';

    const schema = yup.object({
        careerObj: yup.string().required('Career Obj is required'),
        desiredPosition: yup.string().required('Desired Position is required'),
        jobLevel: yup.string().required('Job Level is required'),
        education: yup.string().required('Education is required'),
        experience: yup.string().required('Experience is required'),
        desiredLocation: yup.string().required('Desired Location is required'),
     
        expectedSalary: yup.string().required('Expected Salary is required'),
        workLocation: yup.string().required('Work Location is required'),
        workType: yup.string().required('Work Type is required'),
        job: yup.string().required('job is required'),
    
    });


    const { handleSubmit, resetForm } = useForm({
        validationSchema: schema,
    });

   


    const { value: careerObj, errorMessage: careerObjError } = useField('careerObj');
    const { value: desiredPosition, errorMessage: desiredPositionError } = useField('desiredPosition');
    const { value: jobLevel, errorMessage: jobLevelError } = useField('jobLevel');
    const { value: education, errorMessage: educationError } = useField('education');
    const { value: experience, errorMessage: experienceError } = useField('experience');
    const { value: desiredLocation, errorMessage: desiredLocationError } = useField('desiredLocation');
    const { value: expectedSalary, errorMessage: expectedSalaryError } = useField('expectedSalary');
    const { value: workLocation, errorMessage: workLocationError } = useField('workLocation');
    const { value: workType, errorMessage: workTypeError } = useField('workType');
    const { value: job, errorMessage: jobError } = useField('job');
  

    const storeDataCv = useDataCvStore();

    const educationalInformation = "educationalInformation";

    // Hàm submit form
    const onSubmit = handleSubmit((values) => {
        // Lưu dữ liệu vào store
        storeDataCv.addItem({ ...values }, educationalInformation);
        console.log("datas", storeDataCv.datas[educationalInformation]);

        closeModal('#educationalInformationModal')

        resetForm();

    });


    const handleClick = (index) => {
        console.log('Index của phần tử con được nhấp:', index);
        // Bạn có thể làm gì đó với index này
    }

    const deleteItem = (index) => {
        //  modalStore.deleteItem(index);
        storeDataCv.deleteItemByIndex(educationalInformation, index);
    }

    const deleteForm = () => {
        resetForm();
    }
</script>

<template>
    <div class="card border-0 shadow mb-4">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">General Information</h3>
            <div class="row g-3 pt-0">

                <div class=" col-lg-6">
                    <label for="desiredPosition" class="mb-2">Desired Position<span class="text-primary">*</span></label>
                    <input id="desiredPosition" v-model="desiredPosition" type="text" placeholder="Desired Position ..." class="form-control">
                    <span class="text-danger">{{ desiredPositionError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="jobLevel" class="mb-2">Job Level<span class="text-primary">*</span></label>
                    <input id="jobLevel" v-model="jobLevel" type="text" placeholder="Job level ..." class="form-control">
                    <span class="text-danger">{{ jobLevelError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="education" class="mb-2">Education Level<span class="text-primary">*</span></label>
                    <input id="education" v-model="education" type="text" placeholder="Education Level ..." class="form-control">
                    <span class="text-danger">{{ educationError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="experience" class="mb-2">Work Experience<span class="text-primary">*</span></label>
                    <input id="experience" v-model="experience" type="text" placeholder="Work Experience..." class="form-control">
                    <span class="text-danger">{{ experienceError }}</span>
                  </div>

                <!-- <div class=" col-lg-6">
                    <label for="desiredLocation" class="mb-2">Desired Location<span class="text-primary">*</span></label>
                    <input id="desiredLocation" v-model="desiredLocation" type="text" placeholder="not updated" class="form-control">
                    <span class="text-danger">{{ desiredLocationError }}</span>
                  </div> -->

                <div class=" col-lg-6">
                    <label for="expectedSalary" class="mb-2">Expected Salary<span class="text-primary">*</span></label>
                    <input id="expectedSalary" v-model="expectedSalary" type="number" placeholder="---" class="form-control">
                    <span class="text-danger">{{ expectedSalaryError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="workLocation" class="mb-2">Workplace<span class="text-primary">*</span></label>
                    <input id="workLocation" v-model="workLocation" type="text" placeholder="Workplace ..." class="form-control">
                    <span class="text-danger">{{ workLocationError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="workType" class="mb-2">Form of work<span class="text-primary">*</span></label>
                    <input id="workType" v-model="workType" type="text" placeholder="Form of work..." class="form-control">
                    <span class="text-danger">{{ workTypeError }}</span>
                  </div>

                <div class=" col-lg-6">
                    <label for="job" class="mb-2">Job<span class="text-primary">*</span></label>
                    <input v-model="job" id="job" type="text" placeholder="Job ..." class="form-control">
                    <span class="text-danger">{{ jobError }}</span>
                </div>

                <div class=" col-lg-12">
                    <label for="careerObj" class="mb-2">Career Objective<span class="text-primary">*</span></label>
                    <textarea  style="height: 22vh; resize: none;" id="careerObj" v-model="careerObj" type="text" placeholder="Career Objective" class="form-control"></textarea>
                    <span class="text-danger">{{ careerObjError }}</span>
                </div>

            </div>
        </div>
        
        
        <!-- <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div> -->
    </div>
</template>