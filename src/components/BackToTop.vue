<template>
  <transition name="fade">
    <v-btn
      v-if="showButton"
      class="back-to-top"
      icon
      size="large"
      color="primary"
      elevation="4"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <v-icon size="28">mdi-chevron-up</v-icon>
    </v-btn>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  background-color: #4CAF50 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
