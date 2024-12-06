<script setup>


</script>
<template>
    <div class="row g-4">
        <div class="col-sm-12 col-lg-9 ">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Detail Account</h4>
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="text" class="form-control" id="floatingUserName" placeholder="username123">
                        <label for="floatingUserName">User Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="text" class="form-control" id="floatingFullName" placeholder="FullName123">
                        <label for="floatingFullName">Full Name</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email </label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="tel" class="form-control" id="floatingPhone" placeholder="Not update Phone" value="Not update Phone">
                        <label for="floatingPhone">Phone</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="Date" class="form-control" id="floatingDate" placeholder="Date">
                        <label for="floatingDate">Birth Date</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="Text" class="form-control" id="floatingSex" placeholder="Sex">
                        <label for="floatingSex">Sex</label>
                    </div>
                    <div class="form-floating mb-3 col-lg-6">
                        <input type="Text" class="form-control" id="floatingRole" placeholder="Role">
                        <label for="floatingRole">Role</label>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger">Back To List</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-3">
            <div class="bg-light rounded h-100 p-4">
                <h4 class="mb-4 fw-bold text-primary">Imge</h4>
                <div class="card">
                    <img src="" class="card-img-top" alt="...">

                </div>
            </div>
        </div>
    </div>
</template>