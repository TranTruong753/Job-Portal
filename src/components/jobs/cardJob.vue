<template>
    <div  v-show="cardData.isShow"  :class="cardData.styleCss" >
        <div :class="cardData.styleCard" >
            <div class="card-header bg-white">
                <div class="d-flex justify-content-between">
                    <p class="small mb-1">{{ cardData.timePost }}</p>
                    <button class="border-0 bg-transparent p-0">
                        <span>
                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"
                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>
                <router-link :to="`/job/detail/${cardData.id}`">
                    <p class="card-title h5 fw-bolder truncate-1 ">
                        {{ cardData.name }}
                    </p>
                </router-link>
               
                <div class="card-img__grou d-flex gap-3 align-items-center">
                    <a href="#!" class="card-img border rounded" style="width: 60px;height: 60px; ">
                        <img class="center  object-fit-cover" :src="cardData.imgSrc" :alt="cardData.imgAlt">
                    </a>
                    <a href="#!" class="card-img-title ">
                        <p class="small  fw-bolder mb-0 text-black">
                            {{ cardData.nameCompany }}
                        </p>
                    </a>
                </div>
                <div class="d-flex align-items-center gap-2 mt-2">
                    <svg fill="none" height="20" stroke="currentColor" viewBox="0 0 24 24" width="20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0044 6V18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        <path
                            d="M14.9287 7.90332H10.5395C9.99625 7.90332 9.47527 8.11912 9.09114 8.50325C8.70701 8.88738 8.49121 9.40836 8.49121 9.9516C8.49121 10.4948 8.70701 11.0158 9.09114 11.4C9.47527 11.7841 9.99625 11.9999 10.5395 11.9999H13.4656C14.0088 11.9999 14.5298 12.2157 14.914 12.5998C15.2981 12.9839 15.5139 13.5049 15.5139 14.0482C15.5139 14.5914 15.2981 15.1124 14.914 15.4965C14.5298 15.8806 14.0088 16.0964 13.4656 16.0964H8.49121"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor"></path>
                        <circle cx="12.0002" cy="12.0002" r="9.3" stroke-width="2" stroke="currentColor"></circle>
                    </svg>
                   
                   
                        <span class="text-black fs-6 fw-bolder ">
                            {{ cardData.salary }}
                        </span>
                        <span> - </span >
                        <span class="text-black fs-6 fw-bolder ">
                            {{cardData.level}}
                        </span>
                   
                    
                </div>
        
            </div>
            <div class="card-body pt-2 pb-3">
                <div class="mb-1">
                   
                    <p class="mb-0 truncate-1">
                        <span class="fw-bolder fs-5"><i class="fa fa-map-marker"></i></span>
                        <span class="ps-1">: {{cardData.location}}</span>
                    </p>
                    <p class="mb-0">
                        <span class="fw-bolder "><i class="fa fa-clock-o"></i></span>
                        <span class="ps-1">: {{cardData.type}}</span>
                    </p>
                </div>
                <div class=" truncate-1">
                    <button type="button" class="mt-1 me-1 btn btn-outline-secondary btn-skill" v-for="skill in cardData.skill">{{skill.msg}}</button>
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
                id: '',
                imgSrc: '',
                imgAlt: 'Default Image',
                name: 'default',
                nameCompany: 'default company',
                timePost: 'Default time post',
                salary: 'Salary negotiable',
                location: 'Default Location',
                type: 'Default Type',
                level: 'Default Level',
                skill: [{msg:'default'}],
                isSave: false,
                isShow: true,
                styleCss: '',
                styleCard:''

            })
        }
    },
    methods: {
        handleClick() {
        this.$emit('card-click', this.cardData);
        },
  },
  
}
</script>

<style>


</style>