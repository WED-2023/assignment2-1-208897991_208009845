<template>
  <div id="nav">
    <router-link :to="{ name: 'main' }">Recipes</router-link> |
    <router-link :to="{ name: 'search' }">Search</router-link> |
    <router-link :to="{ name: 'about' }">About</router-link>

    <span v-if="!$root.store.username">
      Guest:
      <h2>Hello Guest</h2>
      <router-link :to="{ name: 'register' }">Register</router-link> |
      <router-link :to="{ name: 'loginpage' }">Login</router-link> |
    </span>
    <span v-else>
      <b-button @click="toggleModal">Add New Recipe</b-button>
      <b-dropdown id="dropdown-left" text="Personal Info" variant="primary" class="m-2">
        <b-dropdown-item>
          <router-link :to="{ name: 'favorites' }">Favorites</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link :to="{ name: 'myrecipes' }">My Recipes</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link :to="{ name: 'familyrecipes' }">Family Recipes</router-link>
        </b-dropdown-item>
      </b-dropdown>
      <h1 class="user-greeting">Hello, {{ $root.store.username }}</h1> |
      {{ $root.store.username }}:
      <button @click="Logout">Logout</button> |
    </span>
  </div>
</template>

<script>
export default {
  name: 'OldNavbar',
  methods: {
    toggleModal() {
      // Modal toggle logic
    },
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>