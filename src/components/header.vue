<template>
  <div>
    <v-app-bar app color="#2d7a5e" dark elevation="0" height="auto">
      <v-container>
        <v-row align="center" justify="center" no-gutters>
          <!-- Logo -->
          <v-col cols="auto" class="mr-6">
            <div class="logo-text">
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
              ></v-select>

              <!-- Search Input -->
              <v-text-field
                v-model="searchQuery"
                placeholder="Tìm sản phẩm bạn mong muốn"
                dense
                solo
                flat
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
              <v-btn text class="text-none mr-4" @click="handleLogin">
                <v-icon left small>mdi-account-outline</v-icon>
                <span style="font-size: 13px;">Đăng nhập / Đăng ký</span>
              </v-btn>

              <!-- Divider -->
              <v-divider vertical class="mx-2" style="height: 20px;"></v-divider>

              <!-- Cart -->
              <v-btn icon @click="handleCart" class="ml-2">
                <v-badge
                  v-if="cartCount > 0"
                  :content="cartCount"
                  color="red"
                  overlap
                  offset-x="10"
                  offset-y="10"
                >
                  <v-icon>mdi-cart-outline</v-icon>
                </v-badge>
                <v-icon v-else>mdi-cart-outline</v-icon>
              </v-btn>
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

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('Tất cả')
const cartCount = ref(0)

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
    console.log('Searching for:', searchQuery.value)
    router.push({ name: 'search', query: { q: searchQuery.value } })
  }
}

const handleLogin = () => {
  console.log('Navigate to login')
  router.push('/login')
}

const handleCart = () => {
  console.log('Navigate to cart')
  router.push('/cart')
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
  flex-shrink: 0;
  border-right: 1px solid #eee;
}

.category-dropdown :deep(.v-input__control) {
  min-height: 44px !important;
}

.category-dropdown :deep(.v-input__slot) {
  background: white !important;
  box-shadow: none !important;
  padding: 0 16px !important;
  min-height: 44px !important;
}

.category-dropdown :deep(.v-select__selection) {
  color: #555 !important;
  font-size: 13px !important;
  font-weight: 500;
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
}

.search-input :deep(input::placeholder) {
  color: #aaa !important;
  font-size: 14px !important;
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

/* Hover effects */
.v-btn:hover {
  opacity: 0.9;
}
</style>