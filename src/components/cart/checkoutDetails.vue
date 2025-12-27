<template>
  <v-container fluid class="pa-0" style="background-color: #f8f7f6;">
    <v-container class="py-5 py-lg-10 px-4 px-md-8 px-lg-16" style="max-width: 1280px;">
      <v-row>
        <!-- Left Column - Payment Info -->
        <v-col cols="12" lg="8">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-h3 text-md-h2 font-weight-black mb-2" style="letter-spacing: -0.033em;">
              Chi tiết chuyển khoản
            </h1>
            <p class="text-body-1" style="color: #897961;">
              Vui lòng thực hiện chuyển khoản theo thông tin dưới đây
            </p>
          </div>

          <!-- Bank Transfer Info Card -->
          <v-card class="rounded-xl overflow-hidden" elevation="0" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #f4f3f0;">
            <!-- Bank Header -->
            <div class="pa-6 d-flex flex-column flex-md-row align-center" style="gap: 16px; background-color: #f0fdf4; border-bottom: 1px solid #bbf7d0;">
              <div class="rounded-xl bg-white d-flex align-center justify-center flex-shrink-0" style="width: 64px; height: 64px; border: 1px solid #bbf7d0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
                <v-icon size="40" style="color: #16a34a;">mdi-bank</v-icon>
              </div>
              <div class="d-flex flex-column text-center text-md-left">
                <h2 class="text-h6 font-weight-bold">Ngân hàng TMCP Ngoại thương Việt Nam</h2>
                <span class="text-body-2 font-weight-bold" style="color: #16a34a;">VIETCOMBANK</span>
              </div>
            </div>

            <!-- Bank Details -->
            <v-card-text class="pa-6 pa-md-8">
              <v-row>
                <!-- Left Column - Info -->
                <v-col cols="12" md="6">
                  <div class="d-flex flex-column justify-center" style="gap: 24px;">
                    <!-- Account Number -->
                    <div class="pb-4" style="border-bottom: 1px dashed #e5e7eb;">
                      <span class="text-caption font-weight-medium text-uppercase" style="color: #897961; letter-spacing: 0.1em;">
                        Số tài khoản
                      </span>
                      <div class="d-flex align-center mt-2" style="gap: 12px;">
                        <span class="font-weight-bold" style="font-size: 24px; font-family: 'Courier New', monospace; letter-spacing: 0.05em;">
                          {{ bankInfo.accountNumber }}
                        </span>
                        <v-btn
                          icon
                          size="small"
                          variant="flat"
                          @click="copyToClipboard(bankInfo.accountNumber, 'Đã sao chép số tài khoản')"
                          class="copy-btn"
                          style="background-color: rgba(238, 157, 43, 0.1);"
                        >
                          <v-icon size="18" style="color: #ee9d2b;">mdi-content-copy</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <!-- Account Name -->
                    <div class="pb-4" style="border-bottom: 1px dashed #e5e7eb;">
                      <span class="text-caption font-weight-medium text-uppercase" style="color: #897961; letter-spacing: 0.1em;">
                        Chủ tài khoản
                      </span>
                      <div class="mt-2">
                        <span class="text-h6 font-weight-bold text-uppercase">
                          {{ bankInfo.accountName }}
                        </span>
                      </div>
                    </div>

                    <!-- Amount -->
                    <div class="pb-4" style="border-bottom: 1px dashed #e5e7eb;">
                      <span class="text-caption font-weight-medium text-uppercase" style="color: #897961; letter-spacing: 0.1em;">
                        Số tiền cần chuyển
                      </span>
                      <div class="d-flex align-center mt-2" style="gap: 12px;">
                        <span class="text-h5 font-weight-bold" style="color: #ee9d2b;">
                          {{ formatPrice(orderInfo.total) }}
                        </span>
                        <v-btn
                          icon
                          size="small"
                          variant="flat"
                          @click="copyToClipboard(orderInfo.total.toString(), 'Đã sao chép số tiền')"
                          class="copy-btn"
                          style="background-color: rgba(238, 157, 43, 0.1);"
                        >
                          <v-icon size="18" style="color: #ee9d2b;">mdi-content-copy</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <!-- Transfer Content -->
                    <div class="pa-4 rounded-xl" style="background-color: #eff6ff; border: 1px solid #bfdbfe;">
                      <span class="text-caption font-weight-bold text-uppercase" style="color: #1e40af; letter-spacing: 0.1em;">
                        Nội dung chuyển khoản (Bắt buộc)
                      </span>
                      <div class="d-flex align-center justify-space-between mt-2" style="gap: 12px;">
                        <span class="text-h5 font-weight-black" style="font-family: 'Courier New', monospace; color: #1d4ed8;">
                          {{ bankInfo.transferContent }}
                        </span>
                        <v-btn
                          icon
                          size="small"
                          variant="flat"
                          @click="copyToClipboard(bankInfo.transferContent, 'Đã sao chép nội dung chuyển khoản')"
                          style="background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"
                        >
                          <v-icon size="18" style="color: #2563eb;">mdi-content-copy</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-col>

                <!-- Right Column - QR Code -->
                <v-col cols="12" md="6">
                  <div class="d-flex flex-column align-center justify-center pa-6 rounded-xl h-100" style="background-color: #f9fafb; border: 1px solid #e5e7eb;">
                    <div class="bg-white pa-3 rounded-xl mb-4" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
                      <v-img
                        :src="qrCodeUrl"
                        alt="QR Code Payment"
                        width="224"
                        height="224"
                        class="d-block"
                      ></v-img>
                    </div>
                    <div class="text-center">
                      <p class="font-weight-bold mb-3">Quét mã QR để thanh toán nhanh</p>
                      <div class="d-flex align-center justify-center bg-white pa-2 rounded-pill" style="gap: 6px; border: 1px solid #e5e7eb;">
                        <v-icon size="16" style="color: #2563eb;">mdi-shield-check</v-icon>
                        <span class="text-caption" style="color: #6b7280;">Hỗ trợ bởi VietQR</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Back Button -->
          <div class="mt-6">
            <v-btn
              size="large"
              variant="outlined"
              color="#ee9d2b"
              class="rounded-xl"
              style="border-width: 2px; text-transform: none;"
              @click="goBackToCheckout"
            >
              <v-icon start>mdi-arrow-left</v-icon>
              Quay lại trang thanh toán
            </v-btn>
          </div>
        </v-col>

        <!-- Right Column - Order Summary (Disabled) -->
        <v-col cols="12" lg="4">
          <div class="sticky-card">
            <v-card 
              class="rounded-xl" 
              elevation="0" 
              style="
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
                border: 1px solid #f4f3f0;
                opacity: 0.8;
                pointer-events: none;
                filter: grayscale(0.5);
              "
            >
              <v-card-text class="pa-6">
                <h3 class="text-h5 font-weight-bold mb-6">Đơn hàng của bạn</h3>
                
                <!-- Cart Items -->
                <div class="cart-items-container mb-6" style="max-height: 300px; overflow-y: auto; padding-right: 8px;">
                  <div
                    v-for="item in orderInfo.items"
                    :key="item.id"
                    class="d-flex mb-5"
                    style="gap: 16px;"
                  >
                    <div class="position-relative rounded-lg overflow-hidden" style="width: 80px; height: 80px; flex-shrink: 0; border: 1px solid #e6e1db;">
                      <v-img
                        :src="item.image"
                        :alt="item.name"
                        cover
                        class="w-100 h-100"
                      ></v-img>
                      <div
                        class="position-absolute font-weight-bold text-white"
                        style="top: 0; right: 0; background-color: #ee9d2b; font-size: 10px; padding: 2px 6px; border-bottom-left-radius: 8px;"
                      >
                        x{{ item.quantity }}
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h4 class="text-body-2 font-weight-semibold mb-1 line-clamp-2">
                        {{ item.name }}
                      </h4>
                      <p class="text-caption mb-2" style="color: #897961;">
                        {{ item.description }}
                      </p>
                      <p class="text-body-2 font-weight-bold" style="color: #ee9d2b;">
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                </div>

                <v-divider class="mb-6" style="border-color: #e6e1db;"></v-divider>

                <!-- Price Summary -->
                <div class="mb-6">
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Tạm tính</span>
                    <span class="font-weight-medium">{{ formatPrice(orderInfo.subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Phí vận chuyển</span>
                    <span class="font-weight-medium">{{ formatPrice(orderInfo.shippingFee) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Giảm giá</span>
                    <span class="font-weight-medium text-green">-{{ formatPrice(orderInfo.discount) }}</span>
                  </div>
                </div>

                <!-- Total -->
                <div class="d-flex justify-space-between align-end mb-8">
                  <span class="text-body-1 font-weight-bold">Tổng cộng</span>
                  <span class="font-weight-black" style="font-size: 28px; color: #ee9d2b;">{{ formatPrice(orderInfo.total) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      color="success"
      location="top"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { formatPrice, copyToClipboard as copyText } from '@/utils/helpers'
import { getCurrentOrder } from '@/utils/storage'

const router = useRouter()

// Bank Information
const bankInfo = ref({
  bankName: 'Vietcombank',
  accountNumber: '0810000575432',
  accountName: 'DDKIDS TOYs STORE',
  transferContent: ''
})

// Order Information (loaded from localStorage)
const orderInfo = ref({
  items: [],
  subtotal: 0,
  shippingFee: 0,
  discount: 0,
  total: 0
})

// Load order data from localStorage on component mount
onMounted(() => {
  try {
    const savedOrder = getCurrentOrder()
    if (savedOrder) {
      orderInfo.value = savedOrder
      
      // Generate transfer content based on order total
      const totalK = Math.floor(savedOrder.total / 1000)
      bankInfo.value.transferContent = `TOY${totalK}K`
    } else {
      // If no order found, redirect back to checkout
      console.warn('No order found, redirecting to checkout')
      router.push('/checkout')
    }
  } catch (error) {
    console.error('Error loading order:', error)
    router.push('/checkout')
  }
})

// QR Code URL
const qrCodeUrl = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuDT_qRw0npxnYj53gpERVkuERkaKunYYnd72soUSWG1SZLxWfOcD90g_-cgw9LF77GTVulMK1xRbS4YdgaD4twcQ0qrk9xK252PNb7J_5sy_y5Mdul4RVzgdYTGk_GpC04dlK33r4FMQ0wASFcOX7tHozw0mLbUFuSRlqt-gkVwok1TjNUWdHuDUdlyoYQHU9MBfbFtVblIPFbKp93QffZTfbW2Aautj5GjHHlBH5WZBRzujqG4bJDhunH0wHkp8yTq2YJ8lhIU7sFz')

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')

// Methods
const copyToClipboard = async (text, message) => {
  const result = await copyText(text, message)
  if (result.success) {
    snackbarMessage.value = result.message
    showSnackbar.value = true
  }
}

const goBackToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cart-items-container::-webkit-scrollbar {
  width: 6px;
}

.cart-items-container::-webkit-scrollbar-track {
  background: transparent;
}

.cart-items-container::-webkit-scrollbar-thumb {
  background-color: #e6e1db;
  border-radius: 20px;
}

.sticky-card {
  position: sticky;
  top: 100px;
}

.copy-btn:hover {
  background-color: rgba(238, 157, 43, 0.2) !important;
}

.copy-btn:active {
  transform: scale(0.95);
}
</style>
