<template>
    <div id="nav">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{ name: 'main' }">Cristina</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'main' }" >Recipes</b-nav-item>
                <b-nav-item :to="{ name: 'search'}">Search</b-nav-item>
                <b-nav-item :to="{ name: 'about'}">About</b-nav-item>
                <b-nav-item-dropdown v-if="$root.store.username" text="Personal">
                    <b-dropdown-item :to="{ name: 'favorites'}">My Favorite Recipes</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'myrecipes'}">My Recipes</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'familyrecipes'}">Family Recipes</b-dropdown-item>
                </b-nav-item-dropdown>
                
                <b-nav-item v-if="$root.store.username" @click="toggleModal">Add New Recipe</b-nav-item>
                

            </b-navbar-nav>

            <!-- user not logged in -->
            <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
                <b-nav-text>Hello Guest</b-nav-text>
                <b-nav-item :to="{ name: 'registerpage'}">Register</b-nav-item>
                <b-nav-item :to="{ name: 'loginpage'}">Login</b-nav-item>
            </b-navbar-nav>

            <!-- user logged in -->
            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>{{ $root.store.username }}</em>
                </template>
    
                <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <Modal ref="addRecipeModal" />
    </div>
</template>

<script>
import Modal from "./Modal.vue"

export default {
  name: 'Navbar',
  components: {
    Modal
    },
    methods: {
        toggleModal() {
            this.$refs.addRecipeModal.toggleModal();
        },
        Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");
            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
        }
    }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>