// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie, setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import { convertToUrlV2 } from '@/assets/js/jsUtils.js';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';



export const useAuthStore = defineStore('auth', {
  state: () => ({
    fullname: null,
    urlImg: null,
    user: null,
    email: null,
    isAuthenticated: false,
    token: null,
    role: null,
    password: null,
    addressCompany: null,
    userCompany: [],
    userData: [],
    listJobApply: [],
    listJobSaved: [],
    listJobPost: [],
    listBlogPost:[],
    listApplicantsByJob: [],
  }),

  actions: {

    async login(url, values) {
      try {
        const response = await axios.post(url, values);

        this.user = response.data.userName;
        this.email = response.data.email;
        this.token = response.data.token;
        this.isAuthenticated = true;
        this.fullname = jwtDecode(this.token).name;
        this.role = jwtDecode(this.token).role;

        // Lưu token vào cookie để duy trì trạng thái đăng nhập
        if (this.token) {
          setCookie('token', this.token);
          this.password = values.password;
        } 



      } catch (error) {
        // console.error('Login failed:', error.response.data);
        const errorMessage = error.response?.data || 'Website under maintenance!';
        Swal.fire({
          title: 'Login failed!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        throw error;
      }
    },

    async changePasswor(values) {
      const url = '/api/account/change-pass'
      try {
        const response = await axios.post(url, values, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Thêm token vào header
          },
        });
     

        console.log(response);
        // Kiểm tra nếu phản hồi trả về status thành công
        if (response.status === 200 || response.data.success) {  // Kiểm tra nếu thành công
          this.password = values.newPass;
          Swal.fire({
            title: 'Post Job!',
            text: response.data.message || 'Change Password successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          return true;  // Trả về true nếu thành công
        } else {
          Swal.fire({
            title: 'Post Job Failed!',
            text: response.data.message || 'There was an issue Change Password!.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return false;  // Trả về false nếu không thành công
        }
      }
      catch (error) {
        const errorMessage = error.response?.data | "Can't change password!";
        Swal.fire({
          title: 'Change Pass failed!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        throw error;
      }
    },
    async fogotPass(values){
      const url = '/api/account/Forget-pass';
      try {
        const response = await axios.post(url,values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('response',response);
        if(response.data || response.status === 200){
            
            return true;  // Trả về false nếu không thành công
        }else{
          Swal.fire({
            title: 'Send Email failed!',
            text: response.data,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error(error.response.data)
        const errorMessage = error.response.data??"can't send email!" ;
        Swal.fire({
          title: 'Send Email failed!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },

    async postJob(values) {
      const url = '/api/appuserjob/create-job-skills';
      try {

        const response = await axios.post(url, values, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Thêm token vào header
          },
        });
        console.log(response);
        if (response.status === 200 || response.status === 201 || response.status === 204) {

          Swal.fire({
            title: 'Post Job!',
            text: response.data,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          return true;  // Trả về true nếu thành công
        } else {
          Swal.fire({
            title: 'Post Job false!',
            text: response.data.error,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return false;
        }


      } catch (error) {
        console.error(error);
        return false;
      }
    },

    logout() {
      this.$reset();
      deleteCookie('token');

    },

    async getEmployer() {
      const url = '/api/appuserjob/Get-User'; // URL API lấy thông tin người dùng đang đăng nhập
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Thêm token vào header
          },
        });
        // console.log("response: ",  response.data);
        if (response.status === 200 || response.data) {  // Kiểm tra nếu thành công
          this.userData = response.data;
          // console.log("userData: ",  this.userData);
          if(this.userData.img){
            this.urlImg = convertToUrlV2(this.userData.img);
          }
          this.addressCompany = response.data.address;
          this.userCompany = response.data.company;
          // console.log("userCompany: ",  this.userCompany);
          // console.log("address: ",  this.address);
          return true;  // Trả về true nếu thành công
        } else {
          return false;  // Trả về false nếu không thành công
        }

      } catch (error) {
        console.error("Error fetching userCompany:", error);
      }
    },

    async getUserData() {
      const url = '/api/appuserjob/Get-User'; // URL API lấy thông tin người dùng đang đăng nhập
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Thêm token vào header
          },
        });

        if (response.status === 200 || response.data) {  // Kiểm tra nếu thành công
          console.log("response: ", response.data);
          this.userData = response.data;
          if(this.userData.img){
            this.urlImg = convertToUrlV2(this.userData.img);
          }
          return true;  // Trả về true nếu thành công
        } else {
          return false;  // Trả về false nếu không thành công
        }


      } catch (error) {
        console.error("Error fetching userCompany:", error);
      }
    },

    checklogin(cookie) {
      const token = jwtDecode(cookie);
      
      if (token) {
        this.token = cookie;
        this.isAuthenticated = true;
        this.user = token.given_name;
        this.email = token.email;
        this.role = token.role;
        this.fullname = token.name;
        console.log("Token is valid:", this.role);
      } else {
        this.$reset();
      }
    },

    async checkUser() {
      const idUser = jwtDecode(this.token).sub; // Decode token để lấy idUser
      const url = `/api/appuserjob/GetUserById`; // Endpoint không cần gắn id trực tiếp

      try {
        const response = await axios.get(url, {
          params: { userId: idUser } // Thêm tham số query string
        })
        if (response.status === 200 || response.data) {  // Kiểm tra nếu thành công

          return true;  // Trả về true nếu thành công
        } else {
          this.$reset();
          deleteCookie('token')
          return false;  // Trả về false nếu không thành công
        }
      } catch (error) {
        console.error("Error fetching userCompany:", error);
        this.$reset();
        deleteCookie('token')
        return false;
      }
    },

    async applyJob(idJob, file) {
      const url = "/api/appuserjob/create-application";

      // Tạo đối tượng FormData để gửi file và dữ liệu khác
      const formData = new FormData();

      // Thêm file vào formData
      formData.append("cvFile", file);

      // Thêm các tham số khác (ví dụ idJob) vào formData
      formData.append("JobId", idJob);

      try {
        // Gửi request POST với FormData
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.token}`, 
          }
        });

        if (response.status === 200 || response.status === 201 || response.status === 204) {
          console.log("Application submitted successfully", response);
          Swal.fire({
            title: 'Apply Job!',
            text: response.data,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          return true
        } else {
          Swal.fire({
            title: 'Apply Job Fail!',
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

    async SavedJobs(idJob, isSave) {
      const url = "/api/appuserjob/issave";
      
      // Tạo dữ liệu dưới dạng JSON
      const data = {
        jobId: idJob,
        issave: isSave
      };
    
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json', // Chỉ định rằng đây là request JSON
          }
        });
    
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          // Swal.fire({
          //   title: 'Save Job!',
          //   text: response.data,
          //   icon: 'success',
          //   confirmButtonText: 'OK',
          // });
          return true;
        } else {
          Swal.fire({
            title: 'Save Job Fail!',
            text: response.data,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    async updateUser(values){
        const url = '/api/appuserjob/Update-User';
        try{
          const response = await axios.post(url,values,{
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          });
          if(response.status === 200 || response.status === 201 || response.status === 204){
            this.fullname = values.fullname;
            Swal.fire({
              title: 'Update Profile Success!',
              text: response.data,
              icon: 'success',
              confirmButtonText: 'OK',
            });
            return true;
          }else{
            Swal.fire({
              title: 'Update Profile False!',
              text: response.data,
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return false;
          }
        }catch(error){
          console.error(error);
          Swal.fire({
            title: 'Update Profile False!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return true
        }
    },

    async checkJobIsSaveOrApply(jobId){
      const url = '/api/appuserjob/GetIssaveAndStatus';
      try {
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          params: { JobId: jobId }
        })
        if(response.data || response.status === 200){
            return response.data
        }
      } catch (error) {
        console.error(error)
      }
    },

    async getListApplyUser(query){
      const url = '/api/appuserjob/user-job';
      try {
        const response = await axios.get(url,{
          headers:{
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            Title: query,
          }
        })
        if(response.data || response.status === 200){
          const modifiedData = response.data.map(item => ({
            ...item,
            isShowUser: true // Giá trị mặc định
          }));
          
          // Thêm dữ liệu đã sửa đổi vào listJobApply
          this.listJobApply = modifiedData;
          console.log("this.listJobApply",this.listJobApply)

            
        }
      } catch (error) {
        console.error(error);
      }
    },

    updateIsShowUser(jobId) {
      const jobIndex = this.listJobApply.findIndex(item => item.id === jobId);
        if (jobIndex !== -1) {
            this.listJobApply[jobIndex].isShowUser = false;
        }
    },
    updateIsShowUserForJobSave(jobId) {
      const jobIndex = this.listJobSaved.findIndex(item => item.id === jobId);
        if (jobIndex !== -1) {
            this.listJobSaved[jobIndex].isShowUser = false;
        }
    },
    updateIsShowUserForJobPost(jobId) {
      const jobIndex = this.listJobPost.findIndex(item => item.id === jobId);
        if (jobIndex !== -1) {
            this.listJobPost[jobIndex].isShowEmployer = false;
        }
    },
    async getListSaveUser(query){
      const url = '/api/appuserjob/user-issave-job';
      try {
        const response = await axios.get(url,{
          headers:{
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            Title: query,
          }
        })
        if(response.data || response.status === 200){
          const modifiedData = response.data.map(item => ({
            ...item,
            isShowUser: true // Giá trị mặc định
          }));
          
          // Thêm dữ liệu đã sửa đổi vào listJobApply
          this.listJobSaved = modifiedData;
          console.log("this.listJobSaved",this.listJobSaved)

            
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getListJobPost(query,currentPage,pageSize){
      const url = '/api/appuserjob/employer-job';
      try {
        const response = await axios.get(url,{
          headers:{
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            Title: query,
            PageNumber: currentPage,
            PageSize: pageSize,
          }
        })
        if(response.data || response.status === 200){
          const modifiedData = response.data.map(item => ({
            ...item,
            isShowEmployer: true // Giá trị mặc định
          }));
          
          // Thêm dữ liệu đã sửa đổi vào listJobApply
          this.listJobPost = modifiedData;
          console.log("this.listJobApply",this.listJobPost)
          return true;
            
        }else{
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getTotalListJobPost(query,currentPage,pageSize){
      const url = '/api/appuserjob//GetTotalForEmployer';
      try {
        const response = await axios.get(url,{
          headers:{
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            Title: query,
            PageNumber: currentPage,
            PageSize: pageSize,
          }
        })
        if(response.data || response.status === 200){
         
          return response.data;
            
        }else{
          return 0;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getApplycationByJob(jobId){
      const url = '/api/appuserjob/employer-jobById';
      try {
        const response = await axios.get(url,{
          headers:{
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            JobId: jobId
          }
        });
        if(response.data || response.status === 200){
          this.listApplicantsByJob = response.data ;
          console.log(response)
          console.log('this.listApplicantsByJob',this.listApplicantsByJob);
          return true;
        }else{
          return false;
        }
      } catch (error) {
        console.error(error)
      }
    },

    async ConfirmApplication(jobId, userId, status) { 
      const url = '/api/appuserjob/Confirm-application';
      try {
          const response = await axios.post(
              url,
              {
                  jobId: jobId,
                  userId: userId,
                  status: status
              },
              {
                  headers: {
                      Authorization: `Bearer ${this.token}`,
                      'Content-Type': 'application/json'
                  }
              }
          );
  
          if ( response.status === 200 || response.status === 201 || response.status === 204) {
            Swal.fire({
              title: 'Change Status Success!',
              text: response.data,
              icon: 'success',
              confirmButtonText: 'OK',
            });
              return true;
          } else {
              return false;
          }
      } catch(error) {
          console.log(error);
          return false;
      }
  },

  async removeApplication(jobId, userId, status) {
    const data = {
      jobId: jobId,
      userId: userId,
      status: status
    };

    const url = '/api/appuserjob/Remove-application'
  
    try {
      const response = await axios.post(url, data,{
        headers:{
          Authorization: `Bearer ${this.token}`,
        }
      });
      console.log('Response:', response.data);
      if(response.data || response.status === 200){
        return true
      }else{
        return false;
      }
      return response.data; // Trả về dữ liệu phản hồi nếu thành công
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      return false;
      // throw error; // Ném lỗi nếu có
    }
  },

  async GetStatisticalJobStatus(){
    const url = '/api/statistical/Get-Statistical-JobStatus'
    try {
      const response = await axios.get(url,{
        headers:{
          Authorization: `Bearer ${this.token}`,
        }
      })
      if(response.data || response.status === 200){
        console.log(response.data)
        return response.data;
      }else{
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async GetApplyAndDateRange(startDate,endDate){
    const url = '/api/statistical/GetApplyAndDateRange';
    try {
      const response = await axios.get(url,{
        headers:{
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          'startDate' : startDate,
          'endDate' : endDate
        }
      })
      if(response.data || response.status === 200){
        console.log(response.data)
        return response.data;
      }else{
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async isShowJobPost(jobId,isShow){
    const data = {
      jobId: jobId,
      isShow: isShow,
    };
    const url = '/api/appuserjob/Update-IsShow-Job';
    try {
      const response = await axios.post(url,data, {
        headers:{
          Authorization: `Bearer ${this.token}`,
        }
      })

      if(response.data || response.status === 200){
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async getListBlogPost(query,currentPage,pageSize){
    const url = '/api/blog/GetForEmployer';
    try {
      const response = await axios.get(url,{
        headers:{
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          Title: query,
          PageNumber: currentPage,
          PageSize: pageSize,
        }
      })
      if(response.data || response.status === 200){
        // const modifiedData = response.data.map(item => ({
        //   ...item,
        //   isShowEmployer: true // Giá trị mặc định
        // }));
        
        // Thêm dữ liệu đã sửa đổi vào listBlogPost
        this.listBlogPost = response.data;
        console.log("this.listBlogPost",this.listBlogPost)
        return true;
          
      }else{
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async getTotalListBlogPost(query,currentPage,pageSize){
    const url = '/api/blog/GetTotal';
    try {
      const response = await axios.get(url,{
        headers:{
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          Title: query,
          PageNumber: currentPage,
          PageSize: pageSize,
        }
      })
      if(response.data || response.status === 200){
       
        return response.data;
          
      }else{
        return 0;
      }
    } catch (error) {
      console.error(error);
    }
  },

  async isShowBlogPost(blogId,isShow){
    const data = {
      blogId: blogId,
      isShow: isShow,
    };
    const url = '/api/blog/Update-IsShow-Blog';
    try {
      const response = await axios.post(url,data, {
        headers:{
          Authorization: `Bearer ${this.token}`,
        }
      })

      if(response.data || response.status === 200){
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  },
  async postAvatar(file) {
    const url = '/api/appuserjob/Update-Img-User';
  
    // Tạo FormData và đính kèm file
    const formData = new FormData();
    formData.append('img', file); // Key phải khớp với tên tham số backend nhận
  
    try {
      // Gửi request POST
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`, // Token xác thực
        },
      });
  
      // Xử lý kết quả
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log('Update Avatar successfully', response);
        Swal.fire({
          title: 'Update Avatar Job!',
          text: response.data.message || 'Avatar updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        return true;
      } else {
        Swal.fire({
          title: 'Update Avatar Fail!',
          text: response.data.message || 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return false;
      }
    } catch (error) {
      console.error('Error submitting application:', error);
  
      // Hiển thị thông báo lỗi
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update avatar.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }
  },
  
  async deleteBlog(id){
    const url = `/api/blog/Delete-Blog?blogId=${id}`;
  try {
    const response = await axios.post(url);
   
    console.log(response.data);
    if(response.status === 200 || response.status === 201 || response.status === 204){
      Swal.fire({
        title: 'Delete Blog Success!',
        text:  'Delete Blog successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      return true;
    }else{
      Swal.fire({
        title: 'Delete Blog Fail!',
        text: response.data.message || 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
  },


  


  },

  persist: {
    enabled: true, // Bật lưu trữ
    strategies: [
      {
        key: 'auth', // Tên khóa lưu trữ
        storage: localStorage, // Hoặc sessionStorage
      },
    ],
  },
});
