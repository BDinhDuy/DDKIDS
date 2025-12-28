<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import Header from './components/header.vue'
  import AuthHeader from './components/authHeader.vue'
  import Navbar from './components/navbar.vue'
  import Footer from './components/footer.vue'
  import BackToTop from './components/BackToTop.vue'
  import BirthdayPopup from './components/users/BirthdayPopup.vue'

  const route = useRoute()
  const userStore = useUserStore()
  
  // Sử dụng computed để bind với store state
  const showBirthdayPopup = computed({
    get: () => userStore.shouldShowBirthdayPopup,
    set: (value) => {
      if (!value) {
        userStore.closeBirthdayPopup()
      }
    }
  })
  
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
    <BackToTop />
    <BirthdayPopup v-model="showBirthdayPopup" />
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
