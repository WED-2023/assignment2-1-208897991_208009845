<template>
  <div>
    <RecipePreviewList :recipes="recipes" :columns="2" :amount="4" :family=true title="Family Recipe" class="Recipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFamilyRecipePreview } from "../services/user.js";

export default {
  name: 'FamilyRecipesPage',
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
    updateRecipes() {
      const { status, response: { data } } = mockGetFamilyRecipePreview();
      if (status === 200) {
        this.recipes = data.recipes;
      }
      else
        alert("Error getting family recipes")
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
