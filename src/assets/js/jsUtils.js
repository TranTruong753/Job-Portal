// authUtils.js
import { getCookie } from '@/assets/js/cookieUtils.js';
import { useAuthStore } from '@/stores/auth.js';

const formatDate = (date) => {
    if (!date) return ""; // Kiểm tra nếu không có ngày thì trả về chuỗi rỗng
    return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const closeModal = (string) => {
    const modalElement = document.querySelector(string);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


function checkAuth(next) {
    const userAuth = useAuthStore();
    const token = getCookie('token');

    if (token) {
        userAuth.checklogin(token);  // Gọi hàm checklogin mà không dùng then (vì là đồng bộ)
       
        if (userAuth && userAuth.role) {
            return userAuth.role;

        } else {
            next({ name: 'user-login' });  // Nếu không có role, chuyển hướng đến trang đăng nhập
        }


    } else {
        next({ name: 'user-login' });  // Nếu không có token, chuyển hướng đến trang đăng nhập
    }
}

async function  checkUserInDb(){
    const userAuth = useAuthStore();
    const isUser = await userAuth.checkUser();
    return isUser;
}



function checkUserEmployer(next, allowedRoles = []) {
    const userAuth = useAuthStore();
    const token = getCookie('token');

    if (token) {
        userAuth.checklogin(token);  // Gọi hàm checklogin mà không dùng then (vì là đồng bộ)

        if (userAuth && userAuth.role) {
            // Kiểm tra nếu role của người dùng có trong danh sách cho phép
            if (allowedRoles.includes(userAuth.role)) {
                next();  // Cho phép truy cập
            } else {
                next({ name: 'user-login' });  // Chuyển hướng nếu không phải role được phép
            }
        } else {
            next({ name: 'user-login' });  // Nếu không có role, chuyển hướng đến trang đăng nhập
        }
    } else {
        next({ name: 'user-login' });  // Nếu không có token, chuyển hướng đến trang đăng nhập
    }
}

function calculateDaysAgo(dateString) {
    if (!dateString) return "Unknown";
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = currentDate - createdDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Chuyển mili giây sang ngày
    return daysAgo > 0 ? `Posted ${daysAgo} days ago` : "Posted today";
}

function formatDateV2(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}


function formatDateForInput(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return ''; // Trả về chuỗi rỗng nếu ngày không hợp lệ
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 nếu cần
    const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 nếu cần
  
    return `${year}-${month}-${day}`;
  }

  function convertToUrl(path) {
    // Thay thế dấu \ thành dấu / và thêm tiền tố base URL
    const baseUrl = 'https://localhost:7283/';
    const formattedPath = path.replace(/\\/g, '/'); // Thay thế \ thành /
    return baseUrl + formattedPath.split('wwwroot')[1]; // Thêm phần sau 'wwwroot' vào URL
}

function convertToUrlV2(path) {
    // Thay thế dấu \ thành dấu / và thêm tiền tố base URL
    const baseUrl = 'https://localhost:7283/';
   
    return baseUrl + path; // Thêm phần sau 'wwwroot' vào URL
}

function formatCurrencyVND(number) {
    return new Intl.NumberFormat('vi-VN').format(number);
}


function resetTiny(id) {
    const editor = tinymce.get(id); // Thay 'editorId' bằng ID của TinyMCE
    if (editor) {
        editor.setContent(''); // Đặt nội dung trống
        return true
    }
    return false
}

export { resetTiny,formatDate, closeModal, checkAuth, checkUserInDb, calculateDaysAgo, formatDateV2, formatDateForInput, convertToUrl, formatCurrencyVND, convertToUrlV2 }