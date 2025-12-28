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
  const showBirthdayPopup = ref(false)
  
  // Kiểm tra sinh nhật khi user đăng nhập
  const checkBirthdayInCurrentMonth = () => {
    if (!userStore.isLoggedIn || !userStore.userBirthdate) {
      return false
    }
    
    const today = new Date()
    const birthdate = new Date(userStore.userBirthdate)
    
    // Kiểm tra nếu tháng sinh nhật trùng với tháng hiện tại
    return today.getMonth() === birthdate.getMonth()
  }

  // Watch khi user login để hiển thị popup sinh nhật
  watch(() => userStore.isLoggedIn, (isLoggedIn) => {
    if (isLoggedIn && checkBirthdayInCurrentMonth()) {
      // Kiểm tra xem đã show popup trong session chưa
      const birthdayShownKey = `birthdayShown_${new Date().getFullYear()}_${new Date().getMonth()}`
      const hasShownThisMonth = sessionStorage.getItem(birthdayShownKey)
      
      if (!hasShownThisMonth) {
        showBirthdayPopup.value = true
        sessionStorage.setItem(birthdayShownKey, 'true')
      }
    }
  }, { immediate: true })
  
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
