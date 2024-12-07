import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';



export const useCompanyAdminStore = defineStore('companyAdmin', {
    state: () => ({
        listCompany: [],
        companyData: null,
      
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
        },

        async getCompanyById(idCompany){
            const url = '/api/admin/Get-ById-Company';
            try {
                const response = await axios.get(url,{
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        id: idCompany,
                    }
                })
                console.log('getCompanyById', response.data)
                if (response.data || response.status === 200) {
                    this.companyData = response.data
                   return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error)
                return false
            }
        },

        async upsertCompany(value){
            const url = '/api/admin/Upsert-Company'
            try {
                const formData = new FormData();
                
               // Thêm dữ liệu vào FormData
                formData.append('Id', value.Id);
                formData.append('Name', value.Name);
                formData.append('Industry', value.Industry);
                formData.append('Description', value.Description);
                formData.append('Website', value.Website);
                formData.append('Email', value.Email);
                formData.append('Phone', value.Phone);
                
                // Nếu có file hình ảnh
                if (value.Img) {
                    formData.append('Img', value.Img);
                }
        
                // Gửi request đến API
                const response = await axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response:', response.data);
                if(response.data || response.status === 200){

                    return true;
                }else{
                    return false
                }
              
            } catch (error) {
                console.error('Error while posting company data:', error.response?.data || error.message);
                return false
            }
        }

     
    }
})