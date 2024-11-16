<template>
  <Generalinformation></Generalinformation>

  <Workexperience></Workexperience>

  <Educationalinformation></Educationalinformation>

  <Certificate></Certificate>
 
  <Specializedskills></Specializedskills>

  <Otherskills></Otherskills>
</template>

<style>
.text-danger {
    display: block;
    height: 24px;
    padding: 8px 0;
    font-size: 13px;
}
</style>

<script setup>
  import Workexperience from "@/components/modalCv/workexperience.vue"
  import Educationalinformation from "@/components/modalCv/educationalinformation.vue"
  import Certificate from "@/components/modalCv/certificate.vue"
  import Specializedskills from "@/components/modalCv/specializedskills.vue"
  import Otherskills from "@/components/modalCv/otherskills.vue"
   import Generalinformation from "@/components/modalCv/generalinformation.vue"
</script>