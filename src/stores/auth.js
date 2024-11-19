// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie, setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';



export const useAuthStore = defineStore('auth', {
  state: () => ({
    fullname: null,
    user: null,
    email: null,
    isAuthenticated: false,
    token: null,
    role: null,
    password: null,
    addressCompany: null,
    userCompany: [],
    userData:[],
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
        this.password = values.newPass;

        console.log(response);
        // Kiểm tra nếu phản hồi trả về status thành công
        if (response.status === 200 || response.data.success) {  // Kiểm tra nếu thành công
          Swal.fire({
            title: 'Post Job!',
            text: response.data.message || 'Job posted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          return true;  // Trả về true nếu thành công
        } else {
          Swal.fire({
            title: 'Post Job Failed!',
            text: response.data.message || 'There was an issue posting the job.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return false;  // Trả về false nếu không thành công
        }
      }
      catch (error) {
        const errorMessage = error.response?.data | "Can't change passwork!";
        Swal.fire({
          title: 'Change Pass failed!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        throw error;
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
        }else {
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
        try{
          const response = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${this.token}`, // Thêm token vào header
            },
          });
          // console.log("response: ",  response.data);
          if (response.status === 200 || response.data) {  // Kiểm tra nếu thành công
            this.userData = response.data;
            // console.log("userData: ",  this.userData);
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
        try{
          const response = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${this.token}`, // Thêm token vào header
            },
          });

          if (response.status === 200 || response.data) {  // Kiểm tra nếu thành công
            console.log("response: ",  response.data);
            this.userData = response.data;
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

    async checkUser(){
      const idUser = jwtDecode(this.token).sub; // Decode token để lấy idUser
      const url = `/api/appuserjob/GetUserById`; // Endpoint không cần gắn id trực tiếp
  
      try{
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
      }catch(error){
        console.error("Error fetching userCompany:", error);
        this.$reset();
        deleteCookie('token')
        return false;
      }
    }
    

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
