<template>
  <div>
    <RecipePreviewList :recipes="recipes" :columns="2" :amount="4" title="Family Recipe" class="Recipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFamilyRecipe } from "../services/user.js";

export default {
  name: 'familyRecipesPage',
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
      const { status, response: { data } } = mockGetFamilyRecipe();
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
