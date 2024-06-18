<template>
  <div v-if="recipe">
    <div class="container">
      <div>
        <b-jumbotron>
          <template #header>{{ recipe.title }}</template>
          <b-container fluid>
            <b-row>
              <b-col class="d-flex justify-content-center">
                <img :src="recipe.image" class="center" />
              </b-col>
              <b-col >
                <h2> Ingredients: </h2>
                <ul>
                  <b-list-group>
                    <b-list-group-item v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                      {{ r.original }}
                    </b-list-group-item>
                  </b-list-group>
                </ul>
              </b-col>
            </b-row>
          </b-container>

          <template #lead>
            <span v-if="recipe.vegetarian">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" />
            </span>
            <span v-if="recipe.vegan">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" />
            </span>
            <span v-if="recipe.glutenFree">
              <img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" />
            </span>
            <div class="ready">
              Ready in {{ recipe.readyInMinutes }} minutes
              <b-icon icon="alarm-fill" variant="info"></b-icon>
            </div>
            <div>Likes: {{ recipe.aggregateLikes }} likes
              <b-icon icon="suit-heart-fill" variant="info" ></b-icon>
            </div>
          </template>

          <hr class="my-4">

          <b-card bg-variant="dark" text-variant="white" title="Instructions:">
            <b-card-text>
              {{ recipe.instructions }}
            </b-card-text>
          </b-card>
          <b-button @click="goToMealPreparationPage" variant="primary">Go to Meal Preparation</b-button>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        response = mockGetRecipeFullDetails(this.$route.params.recipeId);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
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

<style scoped>
.center {
  width: 100%;
  max-width: 600px; /* Adjust as needed */
}

.favorite-icon,
.vegan,
.glutenFree,
.vegi {
  width: 30px;
  height: auto;
  margin-right: 5px;
}
</style>