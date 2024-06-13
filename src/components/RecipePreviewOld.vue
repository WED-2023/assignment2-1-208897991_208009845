<template>
<div class="recipe-card">
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview">
    <div class="recipe-body">
      <img v-if="image_load"  :src="recipe.image" class="recipe-image"  />
    </div></router-link>
    
    <div class="recipe-footer">
      <h3 :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </h3>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div> 
        <b-icon v-if="isViewed" icon="eye" class="viewed-icon"></b-icon>
        <span v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
        <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
        <div class="btn-group-toggle">
          <label class="btn btn-secondary active" style="background-color: white;">
            <input type="checkbox" v-model="isFavorite" @change="toggleFavorite">
            <img :src="favoriteImage" alt="Favorite" class="favorite-icon">
          </label>
        </div>
      </div>
    </div>
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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 40%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.viewed-icon{
  width: 20px;
  height: 20px;
  margin-right: 5px;
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
