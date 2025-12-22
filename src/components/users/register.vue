<template>
  <div class="register-page">
    <v-row no-gutters class="fill-height">
      <!-- Left Side: Image (Hidden on mobile) -->
      <v-col cols="12" lg="6" class="d-none d-lg-block">
        <div class="image-section">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GDA6fRH_YU6l-nGcpmJjU4gj9YKg3HboSZQHAZ95K-kCgxt9a5oV5VjCAKAekmyAFcRqvwEuKAQWFYrNo0Wy52wBBnj9wxn6-BEo6EiWUnfPaY7SBw7kRF8v2g_zhlFIRQfyPJ8wVH8oBXorOTTRbF8cJAHSPewnXreUzawQl4syGWfsYwimLEGVG_TrBQuvs5Ilx1YXcVmPSxgFJWvOIRpWujPiZdjj1CE0fNw_R9BFHCbPJc7lE9QdL2DDKXnmPkgwkmgJm96c"
            alt="Happy child playing with colorful wooden toys"
            cover
            height="100%"
            class="image-overlay"
          >
            <div class="overlay-gradient"></div>
            <div class="overlay-text">
              <h3 class="text-h4 font-weight-bold mb-2">Niềm vui cho bé, An tâm cho mẹ</h3>
              <p class="text-body-1">Khám phá hàng ngàn món đồ chơi an toàn, sáng tạo giúp bé phát triển trí tuệ mỗi ngày.</p>
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
                <h1 class="text-h4 font-weight-bold mb-2">Đăng ký tài khoản Phụ huynh</h1>
                <p class="text-body-1 text-grey-darken-1">
                  Đăng ký để quản lý tài khoản và nhận các ưu đãi đặc biệt dành riêng cho bé yêu của bạn.
                </p>
              </div>

              <!-- Form -->
              <v-form @submit.prevent="handleRegister">
                <!-- Parent Name -->
                <v-text-field
                  v-model="parentName"
                  label="Tên của bạn (Phụ huynh)"
                  placeholder="Nhập họ và tên"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-outline"
                  color="#ee9d2b"
                  class="mb-4"
                  :rules="nameRules"
                ></v-text-field>

                <!-- Email -->
                <v-text-field
                  v-model="email"
                  label="Email"
                  placeholder="name@example.com"
                  variant="outlined"
                  prepend-inner-icon="mdi-email-outline"
                  color="#ee9d2b"
                  class="mb-4"
                  :rules="emailRules"
                ></v-text-field>

                <!-- Password -->
                <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  placeholder="Tối thiểu 8 ký tự"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  color="#ee9d2b"
                  class="mb-4"
                  :rules="passwordRules"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>

                <!-- Confirm Password -->
                <v-text-field
                  v-model="confirmPassword"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-reset"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  color="#ee9d2b"
                  class="mb-4"
                  :rules="confirmPasswordRules"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>

                <!-- Child Info (Optional) -->
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="childName"
                      label="Tên bé (Tùy chọn)"
                      placeholder="Tên bé"
                      variant="outlined"
                      prepend-inner-icon="mdi-baby-face-outline"
                      color="#ee9d2b"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="childBirthdate"
                      label="Ngày sinh bé (Tùy chọn)"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-cake-variant"
                      color="#ee9d2b"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Terms Checkbox -->
                <v-checkbox
                  v-model="agreeTerms"
                  color="#ee9d2b"
                  class="mb-2"
                  :rules="termsRules"
                >
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
                <v-btn
                  type="submit"
                  block
                  size="large"
                  color="#ee9d2b"
                  class="text-none font-weight-bold mb-6 register-btn"
                  elevation="1"
                >
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
                  <v-btn
                    variant="outlined"
                    block
                    size="large"
                    class="text-none social-btn"
                    @click="registerWithGoogle"
                  >
                    <v-img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPfAXkjZBb_fbkZkfzSbvAHk6YqkrfUf4Sx0tCpvtg_1_Qq-pjqMPsERGrSt1mXdjO1W6IVje1sNuh8oqYarR_VYsIxdGLu9I0aTiUHQQoYubcxOW8IuMCb2BnEQR3ZlfsNTh-v_ufqW89In_7zUDNR5Diy08cH7FsRuOW2j4knFmTLZg4r_E71euKLoi61u0dR9F1C_mvDVA3D68hkODBm8qgdOewGi73kdeT45IqAUDYX4BK7yHBFjPl8cJGzMWFUU9u96h-vAsi"
                      alt="Google Logo"
                      width="20"
                      height="20"
                      class="mr-2"
                    ></v-img>
                    Google
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    variant="outlined"
                    block
                    size="large"
                    class="text-none social-btn"
                    @click="registerWithFacebook"
                  >
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const parentName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const childName = ref('')
const childBirthdate = ref('')
const agreeTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation rules
const nameRules = [
  v => !!v || 'Tên là bắt buộc',
  v => v.length >= 3 || 'Tên phải có ít nhất 3 ký tự'
]

const emailRules = [
  v => !!v || 'Email là bắt buộc',
  v => /.+@.+\..+/.test(v) || 'Email không hợp lệ'
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
const handleRegister = () => {
  console.log('Register attempt:', {
    parentName: parentName.value,
    email: email.value,
    childName: childName.value,
    childBirthdate: childBirthdate.value
  })
  // Add your registration logic here
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
  router.push('/login')
}
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
</style>