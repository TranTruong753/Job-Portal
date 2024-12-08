<script setup>
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount,onMounted, ref, watch } from 'vue';
import {getCookie } from '@/assets/js/cookieUtils.js'
import { useCompanyStore } from '@/stores/company';
import { convertToUrlV2,closeModal } from '@/assets/js/jsUtils';
import {useLocationStore} from '@/stores/locationStore';
import { useRouter } from 'vue-router';
import { useJobtore } from '@/stores/jobs';
import { useSkillStore } from '@/stores/skill';
   

const router = useRouter(); // Sử dụng router
const authStore = useAuthStore();
const img = ref('/src/assets/img/avatar7.png');
const locationStore = useLocationStore();
const companyStore = useCompanyStore();
const jobStore = useJobtore();
const skills = useSkillStore();
const handleLogOut = () => {
    try {
    authStore.logout();
    locationStore.$reset();
    companyStore.$reset();
    jobStore.$reset();
    skills.$reset();
    // authStore.$reset();
    // router.push('/home');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

// Phát sự kiện toggleContent khi nhấn nút
const emit = defineEmits(['toggleContent']);


</script>

<template>
    <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <router-link to="/admin/home" class="navbar-brand d-flex d-lg-none me-4">
            <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
        </router-link>
        <a href="#" class="sidebar-toggler flex-shrink-0" @click="emit('toggleContent')">
            <i class="fa fa-bars"></i>
        </a>
        <!-- <form class="d-none d-md-flex ms-4">
            <input class="form-control border-0" type="search" placeholder="Search">
        </form> -->
        <div class="navbar-nav align-items-center ms-auto">
            <!-- <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="fa fa-envelope me-lg-2"></i>
                    <span class="d-none d-lg-inline-flex">Message</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/src/assets/admin/img/user.jpg" alt="" style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/src/assets/admin/img/user.jpg" alt="" style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/src/assets/admin/img/user.jpg" alt="" style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item text-center">See all message</a>
                </div>
            </div> -->
            <!-- <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="fa fa-bell me-lg-2"></i>
                    <span class="d-none d-lg-inline-flex">Notificatin</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">Profile updated</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">New user added</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">Password changed</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item text-center">See all notifications</a>
                </div>
            </div> -->
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <img class="rounded-circle me-lg-2"  :src="authStore.urlImg||'/src/assets/admin/img/user.jpg'" alt="" style="width: 40px; height: 40px;">
                    <span class="d-none d-lg-inline-flex">{{authStore.fullname}}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                    <a href="/" class="dropdown-item" @click="handleLogOut">Log Out</a>
                </div>
            </div>
        </div>
    </nav>
</template>