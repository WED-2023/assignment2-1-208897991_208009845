<template>
  <div class="container">
    <RecipePage :recipe="recipe" />
  </div>
</template>

<script>

import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipePage from "../components/RecipePage.vue";
export default {
  props: {
    recipeId: {
      type: Object,
      required: true
    },
    fromAPI: {
      type: Boolean,
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
    try {
      let response;
      if (this.fromAPI){
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&number=${this.numberOfResults}&apiKey=${apiKey}&addRecipeInformation=true`;
        try {
          const response = await axios.get(url);
          if (response.status !== 200) this.$router.replace("/NotFound");
          let results = response.data.results;
          this.recipes = results;
        } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
        }
      } else {
        response = mockGetRecipeFullDetails(recipeId);
        if (response.status !== 200) this.$router.replace("/NotFound");
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    goToMealPreparationPage() {
      this.$router.push({ name: 'MealPreparingPage', params: { recipeId: this.$route.params.recipeId } });
    }
  }
};
</script>
</style>