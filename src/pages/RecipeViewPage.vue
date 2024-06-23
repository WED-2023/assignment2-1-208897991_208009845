<template>
  <div class="container">
     <RecipePage :recipe=recipe />
      <!-- {{ recipeId }}
      {{ fromAPI }}
      {{ this.recipe  }}
      {{ recipe }} -->
  </div>
</template>

<script>

import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipePage from "../components/RecipePage.vue";
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
      recipe: null
    };
  },
  async created() {
    this.recipeId = this.$route.params.recipeId;
    if (this.$route.params.fromAPI)
      this.fromAPI = this.$route.params.fromAPI;

    try {
      let results, response;
      if (!this.fromAPI){
        response = mockGetRecipeFullDetails(this.recipeId);
        if (response.status !== 200){
          this.$router.replace("/NotFound");
          return;
        }
        results = response.data.recipe;
      }
      else{
        const apiKey = '0d0cd3fd33f045e884781cc1c28244ce';  // Replace with your Spoonacular API key
        const url = `https://api.spoonacular.com/recipes/${this.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;

        response = await axios.get(url);
        results = response.data;
      }

      // let {
      //   analyzedInstructions,
      //   instructions,
      //   extendedIngredients,
      //   aggregateLikes,
      //   readyInMinutes,
      //   image,
      //   title
      // } = results;


      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      // let _recipe = {
      //   instructions,
      //   _instructions,
      //   analyzedInstructions,
      //   extendedIngredients,
      //   aggregateLikes,
      //   readyInMinutes,
      //   image,
      //   title
      // };

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