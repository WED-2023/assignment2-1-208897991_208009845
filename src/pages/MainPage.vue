<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList ref="listOfRecipes" title="Randome Recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    <div>
     <b-button @click="generateRandomRecipes" block variant="primary">More Recipes</b-button>
    </div>
    <!-- <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled> </RecipePreviewList> -->
      <span v-if="!$root.store.username"><Login/></span>
      <span v-else> 
                    <RecipePreviewList title="Last Viewed Recipes" class="RandomRecipes" disabled/>
      </span>
     
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from '../components/Login.vue';
export default {
  components: {
    RecipePreviewList,
    Login
  },
  methods:{
    generateRandomRecipes(){
      this.$refs.listOfRecipes.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
