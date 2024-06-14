<template>
    <div>
      <b-modal
        id="new-recipe-modal"
        title="Add New Recipe"
        v-model="showModal"
        @hide="resetForm"
      >
        <b-form @submit.prevent="submitForm">
          <b-form-group label="Recipe Name:" label-for="recipe-name">
            <b-form-input
              id="recipe-name"
              v-model="recipe.name"
              required
              placeholder="Enter recipe name"
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Ingredients:" label-for="recipe-ingredients">
            <b-form-textarea
              id="recipe-ingredients"
              v-model="recipe.ingredients"
              required
              placeholder="Enter ingredients"
              rows="3"
            ></b-form-textarea>
          </b-form-group>
  
          <b-form-group label="Instructions:" label-for="recipe-instructions">
            <b-form-textarea
              id="recipe-instructions"
              v-model="recipe.instructions"
              required
              placeholder="Enter instructions"
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
import { mockAddUserRecipe } from '../services/user.js';

export default {
  name: "Modal",
  data() {
    return {
      showModal: false,
      recipe: {
        name: '',
        ingredients: '',
        instructions: ''
      }
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    resetForm() {
      this.recipe = {
        name: '',
        ingredients: '',
        instructions: ''
      };
    },
    async submitForm() {
      try {
        const response = await mockAddUserRecipe(this.recipe);
        if (response.status === 200 && response.response.data.success) {
          console.log(response.response.data.message);
          // Optionally, display a success message to the user
          this.$bvToast.toast(response.response.data.message, {
            title: 'Success',
            variant: 'success',
            solid: true
          });
          this.toggleModal();
          this.resetForm();
        } else {
          console.error('Error adding recipe:', response);
          // Optionally, display an error message to the user
          this.$bvToast.toast('Error adding recipe', {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
        }
      } catch (error) {
        console.error('Error:', error);
        // Optionally, display an error message to the user
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