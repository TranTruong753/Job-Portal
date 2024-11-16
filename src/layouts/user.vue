<script setup>
    import HeaderUser from "../components/header.vue"
    import FooterUser from "../components/footer.vue"
 

   
</script>
<template >

    <HeaderUser/>

    <main role="main">
        
        <router-view></router-view>
    </main>

    <FooterUser/>

    

</template>




