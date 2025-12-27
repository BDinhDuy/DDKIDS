<template>
  <v-container fluid class="pa-0" style="background-color: #f8f7f6;">
    <v-container class="py-5 py-lg-10 px-4 px-md-8 px-lg-16" style="max-width: 1280px;">
      <v-row>
        <!-- Left Column - Forms -->
        <v-col cols="12" lg="8">
          <!-- Header & Progress -->
          <div class="mb-6">
            <div class="mb-4">
              <h1 class="text-h3 text-md-h2 font-weight-black mb-2" style="letter-spacing: -0.033em;">
                Thanh toán
              </h1>
              <p class="text-body-1" style="color: #897961;">
                Hoàn tất đơn hàng của bạn để nhận quà ngay
              </p>
            </div>
            
            <!-- Progress -->
            <div class="pt-2">
              <div class="d-flex justify-space-between align-center mb-3">
                <span class="text-body-1 font-weight-medium">Tiến trình</span>
                <span class="text-primary text-body-2 font-weight-bold">Bước 2/3</span>
              </div>
              <div class="rounded-pill overflow-hidden" style="height: 8px; background-color: #e6e1db;">
                <div class="h-100" :style="{ width: progressWidth + '%', backgroundColor: '#ee9d2b', borderRadius: '9999px', transition: 'width 1.5s ease-in-out' }"></div>
              </div>
              <div class="d-flex justify-space-between mt-2" style="font-size: 12px;">
                <span style="color: #897961;">Giỏ hàng</span>
                <span class="text-primary font-weight-medium">Thông tin</span>
                <span style="color: #897961;">Hoàn tất</span>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <v-card class="mb-6 rounded-xl" elevation="0" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #f4f3f0;">
            <v-card-text class="pa-6">
              <h3 class="text-h6 font-weight-bold mb-6 d-flex align-center">
                <v-icon color="#ee9d2b" size="24" class="mr-2">mdi-truck-delivery</v-icon>
                Thông tin giao hàng
              </h3>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Họ và tên</label>
                  </div>
                  <v-text-field
                    v-model="shippingInfo.fullName"
                    placeholder="Nhập họ tên"
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Số điện thoại</label>
                  </div>
                  <v-text-field
                    v-model="shippingInfo.phone"
                    placeholder="Nhập số điện thoại"
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Email (để nhận thông báo đơn hàng)</label>
                  </div>
                  <v-text-field
                    v-model="shippingInfo.email"
                    placeholder="example@email.com"
                    type="email"
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Tỉnh / Thành phố</label>
                  </div>
                  <v-select
                    v-model="shippingInfo.city"
                    :items="cities"
                    placeholder="Chọn Tỉnh / Thành phố"
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    class="custom-text-field"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Phường / Xã</label>
                  </div>
                  <v-select
                    v-model="shippingInfo.ward"
                    :items="wards"
                    placeholder="Chọn Phường / Xã"
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    :disabled="!shippingInfo.city"
                    class="custom-text-field"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <div class="mb-2">
                    <label class="text-body-2 font-weight-medium" style="color: #181511;">Địa chỉ cụ thể</label>
                  </div>
                  <v-text-field
                    v-model="shippingInfo.address"
                    placeholder="Số nhà, tên đường, tòa nhà..."
                    variant="outlined"
                    color="#ee9d2b"
                    hide-details
                    density="comfortable"
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Payment Methods -->
          <v-card class="rounded-xl" elevation="0" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #f4f3f0;">
            <v-card-text class="pa-6">
              <h3 class="text-h6 font-weight-bold mb-6 d-flex align-center">
                <v-icon color="#ee9d2b" size="24" class="mr-2">mdi-credit-card</v-icon>
                Phương thức thanh toán
              </h3>
              
              <div class="d-flex flex-column" style="gap: 16px;">
                <!-- MoMo -->
                <div
                  class="payment-option pa-4 rounded-xl d-flex align-center"
                  :class="{ 'payment-selected': paymentMethod === 'momo' }"
                  @click="paymentMethod = 'momo'"
                  style="cursor: pointer; border: 1px solid #e6e1db; transition: all 0.2s;"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="momo"
                    v-model="paymentMethod"
                    style="width: 20px; height: 20px; accent-color: #ee9d2b;"
                  />
                  <div class="ml-4 d-flex align-center flex-grow-1">
                    <div class="rounded-lg d-flex align-center justify-center mr-3" style="width: 40px; height: 40px; background-color: #a50064;">
                      <span class="text-white font-weight-bold" style="font-size: 10px;">MoMo</span>
                    </div>
                    <span class="font-weight-bold">Ví MoMo</span>
                  </div>
                </div>

                <!-- Bank Transfer -->
                <div
                  class="payment-option rounded-xl overflow-hidden"
                  :class="{ 'payment-selected': paymentMethod === 'bank' }"
                  style="border: 2px solid; transition: all 0.2s;"
                  :style="{ borderColor: paymentMethod === 'bank' ? '#ee9d2b' : '#e6e1db' }"
                >
                  <div
                    class="pa-4"
                    :style="{ backgroundColor: paymentMethod === 'bank' ? 'rgba(238, 157, 43, 0.05)' : 'white' }"
                    @click="paymentMethod = 'bank'"
                    style="cursor: pointer;"
                  >
                    <div class="d-flex align-center">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        v-model="paymentMethod"
                        checked
                        style="width: 20px; height: 20px; accent-color: #ee9d2b;"
                      />
                      <div class="ml-4 d-flex align-center justify-space-between flex-grow-1">
                        <div class="d-flex align-center">
                          <div class="rounded-lg d-flex align-center justify-center mr-3" style="width: 40px; height: 40px; background-color: #1976d2;">
                            <v-icon color="white" size="20">mdi-bank</v-icon>
                          </div>
                          <div>
                            <div class="font-weight-bold">Chuyển khoản ngân hàng</div>
                            <div class="text-caption" style="color: #897961;">Duyệt tự động 24/7</div>
                          </div>
                        </div>
                        <v-icon v-if="paymentMethod === 'bank'" style="color: #ee9d2b;" size="24">mdi-check-circle</v-icon>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Bank Selection -->
                  <v-expand-transition>
                    <div v-if="paymentMethod === 'bank'" class="px-4 pb-6 pt-2" style="background-color: white;">
                      <p class="text-body-2 font-weight-medium mb-3" style="color: #897961;">
                        Chọn ngân hàng chuyển khoản:
                      </p>
                      <v-row dense>
                        <v-col cols="6" md="3" v-for="bank in banks" :key="bank.id">
                          <div
                            class="bank-option rounded-lg text-center pa-3 d-flex align-center justify-center"
                            :class="{ 'bank-selected': selectedBank === bank.id }"
                            @click="selectedBank = bank.id"
                            style="cursor: pointer; border: 1px solid #e6e1db; transition: all 0.2s; height: 48px;"
                          >
                            <span class="font-weight-bold text-body-2" :style="{ color: bank.color }">
                              {{ bank.name }}
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-expand-transition>
                </div>

                <!-- COD -->
                <div
                  class="payment-option pa-4 rounded-xl d-flex align-center"
                  :class="{ 'payment-selected': paymentMethod === 'cod' }"
                  @click="paymentMethod = 'cod'"
                  style="cursor: pointer; border: 1px solid #e6e1db; transition: all 0.2s;"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    v-model="paymentMethod"
                    style="width: 20px; height: 20px; accent-color: #ee9d2b;"
                  />
                  <div class="ml-4 d-flex align-center">
                    <div class="rounded-lg d-flex align-center justify-center mr-3" style="width: 40px; height: 40px; background-color: #4caf50;">
                      <v-icon color="white" size="20">mdi-cash</v-icon>
                    </div>
                    <span class="font-weight-medium">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right Column - Order Summary -->
        <v-col cols="12" lg="4">
          <div class="sticky-card">
            <v-card class="rounded-xl" elevation="0" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #f4f3f0;">
              <v-card-text class="pa-6">
                <h3 class="text-h5 font-weight-bold mb-6">Đơn hàng của bạn</h3>
                
                <!-- Cart Items -->
                <div class="cart-items-container mb-6" style="max-height: 300px; overflow-y: auto; padding-right: 8px;">
                  <div
                    v-for="item in cartStore.cartItems"
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
                        {{ item.description || 'Màu: Xanh Navy' }}
                      </p>
                      <p class="text-body-2 font-weight-bold" style="color: #ee9d2b;">
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Coupon Code -->
                <div class="mb-6">
                  <div class="d-flex" style="gap: 8px;">
                    <v-text-field
                      v-model="couponCode"
                      placeholder="Mã giảm giá"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="flex-grow-1 custom-coupon-field"
                      style="font-size: 14px;"
                    ></v-text-field>
                    <v-btn
                      color="#e6e1db"
                      variant="flat"
                      @click="applyCoupon"
                      class="font-weight-bold"
                      style="text-transform: none; color: #181511;"
                      height="40"
                    >
                      Áp dụng
                    </v-btn>
                  </div>
                </div>

                <v-divider class="mb-6" style="border-color: #e6e1db;"></v-divider>

                <!-- Price Summary -->
                <div class="mb-6">
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Tạm tính</span>
                    <span class="font-weight-medium">{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Phí vận chuyển</span>
                    <span class="font-weight-medium">{{ formatPrice(shippingFee) }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-3 text-body-2">
                    <span style="color: #897961;">Giảm giá</span>
                    <span class="font-weight-medium text-green">-{{ formatPrice(discount) }}</span>
                  </div>
                </div>

                <!-- Total -->
                <div class="d-flex justify-space-between align-end mb-8">
                  <span class="text-body-1 font-weight-bold">Tổng cộng</span>
                  <span class="font-weight-black" style="font-size: 28px; color: #ee9d2b;">{{ formatPrice(total) }}</span>
                </div>

                <!-- Place Order Button -->
                <v-btn
                  block
                  size="x-large"
                  class="rounded-xl font-weight-bold mb-4 text-white"
                  elevation="0"
                  style="background-color: #ee9d2b; box-shadow: 0 10px 25px -5px rgba(238, 157, 43, 0.3); text-transform: none; height: 48px;"
                  @click="placeOrder"
                >
                  <span>Đặt hàng ngay</span>
                  <v-icon end size="small">mdi-arrow-right</v-icon>
                </v-btn>

                <!-- Security Badge -->
                <div class="d-flex align-center justify-center text-caption mt-4" style="gap: 8px; color: #897961;">
                  <v-icon size="14" style="color: #897961;">mdi-lock</v-icon>
                  <span>Thanh toán bảo mật SSL 100%</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSuccessSnackbar"
      :timeout="3000"
      :color="snackbarColor"
      location="top"
    >
      {{ successMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSuccessSnackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { fetchProvinces, fetchProvinceDetail } from '@/service/app'

const cartStore = useCartStore()
const router = useRouter()

// Progress
const progressWidth = ref(50)

// Shipping Information
const shippingInfo = ref({
  fullName: '',
  phone: '',
  email: '',
  city: '',
  ward: '',
  address: ''
})

// Cities and Wards
const cities = ref([])
const wards = ref([])
const isLoadingFromStorage = ref(false)

// Load danh sách tỉnh/thành phố khi component mount
onMounted(async () => {
  try {
    const provinces = await fetchProvinces()
    cities.value = provinces.map(province => ({
      title: province.name,
      value: province.code
    }))
    
    // Load thông tin shipping đã lưu từ localStorage
    const savedShippingInfo = localStorage.getItem('shippingInfo')
    if (savedShippingInfo) {
      isLoadingFromStorage.value = true
      const parsedInfo = JSON.parse(savedShippingInfo)
      shippingInfo.value = parsedInfo
      
      // Nếu có city, load lại danh sách wards
      if (parsedInfo.city) {
        const provinceDetail = await fetchProvinceDetail(parsedInfo.city)
        const allWards = []
        provinceDetail.districts?.forEach(district => {
          if (district.wards) {
            district.wards.forEach(ward => {
              allWards.push({
                title: `${ward.name}`,
                value: ward.code
              })
            })
          }
        })
        wards.value = allWards
      }
      isLoadingFromStorage.value = false
    }
  } catch (error) {
    console.error('Error loading provinces:', error)
  }
})

// Khi chọn tỉnh/thành phố, load danh sách phường/xã
watch(() => shippingInfo.value.city, async (newCityCode, oldCityCode) => {
  // Chỉ reset ward khi không đang load từ localStorage và city thực sự thay đổi
  if (!isLoadingFromStorage.value && oldCityCode !== undefined) {
    shippingInfo.value.ward = ''
  }
  
  wards.value = []
  
  if (newCityCode) {
    try {
      const provinceDetail = await fetchProvinceDetail(newCityCode)
      // Lấy tất cả phường/xã từ tất cả quận/huyện
      const allWards = []
      provinceDetail.districts?.forEach(district => {
        if (district.wards) {
          district.wards.forEach(ward => {
            allWards.push({
              title: `${ward.name}`,
              value: ward.code
            })
          })
        }
      })
      wards.value = allWards
    } catch (error) {
      console.error('Error loading wards:', error)
    }
  }
})

// Payment
const paymentMethod = ref('bank')
const selectedBank = ref('vietcombank')
const banks = ref([
  { id: 'vietcombank', name: 'Vietcombank', color: '#007f3d' },
  { id: 'techcombank', name: 'Techcombank', color: '#e30613' },
  { id: 'acb', name: 'ACB', color: '#0057a8' },
  { id: 'bidv', name: 'BIDV', color: '#00843d' }
])

// Coupon
const couponCode = ref('')
const discount = ref(0)

// Price Calculation
const subtotal = computed(() => cartStore.totalAmount || 800000)
const shippingFee = ref(30000)
const total = computed(() => subtotal.value + shippingFee.value - discount.value)

// Snackbar
const showSuccessSnackbar = ref(false)
const successMessage = ref('')
const snackbarColor = ref('success')

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const applyCoupon = () => {
  if (couponCode.value.toLowerCase() === 'discount10') {
    discount.value = subtotal.value * 0.1
    successMessage.value = 'Áp dụng mã giảm giá thành công!'
    snackbarColor.value = 'success'
    showSuccessSnackbar.value = true
  } else if (couponCode.value) {
    successMessage.value = 'Mã giảm giá không hợp lệ'
    snackbarColor.value = 'error'
    showSuccessSnackbar.value = true
  }
}

const placeOrder = () => {
  // Validate form
  if (!shippingInfo.value.fullName || !shippingInfo.value.phone || !shippingInfo.value.email) {
    successMessage.value = 'Vui lòng điền đầy đủ thông tin giao hàng'
    snackbarColor.value = 'error'
    showSuccessSnackbar.value = true
    return
  }

  if (!shippingInfo.value.city || !shippingInfo.value.ward || !shippingInfo.value.address) {
    successMessage.value = 'Vui lòng điền đầy đủ địa chỉ'
    snackbarColor.value = 'error'
    showSuccessSnackbar.value = true
    return
  }

  // Animate progress bar from 50% to 100%
  progressWidth.value = 100

  // Create order object
  const order = {
    shippingInfo: shippingInfo.value,
    paymentMethod: paymentMethod.value,
    selectedBank: paymentMethod.value === 'bank' ? selectedBank.value : null,
    items: cartStore.cartItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    })),
    subtotal: subtotal.value,
    shippingFee: shippingFee.value,
    discount: discount.value,
    total: total.value,
    createdAt: new Date().toISOString()
  }

  console.log('Order placed:', order)
  
  // Lưu order vào localStorage để chuyển sang trang checkoutDetails
  localStorage.setItem('currentOrder', JSON.stringify(order))
  
  // Lưu thông tin shipping để khi quay lại vẫn còn
  localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo.value))
  
  successMessage.value = 'Đặt hàng thành công! Đang chuyển đến trang thanh toán...'
  snackbarColor.value = 'success'
  showSuccessSnackbar.value = true
  
  // Chuyển sang trang checkoutDetails sau 1.5s
  setTimeout(() => {
    router.push('/checkoutDeatails')
  }, 1500)
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

.payment-option:hover {
  border-color: rgba(238, 157, 43, 0.5) !important;
}

.payment-selected {
  border-color: #ee9d2b !important;
}

.bank-option:hover {
  border-color: rgba(238, 157, 43, 0.5) !important;
  background-color: rgba(238, 157, 43, 0.05);
}

.bank-selected {
  border-color: #ee9d2b !important;
  background-color: rgba(238, 157, 43, 0.05);
}

:deep(.custom-text-field .v-field) {
  border-radius: 12px;
  height: 48px;
  border-color: #e6e1db;
}

:deep(.custom-text-field .v-field__input) {
  padding: 12px 16px;
  min-height: 48px;
}

:deep(.custom-text-field .v-field--focused) {
  box-shadow: 0 0 0 2px rgba(238, 157, 43, 0.5);
}

:deep(.custom-coupon-field .v-field) {
  border-radius: 8px;
  border-color: #e6e1db;
}
</style>
