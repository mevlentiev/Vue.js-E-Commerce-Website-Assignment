<template>
  <nav class="flex justify-space-around">
    <router-link to="/">Home</router-link>
    <router-link to="/favorites">Favorites</router-link>
    <router-link
        v-for="category in categories"
        :key="category.id"
        :to="`/category/${category.id}`">
      {{ category.name }}
    </router-link>
    <button class="bg-red p-2.5 w-fit position-fixed z-10 bottom-0 right-0 m-3" @click="toggleDarkMode" v-text="darkMode ? 'Light Mode' : 'Dark Mode'">
    </button>
  </nav>
  <router-view/>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['categories'])
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
  },
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      const html = document.documentElement;
      this.darkMode = !this.darkMode;

      this.darkMode ? html.classList.add('dark') : html.classList.remove('dark')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">
</script>