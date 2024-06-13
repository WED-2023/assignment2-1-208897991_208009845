<template>
    <div>
        <h1>My Recipes Page</h1>
        
        <div v-for="recipe in recipes" :key="recipe.id" class="recipeItem">
            <h2>{{recipe.title}}</h2>
            <h3>{{recipe.summary}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myrecipes',
    data() {
        return {
            recipes: []
        };
    },
    mounted() {
        this.recipeLoaded();
    },
    methods: {
        recipeLoaded() {
            let storageOfRecipes = localStorage.getItem('myRecipes');
            this.recipes = storageOfRecipes ? JSON.parse(storageOfRecipes) : [];
        }
    }
}
</script>

<style lang="scss" scoped>
</style>