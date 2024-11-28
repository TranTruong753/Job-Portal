import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils';
import axios from 'axios'
import Swal from 'sweetalert2';
import Detail from '@/pages/jobs/detail.vue';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        listBlog: [],
        detailBlog: [],
        detailBlogEmployer: [],
      }),
    
      actions: {
        
        async getBlog(query, currentPage, pageSize){
            const url = '/api/blog';
            try {
                const response  = await axios.get(url,{
                    params: {
                        Title: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                      }
                })
                if(response.data || response.status === 200){
                    this.listBlog = response.data ;
                    console.log(this.listBlog);
                    return true
                }else{
                    return false;
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getTotalBlog(query, currentPage, pageSize){
            const url = '/api/blog/GetTotalWithConditions';
            try {
                const response  = await axios.get(url,{
                    params: {
                        Title: query,
                        PageNumber: currentPage,
                        PageSize: pageSize,
                      }
                })
                if(response.data || response.status === 200){     
                    return response.data
                }else{
                    return 0;
                }
            } catch (error) {
                console.error(error)
            }
        }
        ,    
        async postBlog(values){
            const url = '/api/blog';
            try {
                // Gửi request POST với FormData
                const response = await axios.post(url, values, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getCookie('token')}`, 
                  }
                });
        
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                  console.log("Post blog successfully", response);
                  Swal.fire({
                    title: 'Post blog Job!',
                    text: response.data,
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
                  return true
                } else {
                  Swal.fire({
                    title: 'Post blog Fail!',
                    text: response.data,
                    icon: 'error',
                    confirmButtonText: 'OK',
                  });
                  return false
                }
        
              } catch (error) {
                console.error("Error submitting application:", error);
                return false
              }
        },

        async getDetailBlog(idBlog){
          const url = '/api/blog/GetBlogById';
          try {
            const response = await axios.get(url,
             {
              params:{
                'blogId' : idBlog
              }
             }
            );
            if(response.data || response.status === 200){  
                this.detailBlog = response.data;
                console.log('respone',response);
                return true
            }else{
                return false;
            }
          } catch (error) {
            console.error("Error submitting application:", error);
            return false
          }
        },

        async getDetailBlogEmployer(idBlog){
          const url = '/api/blog/GetBlogByIdForEmployer';
          try {
            const response = await axios.get(url,
             {
              headers:{
                Authorization: `Bearer ${getCookie('token')}`, 
              },
              params:{
                'blogId' : idBlog
              }
             }
            );
            if(response.data || response.status === 200){  
                this.detailBlogEmployer = response.data;
                console.log('respone',response);
                return true
            }else{
                return false;
            }
          } catch (error) {
            console.error("Error submitting application:", error);
            return false
          }
        },
        

      }



    }
)