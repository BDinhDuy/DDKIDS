<template>
  <div class="personal-info-tab">
    <!-- Header -->
    <div class="tab-header mb-6">
      <h2 class="tab-title">Thông tin cá nhân</h2>
      <p class="tab-subtitle">
        Quản lý và cập nhật thông tin tài khoản của bạn để đảm bảo trải nghiệm mua sắm tốt nhất.
      </p>
    </div>

    <!-- Main Form Card -->
    <v-card class="info-form-card" elevation="0">
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <!-- Avatar Section -->
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <v-avatar size="96" class="user-avatar-large">
              <v-img :src="formData.avatar" alt="User profile picture"></v-img>
            </v-avatar>
            <div class="avatar-overlay" @click="handleAvatarClick">
              <v-icon color="white" size="28">mdi-camera</v-icon>
            </div>
          </div>
          <div class="avatar-info">
            <h3 class="avatar-title">Ảnh đại diện</h3>
            <p class="avatar-description">
              Chấp nhận file: .JPG, .PNG. Kích thước tối đa 2MB.
            </p>
            <div class="avatar-actions">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                size="small"
                @click="handleAvatarClick"
              >
                Chọn ảnh
              </v-btn>
              <v-btn
                variant="text"
                color="red"
                size="small"
                @click="handleRemoveAvatar"
              >
                Xóa
              </v-btn>
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/jpeg,image/png"
            style="display: none"
            @change="handleFileChange"
          />
        </div>

        <v-divider class="my-6"></v-divider>

        <!-- Basic Information -->
        <div class="form-section">
          <h3 class="section-title mb-4">Thông tin cơ bản</h3>
          
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.fullName"
                label="Họ và tên"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required]"
                placeholder="Nhập họ và tên của bạn"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.phone"
                label="Số điện thoại"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required, rules.phone]"
                placeholder="Nhập số điện thoại"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.email"
                label="Email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required, rules.email]"
                placeholder="Nhập địa chỉ email"
                type="email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.birthdate"
                label="Ngày sinh"
                prepend-inner-icon="mdi-calendar"
                variant="outlined"
                density="comfortable"
                type="date"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <label class="gender-label">Giới tính</label>
              <v-radio-group v-model="formData.gender" inline class="mt-2">
                <v-radio label="Nữ" value="female" color="primary"></v-radio>
                <v-radio label="Nam" value="male" color="primary"></v-radio>
                <v-radio label="Khác" value="other" color="primary"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </div>

        <v-divider class="my-6"></v-divider>

        <!-- Child Information -->
        <div class="form-section">
          <h3 class="section-title mb-2">Thông tin bé (Tùy chọn)</h3>
          <p class="section-description mb-4">
            Cung cấp thông tin của bé giúp chúng tôi gợi ý những món đồ chơi phù hợp nhất cho từng độ tuổi.
          </p>
          
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.kidName"
                label="Tên bé"
                prepend-inner-icon="mdi-baby-face"
                variant="outlined"
                density="comfortable"
                placeholder="Tên thân mật của bé"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.kidBirthdate"
                label="Ngày sinh của bé"
                prepend-inner-icon="mdi-cake-variant"
                variant="outlined"
                density="comfortable"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <!-- Security Notice -->
        <v-alert
          type="info"
          variant="tonal"
          color="blue"
          class="my-6"
          border="start"
          density="comfortable"
        >
          <template v-slot:prepend>
            <v-icon>mdi-shield-check</v-icon>
          </template>
          <div class="security-notice">
            <p class="notice-title">Bảo mật thông tin</p>
            <p class="notice-text">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn theo chính sách quyền riêng tư. 
              Thông tin của bé chỉ được sử dụng để gợi ý sản phẩm phù hợp.
            </p>
          </div>
        </v-alert>

        <!-- Form Actions -->
        <v-divider class="mb-6"></v-divider>
        <div class="form-actions">
          <v-btn
            variant="text"
            color="grey-darken-1"
            size="large"
            @click="handleCancel"
          >
            Hủy bỏ
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            size="large"
            :loading="loading"
            prepend-icon="mdi-content-save"
          >
            Lưu thay đổi
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <!-- Social Accounts Card -->
    <v-card class="social-accounts-card mt-6" elevation="0">
      <div class="card-header-section">
        <h3 class="card-section-title">Liên kết tài khoản mạng xã hội</h3>
        <span class="card-section-subtitle">Để đăng nhập nhanh chóng hơn</span>
      </div>

      <v-divider class="my-4"></v-divider>

      <div class="social-accounts-list">
        <!-- Facebook -->
        <div class="social-account-item">
          <div class="social-account-info">
            <v-avatar size="40" color="#1877F2">
              <v-icon color="white" size="20">mdi-facebook</v-icon>
            </v-avatar>
            <div class="social-account-details">
              <p class="social-name">Facebook</p>
              <p class="social-status connected">Đã liên kết (Mai Nguyen)</p>
            </div>
          </div>
          <v-btn
            variant="text"
            color="red"
            size="small"
            @click="handleUnlinkSocial('facebook')"
          >
            Hủy liên kết
          </v-btn>
        </div>

        <v-divider class="my-3"></v-divider>

        <!-- Google -->
        <div class="social-account-item">
          <div class="social-account-info">
            <v-avatar size="40" color="white" class="google-avatar">
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHKaR_L1Fed_Fn5_v4l-sni1UzxsXmxhR8e5jp-UG5DiU7OEzCaPA2vfl-WOb-37Imjd6p3nFmG92IZA54re4l3BMKTU1E_XJBiaTDs9UtSjcsiRZjMXHz_OTntp6NJlZy2CssxtJNyX7L9adfYwAXOQ9xegFn2qBPHBg1CQfehzaphBmYPIyUCVeOdK5t4RToHcpJTxIa6ExP0EoM9UxEEZqNt9hzIj-GJnSIrFlaWDadakQPYXzj7-Hx3-8e8T6Wy3A3YVIicmuV"
                alt="Google"
              ></v-img>
            </v-avatar>
            <div class="social-account-details">
              <p class="social-name">Google</p>
              <p class="social-status">Chưa liên kết</p>
            </div>
          </div>
          <v-btn
            variant="text"
            color="primary"
            size="small"
            @click="handleLinkSocial('google')"
          >
            Liên kết
          </v-btn>
        </div>
      </div>
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
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({
      name: 'Nguyễn Thị Mai',
      email: 'mai.nguyen@example.com',
      phone: '090 123 4567',
      birthdate: '1990-05-15',
      gender: 'female',
      kidName: 'Bé Bông',
      kidBirthdate: '2018-06-15',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH4SMBpJzusrTLNodKH7EO19GMb71kbrf81j6a9YUoTHudcdxIgZYCM1pEw75DDE-iM2ajs2tdtAL0uHfuUY9XcNeAb6g22ChkO_CCDSBxnyezPY0WubVzTiLPVDPPP4mWHYX9b96xEW6-MiYY-3A5dqNgk4dV780B4vo-wkIUsvW6byxEc1YzGBJLl83OIz1hUvq8LMeH7dA9vblM_gwC563riw6hfI2WRrAlDqbTIMXP11JeT93ZaJtg478c_w4VLnZzpyAWmyXf'
    })
  }
})

// Emits
const emit = defineEmits(['update:userInfo', 'cancel'])

// Use composables
const { formData, formRef, validate, isSubmitting, setFieldValue } = useForm({
  fullName: props.userInfo.name || '',
  email: props.userInfo.email || '',
  phone: props.userInfo.phone || '',
  birthdate: props.userInfo.birthdate || '',
  gender: props.userInfo.gender || 'female',
  kidName: props.userInfo.kidName || '',
  kidBirthdate: props.userInfo.kidBirthdate || '',
  avatar: props.userInfo.avatar || ''
})

const { showSuccess, showError, showInfo, showWarning } = useNotification()

// Refs
const fileInput = ref(null)

// Validation rules
const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email không hợp lệ'
  },
  phone: value => {
    const pattern = /^[0-9]{10,11}$/
    return pattern.test(value.replace(/\s/g, '')) || 'Số điện thoại không hợp lệ'
  }
}

// Methods
const handleSubmit = async () => {
  const isValid = await validate()
  
  if (isValid) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Emit update event
    emit('update:userInfo', {
      name: formData.value.fullName,
      email: formData.value.email,
      phone: formData.value.phone,
      birthdate: formData.value.birthdate,
      gender: formData.value.gender,
      kidName: formData.value.kidName,
      kidBirthdate: formData.value.kidBirthdate,
      avatar: formData.value.avatar
    })
    
    // Show success message
    showSuccess('Cập nhật thông tin thành công!')
  }
}

const handleCancel = () => {
  // Reset form to original values
  Object.keys(formData.value).forEach(key => {
    const propKey = key === 'fullName' ? 'name' : key
    formData.value[key] = props.userInfo[propKey] || (key === 'gender' ? 'female' : '')
  })
  
  formRef.value?.resetValidation()
  emit('cancel')
}

const handleAvatarClick = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      showError('Kích thước file không được vượt quá 2MB')
      return
    }
    
    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      showError('Chỉ chấp nhận file JPG hoặc PNG')
      return
    }
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setFieldValue('avatar', e.target.result)
      showSuccess('Ảnh đại diện đã được cập nhật')
    }
    reader.readAsDataURL(file)
  }
}

const handleRemoveAvatar = () => {
  setFieldValue('avatar', 'https://via.placeholder.com/96')
  showInfo('Đã xóa ảnh đại diện')
}

const handleLinkSocial = (platform) => {
  console.log('Link social account:', platform)
  showInfo(`Đang liên kết tài khoản ${platform}...`)
  // Implement social linking logic
}

const handleUnlinkSocial = (platform) => {
  console.log('Unlink social account:', platform)
  showWarning(`Đã hủy liên kết tài khoản ${platform}`)
  // Implement social unlinking logic
}
</script>

<style scoped>
.personal-info-tab {
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

/* Form Card */
.info-form-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 32px;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.user-avatar-large {
  border: 4px solid #f4f3f0;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-info {
  flex: 1;
  min-width: 250px;
}

.avatar-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 4px;
}

.avatar-description {
  font-size: 13px;
  color: #897961;
  margin-bottom: 16px;
  max-width: 400px;
}

.avatar-actions {
  display: flex;
  gap: 12px;
}

/* Form Section */
.form-section {
  margin-bottom: 8px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
}

.section-description {
  font-size: 13px;
  color: #897961;
  line-height: 1.6;
}

.gender-label {
  font-size: 14px;
  font-weight: 600;
  color: #181511;
  display: block;
  margin-bottom: 8px;
}

/* Security Notice */
.security-notice {
  padding: 0;
}

.notice-title {
  font-size: 14px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 4px;
}

.notice-text {
  font-size: 13px;
  color: #5c564b;
  line-height: 1.6;
  margin: 0;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Social Accounts Card */
.social-accounts-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 24px;
}

.card-header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.card-section-title {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
}

.card-section-subtitle {
  font-size: 12px;
  color: #897961;
}

.social-accounts-list {
  padding: 8px 0;
}

.social-account-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.social-account-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.google-avatar {
  border: 1px solid #e0e0e0;
  padding: 8px;
}

.social-account-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.social-name {
  font-size: 14px;
  font-weight: 700;
  color: #181511;
  margin: 0;
}

.social-status {
  font-size: 12px;
  color: #897961;
  margin: 0;
}

.social-status.connected {
  color: #2e7d32;
  font-weight: 500;
}

/* Custom Vuetify overrides */
:deep(.v-text-field .v-field) {
  border-radius: 12px;
}

:deep(.v-text-field .v-field--focused) {
  box-shadow: 0 0 0 2px rgba(238, 157, 43, 0.2);
}

:deep(.v-radio .v-selection-control__input) {
  color: #ee9d2b;
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
@media (max-width: 600px) {
  .info-form-card {
    padding: 20px;
  }
  
  .avatar-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .form-actions .v-btn {
    width: 100%;
  }
}
</style>
