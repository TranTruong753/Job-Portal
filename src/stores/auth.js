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
          localStorage.setItem('token', this.token);
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


    logout(){
        this.user = null
        this.token = null
        this.isAuthenticated = false
        deleteCookie('token')
        this.role = null
        this.fullname = null
    },

    // async checklogin(url) {
    //   const token = getCookie('token'); 
    //   if (token) {
    //     try {
    //       const response = await axios.post(
    //         url,
    //         { token: token }, // Token được gửi như một thuộc tính trong đối tượng JSON
    //         {
    //           headers: { 
    //             'Content-Type': 'application/json' // Đảm bảo header đúng
    //           }
    //         }
    //       );

    //       // Nếu token hợp lệ, cập nhật lại thông tin người dùng
    //       this.user = response.data.user.username;
    //       this.email = response.data.user.email;
    //       this.role = response.data.user.roles;
    //       this.isAuthenticated = true;

    //       console.log("Token is valid:", this.role);
    //     } catch (error) {
    //       console.error('Token validation failed:', error.response?.data || error.message);
    //       Swal.fire({
    //         title: 'Session expired',
    //         text: 'Please log in again.',
    //         icon: 'error',
    //         confirmButtonText: 'OK',
    //       });
    //       this.logout(); // Đăng xuất nếu token không hợp lệ
    //     }
    //   } else {
    //     console.log("No token found, user is not logged in.");
    //     this.isAuthenticated = false;
    //   }
    // },   
    
    checklogin(cookie) {
      const token = jwtDecode(cookie) ;
      if (token) {
        this.isAuthenticated = true;
        this.user = token.given_name;
        this.email = token.email;
        this.role = token.role;
        this.fullname = token.name;
        console.log("Token is valid:", this.role);
      }
    }

  },
});
