<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>

import MainPage from './pages/MainPage.vue'; 
import Navbar from './components/Navbar.vue';
import OldNavbar from './components/OldNavbar.vue';

export default {
  name: "App",
  components:{
    MainPage,
    OldNavbar,
    Navbar
  },
}

</script>

<style>
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
