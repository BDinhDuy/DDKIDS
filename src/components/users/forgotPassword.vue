<template>
    <div class="forgot-password-page">
        <v-row no-gutters class="fill-height">
            <!-- Left Side: Image (Hidden on mobile) -->
            <v-col cols="12" lg="6" class="d-none d-lg-block">
                <div class="image-section">
                    <v-img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtf5V2X7_aFiQKkqsK1My9wWQkh61ByNeZEJ_I1rBMEDE7pqURAQfIAk8HMvTLQVbLPFboVof_R5e8RJwHdoLPK20BViJ3mY-k_Hv5WuFTTbiLF-daiohnblBodX8YluFm61WIjSwWhYwj8AgUxZaXFO0idrtbivDMNtNtAt-_ChSv7vokQry40nauI8lOagQ4UzAN43Kv8MZASBpN_dVR8E7FKuXn9-g0ELpm2gn8xZpG1gf5m-u5kDl8RHjlDKOAGD5Rto_Tw3X1"
                        alt="Happy child playing with colorful wooden building blocks" cover height="100%"
                        class="image-overlay">
                        <div class="overlay-gradient"></div>
                        <div class="overlay-text">
                            <h2 class="text-h4 font-weight-bold mb-2">Đừng lo lắng!</h2>
                            <p class="text-body-1">Chúng tôi sẽ giúp bạn lấy lại mật khẩu một cách nhanh chóng và an
                                toàn.</p>
                        </div>
                    </v-img>
                </div>
            </v-col>

            <!-- Right Side: Forgot Password Form -->
            <v-col cols="12" lg="6">
                <div class="form-section">
                    <v-container class="form-container">
                        <div class="form-content">
                            <!-- Icon Header -->
                            <div class="text-center mb-6">
                                <div class="icon-wrapper">
                                    <v-icon size="64" color="#ee9d2b">mdi-lock-reset</v-icon>
                                </div>
                            </div>

                            <!-- Heading -->
                            <div class="text-center mb-8">
                                <h1 class="text-h4 font-weight-bold mb-2">Quên Mật khẩu?</h1>
                                <p class="text-body-1 text-grey-darken-1">
                                    Đừng lo lắng! Hãy nhập email bạn đã dùng để đăng ký, chúng tôi sẽ gửi hướng dẫn đặt
                                    lại mật khẩu cho bạn.
                                </p>
                            </div>

                            <!-- Form -->
                            <v-form ref="formRef" @submit.prevent="handleResetPassword">
                                <!-- Email Input -->
                                <v-text-field v-model="email" label="Email của bạn" placeholder="vidu@gmail.com"
                                    variant="outlined" prepend-inner-icon="mdi-email-outline" color="#ee9d2b"
                                    class="mb-4" :rules="emailRules" name="email" type="email"
                                    autocomplete="email"></v-text-field>

                                <!-- Submit Button -->
                                <v-btn type="submit" block size="large" color="#ee9d2b"
                                    class="text-none font-weight-bold mb-6 submit-btn" elevation="1" :loading="loading">
                                    Gửi yêu cầu
                                </v-btn>
                            </v-form>

                            <!-- Back to Login Link -->
                            <div class="text-center mb-4">
                                <a href="#" class="back-link" @click.prevent="goToLogin">
                                    <v-icon size="small" class="mr-1">mdi-arrow-left</v-icon>
                                    Quay lại trang Đăng nhập
                                </a>
                            </div>

                            <!-- Secure Badge -->
                            <div class="text-center secure-badge">
                                <v-icon size="small" class="mr-1" color="success">mdi-shield-check</v-icon>
                                <span class="text-caption font-weight-medium">Email của bạn được bảo mật tuyệt
                                    đối</span>
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
                    <!-- Icon with Animation -->
                    <div class="icon-container mb-6">
                        <div class="icon-glow"></div>
                        <div class="icon-circle">
                            <v-icon size="48" color="#ee9d2b">mdi-email-check</v-icon>
                        </div>
                        <!-- Sparkles -->
                        <v-icon class="sparkle sparkle-1" size="20" color="#ee9d2b">mdi-star-four-points</v-icon>
                        <v-icon class="sparkle sparkle-2" size="16" color="#ee9d2b">mdi-star-four-points</v-icon>
                    </div>

                    <!-- Title -->
                    <h3 class="text-h5 font-weight-bold mb-3">
                        Yêu cầu đã được gửi!
                    </h3>

                    <!-- Description -->
                    <p class="text-body-1 text-grey-darken-1 mb-6">
                        Vui lòng kiểm tra email của bạn (bao gồm cả thư mục spam) để biết hướng dẫn đặt lại mật khẩu.
                    </p>

                    <!-- Email Display -->
                    <div class="email-display mb-6">
                        <v-icon size="20" class="mr-2">mdi-email-outline</v-icon>
                        <span class="text-body-2 font-weight-medium">{{ email }}</span>
                    </div>

                    <!-- Countdown -->
                    <div class="countdown-text mb-6">
                        <p class="text-caption text-grey">
                            Tự động chuyển về trang đăng nhập sau <span class="countdown-number">{{ countdown }}</span>
                            giây
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex flex-column gap-3">
                        <v-btn block size="large" color="#ee9d2b" class="text-none font-weight-bold" @click="goToLogin">
                            Về trang Đăng nhập
                        </v-btn>
                        <v-btn block size="large" variant="text" class="text-none" @click="closeDialog">
                            Đóng
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Error Snackbar -->
        <v-snackbar v-model="showError" color="error" :timeout="3000" location="top">
            {{ errorMessage }}
            <template v-slot:actions>
                <v-btn variant="text" @click="showError = false">
                    Đóng
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form ref
const formRef = ref(null)

// Form data
const email = ref('')
const loading = ref(false)
const showSuccessDialog = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const countdown = ref(5)

let countdownInterval = null
let redirectTimeout = null

// Validation rules
const emailRules = [
    v => !!v || 'Email là bắt buộc',
    v => /^[^\s@]+@[^\s@]+\.com$/.test(v) || 'Email phải có đuôi .com'
]

// Methods
const handleResetPassword = async () => {
    // Validate form trước khi submit
    const { valid } = await formRef.value.validate()

    if (!valid) {
        return // Dừng lại nếu form không hợp lệ
    }

    loading.value = true

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log('Reset password for:', email.value)
        // Add your password reset logic here

        // Show success dialog
        showSuccessDialog.value = true
        startCountdown()

    } catch (error) {
        console.error('Error:', error)
        errorMessage.value = 'Có lỗi xảy ra. Vui lòng thử lại sau.'
        showError.value = true
    } finally {
        loading.value = false
    }
}

const startCountdown = () => {
    countdown.value = 5

    countdownInterval = setInterval(() => {
        countdown.value--

        if (countdown.value <= 0) {
            clearInterval(countdownInterval)
            goToLogin()
        }
    }, 1000)
}

const closeDialog = () => {
    showSuccessDialog.value = false
    clearInterval(countdownInterval)
    clearTimeout(redirectTimeout)
}

const goToLogin = () => {
    clearInterval(countdownInterval)
    clearTimeout(redirectTimeout)
    router.push('/auth/login')
}

// Cleanup on component unmount
onUnmounted(() => {
    clearInterval(countdownInterval)
    clearTimeout(redirectTimeout)
})
</script>

<style scoped>
.forgot-password-page {
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

.icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #fff5eb 0%, #ffe8cc 100%);
    border-radius: 50%;
    box-shadow: 0 4px 20px rgba(238, 157, 43, 0.2);
}

.submit-btn {
    letter-spacing: 0;
    box-shadow: 0 2px 4px rgba(238, 157, 43, 0.2) !important;
}

.submit-btn:hover {
    background-color: #d68515 !important;
    box-shadow: 0 4px 8px rgba(238, 157, 43, 0.3) !important;
}

.back-link {
    color: #897961;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.875rem;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
}

.back-link:hover {
    color: #ee9d2b;
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
    background: rgba(238, 157, 43, 0.2);
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
    filter: blur(12px);
}

.icon-circle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #fff5eb 0%, #ffe8cc 100%);
    border-radius: 50%;
    box-shadow: 0 4px 20px rgba(238, 157, 43, 0.2);
    animation: bounce-in 0.6s ease-out;
}

.sparkle {
    position: absolute;
    animation: sparkle-rotate 2s ease-in-out infinite;
}

.sparkle-1 {
    top: -8px;
    right: -8px;
    animation-duration: 2s;
}

.sparkle-2 {
    bottom: 0;
    left: -16px;
    animation-duration: 3s;
    animation-delay: 0.5s;
}

.email-display {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background-color: #f8f7f6;
    border-radius: 24px;
    border: 1px solid #e6e1db;
}

.countdown-text {
    color: #897961;
}

.countdown-number {
    display: inline-block;
    font-weight: bold;
    color: #ee9d2b;
    font-size: 1.1em;
    min-width: 20px;
    text-align: center;
    animation: countdown-pulse 1s ease-in-out infinite;
}

/* Animations */
@keyframes pulse-glow {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes sparkle-rotate {

    0%,
    100% {
        transform: rotate(0deg) scale(1);
        opacity: 1;
    }

    50% {
        transform: rotate(180deg) scale(1.2);
        opacity: 0.8;
    }
}

@keyframes countdown-pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }
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

    .icon-wrapper {
        width: 100px;
        height: 100px;
    }

    .icon-wrapper :deep(.v-icon) {
        font-size: 48px !important;
    }
}
</style>
