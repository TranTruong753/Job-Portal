<template>
    <section class="section-4 bg-2">
        <div class="container pt-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class=" rounded-3 p-3">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <a asp-area="EndUser" asp-controller="Job" asp-action="Index">
                                    <i class="fa fa-arrow-left" aria-hidden="true">
                                    </i> &nbsp;Back to Jobs
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container job_details_area">
            <div class="row pb-5">
                <!-- column left -->
                <div class="col-lg-8 col-md-12">
                    <!-- header  -->
                    <div class="card shadow border-0">
                        <div class="job_details_header">
                            <div class="single_jobs white-bg d-flex justify-content-between">
                                <div class="jobs_left d-flex align-items-sm-center gap-4">
                                    <div class="" style="max-width: 150px;">
                                        <a href="#!" class="card-img ">
                                            <img class="center rounded border object-fit-cover"
                                                src="/src/assets/img/fpt_corporation_logo.jpg" alt="">
                                        </a>
                                    </div>
                                    <div class="jobs_conetent">
                                        <a href="#">
                                            <h4>Software Engineer</h4>
                                        </a>
                                        <div class="mb-3">
                                            <a href="#!">
                                                <p class="card-title text-black-50 mb-0">FPT Technology</p>
                                            </a>

                                            <div class="d-flex align-items-center gap-2 mt-2">
                                                <svg fill="none" height="20" stroke="currentColor" viewBox="0 0 24 24"
                                                    width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0044 6V18" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"></path>
                                                    <path
                                                        d="M14.9287 7.90332H10.5395C9.99625 7.90332 9.47527 8.11912 9.09114 8.50325C8.70701 8.88738 8.49121 9.40836 8.49121 9.9516C8.49121 10.4948 8.70701 11.0158 9.09114 11.4C9.47527 11.7841 9.99625 11.9999 10.5395 11.9999H13.4656C14.0088 11.9999 14.5298 12.2157 14.914 12.5998C15.2981 12.9839 15.5139 13.5049 15.5139 14.0482C15.5139 14.5914 15.2981 15.1124 14.914 15.4965C14.5298 15.8806 14.0088 16.0964 13.4656 16.0964H8.49121"
                                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        stroke="currentColor"></path>
                                                    <circle cx="12.0002" cy="12.0002" r="9.3" stroke-width="2"
                                                        stroke="currentColor"></circle>
                                                </svg>
                                                <a class="card-link " href="#!"> <span
                                                        class="text-black fs-6 fw-bolder text-decoration-underline">Sign
                                                        in
                                                        to view salary</span></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="jobs_right">
                                    <div class="apply_now">
                                        <a class="heart_mark" href="#"> <i class="fa fa-heart-o"
                                                aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- info -->
                    <div class="card shadow border-0 my-4">
                        <!-- <div class="job_details_header">
                        <div class="single_jobs white-bg d-flex justify-content-between">
                            <div class="jobs_left d-flex align-items-center">
                                
                                <div class="jobs_conetent">
                                    <a href="#">
                                        <h4>Software Engineer</h4>
                                    </a>
                                    <div class="links_locat d-flex align-items-center">
                                        <div class="location">
                                            <p> <i class="fa fa-map-marker"></i> Noida, India</p>
                                        </div>
                                        <div class="location">
                                            <p> <i class="fa fa-clock-o"></i> Part-time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jobs_right">
                                <div class="apply_now">
                                    <a class="heart_mark" href="#"> <i class="fa fa-heart-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                        <div class="descript_wrap white-bg">
                            <div class="single_wrap">
                                <h4>Job description</h4>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which
                                    don't look even slightly believable. If you are going to use a passage of Lorem
                                    Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                <p>Variations of passages of lorem Ipsum available, but the majority have suffered
                                    alteration in some form, by injected humour, or randomised words which don't look
                                    even slightly believable. If you are going to use a passage of Lorem Ipsum, you need
                                    to be sure there isn't anything embarrassing.</p>
                            </div>
                            <div class="single_wrap">
                                <h4>Responsibility</h4>
                                <ul>
                                    <li>The applicants should have experience in the following areas.</li>
                                    <li>Have sound knowledge of commercial activities.</li>
                                    <li>Leadership, analytical, and problem-solving abilities.</li>
                                    <li>Should have vast knowledge in IAS/ IFRS, Company Act, Income Tax, VAT.</li>
                                </ul>
                            </div>
                            <div class="single_wrap">
                                <h4>Qualifications</h4>
                                <ul>
                                    <li>The applicants should have experience in the following areas.</li>
                                    <li>Have sound knowledge of commercial activities.</li>
                                    <li>Leadership, analytical, and problem-solving abilities.</li>
                                    <li>Should have vast knowledge in IAS/ IFRS, Company Act, Income Tax, VAT.</li>
                                </ul>
                            </div>
                            <div class="single_wrap">
                                <h4>Benefits</h4>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which
                                    don't look even slightly believable. If you are going to use a passage of Lorem
                                    Ipsum, you need to be sure there isn't anything embarrassing.</p>
                            </div>
                            <div class="border-bottom"></div>
                            <div class="pt-3 text-end">
                                <a href="#" class="btn btn-secondary">Save</a>
                                <a href="#" class="ms-2 btn btn-primary">Apply</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- column right -->
                <div class="col-lg-4 col-md-12">
                    <div class="">
                        <button type="button" class="btn btn-primary w-100 p-lg-3">
                            <span>Apply Now</span>
                        </button>
                    </div>
                    <div class="card shadow border-0 my-4">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Job Summery</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Published on: <span>12 Nov, 2019</span></li>
                                    <li>Vacancy: <span>2 Position</span></li>
                                    <li>Salary: <span>50k - 120k/y</span></li>
                                    <li>Location: <span>California, USA</span></li>
                                    <li>Job Nature: <span> Full-time</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card shadow border-0 my-4">
                        <div class="job_sumary">
                            <div class="summery_header pb-1 pt-4">
                                <h3>Company Details</h3>
                            </div>
                            <div class="job_content pt-3">
                                <ul>
                                    <li>Name: <span>XYZ Company</span></li>
                                    <li>Locaion: <span>Noida</span></li>
                                    <li>Webite: <span>www.example.com</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
</template>