// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_preview_family from "../assets/mocks/recipe_preview_famliy.json";


export function mockAddFavorite(recipeId) {
  return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
}
export function mockDeleteFavorite(recipeId) {
  return { status: 200, response: { data: { message: "The Recipe removed from favorites", success: true}} };
}
export function mockGetFavorites() {
  return { status: 200, response: { data: { recipes: recipe_preview } } };
}
export function mockGetUserRecipes() {
  return { status: 200, response: { data: { recipes: recipe_preview } } };
}
export function mockAddUserRecipe(recipeDetails) {
  return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };
}
export function mockGetFamilyRecipe(recipeId) {
  return { status: 200, response: { data: { recipes: recipe_preview_family } } };
}
  
  