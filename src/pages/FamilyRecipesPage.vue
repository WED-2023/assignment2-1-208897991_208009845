<template>
  <div>
    <RecipePreviewList :recipes="recipes" :columns="2" :amount="4" title="Family Recipe" class="Recipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFamilyRecipe } from "../services/user.js";

export default {
  name: 'familyracipes',
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
      const response = mockGetFamilyRecipe();
      this.recipes = response.data.recipes;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
