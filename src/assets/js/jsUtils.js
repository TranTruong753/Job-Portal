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
       
        // if (userAuth && userAuth.role) {
        //   if (userAuth.role === 'User' || userAuth.role === "Employer") {
        //     next();  // Cho phép truy cập
        //   } else {
        //     next({ name: 'user-login' });  // Chuyển hướng nếu không phải user
        //   }
        // } else {
        //   next({ name: 'user-login' });  // Nếu không có role, chuyển hướng đến trang đăng nhập
        // }
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

export { formatDate, closeModal, checkAuth, checkUserInDb, calculateDaysAgo, formatDateV2 }