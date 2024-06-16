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
    recipes:{
      default: null
    }
  },
  data() {
    return {
      DisplayColumns: 0,
      offset: 0
    };
  },
  mounted() {
    if (!this.recipes) {
      this.updateRecipes();
    }
  },
  methods: {
    IncreaseOffset(increaseValue = 3){
      this.offset += increaseValue
      this.updateRecipes()
    },
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );
        this.recipes = mockGetRecipesPreview(this.amount, this.offset).data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
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
