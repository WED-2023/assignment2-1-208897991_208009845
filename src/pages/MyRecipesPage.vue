<template>
    <div>
      <RecipePreviewList :recipes="recipes" :columns=2 :amount=4 title="My Recipes" class="Recipes center" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from "../components/RecipePreviewList";
  import { mockGetUserRecipes } from "../services/user.js";
  
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
        this.recipes = mockGetUserRecipes().response.data.recipes;
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  
