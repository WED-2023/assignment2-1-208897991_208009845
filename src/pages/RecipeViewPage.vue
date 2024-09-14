<template>
  <div class="container">
     <RecipePage :recipe=recipe />
      <!-- {{ recipeId }}
      {{ fromAPI }}
      {{ this.recipe  }}
      {{ recipe }} -->
       <!-- {{ family }} -->
  </div>
</template>

<script>

import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipePage from "../components/RecipePage.vue";
import { mockGetFamilyRecipe } from "../services/user.js";
import axios from 'axios';

export default {
  props: {
    recipeId: {
      type: [String, Number],
      required: true
    },
    fromAPI: {
      type: Boolean,
      required: false,
      default: false
    },
    recipe: {
      type: Object,
      required: false
    }
  },
  components: {
    RecipePage
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      recipe: null
    };
  },
  async created() {
    this.recipeId = this.$route.params.recipeId;
    if (this.$route.params.fromAPI)
      this.fromAPI = this.$route.params.fromAPI;
    if (this.$route.params.family)
      this.family = this.$route.params.family;

    try {
      let results, response;

      if (this.family){
        response = mockGetFamilyRecipe(this.recipeId);
 
        if (response.status !== 200){
          this.$router.replace("/NotFound");
          return;
        }
        results = response.response.data.recipes;
      }
      else{
        results = await axios.get(this.$root.store.server_domain + "/recipes/" + this.recipeId);
        results = results.data;
      }
      this.recipe = results;
      console.log(this.recipe);
    } catch (error) {
      console.log(error);
      alert(error)
    }
  },
  methods: {
    goToMealPreparationPage() {
      this.$router.push({ name: 'recipePlanning' });
      // this.$router.push({ name: 'MealPreparingPage', params: { recipeId: this.$route.params.recipeId } });

    }
  }
};
</script>
</style>