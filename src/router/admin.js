import { getCookie } from '@/assets/js/cookieUtils.js'
import {checkAuth, checkUserInDb} from '@/assets/js/jsUtils.js';
import { useAuthStore } from '@/stores/auth';



const admin = [
    {
        path: "/",
        component: () => import("../layouts/admin.vue"),            
    
           
        // },
        children: [
            {
                path: "/admin",
                name: "admin-home-default",
                component: () => import("../pages/admin/homeAdmin/index.vue")
            },
            {
                path: "/admin/home",
                name: "admin-home",
                component: () => import("../pages/admin/homeAdmin/index.vue")
            },
            {
                path: "/admin/account",
                name: "admin-account",
                component: () => import("../pages/admin/accountAdmin/index.vue")
            },
            {
                path: "/admin/account/detail/:id",
                name: "admin-account-detail",
                component: () => import("../pages/admin/accountAdmin/detail.vue")
            },
            {
                path: "/admin/blog",
                name: "admin-blog",
                component: () => import("../pages/admin/blogAdmin/index.vue")
            },
            {
                path: "/admin/blog/detail/:id",
                name: "admin-blog-detail",
                component: () => import("../pages/admin/blogAdmin/detail.vue")
            },
            {
                path: "/admin/company",
                name: "admin-company",
                component: () => import("../pages/admin/companyAdmin/index.vue")
            },
            {
                path: "/admin/company/detail/:id",
                name: "admin-company-detail",
                component: () => import("../pages/admin/companyAdmin/detail.vue")
            },
            {
                path: "/admin/company/upsert/:id",
                name: "admin-company-upsert-id",
                component: () => import("../pages/admin/companyAdmin/upsert.vue")
            },
            {
                path: "/admin/company/upsert",
                name: "admin-company-upsert",
                component: () => import("../pages/admin/companyAdmin/upsert.vue")
            },
            {
                path: "/admin/jobs",
                name: "admin-job",
                component: () => import("../pages/admin/jobsAdmin/index.vue")
            },
            {
                path: "/admin/job/detail/:id",
                name: "admin-job-detail",
                component: () => import("../pages/admin/jobsAdmin/detail.vue")
            },
            {
                path: "/admin/job/detail/:id",
                name: "admin-job-detail",
                component: () => import("../pages/admin/jobsAdmin/detail.vue")
            },
            {
                path: "/admin/skills",
                name: "admin-skill",
                component: () => import("../pages/admin/skillsAdmin/index.vue")
            },
            {
                path: "/admin/chart",
                name: "admin-chart",
                component: () => import("../pages/admin/chartAdmin/index.vue")
            },
            // Route lỗi 404
            // {
            //     path: "/:pathMatch(.*)*", // Cú pháp đúng cho Vue 3
            //     name: "not-found",
            //     component: () => import("../pages/error/page404.vue"),
            // },
        ]
    }
]

export default admin