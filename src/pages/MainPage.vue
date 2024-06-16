<template>
  
  <div class="page">
    <div class="container">
        <div class="left">
          <RecipePreviewList ref="listOfRecipes" :columns=2 :amount=4 title="Explore these recipes" class="RandomRecipes center" />
          <div class="generate-wrapper">
            <b-button @click="generateRandomRecipes" variant="primary" block class="generate">Generate More Recipes</b-button>
          </div>
        </div>
        <div class="right"> 
          
          <span v-if="!$root.store.username" class="login">
            <div class="login">
              <Login/>
            </div>
          </span>
          <span v-else> 
            <RecipePreviewList title="Last Viewed Recipes" :columns=2 :amount=4 class="RandomRecipes" />
          </span>
        </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from '../components/Login.vue';
 
export default {
  name: 'MainPage',
  components: {
    RecipePreviewList,
    Login
  },
  methods:{
    generateRandomRecipes(){
      this.$refs.listOfRecipes.IncreaseOffset(4)
    },
  }
};
</script>
  
<style >
.page{
  margin-right: 30rem;
  margin-top: 1rem;
}
.container {
  display: flex;
  flex-direction: row;
}
.login{
  margin-top: 25rem;
}
.generate {
  margin-top: 2rem;
}
</style>
