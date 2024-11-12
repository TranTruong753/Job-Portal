<script setup>
    import HeaderUser from "../components/header.vue"
    import FooterUser from "../components/footer.vue"
    import Other from "../components/other.vue"
    import { onMounted } from "vue";

    onMounted(()=>{
        console.log("layout")
        // Your code here to handle the page load logic
    });
</script>
<template >

    <HeaderUser/>

    <main role="main">
        
        <router-view></router-view>
    </main>

    <FooterUser/>

    <Other/>

</template>




