import { defineStore } from 'pinia';
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";

export const useLocationStore = defineStore('location', {
  state: () => ({
    provinces: [],
    districts: [],
    wards: [],
    selectedProvince: "",
    selectedDistrict: "",
    selectedWard: "",
    result: "",
  }),

  actions: {
    async fetchProvinces() {
      try {
        const response = await axios.get(`${host}?depth=1`);
        this.provinces = response.data;
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },

    async fetchDistricts(provinceCode) {
      if (!provinceCode) return;
      try {
        const response = await axios.get(`${host}p/${provinceCode}?depth=2`);
        this.districts = response.data.districts || [];
        this.wards = []; // Reset wards khi tỉnh thay đổi
        this.selectedDistrict = "";
        this.selectedWard = "";
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    },

    async fetchWards(districtCode) {
      if (!districtCode) return;
      try {
        const response = await axios.get(`${host}d/${districtCode}?depth=2`);
        this.wards = response.data.wards || [];
        this.selectedWard = "";
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    },

    updateResult() {
      if (this.selectedProvince && this.selectedDistrict && this.selectedWard) {
        const provinceName = this.provinces.find((p) => p.code === this.selectedProvince)?.name || "";
        const districtName = this.districts.find((d) => d.code === this.selectedDistrict)?.name || "";
        const wardName = this.wards.find((w) => w.code === this.selectedWard)?.name || "";
        this.result = `${provinceName} | ${districtName} | ${wardName}`;
      } else {
        this.result = "";
      }
    },
  },
});
