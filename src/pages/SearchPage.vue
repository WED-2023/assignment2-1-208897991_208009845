<template>

<div>
    <div  class="container">


  <b-jumbotron>
    <template #header>Search</template>

    <template #lead>
      Here you will find the recipes 
    </template>

    <!-- <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p> -->
        <b-form @submit.prevent="searchRecipes">
      <b-form-group label="Search for recipes">
        <b-form-input v-model="query" placeholder="Enter recipe name"></b-form-input>
      </b-form-group>

      <b-form-group label="Number of recipes to return">
        <b-form-select v-model="numberOfResults" :options="resultOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Filter by">
        <b-form-select v-model="selectedFilter" :options="filterOptions"></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>

    <div v-if="recipes.length">
      <b-form-group label="Sort by">
        <b-form-select v-model="sortOption" :options="sortOptions"></b-form-select>
      </b-form-group>
      
    
      <RecipePreviewList title="Search Results" :fromAPI=true :recipes="sortedRecipes" :amount="numberOfResults" :columns="2" />

      
    </div>
    <div v-else>
      <p>No relevant results found.</p>
    </div>
  </b-jumbotron>
</div>


</div>
</template>

<script>
import axios from 'axios';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: 'SearchPage',
  data() {
    return {
      query: '',
      numberOfResults: 5,
      resultOptions: [5, 10, 15],
      selectedFilter: '',
      filterOptions: [
        { value: '', text: 'No filter' },
        { value: 'vegetarian', text: 'Vegetarian' },
        { value: 'vegan', text: 'Vegan' },
        { value: 'glutenFree', text: 'Gluten Free' },
        // Add more filters as needed
      ],
      sortOption: '',
      sortOptions: [
        { value: '', text: 'No sorting' },
        { value: 'time', text: 'Preparation Time' },
        { value: 'popularity', text: 'Popularity' }
      ],
      recipes: []
    };
  },
  computed: {
    sortedRecipes() {
      if (this.sortOption === 'time') {
        return [...this.recipes].sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else if (this.sortOption === 'popularity') {
        return [...this.recipes].sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      }
      return this.recipes;
    }
  },
    components: {
    RecipePreviewList,
  },
  methods: {
    async searchRecipes() {
      const apiKey = '0d0cd3fd33f045e884781cc1c28244ce';  // Replace with your Spoonacular API key
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&number=${this.numberOfResults}&apiKey=${apiKey}&addRecipeInformation=true`;

      try {
        const response = await axios.get(url);
        let results = response.data.results;

        if (this.selectedFilter) {
          results = results.filter(recipe => recipe[this.selectedFilter]);
        }

        this.recipes = results;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
      
    },
    //     generateRandomRecipes(){
    //   this.$refs.listOfRecipes.updateRecipes();
    // },
    viewRecipe(recipeId) {
      // Implement logic to view recipe details
      this.$router.push({ name: 'RecipeDetail', params: { id: recipeId } });
    }
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
.center {
  width: 50%;
  max-width: 300px; /* Adjust as needed */
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