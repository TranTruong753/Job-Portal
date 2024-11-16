import { defineStore } from 'pinia';

export const useDataCvStore = defineStore('cvStore', {
  state: () => ({
    datas: { 
      workexperience: [],
      GeneralInformation: [],
      educationalInformation: [],
      certificate: [],
      Skills: [],
      OtherSkills: [],
    }
  }),

  actions: {

    // Thêm một mục vào danh sách
    addItem(item, newkey) {
      if (this.datas[newkey]) {
        this.datas[newkey].push(item);
      } else {
        console.error(`Không tìm thấy mảng với tên ${newkey}`);
      }
    },

    // Lấy tất cả các mục trong mảng
    getAllItems(newkey) {
      if (this.datas[newkey]) {
        return this.datas[newkey];
      } else {
        console.error(`Không tìm thấy mảng với tên ${newkey}`);
        return [];
      }
    },

    // Lấy mục theo chỉ số
    getItemByIndex(newkey, index) {
      if (this.datas[newkey] && this.datas[newkey][index]) {
        return this.datas[newkey][index];
      } else {
        console.error(`Không tìm thấy mục ở chỉ số ${index} trong ${newkey}`);
        return null;
      }
    },

    // Xóa mục theo chỉ số
    deleteItemByIndex(newkey, index) {
      if (this.datas[newkey] && this.datas[newkey][index]) {
        this.datas[newkey].splice(index, 1); // Xóa mục tại chỉ số
      } else {
        console.error(`Không tìm thấy mục ở chỉ số ${index} trong ${newkey}`);
      }
    },

    // Cập nhật mục theo chỉ số
    updateItemByIndex(newkey, index, updatedItem) {
      if (this.datas[newkey] && this.datas[newkey][index]) {
        this.datas[newkey][index] = updatedItem;
      } else {
        console.error(`Không tìm thấy mục ở chỉ số ${index} trong ${newkey}`);
      }
    }
  }
});
