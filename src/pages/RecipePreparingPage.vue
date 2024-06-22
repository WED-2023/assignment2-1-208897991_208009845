<template>
  <b-container class="h-100">
    <div class="d-flex flex-column">
      <h1 class="title">Recipe Preparing Page</h1>
      <b-button style="background-color: #c8a2c8;" @click="multiplyQuantities">Multiply Quantities</b-button>
      <b-list-group>
        <b-list-group-item v-for="(step, index) in steps" :key="index">
          <b-form-checkbox v-model="step.completed" @change="updateProgress">
            <h2>step {{ step.number }}</h2>
            {{ step.step }}
          </b-form-checkbox>
          <ul>
            <li v-for="ingredient in step.ingredients" :key="ingredient.id">
              <b-img :src="ingredient.image" :alt="ingredient.name" height="50" width="50"></b-img>
              {{ ingredient.name }}:  {{ (ingredient.amount * multiplier).toFixed(2) }} {{ ingredient.unit }}
            </li>
          </ul>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-container>
</template>


<script>
import { BContainer, BButton, BFormCheckbox, BImg, BListGroup, BListGroupItem } from 'bootstrap-vue';

import analyzedInstructions from "../assets/mocks/analyzedInstructions324694.json";
import recipeInformation from "../assets/mocks/GetRecipeInformation324694.json";

export default {
  name: 'MealPreparingPage',
  components: {
    BContainer, BButton, BFormCheckbox, BImg, BListGroup, BListGroupItem
  },
  data() {
    return {
      steps: [],
      ingredients: [],
      multiplier: 1
    };
  },
  created() {
    const savedProgress = JSON.parse(localStorage.getItem('recipeProgress'));
    this.steps = analyzedInstructions[0].steps.map((step, index) => ({
      ...step,
      completed: savedProgress ? savedProgress[index].completed : false,
      ingredients: step.ingredients.map(ingredient => ({
        ...ingredient,
        amount: this.findIngredientAmount(ingredient.id)
      }))
    }));

    this.ingredients = recipeInformation.extendedIngredients.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name,
      image: ingredient.image,
      amount: ingredient.measures.us.amount,
      unit: ingredient.measures.us.unitShort
    }));
  },
  methods: {
    findIngredientAmount(id) {
      const ingredient = recipeInformation.extendedIngredients.find(ing => ing.id === id);
      return ingredient ? ingredient.measures.us.amount : 0;
    },
    multiplyQuantities() {
      this.multiplier = this.multiplier * 2;
    },
    updateProgress() {
      localStorage.setItem('recipeProgress', JSON.stringify(this.steps));
    }
  },
  beforeDestroy() {
    localStorage.removeItem('recipeProgress');
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
