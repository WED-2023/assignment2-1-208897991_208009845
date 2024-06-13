<template>

    <div v-if="recipe">
        <div class="container">
    <div>
  <b-jumbotron>
    <template #header>{{ recipe.title }}</template>
    <b-container fluid class="p-4 bg-dark">
  <b-row>
    <b-col>
      <img :src="recipe.image" class="center" />
    </b-col>
  </b-row>
</b-container>
        <span v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
        <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
    <template #lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4">

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>

    <b-button variant="primary" href="#">Do Something</b-button>
    <b-button variant="success" href="#">Do Something Else</b-button>
  </b-jumbotron>
</div>
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
               <span v-if="recipe.vegetarian"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/1200px-Vegetarian-mark.svg.png" class="vegi" /></span>
        <span v-if="recipe.vegan"><img src="https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/vegan-icon.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="https://cdn-icons-png.flaticon.com/512/4337/4337722.png" class="glutenFree" /></span>
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );

        response = mockGetRecipeFullDetails(this.$route.params.recipeId);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
.favorite-icon,
.vegan,
.glutenFree,
.vegi {
  width: 30px;
  height: auto;
  margin-right: 5px;
}
</style>
