<script setup>
import '@/assets/admin/css/bootstrap.css'
import '@/assets/admin/css/style.css'

import navAdmin from '@/components/admin/navAdmin.vue';
import sidebarAdmin from '@/components/admin/sidebarAdmin.vue';
import footerAdmin from '@/components/admin/footerAdmin.vue';

import { ref } from 'vue';


// Trạng thái để điều khiển mở/đóng
const isContentOpen = ref(false);

// Hàm toggle trạng thái
const toggleContent = () => {
    isContentOpen.value = !isContentOpen.value;
};
</script>

<template>
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <sidebarAdmin  :isContentOpen="isContentOpen"></sidebarAdmin>

        <div :class="{ content: true, open: isContentOpen }">
            <!-- Navbar Start -->
            <navAdmin :isContentOpen="isContentOpen" @toggleContent="toggleContent"></navAdmin>
            <!-- Navbar End -->

            <!-- Content -->
            <div class="container-fluid pt-4">
                <router-view></router-view>
            </div>

            <footerAdmin></footerAdmin>

        </div>
    </div>

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
</template>