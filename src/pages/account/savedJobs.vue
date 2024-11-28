<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import {formatDateV2} from '@/assets/js/jsUtils'
import { debounce } from 'lodash';
import { formatCurrencyVND } from '@/assets/js/jsUtils.js'

    const authStore = useAuthStore();
    onMounted(async ()=>{
        await authStore.getListSaveUser(query.value);
        
    })

    const query = ref('');

    const handleUnSave = async(id) => {
        await authStore.SavedJobs(id,false);
        authStore.updateIsShowUserForJobSave(id);
    }

    const handleQuery = debounce(async () => {
        await authStore.getListSaveUser(query.value);
    },300)

</script>
<template>
    <div class="card border-0 shadow mb-4 p-3">
        <div class="card-body card-form">
            <h3 class="fs-4 mb-1">Saved Jobs </h3>
            <div class="mb-4 row">
              
                <div class="col-lg-4" >
                    <input v-model="query" type="text" placeholder="Keywords" class="form-control" @input="handleQuery"/>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table ">
                    <thead class="bg-light">
                        <tr>
                            <th scope="col">Job name</th>
                            <th scope="col">Job Created</th>
                            <th scope="col">Job Type</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-0">
                        <tr v-for="(item,index) in authStore.listJobSaved">
                            <td v-if="item.isShowUser">
                                <div class="job-name fw-500">{{item.title}}</div>
                                <div class="info1"> {{ item.jobLevel }}</div>
                            </td>
                            <td  v-if="item.isShowUser">{{formatDateV2(item.createOn)}}</td>
                            <td  v-if="item.isShowUser">{{ item.jobType }}</td>
                            <td  v-if="item.isShowUser">
                                <div class="job-status ">{{ formatCurrencyVND(item.salary) }} VND</div>
                            </td>
                            <td  v-if="item.isShowUser">
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <routerLink  :to="`/job/detail/${item.id}`" class="dropdown-item" href="job-detail.html"> <i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</routerLink>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" @click="handleUnSave(item.id)">
                                                <i class="fa-solid fa-circle-xmark"></i>
                                                <span>unsave</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" @click="authStore.updateIsShowUserForJobSave(item.id)">
                                                <i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove
                                            </a>
                                        </li>
                                                    
                                    </ul>
                                </div>
                            </td>
                        </tr>
                       
                        <!-- <tr class="active">
                            <td>
                                <div class="job-name fw-500">Web Developer</div>
                                <div class="info1">Fulltime . Noida</div>
                            </td>
                            <td>05 Jun, 2023</td>
                            <td>130 Applications</td>
                            <td>
                                <div class="job-status text-capitalize">active</div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="job-detail.html"> <i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr class="pending">
                            <td>
                                <div class="job-name fw-500">  .html Developer </div>
                                <div class="info1">Part-time . Delhi</div>
                            </td>
                            <td>13 Aug, 2023</td>
                            <td>20 Applications</td>
                            <td>
                                <div class="job-status text-capitalize">pending</div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="job-detail.html"> <i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr class="expired">
                            <td>
                                <div class="job-name fw-500">Full Stack Developer</div>
                                <div class="info1">Fulltime . Noida</div>
                            </td>
                            <td>27 Sep, 2023</td>
                            <td>278 Applications</td>
                            <td>
                                <div class="job-status text-capitalize">expired</div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="job-detail.html"> <i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr class="active">
                            <td>
                                <div class="job-name fw-500">Developer for IT company</div>
                                <div class="info1">Fulltime . Goa</div>
                            </td>
                            <td>14 Feb, 2023</td>
                            <td>70 Applications</td>
                            <td>
                                <div class="job-status text-capitalize">active</div>
                            </td>
                            <td>
                                <div class="action-dots float-end">
                                    <a href="#" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="job-detail.html"> <i class="fa fa-eye"
                                                    aria-hidden="true"></i> View</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fa fa-trash"
                                                    aria-hidden="true"></i> Remove</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>