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
    path: "/loginpage",
    name: "loginpage",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/searchPageNew",
    name: "searchPageNew",
    component: () => import("./pages/SearchPageNew"),
  },
  {
    path: "/RecipeViewPage/:recipeId",
  name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/FavoritesPage",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/MyRecipesPage",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/FamilyRecipesPage",
    name: "familyrecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
