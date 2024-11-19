<script setup>
import { onMounted } from 'vue';
import { initializeTinyMCE } from '@/assets/js/blog.js';

onMounted(() => {
    initializeTinyMCE();  // Gọi hàm khởi tạo TinyMCE
});
</script>

<template>
    <div class="card border-0 shadow mb-4 ">
        <div class="card-body card-form p-4">
            <h3 class="fs-4 mb-1">Blog</h3>
           
              
            
            <div class="row">
                <div class="col-md-9 mb-4">
                    <label for="" class="mb-2">Title<span class="req">*</span></label>
                    <input type="text" placeholder="Job Title" id="title" name="title" class="form-control">
                    
                    <label for="" class="mb-2">Description<span class="req">*</span></label>
                    <textarea class="form-control" name="description" id="description" cols="5" rows="5"
                        placeholder="Description"></textarea>
                </div>

                  <div class="col-lg-3">
                    <div class="d-flex flex-column m-4 align-items-center gap-3">
                        <div class="border rounded border-1 w-100">
                            <img class="img-thumbnai object-fit-cover shadow" src=""
                                alt="chưa có hình">
                         
                        </div>
                        <button class=" btn btn-primary w-75" data-bs-toggle="modal" data-bs-target="#changeBlog"
                            type="button">Add</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Create Blog</button>
        </div>
    </div>

       <!-- modal change blog img -->
       <div class="modal fade" id="changeBlog" tabindex="-1" aria-labelledby="changeBlogLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="changeBlogLabel">Add Picture Blog</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Logo Image</label>
                                <input type="file" class="form-control" id="image" name="image">
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary mx-3">Update</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>