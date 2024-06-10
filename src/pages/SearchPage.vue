
<template>
<div>
  <!-- search components -->
  <b-input-group prepend="Search" class="mt-3">
    <b-form-input v-model="searchMessage"></b-form-input>
    <b-input-group-append>
      <b-button variant="info">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>
</template>

<script>
  export default {
    name: "SaerchPage",
    data(vm){
      return{
        searchMessage:""
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>