<template>
  <div class="container">
     <RecipePage :recipe=recipe />
      <!-- {{ recipeId }}
      {{ fromAPI }}
      {{ this.recipe  }}
      {{ recipe }} -->
       <!-- {{ family }} -->
  </div>
</template>

<script>

import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipePage from "../components/RecipePage.vue";
import { mockGetFamilyRecipe } from "../services/user.js";
import axios from 'axios';

export default {
  props: {
    recipeId: {
      type: [String, Number],
      required: true
    },
    fromAPI: {
      type: Boolean,
      required: false,
      default: false
    },
    recipe: {
      type: Object,
      required: false
    }
  },
  components: {
    RecipePage
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      recipe: null
    };
  },
  async created() {
    this.recipeId = this.$route.params.recipeId;
    if (this.$route.params.fromAPI)
      this.fromAPI = this.$route.params.fromAPI;
    if (this.$route.params.family)
      this.family = this.$route.params.family;

    try {
      let results, response;

      if (this.family){
        response = mockGetFamilyRecipe(this.recipeId);
 
        if (response.status !== 200){
          this.$router.replace("/NotFound");
          return;
        }
        results = response.response.data.recipes;
      }
      else if (this.fromAPI){
        const apiKey = '0d0cd3fd33f045e884781cc1c28244ce';  // Replace with your Spoonacular API key
        const url = `https://api.spoonacular.com/recipes/${this.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;

        response = await axios.get(url);
        results = response.data;

      }
      else{
        response = mockGetRecipeFullDetails(this.recipeId);
        if (response.status !== 200){
          this.$router.replace("/NotFound");
          return;
        }
        results = response.data.recipe;        
      }
      this.recipe = results;
    } catch (error) {
      console.log(error);
      alert(error)
    }
  },
  methods: {
    goToMealPreparationPage() {
      this.$router.push({ name: 'recipePlanning' });
      // this.$router.push({ name: 'MealPreparingPage', params: { recipeId: this.$route.params.recipeId } });

    }
  }
};
</script>
</style>