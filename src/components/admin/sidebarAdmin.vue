<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Nhận trạng thái từ component cha
const props = defineProps({
  isContentOpen: Boolean,
});

const route = useRoute();

const authStore = useAuthStore();

// Hàm kiểm tra đường dẫn hiện tại
const isActiveLink = (path) => route.path.startsWith(path);
</script>

<template>
  <div class="sidebar pe-4 pb-3" :class="{ sidebar: true, open: props.isContentOpen }">
    <nav class="navbar bg-light navbar-light">
      <router-link to="/admin/home" class="navbar-brand d-flex d-lg-none me-4">
        <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>DASHMIN</h3>
      </router-link>
      <div class="d-flex align-items-center ms-4 mb-4">
        <div class="position-relative">
          <!-- /src/assets/admin/img/user.jpg -->
          <img
            class="rounded-circle"
            :src="authStore.urlImg||'/src/assets/admin/img/user.jpg'"
            alt=""
            style="width: 40px; height: 40px;"
          />
          <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
        </div>
        <div class="ms-3">
          <h6 class="mb-0">{{authStore.fullname}}</h6>
          <span>Admin</span>
        </div>
      </div>
      <div class="navbar-nav w-100">
        <router-link
          to="/admin/home"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/home') }"
        >
          <i class="fa fa-home me-2"></i>Home
        </router-link>
        <router-link
          to="/admin/account"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/account') }"
        >
          <i class="fa-solid fa-user me-2"></i>Accounts
        </router-link>
        <router-link
          to="/admin/jobs"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/jobs') }"
        >
          <i class="fa-solid fa-briefcase me-2"></i>Jobs
        </router-link>
        <router-link
          to="/admin/company"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/company') }"
        >
          <i class="fa-solid fa-building me-2"></i>Companies
        </router-link>
        <router-link
          to="/admin/blog"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/blog') }"
        >
          <i class="fa-solid fa-blog me-2"></i>Blogs
        </router-link>
        <router-link
          to="/admin/skills"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/skills') }"
        >
          <i class="fa-solid fa-hand-sparkles me-2"></i>Skills
        </router-link>
        <router-link
          to="/admin/chart"
          :class="{ 'nav-item nav-link': true, active: isActiveLink('/admin/chart') }"
        >
          <i class="fa fa-chart-bar me-2"></i>Charts
        </router-link>
        <a href="/" class="nav-item nav-link">
          <i class="fa-solid fa-arrow-left me-2"></i>Back Home
        </a>
      </div>
    </nav>
  </div>
</template>
