<template>
  <div class="card-container"> 
    
    <b-card
      :to="{ name:'recipe', params: { recipeId: recipe.id } }"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-1 card"
    >
      <template #header>
        <b-link :to="{ name:'recipe', params: { recipeId: recipe.id } }"><button @click="markAsViewed" class="text-dark invisible-button">{{ recipe.title }}</button></b-link>
      </template>

      <b-link :to="{ name:'recipe', params: { recipeId: recipe.id } }">
          <b-card-img 
            :src="recipe.image"
            alt="Image"
            top
            class="card-image"
            @click="markAsViewed"
          ></b-card-img>
        </b-link>

      <b-list-group flush>
        <b-list-group-item>Ready in {{ recipe.readyInMinutes }} minutes</b-list-group-item>
        <b-list-group-item>{{ recipe.aggregateLikes }} likes</b-list-group-item>
      </b-list-group>

      <template #footer>
        <div class="footer-icons">
          <b-icon v-if="checkIfViewed()" icon="eye" class="viewed-icon"></b-icon>
          <span :to="{ name: 'recipe', params: { recipeId: recipe.id } }" v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
          <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
          <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
          

          <label style="background-color: transparent;">
            <input type="checkbox" @change="toggleFavorite" class="custom-checkbox"> 
            <img :src="favoriteImage" alt="Favorite" class="favorite-icon">
          </label>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import { mockAddFavorite, mockDeleteFavorite } from "../services/user.js";

export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      image_load: true,
      isFavorite: false,
      isViewed: false
    };
  },

  name: 'RecipePreviewCard',
  props: {
    recipe: {
      type: Object,
      required: true
    },
  },
  computed: {
    favoriteImage() {
      return this.isFavorite ? require('@/assets/favorite-icon.png') : require('@/assets/not-favorite-icon.png');
    }
  },
  methods: {
    checkIfViewed() {
      
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      return viewedRecipes.includes(this.recipe.id);
    },
    markAsViewed() {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      if (!viewedRecipes.includes(this.recipe.id)) {
        viewedRecipes.push(this.recipe.id);
        localStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
        this.isViewed = true; 
      }
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      const action = this.isFavorite ? mockAddFavorite : mockDeleteFavorite;

      try {
        const serverResponse = action(this.recipe.id);

        const { status, response: { data } } = serverResponse;

        if (status === 200 && data.success) {
          console.log(data.message);
          this.showToast(data.message, 'Success', 'success');
        } else {
          this.handleError(serverResponse);
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    showToast(message, title, variant) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: true
      });
    },

    handleError(error) {
      console.error('Error updating favorite status:', error);
      this.showToast('Error updating favorite status', 'Error', 'danger');
    },
  },
  created() {
    this.isViewed = this.checkIfViewed(this.recipe.id);
  },
  updated() {
    this.isViewed = this.checkIfViewed(this.recipe.id);
  }
};
</script>

<style scoped>

.footer-icons {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  gap: 5px; /* Space between icons */
}

.card-image {
  height: 10rem; /* Adjust height as needed */
}

.card {
  width: 21rem;
  height: 28rem;
}

.custom-checkbox {
  opacity: 0; /* Make it invisible */
  width: 0;
  height: 0;
}

.invisible-button {
  background-color: transparent; /* Makes button background invisible */
  border: none; /* Removes button border */
  padding: 0; /* Removes button padding (optional) */
  color: inherit; /* Inherits text color from parent */
  font-weight: bold;
  font-size: 1rem;
  
}
.vegan,
.glutenFree,
.vegi {
  width: 30px;
  height: auto;
}
.favorite-icon
{
  width: 30px;
  height: auto;
  margin-top: 5px;
}
</style>
