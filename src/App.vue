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
  const showFooter = computed(() => {
    return route.meta.showFooter !== false
  })
</script>

<template>
  <v-app :class="{ 'no-header': !showHeader }">
    <Header v-if="showHeader"></Header>
    <AuthHeader v-else></AuthHeader>
    <Navbar v-if="showNavbar"></Navbar>
    <v-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <Footer v-if="showFooter"></Footer>
  </v-app>
</template>

<style scoped>
/* Main content area */
.main-content {
  background-color: #f8f7f6;
  min-height: calc(100vh - 60px);
}

/* Remove default Vuetify padding */
.main-content :deep(.v-main__wrap) {
  padding: 0 !important;
}

/* Page transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
