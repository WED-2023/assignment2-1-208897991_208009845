<template>
  <b-container>
    <h3>
      {{ title }}:
      {{ DisplayColumns }}
      <slot></slot>
    </h3>
    <b-row :cols="DisplayColumns" class="custom-row">
      <b-col v-for="r in recipes" :key="r.id" class="custom-col">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
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
      required: false
    }
  },
  
  data() {
    return {
      recipes: [],
      DisplayColumns: 0
    };
  },
  mounted() {
    this.updateRecipes();
    this.CalculateColumns();
  },
  methods: {
    CalculateColumns(){
      console.log("hi")
      if (this.columns > 0) {
        this.DisplayColumns = this.columns
      }
    },
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );
        const response = mockGetRecipesPreview(this.amount);


        console.log(response);
        const recipes = response.data.recipes;
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
.custom-row {
  row-gap: 50px; /* Adjust this value to increase the spacing between rows */
}

</style>
