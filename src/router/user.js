import { getCookie } from '@/assets/js/cookieUtils.js'
import {checkAuth, checkUserInDb} from '@/assets/js/jsUtils.js';
import { useAuthStore } from '@/stores/auth';



const user = [
    {
        path: "/",
        component: () => import("../layouts/user.vue"),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            // Kiểm tra xác thực
            const token = getCookie('token');
            if(token){            
                next()               
            }else{
                authStore.$reset();
                next()
            }
            
               
           
        },
        children: [
            {
                path: "/",
                name: "user-home-default",
                component: () => import("../pages/home/index.vue")
            },
            {
                path: "/home",
                name: "user-home",
                component: () => import("../pages/home/index.vue")
            },
            {
                path: "/job",
                name: "user-jobs",
                component: () => import("../pages/jobs/index.vue"),
            },
            {
                path: "/job/detail/:id",
                name: "job-detail",
                component: () => import("../pages/jobs/detail.vue"),
            },
            {
                path: "/job/detailEmployer/:id",
                name: "job-detail-employer",
                component: () => import("../pages/jobs/detailEmployer.vue"),
            },
            {
                path: "/account",
                name: "user-accounts",
                component: () => import("../pages/account/index.vue"),
                beforeEnter: async (to, from, next) => {
                    const role =  checkAuth(next);         
                    const isUser = await checkUserInDb();
                    console.log('isUser',isUser);
                    if(isUser) {    

                        if (role) {
                            next();
                        } else{
                            next({ name: 'user-home' });
                        }
                    }
                   else {
                        next({ name: 'user-login' });
                    }
                },
                children: [
                    {
                        path: "",
                        name: "account-settings",
                        component: () => import("../pages/account/setting.vue"),
                    },
                    {
                        path: "profile",
                        name: "account-profile",
                        component: () => import("../pages/account/profile.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'User' ||  role === 'Admin') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "profile-employer",
                        name: "account-profile-employer",
                        component: () => import("../pages/account/profileEmployer.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "post-job",
                        name: "account-post-job",
                        component: () => import("../pages/account/postJobs.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "my-jobs",
                        name: "account-my-jobs",
                        component: () => import("../pages/account/myJobs.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "my-blogs",
                        name: "account-my-blogs",
                        component: () => import("../pages/account/myBlog.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "jobs-applied",
                        name: "account-jobs-applied",
                        component: () => import("../pages/account/jobsApplied.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'User') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "saved-jobs",
                        name: "account-saved-jobs",
                        component: () => import("../pages/account/savedJobs.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'User') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "list-applicants/:id",
                        name: "account-list-applicants",
                        component: () => import("../pages/account/ListApplicants.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "post-blog",
                        name: "account-post-blog",
                        component: () => import("../pages/blogs/post.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                    {
                        path: "create-cv-test",
                        name: "account-create-cv-test",
                        component: () => import("../pages/account/testCv.vue"),
                    },
                    {
                        path: "create-cv",
                        name: "account-create-cv",
                        component: () => import("../pages/account/cv.vue"),
                    },
                    {
                        path: "charts-employer",
                        name: "account-charts-employer",
                        component: () => import("../pages/account/charts/charts.vue"),
                        beforeEnter: (to, from, next) => {
                            const role = checkAuth(next);         
                           
                            if (role === 'Employer') {
                                next();
                            } else {
                                next({name:'account-settings'})
                            }
                        },
                    },
                ]
            },
            {
                path: "/company",
                name: "user-companies",
                component: () => import("../pages/companies/index.vue"),
            },
            {
                path: "/company/detail/:id",
                name: "company-detail",
                component: () => import("../pages/companies/detail.vue"),
            },
            {
                path: "/blog",
                name: "user-blogs",
                component: () => import("../pages/blogs/index.vue"),
            },
            {
                path: "/blog/detail/:id",
                name: "blog-detail",
                component: () => import("../pages/blogs/detail.vue"),
            },
            {
                path: "/blog/detailEmployer/:id",
                name: "blog-detail-employer",
                component: () => import("../pages/blogs/detailEmployer.vue"),
            },
            {
                path: "/login",
                name: "user-login",
                component: () => import("../pages/login/index.vue")
            },
            {
                path: "/forgotPass",
                name: "user-forget-pass",
                component: () => import("../pages/forgot/index.vue")
            },
            {
                path: "/register",
                name: "user-register",
                component: () => import("../pages/register/index.vue")
            },
            {
                path: "/register-employers",
                name: "user-register-employers",
                component: () => import("../pages/registerEmployers/index.vue")
            },
            // Route lỗi 404
            {
                path: "/:pathMatch(.*)*", // Cú pháp đúng cho Vue 3
                name: "not-found",
                component: () => import("../pages/error/page404.vue"),
            },
        ]
    }
]

export default user