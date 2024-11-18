// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie ,setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
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

    async changePasswor(values){
      const url = '/api/account/change-pass'
        try{
          const response = await axios.post(url, values, {
            headers: {
              Authorization: `Bearer ${this.token}`, // Thêm token vào header
            },
          });
          this.password = values.newPass;
     
          console.log(response);
          Swal.fire({
            title: 'Change Pass!',
            text: response.data,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
        catch(error){
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

    logout(){
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        deleteCookie('token');
        this.role = null;
        this.fullname = null;
        this.password = null;
    },

 
    
    checklogin(cookie) {
      const token = jwtDecode(cookie) ;
      if (token) {
        this.token = cookie;
        this.isAuthenticated = true;
        this.user = token.given_name;
        this.email = token.email;
        this.role = token.role;
        this.fullname = token.name;
        console.log("Token is valid:", this.role);
      }else{
        this.state();
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
