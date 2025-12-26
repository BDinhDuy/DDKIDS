<template>
  <div class="register-page">
    <v-row no-gutters class="fill-height">
      <!-- Left Side: Image (Hidden on mobile) -->
      <v-col cols="12" lg="6" class="d-none d-lg-block">
        <div class="image-section">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GDA6fRH_YU6l-nGcpmJjU4gj9YKg3HboSZQHAZ95K-kCgxt9a5oV5VjCAKAekmyAFcRqvwEuKAQWFYrNo0Wy52wBBnj9wxn6-BEo6EiWUnfPaY7SBw7kRF8v2g_zhlFIRQfyPJ8wVH8oBXorOTTRbF8cJAHSPewnXreUzawQl4syGWfsYwimLEGVG_TrBQuvs5Ilx1YXcVmPSxgFJWvOIRpWujPiZdjj1CE0fNw_R9BFHCbPJc7lE9QdL2DDKXnmPkgwkmgJm96c"
            alt="Happy child playing with colorful wooden toys" cover height="100%" class="image-overlay">
            <div class="overlay-gradient"></div>
            <div class="overlay-text">
              <h3 class="text-h4 font-weight-bold mb-2">Niềm vui cho bé, An tâm cho mẹ</h3>
              <p class="text-body-1">Khám phá hàng ngàn món đồ chơi an toàn, sáng tạo giúp bé phát triển trí tuệ mỗi
                ngày.</p>
            </div>
          </v-img>
        </div>
      </v-col>

      <!-- Right Side: Register Form -->
      <v-col cols="12" lg="6">
        <div class="form-section">
          <v-container class="form-container">
            <div class="form-content">
              <!-- Heading -->
              <div class="mb-8">
                <h1 class="text-h4 font-weight-bold mb-2">Đăng ký tài khoản</h1>
                <p class="text-body-1 text-grey-darken-1">
                  Đăng ký để quản lý tài khoản và nhận các ưu đãi đặc biệt dành riêng cho bé yêu của bạn.
                </p>
              </div>

              <!-- Form -->
              <v-form ref="formRef" @submit.prevent="handleRegister">
                <!-- Parent Name -->
                <v-text-field v-model="parentName" label="Tên của bạn (Phụ huynh)" placeholder="Nhập họ và tên"
                  variant="outlined" prepend-inner-icon="mdi-account-outline" color="#ee9d2b" class="mb-4"
                  :rules="nameRules" clearable></v-text-field>

                <!-- Email -->
                <v-text-field v-model="email" label="Email" placeholder="name@example.com" variant="outlined"
                  prepend-inner-icon="mdi-email-outline" color="#ee9d2b" class="mb-4"
                  :rules="emailRules" clearable></v-text-field>

                <!-- Password -->
                <v-text-field v-model="password" label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" variant="outlined"
                  prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'" color="#ee9d2b" class="mb-4" :rules="passwordRules"
                  @click:append-inner="showPassword = !showPassword"></v-text-field>

                <!-- Confirm Password -->
                <v-text-field v-model="confirmPassword" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu"
                  variant="outlined" prepend-inner-icon="mdi-lock-reset"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showConfirmPassword ? 'text' : 'password'" color="#ee9d2b" class="mb-4"
                  :rules="confirmPasswordRules"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"></v-text-field>

                <!-- Child Info (Optional) -->
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="childName" label="Tên bé (Tùy chọn)" placeholder="Tên bé" variant="outlined"
                      prepend-inner-icon="mdi-baby-face-outline" color="#ee9d2b" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
                      min-width="auto">
                      <template v-slot:activator="{ props }">
                        <v-text-field v-model="formattedDate" label="Ngày sinh bé (Tùy chọn)"
                          placeholder="Chọn ngày sinh" variant="outlined" prepend-inner-icon="mdi-cake-variant"
                          color="#ee9d2b" readonly v-bind="props" clearable
                          @click:clear="childBirthdate = null"></v-text-field>
                      </template>
                      <v-date-picker v-model="childBirthdate" color="#ee9d2b" @update:model-value="dateMenu = false"
                        :max="new Date().toISOString().substr(0, 10)" show-adjacent-months></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <!-- Terms Checkbox -->
                <v-checkbox v-model="agreeTerms" color="#ee9d2b" class="mb-2" :rules="termsRules">
                  <template v-slot:label>
                    <div class="terms-label">
                      Tôi đồng ý với
                      <a href="#" class="terms-link" @click.prevent>Điều khoản sử dụng</a>
                      và
                      <a href="#" class="terms-link" @click.prevent>Chính sách bảo mật</a>
                      của ToyStore.
                    </div>
                  </template>
                </v-checkbox>

                <!-- Register Button -->
                <v-btn type="submit" block size="large" color="#ee9d2b"
                  class="text-none font-weight-bold mb-6 register-btn" elevation="1">
                  Đăng ký ngay
                </v-btn>
              </v-form>

              <!-- Divider -->
              <div class="divider-section mb-6">
                <v-divider></v-divider>
                <span class="divider-text">Hoặc đăng ký với</span>
                <v-divider></v-divider>
              </div>

              <!-- Social Buttons -->
              <v-row class="mb-6">
                <v-col cols="6">
                  <v-btn variant="outlined" block size="large" class="text-none social-btn" @click="registerWithGoogle">
                    <v-img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPfAXkjZBb_fbkZkfzSbvAHk6YqkrfUf4Sx0tCpvtg_1_Qq-pjqMPsERGrSt1mXdjO1W6IVje1sNuh8oqYarR_VYsIxdGLu9I0aTiUHQQoYubcxOW8IuMCb2BnEQR3ZlfsNTh-v_ufqW89In_7zUDNR5Diy08cH7FsRuOW2j4knFmTLZg4r_E71euKLoi61u0dR9F1C_mvDVA3D68hkODBm8qgdOewGi73kdeT45IqAUDYX4BK7yHBFjPl8cJGzMWFUU9u96h-vAsi"
                      alt="Google Logo" width="20" height="20" class="mr-2"></v-img>
                    Google
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn variant="outlined" block size="large" class="text-none social-btn"
                    @click="registerWithFacebook">
                    <v-icon color="#1877F2" class="mr-2">mdi-facebook</v-icon>
                    Facebook
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Login Link -->
              <div class="text-center">
                <span class="text-grey-darken-1">Bạn đã có tài khoản? </span>
                <a href="#" class="login-link" @click.prevent="goToLogin">Đăng nhập</a>
              </div>
            </div>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500" persistent>
      <v-card class="success-dialog">
        <!-- Decorative Top Bar -->
        <div class="success-top-bar"></div>

        <!-- Close Button -->
        <v-btn icon variant="text" class="close-btn" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card-text class="text-center pa-8">
          <!-- Success Icon with Animation -->
          <div class="icon-container mb-6">
            <div class="icon-glow"></div>
            <div class="icon-circle-success">
              <v-icon size="56" color="white">mdi-check-circle</v-icon>
            </div>
            <!-- Confetti decorations -->
            <v-icon class="confetti confetti-1" size="16" color="#FFD700">mdi-star-four-points</v-icon>
            <v-icon class="confetti confetti-2" size="14" color="#FF6B6B">mdi-triangle</v-icon>
            <v-icon class="confetti confetti-3" size="12" color="#4ECDC4">mdi-circle</v-icon>
            <v-icon class="confetti confetti-4" size="16" color="#FFD700">mdi-star-four-points</v-icon>
          </div>

          <!-- Title -->
          <h3 class="text-h4 font-weight-bold mb-3">
            Đăng ký thành công!
          </h3>

          <!-- Description -->
          <p class="text-body-1 text-grey-darken-1 mb-6">
            Chào mừng bé và gia đình đến với thế giới đồ chơi kỳ diệu! Tài khoản của bạn đã được tạo thành công.
          </p>

          <!-- Toy Image -->
          <div class="toy-image-container mb-6">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_7Rb9Vq_UPlaDWZXy14II9wVbQvZnuK63P-GoIs5R4BMrhtXs30DtwqPvZxmXQus6Vu8nvpQy9ua-hcWLY3swkpDXql5_oWZldXiXJeWx2ESk-pcA3abwXM-Y-CjNwATnBEuhzVb2SkGutkz4V8KhFY9WriwBKuzqbcvp1bODGh-dLnXe4MQ2Ob7AFyqad7Hv7yZG2LwQZ4KrmjuwSSlciMU2IbJUn5-4CbdSHYEgIW8F-G2ofPrS2_fYoGeg2QepLF8JKcvoGzYs"
              alt="Colorful toys" cover height="120" class="rounded-xl">
              <div class="toy-overlay"></div>
            </v-img>
          </div>

          <!-- Countdown -->
          <div class="countdown-text mb-6">
            <p class="text-caption text-grey">
              Tự động chuyển về trang chủ sau <span class="countdown-number">{{ countdown }}</span> giây
            </p>
          </div>

          <!-- Actions -->
          <div class="d-flex flex-column gap-3">
            <v-btn block size="large" color="#ee9d2b" class="text-none font-weight-bold" @click="startShopping">
              <v-icon class="mr-2">mdi-shopping</v-icon>
              Bắt đầu mua sắm
            </v-btn>
            <v-btn block size="large" variant="outlined" class="text-none" @click="goToLogin">
              Quản lý tài khoản
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form ref
const formRef = ref(null)

// Form data
const parentName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const childName = ref('')
const childBirthdate = ref(null)
const agreeTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const dateMenu = ref(false)

// Dialog state
const showSuccessDialog = ref(false)
const countdown = ref(5)

let countdownInterval = null

// Computed formatted date
const formattedDate = computed(() => {
  if (!childBirthdate.value) return ''
  const date = new Date(childBirthdate.value)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

// Validation rules
const nameRules = [
  v => !!v || 'Tên là bắt buộc',
  v => v.length >= 3 || 'Tên phải có ít nhất 3 ký tự'
]

const emailRules = [
  v => !!v || 'Email là bắt buộc',
  v => /^[^\s@]+@[^\s@]+\.com$/.test(v) || 'Email phải có đuôi .com'
]

const passwordRules = [
  v => !!v || 'Mật khẩu là bắt buộc',
  v => v.length >= 8 || 'Mật khẩu phải có ít nhất 8 ký tự'
]

const confirmPasswordRules = [
  v => !!v || 'Xác nhận mật khẩu là bắt buộc',
  v => v === password.value || 'Mật khẩu không khớp'
]

const termsRules = [
  v => !!v || 'Bạn phải đồng ý với điều khoản'
]

// Methods
const handleRegister = async () => {
  // Validate form trước khi submit
  const { valid } = await formRef.value.validate()

  if (!valid) {
    return // Dừng lại nếu form không hợp lệ
  }

  console.log('Register attempt:', {
    parentName: parentName.value,
    email: email.value,
    childName: childName.value,
    childBirthdate: childBirthdate.value
  })

  // Show success dialog
  showSuccessDialog.value = true
  startCountdown()
}

const startCountdown = () => {
  countdown.value = 5

  countdownInterval = setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      clearInterval(countdownInterval)
      startShopping()
    }
  }, 1000)
}

const closeDialog = () => {
  showSuccessDialog.value = false
  clearInterval(countdownInterval)
}

const startShopping = () => {
  clearInterval(countdownInterval)
  router.push('/')
}

const registerWithGoogle = () => {
  console.log('Register with Google')
  // Add Google OAuth logic here
}

const registerWithFacebook = () => {
  console.log('Register with Facebook')
  // Add Facebook OAuth logic here
}

const goToLogin = () => {
  clearInterval(countdownInterval)
  router.push('/login')
}

// Cleanup on component unmount
onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #f8f7f6;
}

.image-section {
  height: 100vh;
  position: relative;
  background-color: #fff5eb;
}

.image-overlay {
  position: relative;
}

.overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 1;
}

.overlay-text {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  color: white;
  z-index: 2;
}

.form-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-y: auto;
}

.form-container {
  max-width: 520px;
  width: 100%;
  padding: 32px 24px;
}

.form-content {
  width: 100%;
}

.terms-label {
  font-size: 14px;
  line-height: 1.5;
}

.terms-link {
  color: #ee9d2b;
  text-decoration: none;
  font-weight: 600;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-btn {
  letter-spacing: 0;
  box-shadow: 0 2px 4px rgba(238, 157, 43, 0.2) !important;
}

.register-btn:hover {
  background-color: #d88c22 !important;
  box-shadow: 0 4px 8px rgba(238, 157, 43, 0.3) !important;
}

.divider-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider-text {
  color: #897961;
  font-size: 0.875rem;
  white-space: nowrap;
}

.social-btn {
  border-color: #e6e1db !important;
  text-transform: none;
  font-weight: 600;
}

.social-btn:hover {
  background-color: #f8f7f6 !important;
}

.login-link {
  color: #ee9d2b;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
}

.login-link:hover {
  text-decoration: underline;
}

/* Remove Vuetify's default field styling tweaks */
:deep(.v-field) {
  border-radius: 12px;
}

:deep(.v-field--focused) {
  box-shadow: 0 0 0 2px rgba(238, 157, 43, 0.2);
}

/* Mobile responsive */
@media (max-width: 1279px) {
  .form-section {
    min-height: auto;
    padding: 40px 0;
  }

  .form-container {
    padding: 16px;
  }
}

/* Success Dialog Styles */
.success-dialog {
  position: relative;
  overflow: visible !important;
}

.success-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(238, 157, 43, 0.6) 0%, #ee9d2b 50%, rgba(238, 157, 43, 0.6) 100%);
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  color: #897961;
}

.close-btn:hover {
  background-color: #f8f7f6;
}

.icon-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: rgba(238, 157, 43, 0.3);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
  filter: blur(16px);
}

.icon-circle-success {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ee9d2b 0%, #f5a623 100%);
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(238, 157, 43, 0.4);
  animation: bounce-in 0.6s ease-out;
}

/* Confetti animations */
.confetti {
  position: absolute;
  animation: float-confetti 3s ease-in-out infinite;
}

.confetti-1 {
  top: -10px;
  right: -10px;
  animation-delay: 0s;
}

.confetti-2 {
  top: 20px;
  right: -20px;
  animation-delay: 0.5s;
}

.confetti-3 {
  bottom: 10px;
  left: -15px;
  animation-delay: 1s;
}

.confetti-4 {
  bottom: -5px;
  right: 10px;
  animation-delay: 1.5s;
}

.toy-image-container {
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #f4f3f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toy-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
}

.countdown-text {
  color: #897961;
}

.countdown-number {
  display: inline-block;
  font-weight: bold;
  color: #ee9d2b;
  font-size: 1.2em;
  min-width: 22px;
  text-align: center;
  animation: countdown-pulse 1s ease-in-out infinite;
}

/* Animations */
@keyframes pulse-glow {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }

  50% {
    transform: scale(1.15) rotate(180deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

@keyframes float-confetti {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.7;
  }
}

@keyframes countdown-pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}
</style>