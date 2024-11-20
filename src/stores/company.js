import { defineStore } from 'pinia'
import { getCookie } from '@/assets/js/cookieUtils';
import axios from 'axios'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    listcompany: [],
    userCompany: [],
    company: [],
    address: null,
    total: 0,
    pageSize: 6,
    currentPage: 1,
  }),

  actions: {
    async getCompany(pageSize, currentPage) {
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      const url = '/api/company/GetAllForUser';
      try {
        const response = await axios.get(url, {
          params: {
            PageNumber: this.currentPage, // Số trang
            PageSize: this.pageSize,     // Kích thước trang
          },
        });
        console.log(response);
        if (response.status === 200 || response.data) {

          this.listcompany = response.data;
          console.log(this.listcompany.length);
          return true;
        } else {
          console.error("Error fetching total jobs:");
          return false;
        }

      } catch (errors) {
        console.error(errors);
        return false;
      }
    },
    async getTotal() {
      const url = '/api/company/GetTotal';
      try {
        const response = await axios.get(url);
        console.log(response);
        if (response.status === 200 || response.data) {

          this.total = response.data;
          return true;
        } else {
          console.error("Error fetching total company:");
          return false;
        }

      } catch (errors) {
        console.error(errors);
        return false;
      }
    },

    async getTotalWithConditions(txtName, txtIndustry) {
      const url = '/api/company/GetTotalWithConditions';
      try {
        const response = await axios.get(url, {
          params: {
            Name: txtName,
            Industry: txtIndustry,

          },
        });
        console.log("getTotal", response);
        if (response.status === 200 || response.data) {

          this.total = response.data;
          return true;
        } else {
          console.error("Error fetching total jobs:");
          return false;
        }

      } catch (errors) {
        console.error(errors);
        return false;
      }
    },

    async searchJobs(txtName, txtIndustry, pageSize, currentPage) {
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      const url = '/api/company/GetAllForUser';


      try {
        const response = await axios.get(url, {
          params: {
            Name: txtName,
            Industry: txtIndustry,
            PageNumber: this.currentPage, // Số trang
            PageSize: this.pageSize,     // Kích thước trang

          },
        });
        console.log(response);
        if (response.status === 200 || response.data) {

          this.listcompany = response.data;
          console.log("Search api:", this.listjobs);
          return true;
        } else {
          console.error("Error fetching total jobs:");
          this.listcompany = [];
          return false;
        }

      } catch (errors) {
        console.error(errors);
        return false;
      }
    },

    async getUserCompany() {
      const url = '/api/appuserjob/Get-User'; // URL API lấy thông tin người dùng đang đăng nhập
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`, // Thêm token vào header
          },
        });
        // console.log("response: ",  response.data);
        this.address = response.data.address;
        this.userCompany = response.data.company;
        console.log("userCompany: ", this.userCompany);
        console.log("address: ", this.address);
      } catch (error) {
        console.error("Error fetching userCompany:", error);
      }
    },

    async getDetailComapany(idCompany) {
      const url = '/api/company/GetCompanyById'
      try {
          const response = await axios.get(url, {
              params: {
                companyId: idCompany
              }
          });
          console.log(response);
          if (response.status === 200 || response.data) {
              this.company = response.data;
              return true;
          } else {
              console.error("Error fetching company detail:");
              return false;
          }
      } catch (errors) {
          console.error(errors);
          return false;
      }
  },


    delete() {
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
