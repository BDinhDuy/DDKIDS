<template>
  <div class="profile-page">
    <v-container class="profile-container">
      <v-row>
        <!-- Sidebar Navigation -->
        <v-col cols="12" md="3" lg="3">
          <v-card class="sidebar-card" elevation="0">
            <!-- User Info Header -->
            <div class="user-header">
              <v-avatar size="56" class="user-avatar">
                <v-img :src="userInfo.avatar" alt="User avatar"></v-img>
              </v-avatar>
              <div class="user-info">
                <h3 class="user-name">{{ userInfo.name }}</h3>
                <p class="user-tier">{{ userInfo.tier }}</p>
                <p class="user-points">{{ userInfo.points }} điểm</p>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Navigation Menu -->
            <v-list class="nav-list" density="compact">
              <v-list-item
                v-for="item in menuItems"
                :key="item.value"
                :value="item.value"
                :active="activeTab === item.value"
                :class="{ 'active-item': activeTab === item.value }"
                @click="activeTab = item.value"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item
                value="logout"
                class="logout-item"
                rounded="lg"
                @click="handleLogout"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-logout"></v-icon>
                </template>
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Main Content Area -->
        <v-col cols="12" md="9" lg="9">
          <!-- Welcome Section -->
          <div class="welcome-section mb-8">
            <h1 class="welcome-title">Xin chào, {{ userInfo.firstName }}! 👋</h1>
            <p class="welcome-subtitle">Quản lý thông tin hồ sơ và theo dõi đơn hàng của bạn.</p>
          </div>

          <!-- Dashboard Overview (Default Tab) -->
          <div v-if="activeTab === 'dashboard'">
            <!-- Stats Cards -->
            <v-row class="mb-6">
              <v-col cols="12" sm="4">
                <v-card class="stat-card" elevation="0">
                  <div class="stat-icon blue">
                    <v-icon size="24" color="white">mdi-package-variant</v-icon>
                  </div>
                  <p class="stat-value">{{ stats.totalOrders }}</p>
                  <p class="stat-label">Đơn hàng đã đặt</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card class="stat-card" elevation="0">
                  <div class="stat-icon red">
                    <v-icon size="24" color="white">mdi-heart</v-icon>
                  </div>
                  <p class="stat-value">{{ stats.wishlistCount }}</p>
                  <p class="stat-label">Sản phẩm yêu thích</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card class="stat-card" elevation="0">
                  <div class="stat-icon green">
                    <v-icon size="24" color="white">mdi-piggy-bank</v-icon>
                  </div>
                  <p class="stat-value">{{ formatCurrency(stats.totalSpent) }}</p>
                  <p class="stat-label">Chi tiêu tích lũy</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Recent Orders -->
            <v-card class="orders-card mb-6" elevation="0">
              <div class="card-header">
                <h3 class="card-title">Đơn hàng gần đây</h3>
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="activeTab = 'orders'"
                >
                  Xem tất cả
                </v-btn>
              </div>

              <v-table class="orders-table">
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th class="text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in recentOrders" :key="order.id" class="order-row">
                    <td class="font-weight-bold">{{ order.orderNumber }}</td>
                    <td class="text-grey">{{ order.date }}</td>
                    <td>
                      <v-chip
                        :color="getStatusColor(order.status)"
                        size="small"
                        variant="flat"
                      >
                        {{ order.statusText }}
                      </v-chip>
                    </td>
                    <td class="font-weight-bold">{{ formatCurrency(order.total) }}</td>
                    <td class="text-right">
                      <v-btn
                        variant="text"
                        color="primary"
                        size="small"
                        @click="viewOrderDetail(order.id)"
                      >
                        {{ order.status === 'cancelled' ? 'Mua lại' : 'Chi tiết' }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>

            <!-- Personal Info & Address Grid -->
            <v-row class="mb-6">
              <!-- Personal Info Summary -->
              <v-col cols="12" lg="6">
                <v-card class="info-card" elevation="0">
                  <div class="card-header">
                    <h3 class="card-title">Thông tin cá nhân</h3>
                    <v-btn
                      icon
                      size="small"
                      variant="flat"
                      color="grey-lighten-3"
                      @click="activeTab = 'personal'"
                    >
                      <v-icon size="20">mdi-pencil</v-icon>
                    </v-btn>
                  </div>

                  <div class="info-list">
                    <div class="info-item">
                      <v-icon color="grey" class="info-icon">mdi-account</v-icon>
                      <div class="info-content">
                        <p class="info-label">Họ và tên</p>
                        <p class="info-value">{{ userInfo.name }}</p>
                      </div>
                    </div>
                    <div class="info-item">
                      <v-icon color="grey" class="info-icon">mdi-email</v-icon>
                      <div class="info-content">
                        <p class="info-label">Email</p>
                        <p class="info-value">{{ userInfo.email }}</p>
                      </div>
                    </div>
                    <div class="info-item">
                      <v-icon color="grey" class="info-icon">mdi-phone</v-icon>
                      <div class="info-content">
                        <p class="info-label">Số điện thoại</p>
                        <p class="info-value">{{ userInfo.phone }}</p>
                      </div>
                    </div>
                    <div class="info-item">
                      <v-icon color="grey" class="info-icon">mdi-cake</v-icon>
                      <div class="info-content">
                        <p class="info-label">Ngày sinh bé</p>
                        <p class="info-value">{{ userInfo.childBirthday }}</p>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <!-- Default Address -->
              <v-col cols="12" lg="6">
                <v-card class="info-card" elevation="0">
                  <div class="card-header">
                    <h3 class="card-title">Địa chỉ mặc định</h3>
                    <v-btn
                      variant="text"
                      color="primary"
                      size="small"
                      @click="activeTab = 'addresses'"
                    >
                      Quản lý
                    </v-btn>
                  </div>

                  <v-card class="address-card" variant="flat" color="grey-lighten-4">
                    <v-chip size="x-small" color="primary" variant="flat" class="mb-2">
                      {{ defaultAddress.type }}
                    </v-chip>
                    <p class="address-name">
                      {{ defaultAddress.name }}
                      <span class="address-phone">({{ defaultAddress.phone }})</span>
                    </p>
                    <p class="address-text">{{ defaultAddress.fullAddress }}</p>
                  </v-card>

                  <v-btn
                    variant="outlined"
                    color="grey"
                    block
                    class="mt-4 add-address-btn"
                    @click="openAddAddressDialog"
                  >
                    <v-icon start>mdi-plus</v-icon>
                    Thêm địa chỉ mới
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>

            <!-- Wishlist Preview -->
            <div class="wishlist-section">
              <div class="section-header mb-4">
                <h3 class="section-title">Sản phẩm yêu thích</h3>
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="activeTab = 'wishlist'"
                >
                  Xem tất cả
                </v-btn>
              </div>

              <v-row>
                <v-col
                  v-for="product in wishlistProducts"
                  :key="product.id"
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-card class="product-card" elevation="1" rounded="xl" @click="viewProduct(product.id)">
                    <div class="product-image-wrapper">
                      <v-chip
                        v-if="product.discount"
                        color="red"
                        label
                        size="small"
                        class="product-badge"
                      >
                        -{{ product.discount }}%
                      </v-chip>
                      <v-btn
                        icon
                        size="small"
                        variant="flat"
                        color="white"
                        class="favorite-btn"
                        @click.stop="removeFromWishlist(product.id)"
                      >
                        <v-icon style="color: #ef5350 !important;">mdi-heart</v-icon>
                      </v-btn>
                      <v-img
                        :src="product.image"
                        :alt="product.name"
                        aspect-ratio="1"
                        cover
                        class="product-image"
                      ></v-img>
                    </div>
                    <v-card-text class="product-info">
                      <h3 class="product-name">{{ product.name }}</h3>
                      <div class="product-rating mb-2">
                        <v-icon
                          v-for="i in 5"
                          :key="i"
                          size="small"
                          :color="i <= product.rating ? 'yellow-darken-2' : 'grey-lighten-1'"
                        >
                          {{ i <= product.rating ? 'mdi-star' : 'mdi-star-outline' }}
                        </v-icon>
                        <span class="rating-count">({{ product.rating }})</span>
                      </div>
                      <div class="d-flex justify-space-between align-center">
                        <div>
                          <p v-if="product.originalPrice" class="old-price">
                            {{ formatCurrency(product.originalPrice) }}
                          </p>
                          <p class="product-price">{{ formatCurrency(product.price) }}</p>
                        </div>
                        <v-btn
                          icon
                          size="small"
                          color="#ee9d2b"
                          elevation="1"
                          @click.stop="addToCart(product.id)"
                        >
                          <v-icon>mdi-cart-plus</v-icon>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <!-- Support Banner -->
            <v-card class="support-banner mt-8" color="blue-lighten-5" elevation="0">
              <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4">
                <div class="d-flex align-center ga-4">
                  <v-avatar size="48" color="white">
                    <v-icon color="blue" size="28">mdi-headset</v-icon>
                  </v-avatar>
                  <div>
                    <h4 class="support-title">Cần hỗ trợ?</h4>
                    <p class="support-text">Đội ngũ của chúng tôi luôn sẵn sàng 24/7</p>
                  </div>
                </div>
                <div class="d-flex ga-3">
                  <v-btn variant="outlined" color="grey-darken-2" @click="showChatPopup = true">
                    Chat ngay
                  </v-btn>
                  <v-btn color="blue" @click="callHotline">Gọi hotline</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- Personal Info Tab -->
          <div v-else-if="activeTab === 'personal'">
            <PersonalInfoTab
              :user-info="userInfo"
              @update:user-info="handleUpdateUserInfo"
              @cancel="activeTab = 'dashboard'"
            />
          </div>

          <!-- Order History Tab -->
          <div v-else-if="activeTab === 'orders'">
            <OrderHistoryTab
              :orders="recentOrders"
              @track-order="handleTrackOrder"
              @confirm-received="handleConfirmReceived"
              @rate-order="handleRateOrder"
              @reorder="handleReorder"
              @open-chat="showChatPopup = true"
            />
          </div>

          <!-- Address Book Tab -->
          <div v-else-if="activeTab === 'addresses'">
            <AddressBookTab
              :addresses="userAddresses"
              @update:addresses="handleUpdateAddresses"
              @set-default="handleSetDefaultAddress"
              @open-chat="showChatPopup = true"
            />
          </div>

          <!-- Wishlist Tab -->
          <div v-else-if="activeTab === 'wishlist'">
            <WishlistTab
              :products="wishlistProducts"
              @update:products="handleUpdateWishlist"
              @remove-product="handleRemoveFromWishlist"
              @clear-all="handleClearWishlist"
              @open-chat="showChatPopup = true"
            />
          </div>

          <!-- Change Password Tab -->
          <div v-else-if="activeTab === 'password'">
            <ChangePasswordTab
              @password-changed="handlePasswordChanged"
              @cancel="activeTab = 'dashboard'"
            />
          </div>

          <!-- Other Tabs Content (Placeholder) -->
          <div v-else class="tab-content">
            <v-card elevation="0" class="pa-8 text-center">
              <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-cog</v-icon>
              <h3 class="text-h6 mb-2">{{ getActiveTabTitle() }}</h3>
              <p class="text-grey">Tính năng đang được phát triển</p>
              <v-btn color="primary" class="mt-4" @click="activeTab = 'dashboard'">
                Quay lại trang chủ
              </v-btn>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Chat Popup -->
    <ChatPopup v-model="showChatPopup" />

    <!-- Notification Snackbar -->
    <v-snackbar
      v-model="showCartSnackbar"
      :timeout="3000"
      :color="snackbarColor"
      location="top"
      rounded="pill"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbarIcon }}</v-icon>
        <span>{{ snackbarMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn variant="text" @click="showCartSnackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ChatPopup from '../shop/ChatPopup.vue'
import PersonalInfoTab from './PersonalInfoTab.vue'
import OrderHistoryTab from './OrderHistoryTab.vue'
import AddressBookTab from './AddressBookTab.vue'
import WishlistTab from './WishlistTab.vue'
import ChangePasswordTab from './ChangePasswordTab.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// Active tab state
const activeTab = ref('dashboard')

// Sync activeTab with route query
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  }
})

watch(activeTab, (newTab) => {
  // Optional: Update URL without reloading when tab changes
  // router.replace({ query: { ...route.query, tab: newTab } })
})

// Chat popup state
const showChatPopup = ref(false)

// Snackbar state
const showCartSnackbar = ref(false)
const addedProductName = ref('')
const snackbarType = ref('cart') // 'cart' or 'wishlist'

const snackbarColor = computed(() => {
  return snackbarType.value === 'cart' ? 'green' : 'pink-darken-1'
})

const snackbarIcon = computed(() => {
  return snackbarType.value === 'cart' ? 'mdi-check-circle' : 'mdi-heart-broken'
})

const snackbarMessage = computed(() => {
  if (snackbarType.value === 'cart') {
    return `Đã thêm "${addedProductName.value}" vào giỏ hàng!`
  } else {
    return `Đã xóa "${addedProductName.value}" khỏi danh sách yêu thích`
  }
})

// Menu items
const menuItems = [
  { title: 'Tổng quan tài khoản', value: 'dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Thông tin cá nhân', value: 'personal', icon: 'mdi-account' },
  { title: 'Lịch sử đơn hàng', value: 'orders', icon: 'mdi-receipt-text' },
  { title: 'Sổ địa chỉ', value: 'addresses', icon: 'mdi-map-marker' },
  { title: 'Sản phẩm yêu thích', value: 'wishlist', icon: 'mdi-heart' },
  { title: 'Đổi mật khẩu', value: 'password', icon: 'mdi-lock' }
]

// User info
const userInfo = ref({
  name: 'Nguyễn Thị Mai',
  firstName: 'Mai',
  email: 'mai.nguyen@example.com',
  phone: '090 123 4567',
  birthdate: '1990-05-15',
  gender: 'female',
  childBirthday: '15/06/2018',
  kidName: 'Bé Bông',
  kidBirthdate: '2018-06-15',
  tier: 'Thành viên Vàng',
  points: 1250,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH4SMBpJzusrTLNodKH7EO19GMb71kbrf81j6a9YUoTHudcdxIgZYCM1pEw75DDE-iM2ajs2tdtAL0uHfuUY9XcNeAb6g22ChkO_CCDSBxnyezPY0WubVzTiLPVDPPP4mWHYX9b96xEW6-MiYY-3A5dqNgk4dV780B4vo-wkIUsvW6byxEc1YzGBJLl83OIz1hUvq8LMeH7dA9vblM_gwC563riw6hfI2WRrAlDqbTIMXP11JeT93ZaJtg478c_w4VLnZzpyAWmyXf'
})

// Stats
const stats = ref({
  totalOrders: 12,
  wishlistCount: 5,
  totalSpent: 2500000
})

// Recent orders
const recentOrders = ref([
  {
    id: 1,
    orderNumber: '#ORD-2394',
    date: '20/10/2023',
    time: '14:30',
    status: 'shipping',
    statusText: 'Đang giao',
    total: 450000,
    items: [
      {
        id: 1,
        name: 'Bộ lắp ráp LEGO City - Trạm Cứu Hỏa',
        variant: 'Phân loại: Bộ tiêu chuẩn',
        quantity: 1,
        price: 450000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3AOZZxYwWYwAI4rDV-DMiEK8uPvklwdVuybPgP2hVCtW0KGiHjLAxXkcNYD56UI7bnHnHtfRgJTe-TGkQrLIuF6duhXyCpySN2o7jmbWcy3RQgW6y_EisAKoG9i4yfn6-ZHR3sUf4UZZpgcuh_c_r170XiToWGSB1yNNbXxafaRcfhzEhfza7HUmOitIofCdTbct-qd2T9PGz2sQTC62vhP6vettqohJCoRJUAXlizoSv24t8Y9WopEpB4gDkUpF9KSUQxzcsunTO'
      }
    ]
  },
  {
    id: 2,
    orderNumber: '#ORD-2341',
    date: '15/09/2023',
    time: '09:15',
    status: 'completed',
    statusText: 'Hoàn thành',
    total: 1200000,
    items: [
      {
        id: 2,
        name: 'Gấu bông Teddy Premium - Size L',
        variant: 'Màu sắc: Nâu',
        quantity: 1,
        price: 320000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw'
      },
      {
        id: 3,
        name: 'Xe điều khiển từ xa RC - Tốc độ cao',
        variant: 'Màu sắc: Đỏ',
        quantity: 1,
        price: 880000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoIyT0-1JcHj06S8KBKZyGxbZ2Fom2kXY8Uh0AsLFJckFlYm9ZatunPnPEcfNlhyYaCEypZ3Tr73OdwSqtdGarMfXenh26wYNGLglpd4tN_qez32UhfX0ZYbaHjnN0JE0mLU_wKVSRn6SxMpsbH747vui0OBT6E2mBCJAlCyXf83MG-gPyAYWcyAWH2q2DYQT0SSwd5aHGdxP3HFK-X3Jdx43WhD00tFrgKZCBy41JKk7wscP7YeVIhKTWBI47BE0_Q2XMFBnlnmXh'
      }
    ]
  },
  {
    id: 3,
    orderNumber: '#ORD-2209',
    date: '01/09/2023',
    time: '18:45',
    status: 'cancelled',
    statusText: 'Đã hủy',
    total: 320000,
    items: [
      {
        id: 4,
        name: 'Gấu bông Teddy Premium - Size L',
        variant: 'Màu sắc: Nâu',
        quantity: 1,
        price: 320000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw'
      }
    ]
  }
])

// Default address
const defaultAddress = ref({
  type: 'Nhà riêng',
  name: 'Nguyễn Thị Mai',
  phone: '090 123 4567',
  fullAddress: 'Số 15, Ngõ 234 Đường Hoàng Quốc Việt, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội'
})

// User addresses
const userAddresses = ref([
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    phone: '090 123 4567',
    type: 'Nhà riêng',
    fullAddress: 'Số 15, Ngõ 234 Đường Hoàng Quốc Việt, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội',
    isDefault: true
  },
  {
    id: 2,
    name: 'Nguyễn Thị Mai',
    phone: '090 999 8888',
    type: 'Văn phòng',
    fullAddress: 'Tầng 12, Tòa nhà Keangnam Landmark 72, Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    isDefault: false
  },
  {
    id: 3,
    name: 'Nguyễn Văn Hùng',
    phone: '091 234 5678',
    type: 'Nhà ông bà',
    fullAddress: 'Số 5, Đường Trần Phú, Phường Văn Quán, Quận Hà Đông, Hà Nội',
    isDefault: false
  }
])

// Wishlist products
const wishlistProducts = ref([
  {
    id: 1,
    name: 'Bộ lắp ráp LEGO City',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3AOZZxYwWYwAI4rDV-DMiEK8uPvklwdVuybPgP2hVCtW0KGiHjLAxXkcNYD56UI7bnHnHtfRgJTe-TGkQrLIuF6duhXyCpySN2o7jmbWcy3RQgW6y_EisAKoG9i4yfn6-ZHR3sUf4UZZpgcuh_c_r170XiToWGSB1yNNbXxafaRcfhzEhfza7HUmOitIofCdTbct-qd2T9PGz2sQTC62vhP6vettqohJCoRJUAXlizoSv24t8Y9WopEpB4gDkUpF9KSUQxzcsunTO',
    rating: 4.8,
    price: 599000,
    originalPrice: null,
    discount: null
  },
  {
    id: 2,
    name: 'Gấu bông Teddy Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw',
    rating: 5.0,
    price: 320000,
    originalPrice: 400000,
    discount: 20
  },
  {
    id: 3,
    name: 'Xe điều khiển từ xa RC',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoIyT0-1JcHj06S8KBKZyGxbZ2Fom2kXY8Uh0AsLFJckFlYm9ZatunPnPEcfNlhyYaCEypZ3Tr73OdwSqtdGarMfXenh26wYNGLglpd4tN_qez32UhfX0ZYbaHjnN0JE0mLU_wKVSRn6SxMpsbH747vui0OBT6E2mBCJAlCyXf83MG-gPyAYWcyAWH2q2DYQT0SSwd5aHGdxP3HFK-X3Jdx43WhD00tFrgKZCBy41JKk7wscP7YeVIhKTWBI47BE0_Q2XMFBnlnmXh',
    rating: 4.2,
    price: 850000,
    originalPrice: null,
    discount: null
  }
])

// Methods
const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + 'đ'
}

const getStatusColor = (status) => {
  const colors = {
    shipping: 'blue',
    completed: 'green',
    cancelled: 'grey'
  }
  return colors[status] || 'grey'
}

const getActiveTabTitle = () => {
  const item = menuItems.find(m => m.value === activeTab.value)
  return item ? item.title : ''
}

const viewOrderDetail = (orderId) => {
  console.log('View order:', orderId)
  // Navigate to order detail page
}

const openAddAddressDialog = () => {
  console.log('Open add address dialog')
}

const removeFromWishlist = (productId) => {
  const index = wishlistProducts.value.findIndex(p => p.id === productId)
  if (index > -1) {
    const productName = wishlistProducts.value[index].name
    
    // Create new array to trigger reactivity
    wishlistProducts.value = wishlistProducts.value.filter(p => p.id !== productId)
    
    // Update stats
    stats.value.wishlistCount = wishlistProducts.value.length
    
    // Show notification
    snackbarType.value = 'wishlist'
    addedProductName.value = productName
    showCartSnackbar.value = true
    
    console.log('Removed from wishlist:', productId)
  }
}

const addToCart = (productId) => {
  const product = wishlistProducts.value.find(p => p.id === productId)
  if (product) {
    cartStore.addToCart(product)
    
    // Show notification
    snackbarType.value = 'cart'
    addedProductName.value = product.name
    showCartSnackbar.value = true
  }
}

const viewProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const handleLogout = () => {
  // Implement logout logic
  console.log('Logging out...')
  router.push('/login')
}

const callHotline = () => {
  // Open phone dialer with hotline number
  window.location.href = 'tel:19001234'
}

const handleUpdateUserInfo = (updatedInfo) => {
  // Update user info with the new data
  userInfo.value = {
    ...userInfo.value,
    ...updatedInfo
  }
  
  console.log('User info updated:', updatedInfo)
  // Here you would typically make an API call to save the data
}

const handleTrackOrder = (orderId) => {
  console.log('Track order:', orderId)
  // Implement order tracking logic
  // Could open a tracking modal or navigate to tracking page
}

const handleConfirmReceived = (orderId) => {
  console.log('Confirm received:', orderId)
  // Update order status to completed
  const orderIndex = recentOrders.value.findIndex(o => o.id === orderId)
  if (orderIndex > -1) {
    recentOrders.value[orderIndex].status = 'completed'
    recentOrders.value[orderIndex].statusText = 'Hoàn thành'
  }
}

const handleRateOrder = (orderId) => {
  console.log('Rate order:', orderId)
  // Navigate to review page or open review modal
  router.push(`/order/${orderId}/review`)
}

const handleReorder = (orderId) => {
  console.log('Reorder:', orderId)
  // Find order and add items to cart
  const order = recentOrders.value.find(o => o.id === orderId)
  if (order && order.items) {
    order.items.forEach(item => {
      cartStore.addToCart({
        id: item.id || Math.random(),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })
    })
  }
}

const handleUpdateAddresses = (updatedAddresses) => {
  userAddresses.value = updatedAddresses
  
  // Update default address display
  const defaultAddr = updatedAddresses.find(addr => addr.isDefault)
  if (defaultAddr) {
    defaultAddress.value = {
      type: defaultAddr.type,
      name: defaultAddr.name,
      phone: defaultAddr.phone,
      fullAddress: defaultAddr.fullAddress
    }
  }
  
  console.log('Addresses updated:', updatedAddresses)
  // Here you would typically make an API call to save the data
}

const handleSetDefaultAddress = (addressId) => {
  console.log('Set default address:', addressId)
  // API call to set default address
}

const handleUpdateWishlist = (updatedProducts) => {
  wishlistProducts.value = updatedProducts
  stats.value.wishlistCount = updatedProducts.length
  console.log('Wishlist updated:', updatedProducts)
  // API call to save wishlist
}

const handleRemoveFromWishlist = (productId) => {
  console.log('Remove from wishlist:', productId)
  // API call to remove product
}

const handleClearWishlist = () => {
  wishlistProducts.value = []
  stats.value.wishlistCount = 0
  console.log('Wishlist cleared')
  // API call to clear wishlist
}

const handlePasswordChanged = (data) => {
  console.log('Password changed at:', data.timestamp)
  // You might want to show a global notification or logout the user if needed
  // For now, we'll just navigate back to dashboard or keep them on the page
  
  // Optional: Redirect to login if security policy requires re-login
  // router.push('/login')
}
</script>

<style scoped>
.profile-page {
  background-color: #f8f7f6;
  min-height: 100vh;
  padding: 32px 0;
}

.profile-container {
  max-width: 1440px;
}

/* Sidebar */
.sidebar-card {
  border: 1px solid #e6e1db;
  border-radius: 12px;
  padding: 24px;
  position: sticky;
  top: 96px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
}

.user-avatar {
  border: 2px solid #ee9d2b;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin: 0;
  line-height: 1.3;
}

.user-tier {
  font-size: 12px;
  color: #897961;
  margin: 2px 0;
}

.user-points {
  font-size: 12px;
  font-weight: 700;
  color: #ee9d2b;
  margin: 4px 0 0 0;
}

.nav-list {
  background: transparent;
  padding: 0;
}

.nav-list :deep(.v-list-item) {
  margin-bottom: 4px;
  color: #5c564b;
  font-size: 14px;
  min-height: 44px;
}

.nav-list :deep(.v-list-item:hover) {
  background-color: #f4f3f0;
  color: #181511;
}

.nav-list :deep(.v-list-item.active-item) {
  background-color: rgba(238, 157, 43, 0.1);
  color: #ee9d2b;
  font-weight: 600;
}

.nav-list :deep(.v-list-item.logout-item) {
  color: #d32f2f;
}

.nav-list :deep(.v-list-item.logout-item:hover) {
  background-color: rgba(211, 47, 47, 0.08);
}

/* Welcome Section */
.welcome-section {
  margin-bottom: 32px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 900;
  color: #181511;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.welcome-subtitle {
  font-size: 16px;
  color: #897961;
}

/* Stats Cards */
.stat-card {
  border: 1px solid #e6e1db;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.stat-icon.blue {
  background: #1976d2;
}

.stat-icon.red {
  background: #d32f2f;
}

.stat-icon.green {
  background: #2e7d32;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #181511;
  margin: 0;
}

.stat-label {
  font-size: 14px;
  color: #897961;
  margin: 0;
}

/* Orders Card */
.orders-card {
  border: 1px solid #e6e1db;
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #f4f3f0;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
  margin: 0;
}

.orders-table {
  background: white;
}

.orders-table :deep(thead) {
  background: #fcfbf9;
}

.orders-table :deep(th) {
  font-size: 12px;
  font-weight: 600;
  color: #897961;
  text-transform: uppercase;
  padding: 16px 24px;
}

.orders-table :deep(td) {
  padding: 16px 24px;
  font-size: 14px;
}

.order-row:hover {
  background-color: #f9f9f9;
}

/* Info Card */
.info-card {
  border: 1px solid #e6e1db;
  border-radius: 12px;
  padding: 24px;
  height: 100%;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-icon {
  margin-top: 2px;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 12px;
  color: #897961;
  margin: 0 0 4px 0;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #181511;
  margin: 0;
}

/* Address Card */
.address-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f4f3f0;
}

.address-name {
  font-size: 15px;
  font-weight: 700;
  color: #181511;
  margin: 0 0 4px 0;
}

.address-phone {
  font-weight: 400;
  color: #897961;
  font-size: 14px;
}

.address-text {
  font-size: 14px;
  color: #5c564b;
  line-height: 1.6;
  margin: 0;
}

.add-address-btn {
  border-style: dashed;
  text-transform: none;
  font-weight: 500;
}

/* Wishlist Section */
.wishlist-section {
  margin-top: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
}

/* Product Card */
.product-card {
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #f4f3f0;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(-4px);
}

.product-image-wrapper {
  position: relative;
  background-color: #f8f7f6;
}

.product-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  font-weight: 700;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

.product-image {
  transition: transform 0.5s;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-info {
  padding: 12px !important;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  line-height: 1.3;
  min-height: 42px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.rating-count {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
}

.old-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin: 0;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  color: #ee9d2b;
  margin: 0;
}

/* Support Banner */
.support-banner {
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.support-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin: 0;
}

.support-text {
  font-size: 14px;
  color: #5c564b;
  margin: 4px 0 0 0;
}

/* Tab Content */
.tab-content {
  min-height: 400px;
}

/* Remove button focus outline */
:deep(.v-btn .v-btn__focus-ring) {
  display: none !important;
}

:deep(.v-btn) {
  outline: none !important;
}

/* Responsive */
@media (max-width: 960px) {
  .sidebar-card {
    position: relative;
    top: 0;
    margin-bottom: 24px;
  }

  .welcome-title {
    font-size: 24px;
  }
}
</style>
