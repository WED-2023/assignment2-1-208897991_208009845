<template>
  <div>
    <RecipePreviewList :recipes="recipes" :columns="2" :amount="4" title="My Recipe" class="Recipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetMyRecipe } from "../services/user.js";

export default {
  name: 'myrecipes',
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      const response = mockGetMyRecipe();
      this.recipes = response.data.recipes;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>

