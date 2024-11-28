<template>
    <!-- col-12 col-lg-4 col-md-6 -->
    <div v-show="cardData.isShow" :class="cardData.styleCss">
        <div :class="cardData.isShowStyle">
            <router-link :to="`/blog/detail/${cardData.id}`" > 
                <img :src="cardData.imgSrc" class=" img-fluid card-img-height"
                    :alt="cardData.imgAlt">
            </router-link>
            <div class="card-body">
                <router-link  :to="`/blog/detail/${cardData.id}`" class="text-black">
                    <h5 class="pb-1 card-title truncate-2">
                        {{cardData.name}}
                    </h5>
                </router-link>
                <p class="card-text truncate-3">
                    {{cardData.description}}
                </p>
                <div class="d-flex align-items-end justify-content-between">
                    <router-link :to="`/blog/detail/${cardData.id}`" class="btn btn-primary">Read more</router-link>
                    <span class="text-black-50 small">{{cardData.timePost}}</span>
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
                id: 1,
                imgSrc: '',
                imgAlt: 'Default Image',
                name: 'default name',
                description: 'default title',
                timePost: 'Default time post',    
                isSave: false,
                isShow: true,
                styleCss: '',
                isShowStyle: 'card-h-100 card border-0'

            })
        }
    }
  
}
</script>