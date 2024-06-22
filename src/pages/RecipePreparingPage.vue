<template>
  
  <div>
    <div class="container">
      <h1>Recipe Preparation</h1>

    </div>
    <div class="container">
      <b-button variant="primary" @click="multiplyIngredients">Multiply Ingredients</b-button>
    </div>
  <div class="container">
    

    <b-list-group>
      <b-list-group-item v-for="(step, index) in recipeSteps" :key="index" class="mb-3">
        <b-form-checkbox v-model="step.completed" class="mb-2">
          {{ step.number }}. {{ step.step }}
        </b-form-checkbox>
        <b-list-group>
          <b-list-group-item v-for="ingredient in step.ingredients" :key="ingredient.id">
            {{ ingredient.name }}: {{ ingredient.amount }} {{ ingredient.unit }}
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>
  </div>
</div>
</template>

<script>
import { BButton, BFormCheckbox, BListGroup, BListGroupItem } from 'bootstrap-vue';
import recipeData from "../assets/mocks/analyzedInstructions324694.json";

export default {
  name: 'MealPreparingPage',
  components: {
    BButton,
    BFormCheckbox,
    BListGroup,
    BListGroupItem
  },
  data() {
    return {
      recipeSteps: [],
      originalIngredients: [],
      multiplier: 1
    };
  },
  mounted() {
    this.loadRecipe();
  },
  methods: {
    loadRecipe() {
      this.recipeSteps = recipeData[0].steps.map(step => ({
        ...step,
        completed: false,
        ingredients: step.ingredients.map(ingredient => ({
          ...ingredient,
          originalAmount: ingredient.amount || 1,
          amount: ingredient.amount || 1
        }))
      }));
      console.log(this.recipeSteps); // Check if recipe steps are correctly initialized
    },
    multiplyIngredients() {
      this.multiplier *= 2;
      this.recipeSteps.forEach(step => {
        step.ingredients.forEach(ingredient => {
          ingredient.amount = ingredient.originalAmount * this.multiplier;
        });
      });
      console.log(this.recipeSteps); // Verify ingredients are correctly multiplied
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.mb-3 {
  margin-bottom: 20px;
}
</style>
