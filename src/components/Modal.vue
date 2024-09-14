<template>
  <div>
    <b-modal
      id="new-recipe-modal"
      title="Add New Recipe"
      v-model="showModal"
      @hide="resetForm"
    >
      <b-form @submit.prevent="submitForm">
        <!-- Recipe ID -->
        <b-form-group label="Recipe ID:" label-for="recipe-id">
          <b-form-input
            id="recipe-id"
            v-model="recipe.recipeId"
            required
            placeholder="Enter recipe ID"
          ></b-form-input>
        </b-form-group>

        <!-- Recipe Title -->
        <b-form-group label="Recipe Title:" label-for="recipe-title">
          <b-form-input
            id="recipe-title"
            v-model="recipe.title"
            required
            placeholder="Enter recipe title"
          ></b-form-input>
        </b-form-group>

        <!-- Recipe Image -->
        <b-form-group label="Image URL:" label-for="recipe-image">
          <b-form-input
            id="recipe-image"
            v-model="recipe.image"
            required
            placeholder="Enter image URL"
          ></b-form-input>
        </b-form-group>

        <!-- Ready in Minutes -->
        <b-form-group label="Ready in Minutes:" label-for="recipe-readyinminutes">
          <b-form-input
            id="recipe-readyinminutes"
            v-model="recipe.readyInMinutes"
            type="number"
            required
            placeholder="Enter ready time in minutes"
          ></b-form-input>
        </b-form-group>

        <!-- Aggregate Likes -->
        <b-form-group label="Aggregate Likes:" label-for="recipe-aggregatelikes">
          <b-form-input
            id="recipe-aggregatelikes"
            v-model="recipe.aggregateLikes"
            type="number"
            required
            placeholder="Enter aggregate likes"
          ></b-form-input>
        </b-form-group>

        <!-- Vegetarian -->
        <b-form-group label="Vegetarian:" label-for="recipe-vegetarian">
          <b-form-checkbox v-model="recipe.vegetarian">
            Is Vegetarian
          </b-form-checkbox>
        </b-form-group>

        <!-- Vegan -->
        <b-form-group label="Vegan:" label-for="recipe-vegan">
          <b-form-checkbox v-model="recipe.vegan">
            Is Vegan
          </b-form-checkbox>
        </b-form-group>

        <!-- Gluten Free -->
        <b-form-group label="Gluten Free:" label-for="recipe-glutenfree">
          <b-form-checkbox v-model="recipe.glutenFree">
            Is Gluten Free
          </b-form-checkbox>
        </b-form-group>

        <!-- Summary -->
        <b-form-group label="Summary:" label-for="recipe-summary">
          <b-form-textarea
            id="recipe-summary"
            v-model="recipe.summary"
            required
            placeholder="Enter summary"
            rows="3"
          ></b-form-textarea>
        </b-form-group>

        <!-- Instructions -->
        <b-form-group label="Instructions:" label-for="recipe-instructions">
          <b-form-textarea
            id="recipe-instructions"
            v-model="recipe.instructions"
            required
            placeholder="Enter instructions"
            rows="3"
          ></b-form-textarea>
        </b-form-group>

        <!-- Analyzed Instructions -->
        <b-form-group label="Analyzed Instructions:" label-for="recipe-analyzedinstructions">
          <b-form-textarea
            id="recipe-analyzedinstructions"
            v-model="recipe.analyzedInstructions"
            required
            placeholder="Enter analyzed instructions"
            rows="3"
          ></b-form-textarea>
        </b-form-group>
        
      </b-form>
      <template #modal-footer="{ cancel }">
        <b-button variant="danger" @click="cancel()">Cancel</b-button>
        <b-button variant="secondary" @click="resetForm">Clear Form</b-button>
        <b-button variant="success" @click="submitForm">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios to handle the HTTP requests

export default {
  name: "Modal",
  data() {
    return {
      showModal: false,
      recipe: {
        recipeId: '',
        image: '',
        title: '',
        readyInMinutes: '',
        aggregateLikes: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        instructions: '',
        analyzedInstructions: ''
      }
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    resetForm() {
      this.recipe = {
        recipeId: '',
        image: '',
        title: '',
        readyInMinutes: '',
        aggregateLikes: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        instructions: '',
        analyzedInstructions: ''
      };
    },
    async submitForm() {
      try {
        // const recipeId = this.form.recipeId;
        // const image = this.form.image;
        // const title= this.form.title;
        // const readyInMinutes = this.form.readyInMinutes;
        // const aggregateLikes = this.form.aggregateLikes;
        // const vegetarian = this.form.vegetarian;
        // const vegan = this.form.vegan;
        // const glutenFree = this.form.glutenFree;
        // const summary = this.form.summary;
        // const instructions = this.form.instructions;
        // const analyzedInstructions = this.form.analyzedInstructions;
        const response = await axios.post(this.$root.store.server_domain + "/users/addmyRecipe", this.recipe);
        // {
        // "recipeId" : recipeId,
        // "image" : image,
        // "title" : title,
        // "readyInMinutes" : readyInMinutes,
        // "aggregateLikes" : aggregateLikes,
        // "vegetarian" : vegetarian,
        // "vegan" : vegan,
        // "glutenFree" :glutenFree,
        // "summary" : summary,
        // "analyzedInstructions" : analyzedInstructions,
        // "instructions" : instructions
        // } 
        console.log(response);
        if (response.status === 201) {
          this.$bvToast.toast('Recipe added successfully', {
            title: 'Success',
            variant: 'success',
            solid: true
          });
          this.toggleModal();
          this.resetForm();
        } else {
          this.$bvToast.toast('Error adding recipe', {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
        }
      } catch (error) {
        console.error('Error:', error);
        this.$bvToast.toast('Error adding recipe', {
          title: 'Error',
          variant: 'danger',
          solid: true
        });
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
