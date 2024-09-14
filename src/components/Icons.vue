<template>
    
    <div class="footer-icons">
        <b-icon v-if="checkIfViewed()" icon="eye" class="viewed-icon"></b-icon>
        <router-link :to="{ name: 'recipe', params: { recipeId: recipe.recipeid } }" v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></router-link>
        <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
        

        <label style="background-color: transparent;">
        <input type="checkbox" @change="toggleFavorite" class="custom-checkbox"> 
        <img :src="favoriteImage" alt="Favorite" class="favorite-icon">
        </label>
    </div>
</template>

<script>
// import { addFavorite, deleteFavorite } from "../services/user.js";
export default {
    name: 'icons',
    data() {
        return {
            image_load: true,
            isFavorite: false,
            isViewed: false
        };
    },
    props: {
        recipe: {
            required: true
        }
    },
    computed: {
        favoriteImage() {
            return this.isFavorite ? require('@/assets/favorite-icon.png') : require('@/assets/not-favorite-icon.png');
        }
    },
    async created() {
        this.isViewed = this.checkIfViewed();
        this.isFavorite = await this.checkIfFavorite();
    },
    methods: {
        checkIfViewed() {
            let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
            return viewedRecipes.includes(this.recipe.recipeid);
        },
        async checkIfFavorite(){
            const favoriteRecipes = await this.axios.get(this.$root.store.server_domain + '/users/favoritesID');
            return favoriteRecipes.data.includes(this.recipe.recipeid);
        },
        async toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            const action = this.isFavorite ? this.addFavorite : this.deleteFavorite;

            try {
                const username = this.$root.store.username;
                const serverResponse = await action(username, this.recipe.recipeid);
                if (serverResponse.status === 200) {
                    this.showToast(serverResponse.data, 'Success', 'success');
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
        
        async addFavorite(username, recipeId) {
            const response = await this.axios.post(this.$root.store.server_domain + '/users/favorites', {
                "username":username,
                "recipeId":recipeId
            });
            return response;
        },
        async deleteFavorite(username, recipeId) {
            const response = await this.axios.delete(this.$root.store.server_domain + '/users/favorites', {
                data: { // 'data' is needed to send the body in DELETE requests
                    "username": username,
                    "recipeId": recipeId
            }});
            return response;
        }
  }
}
</script>


<style scoped>
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

.custom-checkbox {
  opacity: 0; /* Make it invisible */
  width: 0;
  height: 0;
}
</style>