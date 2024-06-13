<template>
  <div class="card-container" :to="{ name:'recipe', params: { recipeId: recipe.id }}" @change="markAsViewed"> 
    <b-card
      :to="{ name:'recipe', params: { recipeId: recipe.id } }"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-1 card"
    >
      <template #header>
          <b-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id }}"
          class="text-dark header"
          @change="markAsViewed">
          {{ recipe.title }} 
          </b-link>
      </template>

      <b-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id }}" 
      @change="markAsViewed">
          <b-card-img 
            :src="recipe.image"
            alt="Image"
            top
            class="card-image"
          ></b-card-img>
        </b-link>

      <b-list-group flush>
        <b-list-group-item>Ready in {{ recipe.readyInMinutes }} minutes</b-list-group-item>
        <b-list-group-item>{{ recipe.aggregateLikes }} likes</b-list-group-item>
      </b-list-group>

      <template #footer>
        <div class="footer-icons">
          <b-icon v-if="checkIfViewed(recipe.id)" icon="eye" class="viewed-icon"></b-icon>
          <span :to="{ name: 'recipe', params: { recipeId: recipe.id } }" v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
          <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
          <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>

          <div class="btn-group-toggle">
            <label class="btn btn-secondary active custom-label" style="background-color: transparent;">
              <input type="checkbox" v-model="isFavorite" @change="toggleFavorite" class="custom-checkbox">
              <img :src="favoriteImage" alt="Favorite" class="favorite-icon">
            </label>
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      image_load: true,
      isFavorite: this.getFavoriteState(this.recipe),
      isViewed: this.checkIfViewed(this.recipe.id)
    };
  },

  name: 'RecipePreviewCard',
  props: {
    recipe: {
      type: Object,
      required: true
    },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
    computed: {
    favoriteImage() {
      return this.isFavorite ? require('@/assets/favorite-icon.png') : require('@/assets/not-favorite-icon.png');
    }
  },
  methods: {
    checkIfViewed(recipeId) {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      return viewedRecipes.includes(recipeId);
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
      if (this.isFavorite) {
        this.addToFavorites();
      } else {
        this.removeFromFavorites();
      }
    },

    addToFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.some(r => r.id === this.recipe.id)) {
        favorites.push(this.recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    },

    removeFromFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let index = favorites.findIndex(r => r.id === this.recipe.id);
      if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    },

    getFavoriteState(recipe) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some(r => r.id === recipe.id);
    }
  },
    created() {
    this.isFavorite = this.getFavoriteState(this.recipe);
    this.isViewed = this.checkIfViewed(this.recipe.id);
  },
  updated() {
    this.isFavorite = this.getFavoriteState(this.recipe);
    this.isViewed = this.checkIfViewed(this.recipe.id);
  }
};
</script>

<style scoped>
.header { /* header text */
  font-size: 1rem;
  font-weight: bold;
}

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
  position: absolute; /* Position off-screen */
  opacity: 0; /* Make it invisible */
  width: 0;
  height: 0;
  pointer-events: none; /* Disable click events */
}

.custom-label {
  display: inline-flex; /* Align items in a row */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  border: none; /* Remove any borders */
  padding: 0.5rem; /* Padding for better clickability */
  cursor: pointer; /* Change cursor to pointer */
  background-color: transparent; /* Remove any background color */
}

.custom-label.active {
  background-color: transparent; /* Maintain no background */
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
