import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie, setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import SavedJobs from '@/pages/account/savedJobs.vue';




export const useJobtore = defineStore('job', {
    state: () => ({
        listjobs: [],
        job: [],
        total: 0,
        pageSize: 6,
        currentPage: 1,

    }),
    actions: {
        async getJob(pageSize, currentPage) {
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            const url = '/api/job';
            try {
                const response = await axios.get(url, {
                    params: {
                        PageNumber: this.currentPage, // Số trang
                        PageSize: this.pageSize,     // Kích thước trang
                    },
                });
                console.log(response);
                if (response.status === 200 || response.data) {

                    this.listjobs = response.data;
                    console.log(this.listjobs.length);
                    return true;
                } else {
                    console.error("Error fetching total jobs:");
                    return false;
                }

            } catch (errors) {
                console.error(errors);
                return false;
            }
        },

        async getTotal() {
            const url = '/api/job/GetTotal';
            try {
                const response = await axios.get(url);
                console.log(response);
                if (response.status === 200 || response.data) {

                    this.total = response.data;
                    return true;
                } else {
                    console.error("Error fetching total jobs:");
                    return false;
                }

            } catch (errors) {
                console.error(errors);
                return false;
            }
        },

        async getTotalWithConditions(txtTitle, txtLocation, txtJobType, txtJoblevel) {
            const url = '/api/job/GetTotalWithConditions';
            try {
                const response = await axios.get(url, {
                    params: {
                        Title: txtTitle,
                        Location: txtLocation,
                        JobLevel: txtJoblevel,
                        JobType: txtJobType,

                    },
                });
                console.log("getTotal", response);
                if (response.status === 200 || response.data) {

                    this.total = response.data;
                    return true;
                } else {
                    console.error("Error fetching total jobs:");
                    return false;
                }

            } catch (errors) {
                console.error(errors);
                return false;
            }
        },

        async getDetailJobs(idJob) {
            const url = '/api/job/GetJobById'
            try {
                const response = await axios.get(url, {
                    params: {
                        jobId: idJob
                    }
                });
                console.log(response);
                if (response.status === 200 || response.data) {
                    this.job = response.data;
                    return true;
                } else {
                    console.error("Error fetching job detail:");
                    return false;
                }
            } catch (errors) {
                console.error(errors);
                return false;
            }
        },

        async searchJobs(txtTitle, txtLocation, txtJobType, txtJoblevel, pageSize, currentPage) {
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            const url = '/api/job';


            try {
                const response = await axios.get(url, {
                    params: {
                        Title: txtTitle,
                        Location: txtLocation,
                        JobLevel: txtJoblevel,
                        JobType: txtJobType,
                        PageNumber: this.currentPage, // Số trang
                        PageSize: this.pageSize,     // Kích thước trang

                    },
                });
                console.log(response);
                if (response.status === 200 || response.data) {

                    this.listjobs = response.data;
                    console.log("Search api:", this.listjobs);
                    return true;
                } else {
                    console.error("Error fetching total jobs:");
                    this.listjobs = [];
                    return false;
                }

            } catch (errors) {
                console.error(errors);
                return false;
            }
        },

       
    },
    persist: {
        enabled: true, // Bật lưu trữ
        strategies: [
            {
                key: 'jobs', // Tên khóa lưu trữ
                storage: localStorage, // Hoặc sessionStorage
            },
        ],
    },
})