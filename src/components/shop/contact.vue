<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <v-container class="hero-section">
      <v-card class="hero-card" elevation="1">
        <div class="hero-wrapper">
          <!-- Hero Image -->
          <div class="hero-image-wrapper">
            <div class="hero-image" :style="{ backgroundImage: `url(${heroImage})` }">
              <div class="hero-overlay"></div>
            </div>
          </div>

          <!-- Hero Content -->
          <div class="hero-content">
            <div class="support-badge">
              <v-icon size="18" color="#ee9d2b">mdi-headset</v-icon>
              <span class="badge-text">HỖ TRỢ 24/7</span>
            </div>

            <h1 class="hero-title">
              Chúng tôi có thể giúp gì cho bạn?
            </h1>

            <p class="hero-description">
              Dù bạn cần tư vấn chọn đồ chơi hay hỗ trợ về đơn hàng, đội ngũ ToyStore luôn sẵn sàng lắng nghe để mang lại niềm vui trọn vẹn nhất cho bé yêu.
            </p>

            <v-btn
              color="#ee9d2b"
              size="x-large"
              class="chat-btn"
              elevation="0"
              @click="handleChatNow"
            >
              <v-icon start size="20">mdi-chat</v-icon>
              <span>Chat ngay với nhân viên</span>
            </v-btn>

            <div class="online-status">
              <span class="status-indicator">
                <span class="ping"></span>
                <span class="dot"></span>
              </span>
              <span class="status-text">Nhân viên tư vấn đang online</span>
            </div>
          </div>
        </div>
      </v-card>
    </v-container>

    <!-- Contact Channels Section -->
    <v-container class="channels-section">
      <div class="section-header">
        <h2 class="section-title">Kênh liên hệ khác</h2>
        <p class="section-subtitle">Chọn phương thức thuận tiện nhất cho bạn</p>
      </div>

      <v-row>
        <!-- Hotline Card -->
        <v-col cols="12" md="4">
          <v-card class="channel-card" elevation="0">
            <div class="channel-icon-wrapper blue">
              <v-icon size="28" color="#1976d2">mdi-phone</v-icon>
            </div>
            <h3 class="channel-title">Hotline</h3>
            <p class="channel-description">Gọi ngay để được hỗ trợ nhanh nhất về tình trạng đơn hàng.</p>
            <a href="tel:19001234" class="channel-link blue">1900 1234</a>
            <span class="channel-hours">8:00 - 21:00, Hàng ngày</span>
          </v-card>
        </v-col>

        <!-- Email Card -->
        <v-col cols="12" md="4">
          <v-card class="channel-card" elevation="0">
            <div class="channel-icon-wrapper purple">
              <v-icon size="28" color="#7c4dff">mdi-email</v-icon>
            </div>
            <h3 class="channel-title">Email</h3>
            <p class="channel-description">Gửi yêu cầu chi tiết hoặc hợp tác kinh doanh.</p>
            <a href="mailto:hotro@toystore.vn" class="channel-link purple">hotro@toystore.vn</a>
            <span class="channel-hours">Phản hồi trong vòng 24h</span>
          </v-card>
        </v-col>

        <!-- Store Card -->
        <v-col cols="12" md="4">
          <v-card class="channel-card" elevation="0">
            <div class="channel-icon-wrapper green">
              <v-icon size="28" color="#2e7d32">mdi-store</v-icon>
            </div>
            <h3 class="channel-title">Cửa hàng</h3>
            <p class="channel-description">Ghé thăm showroom để trải nghiệm sản phẩm trực tiếp.</p>
            <p class="store-address">123 Phố Đồ Chơi, Q.1, TP.HCM</p>
            <a href="#" class="channel-link green inline-link" @click.prevent="handleViewMap">
              Xem bản đồ
              <v-icon size="16" class="ml-1">mdi-arrow-right</v-icon>
            </a>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact Form & Map Section -->
    <v-container class="form-section">
      <v-row>
        <!-- Contact Form -->
        <v-col cols="12" lg="6">
          <v-card class="form-card" elevation="0">
            <div class="form-header">
              <h2 class="form-title">Gửi tin nhắn</h2>
              <p class="form-subtitle">Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.</p>
            </div>

            <v-form ref="contactForm" v-model="formValid" @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" sm="6">
                  <label class="field-label">Họ và tên</label>
                  <v-text-field
                    v-model="formData.name"
                    placeholder="Nhập họ tên của bạn"
                    variant="outlined"
                    density="comfortable"
                    :rules="[rules.required]"
                    class="custom-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="field-label">Số điện thoại</label>
                  <v-text-field
                    v-model="formData.phone"
                    placeholder="Nhập số điện thoại"
                    variant="outlined"
                    density="comfortable"
                    :rules="[rules.required, rules.phone]"
                    class="custom-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <label class="field-label">Email</label>
                  <v-text-field
                    v-model="formData.email"
                    placeholder="Nhập địa chỉ email của bạn"
                    variant="outlined"
                    density="comfortable"
                    :rules="[rules.required, rules.email]"
                    class="custom-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <label class="field-label">Nội dung cần hỗ trợ</label>
                  <v-textarea
                    v-model="formData.message"
                    placeholder="Mô tả vấn đề bạn đang gặp phải..."
                    variant="outlined"
                    rows="4"
                    :rules="[rules.required]"
                    class="custom-input"
                    no-resize
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    color="#ee9d2b"
                    size="large"
                    class="submit-btn"
                    :loading="submitting"
                    :disabled="!formValid"
                  >
                    Gửi tin nhắn
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <!-- Map -->
        <v-col cols="12" lg="6">
          <v-card class="map-card" elevation="0">
            <div class="map-container" :style="{ backgroundImage: `url(${mapImage})` }">
              <div class="map-info-card">
                <div class="map-info-content">
                  <v-icon color="#ee9d2b" class="location-icon">mdi-map-marker</v-icon>
                  <div class="map-info-text">
                    <h4 class="store-name">ToyStore Quận 1</h4>
                    <p class="store-full-address">123 Phố Đồ Chơi, Phường Bến Nghé, Quận 1, TP.HCM</p>
                    <a href="#" class="map-link" @click.prevent="handleViewMap">
                      Chỉ đường trên Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Floating Chat Button (Mobile) -->
    <v-btn
      class="floating-chat-btn d-lg-none"
      color="#ee9d2b"
      icon
      size="56"
      elevation="8"
      @click="handleChatNow"
    >
      <v-icon size="28">mdi-chat</v-icon>
    </v-btn>

    <!-- Chat Popup -->
    <ChatPopup v-model="showChatPopup" />

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      location="top"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ChatPopup from './ChatPopup.vue'

// Images
const heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1TpNdz6EQVG31BDvKsogU9AfhmPXYyxgV7HJ4KmG_8vg93HKBkEUIo7yPbf04l8OfarLq-bvKE2C_n-1Z5OGT2nKDx1zR3TH2TmW0Idylew3ieDXmfWAT1BiunaBDhtpP1cW3fTO3k9MQPrynqqkbQebjl-fqn7reUpYAJIumktUoTvCDCwE_gbuO94bhOUHFecHM2QlT43SicNZjFKQx3pLiJ9LqKTWv-xDjdiidfBKrS76HKFh2lrqvmHTF54NKE7Le5l54ycBN'
const mapImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyTHiJdvDTr6bwoih2kL_m0MiX96VnrUTcnxWkkTUxv8SJhZ3jt7WSxKYS10RiM92NrCy8lcPiosTLiKrDNbQsb7TOx15veETiCBcJRWmjxdF-YzdYow7cVWwbJP8omazrYCT6Oef1PfGE3UDFixdSkmUxmBCVd94sQUQN-bkV_I9jjx0GG_e0tLKXRlhlMkj3fBXyf0WE_mYX4w_zdMM9dhEBw2BFa7hD8fqfJaDoAzcdnUEqzwby7Emm6qWFD8Ddg5Q9t6BhIng4'

// Form data
const contactForm = ref(null)
const formValid = ref(false)
const submitting = ref(false)
const showChatPopup = ref(false)

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  message: ''
})

// Validation rules
const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email không hợp lệ'
  },
  phone: value => {
    const pattern = /^[0-9]{10,11}$/
    return pattern.test(value) || 'Số điện thoại không hợp lệ'
  }
}

// Snackbar
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

// Methods
const handleChatNow = () => {
  showChatPopup.value = true
}

const handleViewMap = () => {
  // Open Google Maps
  window.open('https://maps.google.com/?q=123+Phố+Đồ+Chơi,+Q.1,+TP.HCM', '_blank')
}

const handleSubmit = async () => {
  if (!formValid.value) return

  submitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Success
    showSnackbar('Tin nhắn của bạn đã được gửi thành công!', 'success')
    
    // Reset form
    formData.name = ''
    formData.phone = ''
    formData.email = ''
    formData.message = ''
    contactForm.value?.reset()
  } catch (error) {
    showSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', 'error')
  } finally {
    submitting.value = false
  }
}

const showSnackbar = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}
</script>

<style scoped>
.contact-page {
  background-color: #f8f7f6;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Hero Section */
.hero-section {
  padding-top: 48px;
  padding-bottom: 48px;
  max-width: 1200px;
}

.hero-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e6e1db;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.hero-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px;
}

@media (min-width: 864px) {
  .hero-wrapper {
    flex-direction: row;
    align-items: center;
    gap: 48px;
    padding: 48px 64px;
  }
}

.hero-image-wrapper {
  flex: 1;
  min-width: 0;
}

.hero-image {
  width: 100%;
  height: 280px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 480px) {
  .hero-image {
    height: 320px;
  }
}

@media (min-width: 864px) {
  .hero-image {
    height: 400px;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.hero-image:hover .hero-overlay {
  background: rgba(0, 0, 0, 0);
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

@media (min-width: 480px) {
  .hero-content {
    gap: 32px;
  }
}

.support-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  background: rgba(238, 157, 43, 0.15);
  width: fit-content;
}

.badge-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ee9d2b;
}

.hero-title {
  font-size: 28px;
  font-weight: 900;
  line-height: 1.15;
  color: #181511;
  letter-spacing: -0.025em;
  margin: 0;
}

@media (min-width: 480px) {
  .hero-title {
    font-size: 36px;
  }
}

@media (min-width: 960px) {
  .hero-title {
    font-size: 48px;
  }
}

.hero-description {
  font-size: 16px;
  line-height: 1.6;
  color: #897961;
  margin: 0;
}

.chat-btn {
  width: fit-content;
  text-transform: none;
  font-weight: 700;
  font-size: 16px;
  padding: 0 32px !important;
  height: 56px !important;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(238, 157, 43, 0.2) !important;
  transition: all 0.3s ease;
}

.chat-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(238, 157, 43, 0.3) !important;
  background-color: #d88d25 !important;
}

.chat-btn :deep(.v-btn__content) {
  gap: 8px;
}

.online-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #897961;
}

.status-indicator {
  position: relative;
  display: flex;
  width: 12px;
  height: 12px;
}

.ping {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #4caf50;
  opacity: 0.75;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.dot {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4caf50;
}

.status-text {
  font-size: 13px;
}

/* Channels Section */
.channels-section {
  max-width: 1200px;
  padding-bottom: 48px;
}

.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 16px;
  color: #897961;
  margin: 0;
}

.channel-card {
  padding: 32px 24px;
  border-radius: 16px;
  border: 1px solid #e6e1db;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.channel-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.channel-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.channel-icon-wrapper.blue {
  background: rgba(25, 118, 210, 0.1);
}

.channel-icon-wrapper.purple {
  background: rgba(124, 77, 255, 0.1);
}

.channel-icon-wrapper.green {
  background: rgba(46, 125, 50, 0.1);
}

.channel-title {
  font-size: 20px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.channel-description {
  font-size: 14px;
  color: #897961;
  line-height: 1.5;
  margin-bottom: 24px;
  flex-grow: 1;
}

.channel-link {
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  transition: opacity 0.2s ease;
}

.channel-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.channel-link.blue {
  color: #1976d2;
}

.channel-link.purple {
  color: #7c4dff;
}

.channel-link.green {
  color: #2e7d32;
}

.channel-link.inline-link {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

.channel-hours {
  font-size: 12px;
  color: #897961;
}

.store-address {
  font-size: 15px;
  font-weight: 500;
  color: #181511;
  margin-bottom: 8px;
}

/* Form Section */
.form-section {
  max-width: 1200px;
}

.form-card {
  padding: 40px 24px;
  border-radius: 16px;
  border: 1px solid #e6e1db;
  background: white;
  height: 100%;
}

@media (min-width: 600px) {
  .form-card {
    padding: 48px 40px;
  }
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.form-subtitle {
  font-size: 16px;
  color: #897961;
  margin: 0;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 8px;
}

.custom-input :deep(.v-field) {
  border-radius: 12px;
  background: #f8f7f6;
  border-color: #e6e1db;
}

.custom-input :deep(.v-field--focused) {
  border-color: #ee9d2b;
  box-shadow: 0 0 0 1px #ee9d2b;
}

.custom-input :deep(.v-field__input) {
  color: #181511;
  font-size: 15px;
}

.custom-input :deep(.v-field__input::placeholder) {
  color: #897961;
  opacity: 1;
}

.submit-btn {
  text-transform: none;
  font-weight: 700;
  font-size: 15px;
  padding: 0 32px;
  height: 48px;
  box-shadow: 0 8px 16px rgba(238, 157, 43, 0.1) !important;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  box-shadow: 0 12px 20px rgba(238, 157, 43, 0.2) !important;
}

/* Map Card */
.map-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e6e1db;
  background: #f4f3f0;
  height: 100%;
  min-height: 400px;
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.map-info-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid #e6e1db;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-info-content {
  display: flex;
  gap: 12px;
}

.location-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.map-info-text {
  flex: 1;
}

.store-name {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 4px;
}

.store-full-address {
  font-size: 14px;
  color: #897961;
  line-height: 1.5;
  margin-bottom: 8px;
}

.map-link {
  font-size: 12px;
  font-weight: 700;
  color: #ee9d2b;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s ease;
}

.map-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

/* Floating Chat Button */
.floating-chat-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(238, 157, 43, 0.3) !important;
  transition: all 0.3s ease;
}

.floating-chat-btn:hover {
  transform: scale(1.1);
}

/* Remove button focus outline */
:deep(.v-btn .v-btn__focus-ring) {
  display: none !important;
}

:deep(.v-btn) {
  outline: none !important;
}
</style>
