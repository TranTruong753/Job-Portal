<template>
     <ul class="list-group list-group-flush ">
        <!-- <div  v-for="item in cardData.content" 
            :key="item.isShow"  >
            <li v-if="item.isShow" 
        
                 :class="['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3']"
                 >
                <router-link class="nav-link" :to="item.linkNav"  @click="item.isActive = true">{{ item.titleNav }}</router-link>
            </li>
        </div> -->
        <div v-for="item in cardData.content" :key="item.id">
            <li v-if="item.isShow"
                :class="['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3']">
                <router-link class="nav-link" :to="item.linkNav" @click="item.isActive = true">{{ item.titleNav }}</router-link>
            </li>
        </div>

    </ul>
</template>

<script>
export default {
    props: {
        cardData: {
            type: Object,
            required: true,
            default: () => ({
               content: [
                {
                    id: 1,
                    titleNav: "default",
                    linkNav: "/",                  
                    isShow: true,
                },
            ]
               
            })
        },
    }
}
</script>