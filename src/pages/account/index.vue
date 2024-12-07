
<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useRoute } from 'vue-router';
import { convertToUrlV2,closeModal } from '@/assets/js/jsUtils';
import '@/assets/css/footer.css';
    import '@/assets/css/style.css';
    import '@/assets/css/mycss.css';

const authStore = useAuthStore();
const route = useRoute();
const urlImg = ref('/src/assets/img/avatar7.png');
const img = ref('');
const errorSrc = ref('');
console.log(route.path)

onMounted(async ()=>{
    console.log(authStore.role);
    if(authStore.role === 'User'|| authStore.role === 'Admin'){
        await authStore.getUserData();
    }else if(authStore.role === 'Employer'){
        await authStore.getEmployer()
    }
    if(authStore.userData.img){
        urlImg.value = convertToUrlV2(authStore.userData.img);
    }
})

const data = reactive({
    content: [
        {
            id: 13,
            titleNav: 'Account Settings',
            linkNav: '/account',
            isShow: true,
            isActive: false,
        },
        {
            id: 2,
            titleNav: 'My Profile',
            linkNav: '/account/profile',
            isShow: authStore.role === 'User' || authStore.role === 'Admin',
            isActive: false,
        },
        {
            id: 3,
            titleNav: 'My Profile Employer',
            linkNav: '/account/profile-employer',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
        {
            id: 4,
            titleNav: 'Post a Job',
            linkNav: '/account/post-job',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
        {
            id: 5,
            titleNav: 'Post a Blog',
            linkNav: '/account/post-blog',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
        {
            id: 6,
            titleNav: 'My Jobs',
            linkNav: '/account/my-jobs',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
        {
            id: 7,
            titleNav: 'My Blogs',
            linkNav: '/account/my-blogs',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
        {
            id: 8,
            titleNav: 'Jobs Applied',
            linkNav: '/account/jobs-applied',
            isShow: authStore.role === 'User',
            isActive: false,
        },
        {
            id: 9,
            titleNav: 'Saved Jobs',
            linkNav: '/account/saved-jobs',
            isShow: authStore.role === 'User',
            isActive: false,
        },
        {
            id: 10,
            titleNav: 'Create CV test',
            linkNav: '/account/create-cv-test',
            isShow: false,
            isActive: false,
        },
        {
            id: 11,
            titleNav: 'Create CV',
            linkNav: '/account/create-cv',
            isShow: false,
            isActive: false,
        },
        {
            id: 12,
            titleNav: 'Charts',
            linkNav: '/account/charts-employer',
            isShow: authStore.role === 'Employer',
            isActive: false,
        },
    ],
});

const linktitle = ref('');

const handleFileChange = (event) => {
    const fileInput = document.getElementById("imgSrc"); 
    const file = event.target.files[0];  // Lấy file đã chọn
    if (file && file instanceof File) {
        // Kiểm tra xem file có phải là hình ảnh hay không
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (allowedImageTypes.includes(file.type)) {
            img.value = file;
            errorSrc.value = '';
        } else {
            // Thông báo nếu không phải là hình ảnh
            errorSrc.value = 'Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF)'
            // img.value = null; // Xóa giá trị file nếu không phải hình ảnh
           
            if (fileInput) { 
                fileInput.value = ''; // Reset input file thực sự 
            }
        }
    }
};

const handleAddFile = () => {
    // console.log(img.value)
    // console.log(errorSrc.value)
    const fileInput = document.getElementById("imgSrc"); 
    if( img.value && errorSrc.value === ''){
       
        console.log(img.value, 'img.value');
        closeModal('#exampleModal');
        errorSrc.value = ''
        if(changeAvater(img.value)){
            urlImg.value = URL.createObjectURL(img.value); // Tạo URL tạm thời từ file
            if (fileInput) { 
                fileInput.value = ''; // Reset input file thực sự 
                img.value = ''
            }
        }
    }else{
         errorSrc.value = 'Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF)'
         
    }
}

const changeAvater = async (img) => {
    const isSuccess = await authStore.postAvatar(img);
    if(authStore.role === 'User'|| authStore.role === 'Admin'){
        await authStore.getUserData();
    }else if(authStore.role === 'Employer'){
        await authStore.getEmployer()
    }
    return isSuccess;
}

// Watch the route and update isActive accordingly
watchEffect(() => {
    data.content.forEach(navItem => {
        navItem.isActive = route.fullPath === navItem.linkNav;
    });
    console.log('route:',route.path);
    const activeItem = data.content.find(navItem => navItem.isActive);
    if (activeItem) {
        linktitle.value = activeItem.titleNav;
    } else {
        linktitle.value = ''; // Giá trị mặc định nếu không có route nào khớp
     
        if(route.name === 'account-list-applicants'){
            linktitle.value = 'Applicant'
        }
        
    }
});

const onClick = (item) => {
    // Resetting all items' isActive to false
    data.content.forEach(navItem => {
        navItem.isActive = false;
    });
    // Set isActive to true for the clicked item
    item.isActive = true;
    linktitle.value = item.titleNav;
};
</script>

<template>

    <section class="section-5 bg-2">
        <div class="container py-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class=" rounded-3 p-3 mb-4">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                            <li class="breadcrumb-item active">{{linktitle}}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="card border-0 shadow mb-4 p-3">
                        <div class="s-body text-center mt-3">
                            <img :src="urlImg" alt="avatar" class="shadow rounded-circle img-fluid object-fit-cover"
                                style="width: 150px;height: 150px;">
                            <h5 class="mt-3 pb-0 mb-3 fs-4">{{authStore.fullname}}</h5>
                            <!-- <p class="text-muted mb-1 fs-6">Full Stack Developer</p> -->
                            <div class="d-flex justify-content-center mb-2">
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button"
                                    class="btn btn-primary w-">Add Avatar</button>
                            </div>
                        </div>
                    </div>
                    <div class="card account-nav border-0 shadow mb-4 mb-lg-0">
                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush ">
                                <div v-for="item in data.content" :key="item.id" @click="onClick(item)">
                                    <router-link :to="item.linkNav"  v-if="item.isShow"
                                        :class="['nav-link','list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', { 'bg-primary--change': item.isActive } ]">
                                    
                                          <span>  {{ item.titleNav }}</span>
                                        
                                    </router-link>
                                </div>
                            </ul>
                        
                        
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <router-view></router-view>
                </div>

            </div>
        </div>
    </section>

    <!-- Modal -->   
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title pb-0" id="exampleModalLabel">Change Profile Picture</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Profile Image</label>
                            <input  type="file" class="form-control" id="imgSrc" name="image"  @change="handleFileChange">
                            <span class="text-danger">{{errorSrc}}</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary mx-3" @click="handleAddFile">Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    
    

</template>

<style>
    .text-danger {
    display: block;
    height: 24px;
    padding: 8px 0;
    font-size: 13px;
}

textarea {
        height: 17vh !important; 
        resize: none;
    }


.password-toggle-different {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);

}

.input__repassword, .input__password {
    position: relative;
}

.bg-primary--change {
    background: #d34127;
    color: #fff !important
}




</style>