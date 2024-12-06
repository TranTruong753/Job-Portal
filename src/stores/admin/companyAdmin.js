import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';



export const useCompanyAdminStore = defineStore('companyAdmin', {
    state: () => ({
        listCompany: [],
      
    }),
    actions: {
        async getCompanyAdminAll(query, currentPage, pageSize) {
            const url = '/api/admin/Get-All-Company';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Name: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                    }
                })
                console.log('getCompanyAdminAll', response.data)
                if (response.data || response.status === 200) {
                    this.listCompany = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },

        async updateStatusCompany(idCompnay,status){
            const url = '/api/admin/Update-Status-Company';
            try {
                const response = await axios.post(url, null,{
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        id: idCompnay,
                        status: status,
                    }
                })
                console.log('updateStatusCompany', response.data)
                if (response.data || response.status === 200) {
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