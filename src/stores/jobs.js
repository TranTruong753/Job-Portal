import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie ,setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

   


export const useJobtore = defineStore('job', {
    state: () => ({
        listjobs: [],
        job: [],
        total: null,
        pageSize: null,
        currentPage: null,

    }),
    actions:{
       async getJob(pageSize,currentPage){
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            const url = '/api/job';
            try {
                const response = await axios.get(url,{
                    params: {
                        PageNumber: currentPage, // Số trang
                        PageSize: pageSize,     // Kích thước trang
                      },
                });
                console.log(response);
                if (response.status === 200 || response.data) {
    
                    this.listjobs = response.data;
                    console.log(this.listjobs);
                    return true;
                }else {
                    console.error("Error fetching total jobs:");
                    return false;
                }
    
            }catch (errors) {
                console.error(errors);
                return false;
            }
       },

       async getTotal(){
        const url = '/api/job/GetTotal';
        try {
            const response = await axios.get(url);
            console.log(response);
            if (response.status === 200 || response.data) {

                this.total = response.data;
                return true;
            }else {
                console.error("Error fetching total jobs:");
                return false;
            }

        }catch (errors) {
            console.error(errors);
            return false;
        }
       },

       async getDetailJobs(idJob){
        const url = '/api/job/GetJobById'
            try {
                const response = await axios.get(url,{
                    params: {
                        jobId: idJob
                    }
                });
                console.log(response);
                if (response.status === 200 || response.data) {
                    this.job = response.data;
                    return true;
                }else{
                    console.error("Error fetching job detail:");
                    return false;
                }
            } catch (errors) {
                console.error(errors);
                return false;
            }
        }
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