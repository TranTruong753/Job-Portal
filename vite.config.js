import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Tắt source map để tránh lỗi không tìm thấy file .map
  build: {
    sourcemap: false // Hoặc 'inline' nếu bạn muốn sử dụng source map nội tuyến
  },
  server: {
    port: 3000, // Đổi port nếu cần thiết
    open: true, // Tự động mở trình duyệt khi khởi động server
    proxy: {
      '/api': {
        target: 'https://localhost:7283',  // Địa chỉ backend
        changeOrigin: true,
        secure: false, // Nếu bạn đang sử dụng HTTPS, đổi thành true
      }
    }
  },
  // Tùy chọn CSS để nén hoặc xử lý các file CSS
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "@/styles/global.scss";` // Import SCSS chung nếu có
      }
    }
  }
})
