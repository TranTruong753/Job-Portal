import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';
import Swal from 'sweetalert2';

export const useChartStore = defineStore('chart', {
    state: () => ({
        jobData: [],
      
    }),
    actions: {
       async getStatisticalJobAdmin(startDate,endDate){
        const url = '/api/admin/Statistical-Get-Job';
        try {
            const response = await axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                },
                params: {
                    'startDate' : startDate,
                    'endDate' : endDate
                  }
            })
            console.log('updateSkill', response.data)
            if (response.data || response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
       },

       async getStatisticalRegisterAdmin(startDate,endDate){
        const url = '/api/admin/Statistical-Get-Register-User';
        try {
            const response = await axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                },
                params: {
                    'startDate' : startDate,
                    'endDate' : endDate
                  }
            })
            console.log('updateSkill', response.data)
            if (response.data || response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
       },

       async getStatisticalGetTotalAdmin(){
        const url = '/api/admin/Statistical-Get-Total';
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                },
            
            })
            console.log('getStatisticalGetTotalAdmin', response.data)
            if (response.data || response.status === 200) {
                return  response.data
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
       }
        
    

     
    }
})