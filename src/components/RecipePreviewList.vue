<template>
  <div class="container">
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row :cols="columns" class="custom-row">
      <b-col v-for="r in recipes" :key="r.id" class="custom-col">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    amount:{
      type: Number,
      required: true
    },
    columns:{
      type: Number,
      required: false,
      default: 3  
    },
    response:{
      require:false
    }
  },
  
  data() {
    return {
      recipes: [],
      DisplayColumns: 0,
      offset: 0
    };
  },
  mounted() {
    this.updateRecipes(this.response);
  },
  methods: {
    IncreaseOffset(increaseValue = 3){
      this.offset += increaseValue
      this.updateRecipes()
    },
    async updateRecipes(response=null) {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );
        if (!response)
          response = mockGetRecipesPreview(this.amount, this.offset);
        
        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    getRecipesFromApi(response){
        this.recipes = []
        this.recipes.push(...response)
    }
  }
};
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
  width: 800px;
  align-items: center;
}
.custom-row {
  row-gap: 50px; /* Adjust this value to increase the spacing between rows */
}

</style>
