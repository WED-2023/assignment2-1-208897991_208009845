<template>
  <div class="container">
    <b-jumbotron>
      <template #header><div class="title" >{{ recipe.title }}</div></template>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="left">
              <img :src="recipe.image" class="image" />
              <div class="info">
                <icons :recipe="recipe"></icons>
                <b-button @click="goToMealPreparationPage" variant="primary">Go to Meal Preparation</b-button>
                <div>
                  Ready in {{ recipe.readyInMinutes }} minutes
                  <b-icon icon="alarm-fill" variant="info"></b-icon>
                </div>
                <div>Likes: {{ recipe.aggregateLikes }} likes
                  <b-icon icon="suit-heart-fill" variant="info" ></b-icon>
                </div>
              </div>
            </div>
            
          </b-col>
          <b-col >
            <h2 style="text-align: center;"> Ingredients: </h2>
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

      

      <hr class="my-4">

      <b-card bg-variant="dark" text-variant="white" title="Instructions:">
        <b-card-text>
          {{ recipe.instructions }}
        </b-card-text>
      </b-card>
      <hr class="my-4">
      
    </b-jumbotron>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import icons from "./Icons.vue";

export default {
  name: "RecipePage",

  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  components: {
    icons
  },
  methods: {
    goToMealPreparationPage() {
      this.$router.push({ name: 'recipePlanning', params: { recipeId: this.$route.params.recipeId } });
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
  text-align: center;
}
.image {
  width: 100%;
  max-width: 600px;
  max-height: 900px;
  align-items: center;
  align-self: center;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.left{
  margin-top: 3rem;
}
</style>