// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];

  // for(let i = 0; i < amount; i++){
  //   recipes.push(recipe_preview[0]);
  // }
  let i = 0;
  while (recipe_preview.length <= amount && i <recipe_preview.length ) {
    recipes.push(recipe_preview[i]);
    i++;
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    return { data: { recipe: recipe_full_view } } ;
  }
  
