import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/registerpage",
    name: "registerpage",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/loginPage",
    name: "loginPage",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/searchPage",
    name: "searchPage",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/RecipeViewPage/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favoritesPage",
    name: "favoritesPage",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/myRecipesPage",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/FamilyRecipesPage",
    name: "familyRecipesPage",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/recipePreparingPage/:recipeId",
    name: "recipePlanning",
    component: () => import("./pages/RecipePreparingPage"),
  },
  {
    path: "/mealPlanningPage",
    name: "mealPlanning",
    component: () => import("./pages/MealPlanningPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
