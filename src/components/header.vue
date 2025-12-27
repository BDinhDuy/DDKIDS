<template>
  <div class="header-bar">
    <v-container class="py-3 header-container">
      <v-row align="center" no-gutters>
        <!-- Logo -->
        <v-col cols="auto" class="d-flex align-center">
          <div class="logo-wrapper" @click="() => router.push('/')">
            <div class="logo-icon">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="logo-text">DDKIDS</h2>
          </div>
        </v-col>

        <!-- Search Bar -->
        <v-col class="px-4 d-none d-md-flex">
          <div class="search-wrapper">
            <v-icon class="search-icon">mdi-magnify</v-icon>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm đồ chơi..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
          </div>
        </v-col>

        <!-- Right Section -->
        <v-col cols="auto">
          <div class="d-flex align-center gap-2">
            <!-- About Link -->
            <v-btn variant="text" class="text-none d-none d-lg-flex" size="small">
              Giới thiệu
            </v-btn>

            <!-- Register Button -->
            <v-btn
              variant="flat"
              color="#f4f3f0"
              class="text-none font-weight-bold"
              size="small"
              @click="handleRegister"
            >
              Đăng ký
            </v-btn>

            <!-- Login Button -->
            <v-btn
              variant="flat"
              color="#ee9d2b"
              class="text-none font-weight-bold"
              size="small"
              @click="handleLogin"
            >
              Đăng nhập
            </v-btn>

            <!-- Cart Button -->
            <v-menu
              open-on-hover
              offset-y
              location="bottom end"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  variant="flat"
                  color="#f4f3f0"
                  size="small"
                  v-bind="props"
                  @click="handleCart"
                >
                  <v-badge
                    v-if="cartStore.cartCount > 0"
                    :content="cartStore.cartCount"
                    color="red"
                    overlap
                  >
                    <v-icon>mdi-cart-outline</v-icon>
                  </v-badge>
                  <v-icon v-else>mdi-cart-outline</v-icon>
                </v-btn>
              </template>

              <v-card min-width="300" class="mt-2 py-4 px-4 text-center cart-popup">
                <div v-if="cartStore.cartCount === 0">
                  <v-icon size="64" color="grey-lighten-1" class="mb-2">mdi-cart-off</v-icon>
                  <p class="text-grey-darken-1 mb-4">Chưa có sản phẩm nào trong giỏ hàng</p>
                  <v-btn
                    color="#ee9d2b"
                    variant="flat"
                    block
                    class="text-none"
                    @click="() => router.push('/')"
                  >
                    Tiếp tục mua sắm
                  </v-btn>
                  </div>
                  <div v-else>
                    <div class="cart-items-list mb-4">
                      <div 
                        v-for="item in cartStore.cartItems" 
                        :key="item.id" 
                        class="cart-item d-flex align-center py-2 clickable"
                        @click="goToProductDetail(item.id)"
                      >
                        <v-img :src="item.image" width="50" height="50" cover class="rounded mr-3 flex-shrink-0"></v-img>
                        <div class="text-left overflow-hidden">
                          <p class="item-name text-truncate mb-0">{{ item.name }}</p>
                          <div class="d-flex justify-space-between align-center">
                            <span class="item-qty">{{ item.quantity }} x </span>
                            <span class="item-price">{{ item.price.toLocaleString() }}đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <v-divider class="mb-3"></v-divider>
                    <div class="d-flex justify-space-between align-center mb-4">
                      <span class="total-label">Tổng cộng:</span>
                      <span class="total-price">{{ cartStore.totalAmount.toLocaleString() }}đ</span>
                    </div>
                    <v-btn
                      color="#2d7a5e"
                      variant="flat"
                      block
                      class="text-none mb-2"
                      @click="handleCart"
                    >
                      Xem giỏ hàng
                    </v-btn>
                    <v-btn
                      color="#ffa500"
                      variant="flat"
                      block
                      class="text-none"
                      @click="() => router.push('/checkout')"
                    >
                      Thanh toán
                    </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Reactive data
const searchQuery = ref('')

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } })
  }
}

const handleLogin = () => {
  router.push('/login')
}

const handleRegister = () => {
  router.push('/register')
}

const handleCart = () => {
  router.push('/cart')
}

const goToProductDetail = (id) => {
  console.log('Navigate to product detail:', id)
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.header-bar {
  background-color: white;
  border-bottom: none;
  position: relative;
  min-height: 72px;
}

.header-container {
  padding-left: 40px !important;
  padding-right: 40px !important;
}

@media (max-width: 959px) {
  .header-container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #ee9d2b;
}

.logo-svg {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-size: 20px;
  font-weight: 900;
  color: #181511;
  letter-spacing: -0.015em;
  margin: 0;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: #f4f3f0;
  border-radius: 12px;
  padding: 0 16px;
  height: 40px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-icon {
  color: #897961;
  margin-right: 8px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #181511;
}

.search-input::placeholder {
  color: #897961;
}

/* Category Dropdown */
.category-dropdown {
  width: 160px;
  min-width: 0 !important; /* Bắt buộc để vượt qua giới hạn của Vuetify */
  flex: none; /* Đảm bảo nó không bị co giãn theo flexbox */
  border-right: 1px solid #eee;
}

.category-dropdown :deep(.v-input__control) {
  min-width: 0 !important; /* Bắt cột con bên trong cũng phải nhỏ lại */
  min-height: 44px !important;
}

.category-dropdown :deep(.v-input__slot) {
  background: white !important;
  box-shadow: none !important;
  padding: 0 8px 0 10px !important; /* Giảm padding trái/phải để chiếm ít chỗ hơn */
  min-height: 44px !important;
}

.category-dropdown :deep(.v-select__selection) {
  color: #555 !important;
  font-size: 13px !important;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Nếu dài quá sẽ có dấu ... */
}

/* Style cho icon dropdown */
.category-dropdown :deep(.v-field__append-inner) {
  padding-top: 0 !important;
  align-items: center !important;
}

.category-dropdown :deep(.v-field__append-inner .v-icon) {
  font-size: 18px !important;
  color: #999 !important;
  opacity: 1 !important;
}

/* Search Input */
.search-input {
  flex: 1;
}

.search-input :deep(.v-input__control) {
  min-height: 44px !important;
}

.search-input :deep(.v-input__slot) {
  background: white !important;
  box-shadow: none !important;
  padding: 0 16px !important;
  min-height: 44px !important;
}

.search-input :deep(input) {
  color: #333 !important;
  font-size: 14px !important;
  font-weight: 500 !important; /* Chữ đậm hơn cho nội dung nhập */
  caret-color: #ffa500 !important;
  padding: 0 !important;
  padding-left: 8px !important;
}

.search-input :deep(input::placeholder) {
  color: #000 !important;
  font-size: 14px !important;
  font-weight: 500 !important; /* Chữ đậm hơn cho placeholder */
}

/* Search Button */
.search-btn {
  border-radius: 0 30px 30px 0 !important; /* Bo tròn theo góc phải của container */
  min-width: 60px !important;
  height: 44px !important;
  margin-right: -1px; /* Tràn lề để liền mạch */
  transition: transform 0.2s ease;
}

.search-btn:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
}

/* Remove Vuetify default margins */
:deep(.category-dropdown .v-input__append-inner),
:deep(.category-dropdown .v-input__prepend-inner),
:deep(.search-input .v-input__append-inner),
:deep(.search-input .v-input__prepend-inner) {
  margin: 0 !important;
  padding: 0 !important;
}

/* Authentication section (Login/Register) */
.auth-text {
  font-size: 13px;
}

.auth-separator {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

/* Remove ONLY the focus ring border */
.v-btn :deep(.v-btn__focus-ring) {
  display: none !important;
}

.v-btn {
  outline: none !important;
  box-shadow: none !important;
}

.header-divider {
  height: 20px;
  align-self: center;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 1px !important;
  opacity: 1 !important;
}

/* Cart Popup */
.cart-popup {
  border-radius: 8px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
}

.cart-items-list {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;
}

.cart-item.clickable {
  cursor: pointer;
}

.cart-item.clickable:hover {
  background-color: #f9f9f9;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.item-qty {
  font-size: 12px;
  color: #666;
}

.item-price {
  font-size: 13px;
  font-weight: 600;
  color: #2d7a5e;
}

.total-label {
  font-size: 14px;
  color: #666;
}

.total-price {
  font-size: 16px;
  font-weight: bold;
  color: #d32f2f;
}

/* Hover effects */
.v-btn:hover {
  opacity: 0.9;
}
</style>