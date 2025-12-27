<template>
  <v-container fluid class="pa-0" style="background-color: #f8f7f6;">
    <v-container class="py-5 py-lg-10 px-4 px-md-8 px-lg-16" style="max-width: 1280px;">
      <!-- Hero Success Section -->
      <div class="text-center mb-8">
        <div class="d-flex justify-center mb-4">
          <div 
            class="rounded-circle d-flex align-center justify-center"
            style="width: 80px; height: 80px; background-color: #dcfce7;"
          >
            <v-icon size="48" style="color: #16a34a;">mdi-check-circle</v-icon>
          </div>
        </div>
        <h1 class="text-h3 text-md-h2 font-weight-black mb-3" style="letter-spacing: -0.033em;">
          Cảm ơn bạn đã mua hàng!
        </h1>
        <p class="text-body-1" style="color: #897961;">
          Mã đơn hàng: <span class="font-weight-bold" style="color: #181511;">{{ orderNumber }}</span> • 
          Chúng tôi đã gửi email xác nhận cho bạn.
        </p>
      </div>

      <!-- Timeline -->
      <v-card class="mb-8 rounded-xl overflow-hidden" elevation="0" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #f4f3f0;">
        <v-card-text class="pa-6 pa-md-8">
          <div class="timeline-container">
            <!-- Progress Line Background -->
            <div class="timeline-line-bg"></div>
            <!-- Progress Line Active -->
            <div class="timeline-line-active" :style="{ width: timelineProgress + '%' }"></div>
            
            <!-- Steps -->
            <div class="timeline-steps">
              <div 
                v-for="(step, index) in orderSteps" 
                :key="index"
                class="timeline-step"
              >
                <div 
                  class="step-circle"
                  :class="{ 'active': step.status === 'active', 'completed': step.status === 'completed' }"
                >
                  <v-icon size="20" color="white">{{ step.icon }}</v-icon>
                </div>
                <div class="step-content">
                  <p class="text-body-2 font-weight-bold mb-1" :style="{ color: step.status !== 'pending' ? '#181511' : '#897961' }">
                    {{ step.title }}
                  </p>
                  <p class="text-caption" style="color: #897961;">{{ step.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-row>
        <!-- Left Column - Order Items -->
        <v-col cols="12" lg="8">
          <!-- Products Table -->
          <v-card class="mb-6 rounded-xl overflow-hidden" elevation="0" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #f4f3f0;">
            <div class="pa-4" style="background-color: #f9fafb; border-bottom: 1px solid #f4f3f0;">
              <h3 class="text-h6 font-weight-bold">Chi tiết sản phẩm</h3>
            </div>
            <v-card-text class="pa-0">
              <div class="overflow-x-auto">
                <table class="order-table">
                  <thead>
                    <tr>
                      <th class="text-left">Sản phẩm</th>
                      <th class="text-center">Số lượng</th>
                      <th class="text-right">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in orderInfo.items" :key="item.id">
                      <td>
                        <div class="d-flex align-center" style="gap: 16px;">
                          <div class="rounded-lg overflow-hidden" style="width: 64px; height: 64px; flex-shrink: 0; border: 1px solid #e6e1db;">
                            <v-img
                              :src="item.image"
                              :alt="item.name"
                              cover
                              width="64"
                              height="64"
                            ></v-img>
                          </div>
                          <div>
                            <p class="font-weight-bold mb-1">{{ item.name }}</p>
                            <p class="text-caption" style="color: #897961;">{{ item.description }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="text-center font-weight-medium">{{ item.quantity }}</td>
                      <td class="text-right font-weight-bold">{{ formatPrice(item.price * item.quantity) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-card-text>
          </v-card>

          <!-- Recommendations -->
          <div class="mt-6">
            <h3 class="text-h5 font-weight-bold mb-4">Có thể bé sẽ thích</h3>
            <v-row>
              <v-col 
                v-for="product in recommendations" 
                :key="product.id"
                cols="12" 
                sm="6" 
                md="4"
              >
                <v-card 
                  class="rounded-xl product-card"
                  elevation="0"
                  style="border: 1px solid #f4f3f0; transition: all 0.3s;"
                  hover
                >
                  <div class="pa-3">
                    <div class="product-image mb-3 rounded-lg overflow-hidden" style="aspect-ratio: 1; background-color: #f4f3f0;">
                      <v-img
                        :src="product.image"
                        :alt="product.name"
                        cover
                        class="product-img"
                      ></v-img>
                    </div>
                    <p class="font-weight-bold mb-2 line-clamp-2" style="min-height: 40px;">{{ product.name }}</p>
                    <p class="font-weight-bold mb-3" style="color: #ee9d2b;">{{ formatPrice(product.price) }}</p>
                    <v-btn
                      block
                      variant="flat"
                      class="rounded-lg font-weight-bold"
                      style="background-color: #f4f3f0; color: #181511; text-transform: none;"
                      @click="addToCart(product)"
                    >
                      Thêm vào giỏ
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Right Column - Order Summary -->
        <v-col cols="12" lg="4">
          <div class="sticky-card">
            <!-- Summary Card -->
            <v-card class="rounded-xl mb-6" elevation="0" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #f4f3f0;">
              <v-card-text class="pa-6">
                <h3 class="text-h6 font-weight-bold mb-4">Thông tin đơn hàng</h3>

                <!-- Shipping Address -->
                <div class="pb-4 mb-4" style="border-bottom: 1px solid #e6e1db;">
                  <p class="text-caption font-weight-bold text-uppercase mb-2" style="color: #897961; letter-spacing: 0.1em;">
                    Địa chỉ giao hàng
                  </p>
                  <div class="d-flex" style="gap: 12px;">
                    <v-icon size="20" style="color: #897961;">mdi-map-marker</v-icon>
                    <div>
                      <p class="font-weight-bold mb-1">{{ orderInfo.shippingInfo?.fullName }}</p>
                      <p class="text-body-2 mb-1">{{ orderInfo.shippingInfo?.address }}</p>
                      <p class="text-body-2" style="color: #897961;">{{ orderInfo.shippingInfo?.phone }}</p>
                    </div>
                  </div>
                </div>

                <!-- Payment Method -->
                <div class="pb-4 mb-4" style="border-bottom: 1px solid #e6e1db;">
                  <p class="text-caption font-weight-bold text-uppercase mb-2" style="color: #897961; letter-spacing: 0.1em;">
                    Phương thức thanh toán
                  </p>
                  <div class="d-flex align-center" style="gap: 12px;">
                    <v-icon size="20" style="color: #897961;">{{ getPaymentIcon(orderInfo.paymentMethod) }}</v-icon>
                    <p class="text-body-2">{{ getPaymentText(orderInfo.paymentMethod) }}</p>
                  </div>
                </div>

                <!-- Price Summary -->
                <div class="mb-4">
                  <div class="d-flex justify-space-between mb-2 text-body-2">
                    <span style="color: #897961;">Tạm tính</span>
                    <span class="font-weight-medium">{{ formatPrice(orderInfo.subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2 text-body-2">
                    <span style="color: #897961;">Phí vận chuyển</span>
                    <span class="font-weight-medium">{{ formatPrice(orderInfo.shippingFee) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2 text-body-2">
                    <span style="color: #897961;">Giảm giá</span>
                    <span class="font-weight-medium text-green">-{{ formatPrice(orderInfo.discount) }}</span>
                  </div>
                  <div class="d-flex justify-space-between align-center pt-3 mt-3" style="border-top: 1px solid #e6e1db;">
                    <span class="font-weight-bold">Tổng cộng</span>
                    <span class="font-weight-black" style="font-size: 24px; color: #ee9d2b;">{{ formatPrice(orderInfo.total) }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex flex-column" style="gap: 12px;">            
                  <v-btn
                    block
                    size="large"
                    variant="outlined"
                    class="rounded-xl font-weight-bold"
                    style="border-color: #e6e1db; color: #181511; text-transform: none;"
                    @click="continueShopping"
                  >
                    Tiếp tục mua sắm
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
            <!-- Help Box -->
            <v-card 
              class="rounded-xl" 
              elevation="0"
              style="background-color: rgba(238, 157, 43, 0.1); border: 1px solid rgba(238, 157, 43, 0.2);"
            >
              <v-card-text class="pa-4">
                <div class="d-flex" style="gap: 12px;">
                  <v-icon size="28" style="color: #ee9d2b;">mdi-headset</v-icon>
                  <div>
                    <p class="font-weight-bold mb-1">Cần sự giúp đỡ?</p>
                    <p class="text-caption" style="color: #897961;">
                      Liên hệ với chúng tôi qua hotline 1900 1234 hoặc email support@toystore.com
                    </p>
                  </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatPrice, getFutureDate, generateOrderNumber } from '@/utils/helpers'
import { getCurrentOrder, clearOrderData } from '@/utils/storage'

const router = useRouter()
const cartStore = useCartStore()

// Order Number
const orderNumber = ref(generateOrderNumber())

// Timeline Progress
const timelineProgress = ref(33)

// Order Steps
const orderSteps = ref([
  {
    title: 'Đã đặt hàng',
    date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
    icon: 'mdi-receipt-text',
    status: 'completed'
  },
  {
    title: 'Đang xử lý',
    date: 'Đang thực hiện',
    icon: 'mdi-warehouse',
    status: 'active'
  },
  {
    title: 'Đang giao',
    date: `Dự kiến ${getFutureDate(1)}`,
    icon: 'mdi-truck-delivery',
    status: 'pending'
  },
  {
    title: 'Thành công',
    date: `Dự kiến ${getFutureDate(3)}`,
    icon: 'mdi-checkbox-marked-circle',
    status: 'pending'
  }
])

// Order Information
const orderInfo = ref({
  shippingInfo: {},
  paymentMethod: '',
  items: [],
  subtotal: 0,
  shippingFee: 0,
  discount: 0,
  total: 0
})

// Recommendations
const recommendations = ref([
  {
    id: 'rec-1',
    name: 'Vịt cao su bồn tắm',
    price: 45000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkWl3TYvPTxOYaNUVAdQXINYrdhKmW4l-8nNCiNeyIcswe7jd0mBQL23Zx2XXJ5QRnSBFriCrxfXbWBMnBffk-BxgkQUppkrFM3vXOavWFL6gHWGNH-l-UI0H6CRbZvSyHC7weIa3sDKBgXyipHFZIOd-UkTNt5iJkTjZ9LyXHjlOXuhW1MGZcHHRi9uAqfv25yH9w4Yd_f9lB4-OH3rDJ4Bp_N-bRbLUprqEbbXLu7SWbtuUFLOJMZ0-NHKlvev0u0A_Yd2vSCQmV'
  },
  {
    id: 'rec-2',
    name: 'Xe đua siêu tốc',
    price: 120000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKH17n94Xoob5daUi78MWvw82HnpZuEG78tOeDtjC2LIEVHeYjNpKhh6EOyg8Gb7_mf57BhTsk2jPhygvs-uWfJxkf17zxEtTtGzLOcC44mak_VFLp1W4Xo44ekp9w4vHMRxuOLV9rzPTUUp2RCT2-cUzkFRxZxrgJvDMdAp2m4v6KK2KJBNphh465JfuBor7ffrwvyBGtm-qYdEVoYiqbBh74zfvSoSrk9SjbsqZ9xXLBi9z2-w9Lj_xn6q7KbMd3kDjkWFTkgWm0'
  },
  {
    id: 'rec-3',
    name: 'Bộ nấu ăn nhà bếp',
    price: 250000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARYusbtxZ1oWeM0qP3uqlimOagmqnkCUfZKFDyQBrNqMMlke1yuMezhlHdGADL5ij8C4v16-N4rmX1PoJCYzyk0ffERXzDZ6109vBpZVtkWeIcJTFDdIdbzIyQqHxbBS4YEAFx-XcTZXADDsBUNDh1GWveJNGFQxGms5PJZrlD-sOuSUCi9TdjSjwMoXY2zjnbt40fm5iuEIipVM8TTdaLNHn-j_6aqbWG0zyBVgJXCIgjVVfpxn0bU4AJVJ2JumAJ4PKOhgNH7P-8'
  }
])

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')

// Load order from storage and clear cart
onMounted(() => {
  try {
    const savedOrder = getCurrentOrder()
    if (savedOrder) {
      orderInfo.value = savedOrder
      
      // Clear cart after successful order
      cartStore.cartItems = []
      
      // Clear order data from storage
      clearOrderData()
    } else {
      console.warn('No order found, redirecting to home')
      router.push('/')
    }
  } catch (error) {
    console.error('Error loading order:', error)
    router.push('/')
  }
})

// Methods

const getPaymentIcon = (method) => {
  const icons = {
    'momo': 'mdi-wallet',
    'bank': 'mdi-bank',
    'cod': 'mdi-cash'
  }
  return icons[method] || 'mdi-credit-card'
}

const getPaymentText = (method) => {
  const texts = {
    'momo': 'Ví MoMo',
    'bank': 'Chuyển khoản ngân hàng',
    'cod': 'Thanh toán khi nhận hàng (COD)'
  }
  return texts[method] || 'Thanh toán trực tuyến'
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  snackbarMessage.value = 'Đã thêm vào giỏ hàng'
  showSnackbar.value = true
}

const continueShopping = () => {
  router.push('/')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sticky-card {
  position: sticky;
  top: 100px;
}

/* Timeline Styles */
.timeline-container {
  position: relative;
  padding: 40px 0;
}

.timeline-line-bg {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #f4f3f0;
  border-radius: 9999px;
  transform: translateY(-50%);
  z-index: 0;
}

.timeline-line-active {
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background-color: #ee9d2b;
  border-radius: 9999px;
  transform: translateY(-50%);
  z-index: 1;
  transition: width 0.5s ease;
}

.timeline-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f4f3f0;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.step-circle.active,
.step-circle.completed {
  background-color: #ee9d2b;
}

.step-content {
  text-align: center;
  max-width: 120px;
}

/* Table Styles */
.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table thead tr {
  background-color: white;
  border-bottom: 1px solid #e6e1db;
}

.order-table th {
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #897961;
}

.order-table tbody tr {
  border-bottom: 1px solid #e6e1db;
}

.order-table td {
  padding: 16px 24px;
}

/* Product Card Hover */
.product-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

.product-img {
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

/* Responsive Timeline */
@media (max-width: 768px) {
  .timeline-container {
    overflow-x: auto;
    padding-bottom: 20px;
  }
  
  .timeline-steps {
    min-width: 600px;
  }
  
  .step-content {
    max-width: 100px;
  }
}
</style>
