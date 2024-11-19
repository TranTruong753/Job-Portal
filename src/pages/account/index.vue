<script setup>
import NavAccount from "@/components/account/navAccount.vue";
import { useAuthStore } from '@/stores/auth.js';

   
const authStore = useAuthStore();



</script>

<template>

    <section class="section-5 bg-2">
        <div class="container py-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class=" rounded-3 p-3 mb-4">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Account Settings</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="card border-0 shadow mb-4 p-3">
                        <div class="s-body text-center mt-3">
                            <img src="/src/assets/img/avatar7.png" alt="avatar" class="rounded-circle img-fluid"
                                style="width: 150px;">
                            <h5 class="mt-3 pb-0 mb-2 fs-4">{{authStore.fullname}}</h5>
                            <!-- <p class="text-muted mb-1 fs-6">Full Stack Developer</p> -->
                            <div class="d-flex justify-content-center mb-2">
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button"
                                    class="btn btn-primary">Change Profile Picture</button>
                            </div>
                        </div>
                    </div>
                    <div class="card account-nav border-0 shadow mb-4 mb-lg-0">
                        <div class="card-body p-0">
                            <NavAccount :cardData="{
                                content: [
                                    {
                                        id: 11,
                                        titleNav: 'Account Settings',
                                        linkNav: '/account',
                                        isShow: true,

                                    },
                                    {
                                        id: 2,
                                        titleNav: 'My Profile',
                                        linkNav: '/account/profile',
                                        isShow: authStore.role === 'User',
                                    },
                                    {
                                        id: 3,
                                        titleNav: 'My Profile Employer',
                                        linkNav: '/account/profile-employer',
                                        isShow: authStore.role === 'Employer',
                                    },
                                    {
                                        id: 4,
                                        titleNav: 'Post a Job',
                                        linkNav: '/account/post-job',
                                        isShow: authStore.role === 'Employer',
                                    },
                                    {
                                        id: 5,
                                        titleNav: 'Post a Blog',
                                        linkNav: '/account/post-blog',
                                        isShow: true,
                                    },
                                    {
                                        id: 6,
                                        titleNav: 'My Jobs',
                                        linkNav: '/account/my-jobs',
                                        isShow: authStore.role === 'Employer',
                                    },
                                    {
                                        id: 7,
                                        titleNav: 'Jobs Applied',
                                        linkNav: '/account/jobs-applied',
                                        isShow: authStore.role === 'User',
                                    },
                                    {
                                        id: 8,
                                        titleNav: 'Saved Jobs',
                                        linkNav: '/account/saved-jobs',
                                        isShow: authStore.role === 'User',   
                                    },
                                    {
                                        id: 9,
                                        titleNav: 'Create CV test',
                                        linkNav: '/account/create-cv-test',
                                        isShow: true,
                                    },
                                    {
                                        id: 10,
                                        titleNav: 'Create CV',
                                        linkNav: '/account/create-cv',
                                        isShow: true,
                                    },
                                ]
                            }" /> 
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <router-view></router-view>
                </div>

            </div>
        </div>
    </section>

    <!-- Modal -->   
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title pb-0" id="exampleModalLabel">Change Profile Picture</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Profile Image</label>
                            <input type="file" class="form-control" id="image" name="image">
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary mx-3">Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    
    

</template>

<style>
    .text-danger {
    display: block;
    height: 24px;
    padding: 8px 0;
    font-size: 13px;
}

textarea {
        height: 17vh !important; 
        resize: none;
    }


.password-toggle-different {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);

}

.input__repassword, .input__password {
    position: relative;
}
</style>