<template>
  <div class="login-page">
    <v-row no-gutters class="fill-height">
      <!-- Left Side: Image (Hidden on mobile) -->
      <v-col cols="12" lg="6" class="d-none d-lg-block">
        <div class="image-section">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtf5V2X7_aFiQKkqsK1My9wWQkh61ByNeZEJ_I1rBMEDE7pqURAQfIAk8HMvTLQVbLPFboVof_R5e8RJwHdoLPK20BViJ3mY-k_Hv5WuFTTbiLF-daiohnblBodX8YluFm61WIjSwWhYwj8AgUxZaXFO0idrtbivDMNtNtAt-_ChSv7vokQry40nauI8lOagQ4UzAN43Kv8MZASBpN_dVR8E7FKuXn9-g0ELpm2gn8xZpG1gf5m-u5kDl8RHjlDKOAGD5Rto_Tw3X1"
            alt="Happy child playing with colorful wooden building blocks" cover height="100%" class="image-overlay">
            <div class="overlay-gradient"></div>
            <div class="overlay-text">
              <h2 class="text-h4 font-weight-bold mb-2">Mang niềm vui đến từng ngôi nhà</h2>
              <p class="text-body-1">Khám phá thế giới đồ chơi an toàn và sáng tạo cho bé yêu của bạn.</p>
            </div>
          </v-img>
        </div>
      </v-col>

      <!-- Right Side: Login Form -->
      <v-col cols="12" lg="6">
        <div class="form-section">
          <v-container class="form-container">
            <div class="form-content">
              <!-- Heading -->
              <div class="mb-8">
                <h1 class="text-h4 font-weight-bold mb-2">Chào mừng bố mẹ trở lại!</h1>
                <p class="text-body-1 text-grey-darken-1">Vui lòng nhập thông tin để tiếp tục mua sắm.</p>
              </div>

              <!-- Form -->
              <v-form ref="formRef" @submit.prevent="handleLogin">
                <!-- Email Input -->
                <v-text-field v-model="email" label="Email hoặc Số điện thoại" placeholder="example@email.com"
                  variant="outlined" prepend-inner-icon="mdi-email-outline" color="#ee9d2b" class="mb-4"
                  :rules="emailOrPhoneRules" clearable></v-text-field>

                <!-- Password Input -->
                <v-text-field v-model="password" label="Mật khẩu" placeholder="•••••••••" variant="outlined"
                  prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'" color="#ee9d2b" class="mb-2" :rules="passwordRules"
                  @click:append-inner="showPassword = !showPassword"></v-text-field>

                <!-- Forgot Password Link -->
                <div class="d-flex justify-end mb-6">
                  <a href="#" class="forgot-link" @click.prevent="goToForgotPassword">Quên mật khẩu?</a>
                </div>

                <!-- Login Button -->
                <v-btn type="submit" block size="large" color="#ee9d2b"
                  class="text-none font-weight-bold mb-6 login-btn" elevation="1"
                  :disabled="!email || !password">
                  Đăng nhập
                </v-btn>
              </v-form>

              <!-- Divider -->
              <div class="divider-section mb-6">
                <v-divider></v-divider>
                <span class="divider-text">Hoặc đăng nhập với</span>
                <v-divider></v-divider>
              </div>

              <!-- Social Buttons -->
              <v-row class="mb-6">
                <v-col cols="6">
                  <v-btn variant="outlined" block size="large" class="text-none social-btn" @click="loginWithGoogle">
                    <v-icon size="20" class="mr-2" color="#DB4437">mdi-google</v-icon>
                    Google
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn variant="outlined" block size="large" class="text-none social-btn" @click="loginWithFacebook">
                    <v-icon size="20" class="mr-2" color="#1877F2">mdi-facebook</v-icon>
                    Facebook
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Register Link -->
              <div class="text-center mb-4">
                <span class="text-grey-darken-1">Chưa có tài khoản? </span>
                <a href="#" class="register-link" @click.prevent="goToRegister">Đăng ký ngay</a>
              </div>

              <!-- Secure Badge -->
              <div class="text-center secure-badge">
                <v-icon size="small" class="mr-1" color="green">mdi-lock</v-icon>
                <span class="text-caption">Thông tin được bảo mật tuyệt đối</span>
              </div>
            </div>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { emailRules, passwordRules } from '@/utils/validation'

const router = useRouter()
const userStore = useUserStore()

// Form ref
const formRef = ref(null)

// Form data
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// Validation rules
// Login accepts both email and phone, so we keep custom validation here
const emailOrPhoneRules = [
  v => !!v || 'Email hoặc số điện thoại là bắt buộc',
  v => {
    // Kiểm tra nếu là số điện thoại (10 số, bắt đầu bằng 0)
    const phoneRegex = /^0\d{9}$/
    // Kiểm tra nếu là email (có đuôi .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/

    if (phoneRegex.test(v)) {
      return true // Hợp lệ nếu là số điện thoại 10 số
    }
    if (emailRegex.test(v)) {
      return true // Hợp lệ nếu là email .com
    }
    return 'Vui lòng nhập email (.com) hoặc số điện thoại (10 số)'
  }
]


// Methods
const handleLogin = async () => {
  if (!email.value || !password.value) {
    return
  }
  
  const { valid } = await formRef.value.validate()
  if (!valid) {
    return
  }
  
  console.log('Login attempt:', email.value, password.value)
  
  // Simulate login success with mock user data
  // TODO: Replace with actual API call
  const userData = {
    id: 1,
    name: email.value.split('@')[0] || 'Người dùng',
    email: email.value,
    avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(email.value.split('@')[0] || 'User') + '&background=ee9d2b&color=fff'
  }
  
  userStore.login(userData)
  router.push('/')
}

const loginWithGoogle = () => {
  console.log('Login with Google')
  // Add Google OAuth logic here
  // Simulate successful login
  const userData = {
    id: 2,
    name: 'Google User',
    email: 'user@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff'
  }
  userStore.login(userData)
  router.push('/')
}

const loginWithFacebook = () => {
  console.log('Login with Facebook')
  // Add Facebook OAuth logic here
  // Simulate successful login
  const userData = {
    id: 3,
    name: 'Facebook User',
    email: 'user@facebook.com',
    avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff'
  }
  userStore.login(userData)
  router.push('/')
}

const goToRegister = () => {
  router.push('/register')
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style scoped>
.login-page {
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
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
  max-width: 480px;
  width: 100%;
  padding: 24px;
}

.form-content {
  width: 100%;
}

.forgot-link {
  color: #ee9d2b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #d68515;
}

.login-btn {
  letter-spacing: 0;
  box-shadow: 0 2px 4px rgba(238, 157, 43, 0.2) !important;
}

.login-btn:hover:not(:disabled) {
  background-color: #d68515 !important;
  box-shadow: 0 4px 8px rgba(238, 157, 43, 0.3) !important;
}

.login-btn:disabled {
  opacity: 0.5 !important;
  background-color: #f5d9a8 !important;
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

.register-link {
  color: #ee9d2b;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
}

.register-link:hover {
  text-decoration: underline;
}

.secure-badge {
  color: #897961;
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
</style>