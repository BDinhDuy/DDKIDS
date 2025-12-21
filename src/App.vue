<script setup>
  import Header from './components/header.vue'
  import Footer from './components/footer.vue'
</script>

<template>
  <v-app>
    <Header></Header>
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<style scoped>
/* Main content area */
.main-content {
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px); /* Full height minus header */
}

/* Remove default Vuetify padding */
.main-content >>> .v-main__wrap {
  padding: 0 !important;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
