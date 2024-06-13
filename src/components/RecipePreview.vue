<template>
  <div class="card-container" :to="{ name:'recipe', params: { recipeId: recipe.id } }"> 
    <b-card
      :to="{ name:'recipe', params: { recipeId: recipe.id } }"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
    <template #header>
        <b-link :to="{ name: 'recipe', params: { recipeId: recipe.id }}" class="text-dark"> {{ recipe.title }} </b-link>
      </template>
    <b-card-img :to="{ name: 'recipe', params: { recipeId: recipe.id }}" :src="recipe.image" alt="Image" top></b-card-img>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>

      <template #footer>
        <b-icon v-if="isViewed" icon="eye" class="viewed-icon"></b-icon>
        <span :to="{ name: 'recipe', params: { recipeId: recipe.id } }" v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
        <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
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
    markAsViewed() {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      if (!viewedRecipes.includes(this.recipe.id)) {
        viewedRecipes.push(this.recipe.id);
        localStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
        this.isViewed = true; 
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
.card-container {
  border-left: 0cap;
}
.vegan,
.glutenFree,
.vegi {
  width: 30px;
  height: auto;
  margin-right: 5px;
}
</style>
