// cookieUtils.js

// Hàm lấy giá trị của cookie theo tên
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  // Hàm set cookie
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // Tính thời gian hết hạn
    let expires = "expires=" + d.toUTCString();
  
    // Cấu hình cookie với các thuộc tính: path, expires, SameSite, và Secure
    document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=Lax;Secure`;
  }
  
  function deleteCookie(cname) {
    // Đặt lại cookie với thời gian hết hạn trong quá khứ để xóa cookie
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  // Xuất các hàm để sử dụng ở các file khác
  export { getCookie, setCookie, deleteCookie };
  