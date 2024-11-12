import { defineStore } from 'pinia'
import axios from 'axios'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    listcompany: []
  }),

  actions: {
    async getCompany(url) {
      try {
        const response = await axios.get(url);
        this.listcompany = response.data;
        console.log("this.listcompany: ", this.listcompany[0].id); // In ra dữ liệu trả về từ API
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
  }
})
