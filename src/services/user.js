// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  export function mockDeleteFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe removed from favorites", success: true}} };
  }
export function mockGetFavorites() {
    let amount = 2;
    let offset = 1;
    for (let i = 0; i < amount; i++) {
      recipes.push(recipe_preview[(i+offset) % recipe_preview.length]);
    }
    return { data: { recipes: recipes } };
  }
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }
  
  