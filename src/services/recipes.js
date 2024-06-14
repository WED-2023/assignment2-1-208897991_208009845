// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1, offset = 0) {
  let recipes = [];

  // for(let i = 0; i < amount; i++){
  //   recipes.push(recipe_preview[0]);
  // }
  for (let i = 0; i < amount; i++) {
    recipes.push(recipe_preview[(i+offset) % recipe_preview.length]);
  }
  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    return {status: 200, data: { recipe: recipe_full_view } } ;
  }
  
export function getRecipesFromApi(amount = 5){
  
}