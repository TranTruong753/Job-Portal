<template>
   
    <div v-show="cardData.isShow" :class="cardData.cssStyle" :id="cardData.id">
        <div class="card card-h-100 shadow border-0">
            <div class="card-header bg-white">
                <div class="card-img__grou d-flex justify-content-between align-content-start gap-3 ">
                    <a href="#!" class="card-img" style="width: 80px;">
                        <img class="center rounded object-fit-cover" :src="cardData.imgSrc" :alt="cardData.imgAlt">
                    </a>
                    <button class=" border-0 bg-transparent p-0" style="height: 100%;">
                        <span>
                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>

                <div>
                    <RouterLink  :to="`/company/detail/${cardData.id}`">
                        <p class="card-title fw-bolder fs-4 mb-0">{{ cardData.name }}</p>
                        <p class="card-title text-black-50 mb-0">{{ cardData.title }}</p>
                    </RouterLink>
                   

                    <!-- <a class="card-link " href="#!">
                        <span class="text-primary small fw-bolder text-decoration-underline">
                            {{ cardData.salary }}
                        </span>
                    </a> -->

                </div>

            </div>

            <div class="card-body pt-2 pb-3">
                <div class="mb-1">
                  
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0">
                            <span class="fw-bolder fs-5"><i class="fa fa-map-marker"></i></span>
                            <span class="ps-1"> {{ cardData.location }} </span>
                        </p>
                        <!-- <p class="mb-0">
                            <span class="fw-bolder "><i class="fa fa-clock-o"></i></span>
                            <span class="ps-1"> {{ cardData.type }} </span>
                        </p> -->
                        <a href="#!">
                            <span class="text-primary small fw-bolder">
                                {{ cardData.jobs }} jobs
                            </span>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </div>
  
</template>

<script>
export default {
    props: {
        cardData: {
            type: Object,
            required: true,
            default: () => ({
                id:'',
                imgSrc: '',
                imgAlt: 'Default Image',
                name: 'default',
                title: 'Default Title',
                salary: 'Salary negotiable',
                location: 'Default Location',
                type: 'Default Type',
                jobs: 0,
                cssStyle: '',
                isShow: true,
                isSave: false
            })
        }
    }
}
</script>