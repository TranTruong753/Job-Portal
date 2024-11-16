import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    items: [], // Array để lưu các mục từ modal
  }),
  actions: {
    // Thêm một mục vào danh sách
    addItem(item) {
      this.items.push(item);
    },

    // Lấy tất cả các mục
    getItems() {
      return this.items;
    },

    // Lấy một mục theo index
    getItemByIndex(index) {
      if (index >= 0 && index < this.items.length) {
        return this.items[index];
      } else {
        console.error('Index out of bounds');
        return null; // Hoặc có thể trả về một giá trị mặc định khác nếu cần
      }
    },

    // Xóa một mục theo chỉ mục (index)
    deleteItem(index) {
      if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
      } else {
        console.error('Index out of bounds');
      }
    },

    // Cập nhật một mục theo chỉ mục (index) và giá trị mới
    updateItem(index, newItem) {
      if (index >= 0 && index < this.items.length) {
        this.items[index] = newItem;
      } else {
        console.error('Index out of bounds');
      }
    },
  },
});
