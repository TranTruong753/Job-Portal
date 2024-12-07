import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils'
import axios from 'axios';


export const useBlogAdminStore = defineStore('blogAdmin', {
    state: () => ({
        listBlog: [],
        blogData: null
    }),
    actions: {
        async getBlogAdminAll(query, currentPage, pageSize) {
            const url = '/api/admin/Get-All-Blog';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Title: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                    }
                })
                console.log('getBlogAdminAll', response.data)
                if (response.data || response.status === 200) {
                    this.listBlog = response.data;
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },

        async acceptStatusBlog(idBlog) {
            const url = '/api/admin/Update-Status-Blog';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Id: idBlog,
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

        async acceptStatusBlog(idBlog) {
            const url = '/api/admin/Accept-Blogs';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Id: idBlog,
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

        async refuseStatusBlog(idBlog) {
            const url = '/api/admin/Refuse-Blogs';
            try {
                const response = await axios.post(url,null, {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        Id: idBlog,
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

        async getBlogById(idBlog){
            const url = '/api/admin/GetBlogById';
            try {
                const response = await axios.get(url,{
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
                    },
                    params: {
                        blogId: idBlog,
                    }
                })
                console.log('getBlogById', response.data)
                if (response.data || response.status === 200) {
                    this.blogData = response.data
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