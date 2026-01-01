<template>
  <div class="change-password-tab">
    <!-- Header -->
    <div class="tab-header mb-6">
      <h2 class="tab-title">Đổi mật khẩu</h2>
      <p class="tab-subtitle">
        Quản lý và bảo mật tài khoản của bạn. Vui lòng không chia sẻ mật khẩu cho người khác.
      </p>
    </div>

    <v-row>
      <!-- Form Column -->
      <v-col cols="12" xl="8">
        <div class="form-section">
          <!-- Error Alert -->
          <v-alert
            v-if="showError"
            type="error"
            variant="tonal"
            closable
            class="mb-6"
            @click:close="showError = false"
          >
            <template v-slot:prepend>
              <v-icon>mdi-alert-circle</v-icon>
            </template>
            <div>
              <h4 class="alert-title">Lỗi xác thực</h4>
              <p class="alert-text">{{ errorMessage }}</p>
            </div>
          </v-alert>

          <!-- Password Form Card -->
          <v-card class="password-form-card" elevation="0">
            <v-form ref="formRef" @submit.prevent="handleSubmit">
              <!-- Current Password -->
              <div class="form-field">
                <label class="field-label">Mật khẩu hiện tại</label>
                <v-text-field
                  v-model="formData.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Nhập mật khẩu hiện tại"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  @click:append-inner="showCurrentPassword = !showCurrentPassword"
                ></v-text-field>
                <div class="field-action">
                  <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <v-divider class="my-6"></v-divider>

              <!-- New Password -->
              <div class="form-field">
                <label class="field-label">Mật khẩu mới</label>
                <v-text-field
                  v-model="formData.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Nhập mật khẩu mới"
                  prepend-inner-icon="mdi-key"
                  :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.minLength]"
                  @input="checkPasswordStrength"
                  @click:append-inner="showNewPassword = !showNewPassword"
                ></v-text-field>

                <!-- Password Strength Indicator -->
                <v-card class="strength-card" variant="flat" color="grey-lighten-4">
                  <div class="strength-header">
                    <span class="strength-label">
                      Độ mạnh mật khẩu: 
                      <span :class="['strength-value', strengthClass]">
                        {{ strengthText }}
                      </span>
                    </span>
                  </div>
                  <v-progress-linear
                    :model-value="strengthPercentage"
                    :color="strengthColor"
                    height="6"
                    rounded
                    class="mb-3"
                  ></v-progress-linear>
                  <div class="requirements-grid">
                    <div
                      v-for="req in passwordRequirements"
                      :key="req.label"
                      :class="['requirement-item', { 'met': req.met }]"
                    >
                      <v-icon :color="req.met ? 'green' : 'grey'" size="16">
                        {{ req.met ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                      </v-icon>
                      <span>{{ req.label }}</span>
                    </div>
                  </div>
                </v-card>
              </div>

              <!-- Confirm Password -->
              <div class="form-field">
                <label class="field-label">Xác nhận mật khẩu mới</label>
                <v-text-field
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Nhập lại mật khẩu mới"
                  prepend-inner-icon="mdi-lock-reset"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.passwordMatch]"
                  :error="!passwordsMatch && formData.confirmPassword.length > 0"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
                <div v-if="!passwordsMatch && formData.confirmPassword.length > 0" class="error-message">
                  <v-icon color="red" size="16">mdi-alert-circle</v-icon>
                  <span>Mật khẩu xác nhận không trùng khớp</span>
                </div>
              </div>

              <!-- Form Actions -->
              <v-divider class="my-6"></v-divider>
              <div class="form-actions">
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  :loading="loading"
                  prepend-icon="mdi-content-save"
                >
                  Lưu thay đổi
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="grey-darken-1"
                  size="large"
                  @click="handleCancel"
                >
                  Hủy bỏ
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-col>

      <!-- Info Column -->
      <v-col cols="12" xl="4">
        <div class="info-section">
          <!-- Security Tips Card -->
          <v-card class="security-card" color="blue-lighten-5" elevation="0">
            <div class="security-icon">
              <v-avatar size="48" color="white">
                <v-icon color="blue" size="28">mdi-shield-check</v-icon>
              </v-avatar>
            </div>
            <h3 class="security-title">Bảo mật tài khoản</h3>
            <p class="security-description">
              Đặt mật khẩu mạnh giúp bảo vệ tài khoản khỏi bị truy cập trái phép.
            </p>
            <div class="security-tips">
              <div class="tip-item">
                <v-icon color="blue" size="20">mdi-check-decagram</v-icon>
                <p>Nên thay đổi mật khẩu định kỳ 3-6 tháng/lần.</p>
              </div>
              <div class="tip-item">
                <v-icon color="blue" size="20">mdi-key-variant</v-icon>
                <p>Không sử dụng mật khẩu đã từng dùng cho các tài khoản khác.</p>
              </div>
              <div class="tip-item">
                <v-icon color="blue" size="20">mdi-devices</v-icon>
                <p>Đăng xuất khỏi các thiết bị lạ sau khi sử dụng.</p>
              </div>
            </div>
          </v-card>

          <!-- Support Card -->
          <v-card class="support-card mt-6" elevation="0">
            <div class="support-header">
              <v-avatar size="40" color="primary" variant="tonal">
                <v-icon>mdi-help-circle</v-icon>
              </v-avatar>
              <h3 class="support-title">Gặp khó khăn?</h3>
            </div>
            <p class="support-text">
              Nếu bạn quên mật khẩu hoặc nghi ngờ tài khoản bị xâm nhập, hãy liên hệ ngay với chúng tôi.
            </p>
            <v-btn
              variant="flat"
              color="grey-lighten-2"
              block
              @click="contactSupport"
            >
              Liên hệ hỗ trợ
            </v-btn>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Last Changed Banner -->
    <v-card class="last-changed-banner mt-6" color="green-lighten-5" elevation="0">
      <v-card-text class="banner-content">
        <div class="banner-info">
          <v-avatar size="48" color="white">
            <v-icon color="green" size="28">mdi-lock-clock</v-icon>
          </v-avatar>
          <div>
            <h4 class="banner-title">Lần thay đổi gần nhất</h4>
            <p class="banner-text">{{ lastChanged }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      location="top"
      rounded="pill"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbarIcon }}</v-icon>
        <span>{{ snackbarMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useForm } from '@/composables/useForm'
import { useNotification } from '@/composables/useNotification'

// Emits
const emit = defineEmits(['password-changed', 'cancel'])

// Use composables
const { formData, formRef, validate, reset } = useForm({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const { showSuccess, showError: showErrorNotification, showInfo } = useNotification()

// Refs
const showError = ref(false)
const errorMessage = ref('')

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength
const passwordStrength = ref(0)
const lastChanged = ref('20/05/2023 - 3 tháng trước')

// Validation rules
const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
  minLength: value => value.length >= 8 || 'Mật khẩu phải có ít nhất 8 ký tự',
  passwordMatch: value => value === formData.value.newPassword || 'Mật khẩu không khớp'
}

// Computed
const passwordsMatch = computed(() => {
  return formData.value.newPassword === formData.value.confirmPassword
})

const passwordRequirements = computed(() => {
  const password = formData.value.newPassword
  return [
    {
      label: 'Tối thiểu 8 ký tự',
      met: password.length >= 8
    },
    {
      label: 'Ít nhất một số (0-9)',
      met: /\d/.test(password)
    },
    {
      label: 'Ký tự đặc biệt (!@#$%)',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    },
    {
      label: 'Chữ hoa & chữ thường',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password)
    }
  ]
})

const strengthPercentage = computed(() => {
  return passwordStrength.value * 25
})

const strengthText = computed(() => {
  const texts = ['Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh']
  return texts[passwordStrength.value - 1] || 'Yếu'
})

const strengthColor = computed(() => {
  const colors = ['red', 'orange', 'primary', 'green']
  return colors[passwordStrength.value - 1] || 'grey'
})

const strengthClass = computed(() => {
  const classes = ['weak', 'medium', 'strong', 'very-strong']
  return classes[passwordStrength.value - 1] || 'weak'
})

// Watch for password changes
watch(() => formData.value.newPassword, checkPasswordStrength)

// Methods
const checkPasswordStrength = () => {
  const metRequirements = passwordRequirements.value.filter(req => req.met).length
  passwordStrength.value = metRequirements
}

const handleSubmit = async () => {
  const isValid = await validate()
  
  if (isValid) {
    if (!passwordsMatch.value) {
      showError.value = true
      errorMessage.value = 'Mật khẩu xác nhận không trùng khớp'
      return
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate success
    const success = Math.random() > 0.3 // 70% success rate
    
    if (success) {
      emit('password-changed', {
        timestamp: new Date().toISOString()
      })
      
      showSuccess('Đổi mật khẩu thành công!')
      
      // Reset form
      reset()
      formRef.value?.resetValidation()
      passwordStrength.value = 0
      
      // Update last changed
      lastChanged.value = new Date().toLocaleDateString('vi-VN') + ' - Vừa xong'
    } else {
      showError.value = true
      errorMessage.value = 'Mật khẩu hiện tại không chính xác. Vui lòng kiểm tra lại.'
    }
  }
}

const handleCancel = () => {
  reset()
  formRef.value?.resetValidation()
  passwordStrength.value = 0
  showError.value = false
  emit('cancel')
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
  showInfo('Đang chuyển đến trang khôi phục mật khẩu...')
  // Navigate to forgot password page
}

const contactSupport = () => {
  console.log('Contact support clicked')
  showInfo('Đang kết nối với hỗ trợ khách hàng...')
  // Open support chat or navigate to support page
}
</script>

<style scoped>
.change-password-tab {
  width: 100%;
}

/* Header */
.tab-header {
  margin-bottom: 24px;
}

.tab-title {
  font-size: 28px;
  font-weight: 900;
  color: #181511;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.tab-subtitle {
  font-size: 15px;
  color: #897961;
  line-height: 1.6;
}

/* Form Section */
.form-section {
  width: 100%;
}

.password-form-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 32px;
}

.form-field {
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.field-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.forgot-link {
  font-size: 14px;
  color: #ee9d2b;
  font-weight: 600;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Password Strength */
.strength-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f4f3f0;
  margin-top: 16px;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.strength-label {
  font-size: 12px;
  font-weight: 500;
  color: #5c564b;
}

.strength-value {
  font-weight: 700;
}

.strength-value.weak {
  color: #d32f2f;
}

.strength-value.medium {
  color: #f57c00;
}

.strength-value.strong {
  color: #ee9d2b;
}

.strength-value.very-strong {
  color: #2e7d32;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #897961;
  transition: color 0.3s;
}

.requirement-item.met {
  color: #2e7d32;
  font-weight: 500;
}

/* Error Message */
.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: #d32f2f;
  font-size: 12px;
  font-weight: 500;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Alert */
.alert-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.alert-text {
  font-size: 13px;
  margin: 0;
}

/* Info Section */
.info-section {
  width: 100%;
}

/* Security Card */
.security-card {
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: 16px;
  padding: 24px;
}

.security-icon {
  margin-bottom: 16px;
}

.security-title {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.security-description {
  font-size: 14px;
  color: #5c564b;
  line-height: 1.6;
  margin-bottom: 16px;
}

.security-tips {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.tip-item p {
  font-size: 12px;
  color: #5c564b;
  line-height: 1.5;
  margin: 0;
}

/* Support Card */
.support-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 24px;
}

.support-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.support-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
}

.support-text {
  font-size: 14px;
  color: #5c564b;
  line-height: 1.6;
  margin-bottom: 16px;
}

/* Last Changed Banner */
.last-changed-banner {
  border: 1px solid rgba(46, 125, 50, 0.2);
  border-radius: 16px;
}

.banner-content {
  padding: 24px !important;
}

.banner-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.banner-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin: 0 0 4px 0;
}

.banner-text {
  font-size: 14px;
  color: #5c564b;
  margin: 0;
}

/* Custom Vuetify overrides */
:deep(.v-text-field .v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

:deep(.v-alert) {
  border-radius: 12px;
}

/* Remove button focus outline */
:deep(.v-btn .v-btn__focus-ring) {
  display: none !important;
}

:deep(.v-btn) {
  outline: none !important;
}

/* Responsive */
@media (max-width: 1280px) {
  .info-section {
    margin-top: 24px;
  }
}

@media (max-width: 600px) {
  .password-form-card {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .form-actions .v-btn {
    width: 100%;
  }
  
  .requirements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
