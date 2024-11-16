<template>
    <!-- Personal Information -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">Personal Information</h3>
            <div class="pt-0 row g-3">
                <div class="col-lg-6">
                    <label for="" class="mb-2">Full Name<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Name" class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Email<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Email" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Date of Birth<span class="text-primary">*</span></label>
                    <input type="date" placeholder="Designation" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Sex<span class="text-primary">*</span></label>
                    <div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                value="option1">
                            <label class="form-check-label" for="inlineRadio1">Men</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value="option2">
                            <label class="form-check-label" for="inlineRadio2">Women</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                                value="option3">
                            <label class="form-check-label" for="inlineRadio3">Other</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div>
    </div>

    <!-- Company Information -->
    <div class="card border-0 shadow mb-4  ">
        <div class="card-body p-4">
            <h3 class="mt-3 fs-4 mb-1">Company Information</h3>
            <div class="pt-0 row g-3">
                <div class="col-lg-3">
                    <div class="d-flex flex-column m-4 align-items-center gap-3">
                        <div class="">
                            <img class="img-thumbnai object-fit-cover shadow" src="/src/assets/img/edutech_logo.png"
                                alt="">
                        </div>
                        <button class=" btn btn-primary w-75" data-bs-toggle="modal" data-bs-target="#changeLogo"
                            type="button">change</button>
                    </div>
                </div>
                <div class="col-lg-12">
                    <label for="" class="mb-2">Name Company<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Name Company" class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">tax code<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter tax code" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Item 01<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Item 01" class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Item 02<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Item 02" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Item 03<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Enter Item 01" class="form-control" value="">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Item 04<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Item 02" class="form-control">
                </div>
                <div class="col-lg-6">
                    <label for="" class="mb-2">Item 05<span class="text-primary">*</span></label>
                    <input type="text" placeholder="Item 02" class="form-control">
                </div>

            </div>

        </div>
        <div class="card-footer  p-4">
            <button type="button" class="btn btn-primary">Update</button>
        </div>

        <div class="modal fade" id="changeLogo" tabindex="-1" aria-labelledby="changeLogoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pb-0" id="changeLogoLabel">Change Logo Picture</h5>
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
        
    </div>

</template>