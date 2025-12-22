<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Header from './components/header.vue'
  import AuthHeader from './components/authHeader.vue'
  import Navbar from './components/navbar.vue'
  import Footer from './components/footer.vue'

  const route = useRoute()
  
  const showNavbar = computed(() => {
    return route.meta.showNavbar !== false
  })

  const showHeader = computed(() => {
    return route.meta.showHeader !== false
  })
</script>

<template>
  <v-app :class="{ 'no-header': !showHeader }">
    <Header v-if="showHeader"></Header>
    <AuthHeader v-else></AuthHeader>
    <Navbar v-if="showNavbar"></Navbar>
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<style scoped>
/* Main content area */
.main-content {
  background-color: #f8f7f6;
  min-height: calc(100vh - 60px); /* Full height minus header */
}

/* Remove padding when header is hidden */
.no-header .main-content {
  padding-top: 0 !important;
}

/* Remove default Vuetify padding */
.main-content :deep(.v-main__wrap) {
  padding: 0 !important;
}
</style>
