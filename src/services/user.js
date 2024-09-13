// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_family from '../assets/mocks/recipe_family.json';
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_preview_family from "../assets/mocks/recipe_preview_famliy.json";
import axios from "axios";

// export function mockAddFavorite(recipeId) {
//   return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
// }



export function mockGetFavorites() {
  return { status: 200, response: { data: { recipes: recipe_preview } } };
}
export function mockGetUserRecipes() {
  return { status: 200, response: { data: { recipes: recipe_preview } } };
}
export function mockAddUserRecipe(recipeDetails) {
  return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };
}
export function mockGetFamilyRecipePreview(recipeId) {
  return { status: 200, response: { data: { recipes: recipe_preview_family } } };
}
export function mockGetFamilyRecipe(recipeId) {
  const recipe = recipe_family.find(recipe => recipe.id === recipeId);
  
  if (recipe) {

    return { status: 200, response: { data: { recipes: recipe } } };
  } else {
    return { status: 404, response: { error: "Recipe not found" } };
  }
}
  
  
  