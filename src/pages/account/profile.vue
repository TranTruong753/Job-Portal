<script setup>
import NavAccount from "@/components/account/navAccount.vue";

import { useAuthStore } from '@/stores/auth.js';

import {onMounted, reactive} from 'vue'


const authStore = useAuthStore();

onMounted(()=>{
     authStore.getUserData();
     userObj.birthday = authStore.userData.birthday;
     userObj.sex = authStore.userData.sex;
     userObj.phone = authStore.userData.phone;
     userObj.img = authStore.userData.img;
     if(authStore.userData.address){

     }
})

const userObj = reactive({
    fullname: authStore.fullname,
    email: authStore.email,
    birthday: '',
    sex: '',
    phone: '',
    img: '',
})

</script>

<template>

    <!-- Personal Information -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">Personal Information</h3>
            <div class="pt-0 row g-3">
                <div class="col-lg-6">
                    <label for="fullname" class="mb-2">Full Name<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Name" class="form-control" id="fullname" v-model="userObj.fullname">
                </div>
                <div class="col-lg-6">
                    <label for="email" class="mb-2">Email<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Email" id="email" v-model="userObj.email" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="birthday" class="mb-2">Date of Birth<span class="text-primary">*</span></label>
                    <input id="birthday" type="date" placeholder="Designation" class="form-control" v-model="userObj.birthday" >
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Sex<span class="text-primary">*</span></label>
                    <div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                value="Men" v-model="userObj.sex">
                            <label class="form-check-label" for="inlineRadio1">Men</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value="Women" v-model="userObj.sex">
                            <label class="form-check-label" for="inlineRadio2">Women</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                                value="Other" v-model="userObj.sex">
                            <label class="form-check-label" for="inlineRadio3">Other</label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Phone<span class="text-primary">*</span></label>
                    <input v-model="userObj.phone" type="text" placeholder="not update" class="form-control">
                </div>
            </div>

        </div>
        <div class="card-footer p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div>
    </div>

    <!-- General information-->
    <!-- <div class="card border-0 shadow mb-4">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">General Information</h3>
            <div class="row g-3 pt-0">
                <div class=" col-lg-12">
                    <label for="" class="mb-2">Career Objective<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Desired Position<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Desired Job Level<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Education<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Experience<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Desired Location<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Expected Salary<span class="text-primary">*</span></label>
                    <input type="text" placeholder="---" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Work Location<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Work Type<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>

                <div class=" col-lg-6">
                    <label for="" class="mb-2">Job<span class="text-primary">*</span></label>
                    <input type="text" placeholder="not updated" class="form-control">
                </div>
            </div>
        </div>
        <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div>
    </div> -->

    <!-- item demo -->
    <!-- <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Demo</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#demoModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 ">

                    <div class="mb-3 ">
                        <div class="d-flex gap-3 align-items-center">
                            <span class="rounded-circle bg-1" style="height: 13px; width: 13px;"></span>
                            <p class="m-0 small text-black-50 fst-italic">31/08/2023 - 09/09/2024 </p>
                        </div>
                        <div class="mx-1 mt-3 border-2 border-start pb-3 ps-3">
                            <h5 class="p-0 lh-base">Titile</h5>
                            <p class="fs-6 p-0 m-0 lh-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quidem?
                            </p>
                            <p class="fs-6 fst-italic p-0 m-0 lh-base">Lorem ipsum dolor sit amet.</p>
                            <div class="mt-2 d-flex align-items-center gap-3">
                                <a href="#!" class="p-1"> <i class="fs-5 fa-solid fa-pen text-warning"></i></a>
                                <a href="#!" class="p-1"><i class="fs-5 fa-solid fa-trash text-danger"></i></a>
                            </div>
                            <span class="mt-3 d-block border-bottom border-1"></span>

                        </div>
                    </div>

                    <div class="mb-3 ">
                        <div class="d-flex gap-3 align-items-center">
                            <span class="rounded-circle bg-1" style="height: 13px; width: 13px;"></span>

                            <p class="m-0 small text-black-50 fst-italic">31/08/2023 - 09/09/2024 </p>
                        </div>
                        <div class="mx-1 mt-3 border-2 border-start pb-3 ps-3">
                            <h5 class="p-0 lh-base">Titile</h5>
                            <p class="fs-6 p-0 m-0 lh-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quidem?
                            </p>
                            <p class="fs-6 fst-italic p-0 m-0 lh-base">Lorem ipsum dolor sit amet.</p>
                            <div class="mt-2 d-flex align-items-center gap-3">
                                <a href="#!" class="p-1"> <i class="fs-5 fa-solid fa-pen text-warning"></i></a>
                                <a href="#!" class="p-1"><i class="fs-5 fa-solid fa-trash text-danger"></i></a>
                            </div>
                            <span class="mt-3 d-block border-bottom border-1"></span>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div> -->

    <!-- work experience -->
    <!-- <div class="card border-0 shadow mb-4  ">
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
                <div class="p-3 ">
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- educational information -->
    <!-- <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Educational Information</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#educationalInformationModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 ">
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- certificate -->
    <!-- <div class="card border-0 shadow mb-4  ">
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
                <div class="p-3 ">
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Specialized skills -->
    <!-- <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-0">
            <div class="d-flex align-items-sm-start justify-content-between ps-4 pe-2 pt-2 ">
                <h3 class="mt-3 fs-4 mb-1 pb-0">Specialized skills</h3>
                <button class="btn btn-primary rounded-circle btn " type="button" data-bs-toggle="modal"
                    data-bs-target="#specializedSkillsModal">
                    <i class="fa-solid fa-pen d-none"></i>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="m-3 border border-2">
                <div class="p-3 ">
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Other skills -->
    <!-- <div class="card border-0 shadow mb-4  ">
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
                    <p class="card-text">you often add work experience</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- modal -->
    <!-- modal demo -->
    <!-- <div class="modal fade" id="demoModal" tabindex="-1" aria-labelledby="demoModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="demoModalLabel">Demo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">input 1<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 2<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 3<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- modal Work experience  -->
    <!-- <div class="modal fade" id="workExperienceModal" tabindex="-1" aria-labelledby="workExperienceModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="workExperienceModalLabel">Work experience</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">Job Title/Position<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-12">
                                <label for="" class="mb-2">Company Name<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- modal Educational Information -->
    <!-- <div class="modal fade" id="educationalInformationModal" tabindex="-1"
        aria-labelledby="educationalInformationModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="educationalInformationModalLabel">Educational Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">Name of Degree/Certificate<span
                                        class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Training major<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">School/Training Center<span
                                        class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- modal certificate -->
    <!-- <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="certificateModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="certificateModalLabel">Certificate</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">input 1<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 2<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 3<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Specialized skills -->
    <!-- <div class="modal fade" id="specializedSkillsModal" tabindex="-1" aria-labelledby="specializedSkillsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="specializedSkillsModalLabel">Specialized skills</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">input 1<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 2<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 3<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Other skills -->
    <!-- <div class="modal fade" id="otherSkillsModal" tabindex="-1" aria-labelledby="otherSkillsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 p-0" id="otherSkillsModalLabel">Other skills</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row g-3 ">
                            <div class=" col-lg-12">
                                <label for="" class="mb-2">input 1<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 2<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">input 3<span class="text-primary">*</span></label>
                                <input type="text" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">Start Date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>

                            <div class=" col-lg-6">
                                <label for="" class="mb-2">End date<span class="text-primary">*</span></label>
                                <input type="date" placeholder="not updated" class="form-control">
                            </div>


                            <div class=" col-lg-12">
                                <label for="" class="mb-2"> More Description <span class="text-primary">*</span></label>
                                <textarea class="form-control" placeholder="Leave a Description here" id=""
                                    style="height: 200px; resize: none;"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

</template>