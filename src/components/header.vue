<template>
  <div>
    <v-app-bar app color="#2d7a5e" dark elevation="0" height="auto">
      <v-container>
        <v-row align="center" justify="center" no-gutters>
          <!-- Logo -->
          <v-col cols="auto" class="mr-6">
            <div class="logo-text" @click="() => $router.push('/home')">
              <span style="color: white; font-size: 28px; font-weight: bold;">DD</span>
              <span style="color: #ffa500; font-size: 28px; font-weight: bold;">KIDS</span>
            </div>
          </v-col>

          <!-- Search Section -->
          <v-col cols="auto">
            <div class="search-container">
              <!-- Category Dropdown -->
              <v-select
                v-model="selectedCategory"
                :items="categories"
                dense
                solo
                flat
                hide-details
                class="category-dropdown"
                >
            </v-select>
              <!-- Search Input -->
              <v-text-field
                v-model="searchQuery"
                placeholder="Tìm sản phẩm bạn mong muốn"
                variant="plain"
                hide-details
                class="search-input"
                @keyup.enter="handleSearch"
              ></v-text-field>

              <!-- Search Button -->
              <v-btn
                color="#ffa500"
                elevation="0"
                height="40"
                class="search-btn"
                @click="handleSearch"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
          </v-col>

          <!-- Right Section: Login & Cart -->
          <v-col cols="auto">
            <div class="d-flex align-center">
              <!-- Login/Register -->
              <div class="d-flex align-center">
                <v-icon small class="ml-12">mdi-account-outline</v-icon>
                <v-btn text class="text-none px-1" @click="handleLogin" min-width="0">
                  <span class="auth-text">Đăng nhập</span>
                </v-btn>
                <span class="auth-separator">/</span>
                <v-btn text class="text-none px-1" @click="handleRegister" min-width="0">
                  <span class="auth-text">Đăng ký</span>
                </v-btn>
              </div>

              <!-- Divider -->
              <v-divider vertical class="header-divider mx-2"></v-divider>

              <!-- Cart with Menu Popup -->
              <v-menu
                open-on-hover
                offset-y
                location="bottom end"
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" @click="handleCart">
                    <v-badge
                      v-if="cartStore.cartCount > 0"
                      :content="cartStore.cartCount"
                      color="red"
                      overlap
                      offset-x="10"
                      offset-y="10"
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
                      color="#2d7a5e"
                      variant="flat"
                      block
                      class="text-none"
                      @click="() => $router.push('/home')"
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
                      @click="() => $router.push('/checkout')"
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
    </v-app-bar>
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
const selectedCategory = ref('Tất cả')

// Static data
const categories = [
  'Đồ chơi cho bé trai',
  'Đồ chơi cho bé gái',
  'Đồ chơi cho bé trai từ 1-3 tuổi',
  'Đồ chơi cho bé gái từ 1-3 tuổi',
  'Đồ chơi cho bé trai từ 4-6 tuổi',
  'Đồ chơi cho bé gái từ 4-6 tuổi',
]

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
/* Logo */
.logo-text {
  cursor: pointer;
  user-select: none;
}

/* Search Container */
.search-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  width: 550px;
  height: 44px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-container:focus-within {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid #ffa500;
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