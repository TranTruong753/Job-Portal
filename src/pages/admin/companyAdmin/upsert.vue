<script setup>
import { useCompanyAdminStore } from '@/stores/admin/companyAdmin';
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref, reactive, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDateForInput, convertToUrlV2, closeModal } from '@/assets/js/jsUtils'
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute()
const companyStore = useCompanyAdminStore();
// const companyAdminData = ref('')

const idCompany = route.params.id;

// const dateCreate = ref('');
// const dateUpdate = ref('');
const urlImg = ref('')
// const img = ref('')
const errorSrc = ref('')


const editorConfig = {
    height: 400,
    menubar: false,
    plugins: ['link', 'image', 'lists'],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | bullist numlist',
    readonly: true,
};

onMounted(async () => {
    if(idCompany){

        await companyStore.getCompanyById(idCompany);
       
    }

    if(companyStore.companyData){
            urlImg.value = convertToUrlV2(companyStore.companyData.logo)


        
            setName(companySubmit.Name = companyStore.companyData.name);
            setIndustry(companySubmit.Industry = companyStore.companyData.industry) ;
            setDescription(companySubmit.Description = companyStore.companyData.description);
            setWebsite(companySubmit.Website = companyStore.companyData.website);
            setEmail(companySubmit.Email = companyStore.companyData.email);
            setPhone(companySubmit.Phone = companyStore.companyData.phone);
            // setImg(companySubmit.Img = companyStore.companyData.logo);
    }else{
        urlImg.value = '/src/assets/img/avatar7.png'
        
    }
   
})

onUnmounted(()=>{
    companyStore.$reset()
})


const companySubmit = reactive({
    Id: 0,
    Name: '',
    Industry: null,
    Description: '',
    Website: '',
    Email: '',
    Phone: '',
    Img:'',
})

const schema = yup.object({
  Name: yup.string().required('Company Name is required'),
  Industry: yup.string().required('Industry is required'),
  Description: yup.string().required('Description is required'),
  Website: yup.string().required('Website is required'),
  Email: yup.string().email('Email must be a valid email').required('Email is required'),
//   Phone: yup
//   .string()
//   .matches(
//     /^(0[3|5|7|8|9])+([0-9]{8})$/,
//     'Phone must be a valid Vietnamese phone number'
//   )
//   .required('Phone is required'),
    Phone: yup
        .string()
        .matches(/^\d+$/, 'Phone must be a number')
        .required('Phone is required'),
    Img: idCompany ? yup.string().nullable() : yup.string().required('Image is required'),
});



const { handleSubmit, resetForm } = useForm({
    validationSchema: schema, // Áp dụng schema
    initialValues: companySubmit,   // Gán giá trị ban đầu từ userObj
    validateOnBlur: true,
});


const { value: Name, errorMessage: NameError, setValue:setName } = useField('Name');
const { value: Email, errorMessage: EmailError , setValue:setEmail} = useField('Email');
const { value: Industry, errorMessage: IndustryError, setValue:setIndustry } = useField('Industry');
const { value: Website, errorMessage: WebsiteError , setValue:setWebsite} = useField('Website');
const { value: Description, errorMessage: DescriptionError, setValue:setDescription} = useField('Description');
const { value: Phone, errorMessage: PhoneError , setValue:setPhone} = useField('Phone');
const { value: Img, errorMessage: ImgError , setValue:setImg} = useField('Img');



const onSubmit = handleSubmit(
        async values => {
            if(idCompany){

                values.Id = idCompany;
            }else{
                values.Id = 0;
            }
            console.log('Data submit',values)
            const isSuccess = await companyStore.upsertCompany(values);
            if(isSuccess){
                console.log('thanh cong')
                Swal.fire({
                    title: idCompany?'Update Company Job!':'Add Company Job!',
                    text: 'Success',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(()=>{
                    router.push('/admin/company')
                });
            }else{
                console.log('that bai')
                Swal.fire({
                    title: idCompany?'Update Company Job!':'Add Company Job!',
                    text: 'Fail',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
           
        },
        ({ errors }) => {
            const firstError = Object.keys(errors)[0];
            const el = document.querySelector(`[name="${firstError}"]`);
            el?.scrollIntoView({
                behavior: 'smooth',
            });
            el.focus();
        },
);



const handleFileChange = (event) => {
    const fileInput = document.getElementById("imgSrc"); 
    const file = event.target.files[0];  // Lấy file đã chọn
    if (file && file instanceof File) {
        // Kiểm tra xem file có phải là hình ảnh hay không
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (allowedImageTypes.includes(file.type)) {
            setImg(file);
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
    if( Img.value && errorSrc.value === ''){
       
        console.log(Img.value, 'img.value');
        closeModal('#addLogo');
        errorSrc.value = ''
       
        urlImg.value = URL.createObjectURL(Img.value); // Tạo URL tạm thời từ file
           
    }else{
         errorSrc.value = 'Vui lòng chọn một file hình ảnh (JPEG, PNG, GIF)'
         
    }
}

</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-9 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">{{ idCompany?'Update Company':'Create Company' }}</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-6">
                        <input  v-model="Name"type="text" class="form-control" id="floatingCompanyName" name="Name" placeholder="Công ty xyz...">
                        <label for="floatingCompanyName">Company Name</label>
                        <span class="text-danger">{{ NameError }}</span>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input  v-model="Industry" type="text" class="form-control" id="floatingIndustry" name="Industry" placeholder="Xây dựng...">
                        <label for="floatingIndustry">Industry</label>
                        <span class="text-danger">{{ IndustryError }}</span>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input  v-model="Website" type="text" class="form-control" id="floatingInput" name="Website" placeholder="name.example.com">
                        <label for="floatingInput">Website </label>
                        <span class="text-danger">{{ WebsiteError }}</span>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input   v-model="Email" type="email" class="form-control" id="floatingEmail" name="Email" placeholder="name@example.com">
                        <label for="floatingEmail">Email</label>
                        <span class="text-danger">{{ EmailError }}</span>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input  v-model="Phone" type="tel" class="form-control" id="floatingPhone" name="Phone" placeholder="Phone">
                        <label for="floatingPhone">Phone</label>
                        <span class="text-danger">{{ PhoneError }}</span>
                    </div>
                  
                    <div class="col-lg-12">
                        <label for="description" class="mb-2">Description</label>
                        <Editor
                            v-model="Description"
                            apiKey="2ejhh9vscfzh8ssrdz6zerfb93x9zmatio3l0iwfcbfkd8w8"
                            :init="editorConfig"
                            name="Description"
                            id="description"
                            
                        />
                        <span class="text-danger">{{ DescriptionError }}</span>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <router-link to="/admin/company" type="button" class="btn btn-danger">Back To List</router-link>
                        <button style="button" @click="onSubmit" class="btn btn-primary"> {{ idCompany?'Update Company':'Create Company' }}</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-3">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Imge</h4>
                <div class="card">
                    <img :src="urlImg" name="Img" class="card-img-top object-fit-cover" alt="...">
                    
                </div>
                <span class="text-danger">{{ ImgError }}</span>
                <div class="mt-2 ">
                    <button class="btn btn-primary w-100"  data-bs-toggle="modal" data-bs-target="#addLogo">Add Img</button>
                </div>
            </div>
        </div>
    </div>

     <!-- modal change blog img -->
     <div class="modal fade" id="addLogo" tabindex="-1" aria-labelledby="addLogoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="addLogoLabel">Add Logo Company</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form >
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Logo Image</label>
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
</style>