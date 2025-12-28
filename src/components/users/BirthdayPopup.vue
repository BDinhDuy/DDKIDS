<template>
  <v-dialog
    v-model="dialog"
    max-width="480"
    persistent
    class="birthday-dialog"
  >
    <v-card class="birthday-card overflow-hidden" elevation="24">
      <!-- Close Button -->
      <v-btn
        icon
        variant="flat"
        class="close-btn"
        @click="closeDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <!-- Header Image Section -->
      <div class="header-section">
        <!-- Decorative elements -->
        <div class="confetti confetti-1"></div>
        <div class="confetti confetti-2"></div>
        <div class="confetti confetti-3"></div>
        <div class="confetti confetti-4"></div>

        <!-- Hero Image -->
        <v-img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH8lDLEcJdVKnQPYR64c7aZFLldwgYj4Ozcyf06GLZccpAqvaUTTeO164ijVfx5X-zHwH0Ay0fgIqPfaj4Uh4ipSBy2DzgrfrvBa7XLZLa9b4DmuGTft23EwkpRRAtnqoTsUh1aVTEWtdgmk6ACmeiT2zvHT8DFI6hER7Qehu5HcgNdehLK_x40tuEbs0esNjTpupsFpYQlr1OGIwmlZzMUptXmS5tFWr3Q06WfwJZzIwx9SS9pmQUeUqpomBxan4JpcuaxT55FeYi"
          alt="Birthday celebration"
          height="220"
          cover
          class="hero-image"
        ></v-img>

        <!-- Gradient Overlay -->
        <div class="gradient-overlay"></div>
      </div>

      <!-- Content Body -->
      <v-card-text class="px-6 pt-2 pb-8 text-center">
        <h1 class="text-h4 font-weight-black mb-3">
          Chúc mừng sinh nhật!
        </h1>
        <p class="text-body-1 text-grey-darken-1 mb-6 px-2">
          Tháng này là tháng của bé! Chúng tôi có một món quà bí mật dành riêng cho bạn. 
          Hãy khám phá ngay nhé!
        </p>

        <!-- Action Buttons -->
        <div class="d-flex flex-column ga-3">
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-gift"
            elevation="4"
            block
            @click="viewOffer"
          >
            Xem ưu đãi đặc biệt
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            @click="closeDialog"
          >
            Bỏ qua
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const dialog = ref(props.modelValue)
const userStore = useUserStore()

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
})

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})

const closeDialog = () => {
  dialog.value = false
}

const viewOffer = () => {
  // Navigate to promotions or special offers page
  closeDialog()
  // You can add router navigation here
}

// Check if user's birthday is in current month
const checkBirthday = (birthdate) => {
  if (!birthdate) return false
  
  const today = new Date()
  const birth = new Date(birthdate)
  
  return today.getMonth() === birth.getMonth()
}

defineExpose({
  checkBirthday
})
</script>

<style scoped>
.birthday-card {
  position: relative;
  border-radius: 12px !important;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(8px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.4) !important;
  transform: scale(1.1);
}

.header-section {
  position: relative;
  height: 220px;
  background: linear-gradient(135deg, #fef5e6 0%, #fff8ed 100%);
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(248, 247, 246, 1) 0%, transparent 40%);
  pointer-events: none;
}

/* Confetti decorations */
.confetti {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.confetti-1 {
  top: 40px;
  left: 40px;
  width: 16px;
  height: 16px;
  background: #60a5fa;
  animation-delay: 0s;
}

.confetti-2 {
  top: 80px;
  right: 64px;
  width: 12px;
  height: 12px;
  background: #f87171;
  animation-delay: 0.5s;
  border-radius: 0;
  transform: rotate(45deg);
}

.confetti-3 {
  bottom: 32px;
  left: 25%;
  width: 24px;
  height: 24px;
  background: #fbbf24;
  opacity: 0.4;
  animation-delay: 1s;
}

.confetti-4 {
  top: 24px;
  right: 32px;
  width: 8px;
  height: 32px;
  background: #4ade80;
  opacity: 0.5;
  border-radius: 4px;
  transform: rotate(-12deg);
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* Dialog animation */
:deep(.v-overlay__content) {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ga-3 {
  gap: 12px;
}
</style>
