<script setup>
import { onBeforeMount,onMounted, ref, watch } from 'vue';
import {getCookie } from '@/assets/js/cookieUtils.js'
import { useCompanyStore } from '@/stores/company';
import { convertToUrlV2,closeModal } from '@/assets/js/jsUtils';

import {useLocationStore} from '@/stores/locationStore';
import { useAuthStore } from '@/stores/auth.js';
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
const handleLogout = () => {
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
};






</script>

<template>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow py-3">
        <div class="container">
          <!-- Thay thế bằng router-link -->
          <router-link class="navbar-brand" to="/">CareerVibe</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-between" id="main_nav">
            <ul class="navbar-nav ms-0 ms-sm-0 me-auto mb-2 mb-lg-0 ms-lg-4">
              <li class="nav-item active">
                <router-link class="nav-link" to="/home">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/job">Find Job</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/company">Company</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/blog">Blog</router-link>
              </li>
              <li v-if="authStore.role==='Admin'" class="nav-item">
                <!-- <router-link to="/admin/home" class="nav-link btn btn-outline-primary text-primary" >Admin</router-link> -->
                <a href="/admin/home" class="nav-link btn btn-outline-primary text-primary" >Admin</a>
              </li>

  
              <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More items</a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">Dropdown item 1 &rtrif;</a>
                    <ul class="submenu dropdown-menu">
                      <li><a class="dropdown-item" href="#">Submenu item 1</a></li>
                      <li><a class="dropdown-item" href="#">Submenu item 2</a></li>
                      <li><a class="dropdown-item" href="#">Submenu item 3</a></li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Dropdown item 2 &rtrif;</a>
                    <ul class="submenu dropdown-menu">
                      <li><a class="dropdown-item" href="#">Another submenu 1</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 2</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 3</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 4</a></li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Dropdown item 3 &rtrif;</a>
                    <ul class="submenu dropdown-menu">
                      <li><a class="dropdown-item" href="#">Another submenu 1</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 2</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 3</a></li>
                      <li><a class="dropdown-item" href="#">Another submenu 4</a></li>
                    </ul>
                  </li>
                </ul>
              </li> -->
            </ul>
  
            <!-- đã đăng nhập -->
            <div v-if="authStore.isAuthenticated " class="w-25 ms-sm-0 ps-xxl-5 ps-xl-3 ps-lg-1">
              <div class="d-none dropdown d-lg-flex align-items-center gap-3 justify-content-lg-end">
                <!-- <a href="#!" class="fs-5">
                  <i class="fa-solid fa-bell"></i>
                </a> -->
                <button class="p-0 btn border-0 bg-transparent dropdown-toggle d-flex align-items-center gap-2" 
                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="20,20">
                  <img class="object-fit-cover img-thumbnail rounded-circle" style="width: 3rem;height: 3rem" :src="authStore.urlImg || img"
                    alt="avatar7" />
                 
                </button>
  
                <ul class="dropdown-menu mt-2 end-0" style="    min-width: 16rem;">
                  <li class=" p-0 overflow-hidden border-bottom ">
                    <div
                      class=" d-flex flex-lg-column flex-xl-row align-items-xl-center  align-items-lg-start gap-2 p-0 m-2  overflow-hidden">
                      <img class=" d-none d-xl-block object-fit-cover img-thumbnail rounded-circle" style="width: 3rem;height: 3rem;" :src="authStore.urlImg || img"
                        alt="avatar7" />
                      <span class="ps-2 ps-xl-0 ">{{ authStore.fullname }}</span>
                    </div>
                  </li>
                  <li  class="py-1">
                    <router-link class="dropdown-item" to="/account">Account Setting</router-link>
                  </li>
                  <!-- <li>
                    <router-link class="dropdown-item" to="/account/post-blog">Post a Blog</router-link>
                  </li> -->
                  <!-- <li class="py-1">
                    <router-link class="dropdown-item" to="/account/create-cv">Create CV</router-link>
                  </li> -->
                  <li class="py-1">
                    <router-link class="dropdown-item text-primary" @click="handleLogout" to="/home">Log out</router-link>

                  </li>
                </ul>
              </div>
             
            </div>
            <div v-if="authStore.isAuthenticated " class="d-lg-none d-block">
              <div 
                  class=" d-flex flex-lg-column flex-xl-row t align-items-center gap-2 p-0 m-2 border-top border-1 pt-3">
                  <img class="object-fit-cover img-thumbnail rounded-circle" style="width: 3rem;height: 3rem;" :src="authStore.urlImg || img"
                    alt="avatar7" />
                  <span class="small">{{ authStore.fullname }}</span>
                  
              </div>
              <ul class=" mb-2 mb-lg-0 ms-lg-4 m-2">
                <li class=" active small p-1">
                  <router-link class="dropdown-item " to="/account">Account Setting</router-link>
                </li>
                <!-- <li class=" small p-1">
                  <router-link class="dropdown-item" to="/account/create-cv">Create CV</router-link>
                </li> -->
                <li class=" small p-1">
                  <router-link class="btn btn-primary w-25  dropdown-item " @click="handleLogout" to="/home">Log out</router-link>
                </li>
    
              
            </ul>
                
            </div>
            <!-- chưa đăng nhập -->
           <div v-else>
              <router-link class="btn btn-outline-primary me-2" to="/login">Login</router-link>
              <router-link class="btn btn-primary" to="/register-employers">For Employers</router-link>
           </div>
        
                  

          </div> <!-- navbar-collapse.// -->
        </div> <!-- container-fluid.// -->
      </nav>
    </header>
  </template>




