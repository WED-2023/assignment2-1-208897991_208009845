

<template>
  <b-container>
    <h1>Meal Preparing Page</h1>
    <b-form-group label="Recipe">
      <b-input-group>
        <b-form-input v-model="recipeId" placeholder="Enter Recipe ID"></b-form-input>
        <b-input-group-append>
          <b-button @click="fetchRecipe">Fetch Recipe</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <div v-if="recipe">
      <b-card>
        <b-card-title>{{ recipe.title }}</b-card-title>
        <b-card-text>
          <div>
            <b-button @click="multiplyServings">Multiply Servings</b-button>
            <p>Servings: {{ servings }}</p>
            <ul>
              <li v-for="ingredient in adjustedIngredients" :key="ingredient.id">
                {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }}
              </li>
            </ul>
          </div>
          <div v-for="(step, index) in recipe.analyzedInstructions[0].steps" :key="step.number">
            <b-form-checkbox v-model="completedSteps[index]">Step {{ step.number }}: {{ step.step }}</b-form-checkbox>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import axios from 'axios';

export default {
    name: 'RecipePlanningPage',
  data() {
    return {
      recipeId: '',
      recipe: null,
      servings: 1,
      completedSteps: [],
    };
  },
  computed: {
    adjustedIngredients() {
      return this.recipe ? this.recipe.extendedIngredients.map(ingredient => ({
        ...ingredient,
        amount: ingredient.amount * this.servings
      })) : [];
    }
  },
  methods: {
    async fetchRecipe() {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${this.recipeId}/analyzedInstructions`, {
          params: {
            apiKey: '0d0cd3fd33f045e884781cc1c28244ce'
          }
        });
        this.recipe = response.data[0];
        this.servings = 1;
        this.completedSteps = Array(this.recipe.analyzedInstructions[0].steps.length).fill(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    },
    multiplyServings() {
      this.servings += 1;
    }
  }
};
</script>
<style>
</style>

