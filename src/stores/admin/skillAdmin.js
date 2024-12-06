import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';
import Swal from 'sweetalert2';

export const useSkillAdminStore = defineStore('skillAdmin', {
    state: () => ({
        listSkill: [],
      
    }),
    actions: {
        async getSkillAdminAll(query, currentPage, pageSize) {
            const url = '/api/admin/Get-All-Skill';
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
                console.log('getSkillAdminAll', response.data)
                if (response.data || response.status === 200) {
                    this.listSkill = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },

        async updateSkill(idSkill,namSkill,isDelete){
            const data = {
                id: idSkill,
                name: namSkill,
                isDelete: isDelete
              };
            const url = '/api/admin/Update-Or-Delete-Skill';
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                })
                console.log('updateSkill', response.data)
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

        async addSkill(nameSkill){
            const data = {
                name: nameSkill,
            }

            const url = '/api/admin/Add-Skill';
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                })
                console.log('updateSkill', response.data)
                if (response.data || response.status === 200) {
                    Swal.fire({
                        title: 'Add Skill Job!',
                        text: response.data,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    return true
                } else {
                    Swal.fire({
                        title: 'Add Skill Job!',
                        text: response.data,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return false
                }
            } catch (error) {
                Swal.fire({
                    title: 'Add Skill Job!',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.log(error)
                return false
            }
        }
        
    

     
    }
})