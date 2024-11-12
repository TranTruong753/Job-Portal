// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router'; // import useRouter từ vue-router

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    email: null,
    isAuthenticated: false,
    token: null,
    role: null,
  }),

  actions: {
    async login(url, credentials) {
      try {
        const response = await axios.post(url, credentials);
        this.user = response.data.userName;
        this.email = response.data.email;
        this.token = response.data.token;
        this.isAuthenticated = true;
        this.role = jwtDecode(this.token).role;

        // Lưu token vào cookie để duy trì trạng thái đăng nhập
        if (this.token) {
          setCookie('token', this.token);
        }
        
        console.log(response);

      } catch (error) {
        console.error('Login failed:', error.response.data);
        const errorMessage = 'Login failed: ' + error.response.data;
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
        this.isAuthenticated = false
    }

  },
});
