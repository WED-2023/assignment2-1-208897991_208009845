<template>
  <div>
    <RecipePreviewList :recipes="recipes" :columns=2 :amount=4 title="Favorites" class="Recipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFavorites } from "../services/user.js";

export default {
  name: 'favorites',
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
      this.recipes = mockGetFavorites().response.data.recipes;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
