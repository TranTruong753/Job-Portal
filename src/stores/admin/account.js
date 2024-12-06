import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';


export const useAccountStore = defineStore('account', {
    state: () => ({
        listAccount: [],
        listAccountUser: [],
        litsAccountEmployer: []
    }),
    actions: {
        async getAccountAll(query, currentPage, pageSize) {
            const url = '/api/admin/Get-AllAccount';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Fullname: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                    }
                })
                if (response.data || response.status === 200) {
                    this.listAccount = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },

        async getAccountUserorEmployerAll(query, currentPage, pageSize, role) {
            const url = '/api/admin/Get-Account-UserOrEmployer';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Fullname: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                        role: role,
                    }
                })
                console.log('getAccountUserorEmployerAll',response.data)
                if (response.data || response.status === 200) {
                    this.listAccount = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },
        async lockAccountUser(idUser){
            const url = '/api/admin/Refuse-Account-User';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                       id: idUser
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

        async unlockAccountUser(idUser){
            const url = '/api/admin/Accept-Account-User';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                       id: idUser
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

        async lockAccountEmployer(idEmployer){
            const url = '/api/admin/Refuse-Account-Employer';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                       id: idEmployer
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

        async unlockAccountEmployer(idEmployer){
            const url = '/api/admin/Accept-Account-Employer';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                       id: idEmployer
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
     
    }
})