import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';


export const useJobAdminStore = defineStore('jobAdmin', {
    state: () => ({
        listJob: [],
        jobData: null,
      
    }),
    actions: {
        async getJobAdminAll(query, currentPage, pageSize) {
            const url = '/api/admin/Get-All-Job';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Title: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                        IsDecsending: true,
                    }
                })
                console.log('getJobAdminAll', response.data)
                if (response.data || response.status === 200) {
                    this.listJob = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },

        async updateStatusJob(idJob, status) {
            const url = '/api/admin/Update-Status-Job';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Id: idJob,
                        Status: status,
                    }
                })
                if (response.data || response.status === 200) {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error)
                return false
            }
        },

        async getJobById(idJob){
            const url = '/api/admin/Get-Job-Id';
            try {
                const response = await axios.get(url,{
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        id: idJob,
                    }
                })
                console.log('getJobById', response.data)
                if (response.data || response.status === 200) {
                    this.jobData = response.data
                   return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error)
                return false
            }
        }
        

     
    }
})