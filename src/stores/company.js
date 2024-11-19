import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils';
import axios from 'axios'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    listcompany: [],
    userCompany: [],
    address: null,
  }),

  actions: {
    async getCompany(url) {
      try {
        const response = await axios.get(url);
        this.listcompany = response.data;
        // console.log("this.listcompany: ", this.listcompany[0].id); // In ra dữ liệu trả về từ API
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    async getUserCompany() {
      const url = '/api/appuserjob/Get-User'; // URL API lấy thông tin người dùng đang đăng nhập
        try{
          const response = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
            },
          });
          // console.log("response: ",  response.data);
          this.address = response.data.address; 
          this.userCompany = response.data.company;
          console.log("userCompany: ",  this.userCompany);
          console.log("address: ",  this.address);
        } catch (error) {
          console.error("Error fetching userCompany:", error);
        }
    },

    delete(){
      this.$reset();
    }
  },
  persist: {
    enabled: true, // Bật lưu trữ
    strategies: [
      {
        key: 'company', // Tên khóa lưu trữ
        storage: localStorage, // Hoặc sessionStorage
      },
    ],
  },
})
