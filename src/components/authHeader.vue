<template>
  <div class="auth-header-bar">
    <v-container class="py-3 auth-header-container">
      <v-row align="center" no-gutters>
        <!-- Logo -->
        <v-col cols="auto" class="d-flex align-center flex-grow-1">
          <div class="logo-wrapper" @click="() => router.push('/')">
            <div class="logo-icon">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="logo-text">{{ APP_INFO.name }}</h2>
          </div>
        </v-col>

        <!-- Right Section -->
        <v-col cols="auto">
          <div class="d-flex align-center gap-2">
            <!-- Register Button -->
            <v-btn
              variant="flat"
              :color="isRegisterPage ? '#ee9d2b' : '#f4f3f0'"
              class="text-none font-weight-bold"
              size="small"
              @click="handleRegister"
            >
              Đăng ký
            </v-btn>

            <!-- Login Button -->
            <v-btn
              variant="flat"
              :color="isLoginPage ? '#ee9d2b' : '#f4f3f0'"
              class="text-none font-weight-bold"
              size="small"
              @click="handleLogin"
            >
              Đăng nhập
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { APP_INFO } from '@/utils/constants'

const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => route.name === 'login')
const isRegisterPage = computed(() => route.name === 'register')

const handleLogin = () => {
  router.push('/auth/login')
}

const handleRegister = () => {
  router.push('/auth/register')
}
</script>

<style scoped>
.auth-header-bar {
  background-color: white;
  position: relative;
  min-height: 72px;
}

.auth-header-container {
  padding-left: 40px !important;
  padding-right: 40px !important;
}

@media (max-width: 959px) {
  .auth-header-container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #ee9d2b;
}

.logo-svg {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-size: 20px;
  font-weight: 900;
  color: #181511;
  letter-spacing: -0.015em;
  margin: 0;
}

/* Remove button borders */
.v-btn {
  border: none !important;
  box-shadow: none !important;
}
</style>
