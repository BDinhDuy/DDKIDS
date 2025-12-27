<template>
  <div class="order-history-tab">
    <!-- Header with Search and Filter -->
    <div class="tab-header mb-6">
      <div class="header-content">
        <div>
          <h2 class="tab-title">Lịch sử đơn hàng</h2>
          <p class="tab-subtitle">Theo dõi và quản lý tất cả đơn hàng của bạn.</p>
        </div>
        <div class="header-actions">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            placeholder="Tìm theo mã đơn hàng, sản phẩm..."
            variant="outlined"
            density="comfortable"
            hide-details
            class="search-field"
          ></v-text-field>
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            prepend-icon="mdi-filter-variant"
            @click="showFilterDialog = true"
          >
            Lọc
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Status Tabs -->
    <v-tabs
      v-model="activeStatus"
      color="primary"
      class="status-tabs mb-6"
      show-arrows
    >
      <v-tab value="all">Tất cả</v-tab>
      <v-tab value="pending">Chờ xác nhận</v-tab>
      <v-tab value="shipping">Đang giao</v-tab>
      <v-tab value="completed">Hoàn thành</v-tab>
      <v-tab value="cancelled">Đã hủy</v-tab>
    </v-tabs>

    <!-- Orders List -->
    <div class="orders-list">
      <v-card
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-card mb-6"
        elevation="0"
      >
        <!-- Order Header -->
        <div class="order-header">
          <div class="order-info">
            <div class="order-number-status">
              <span class="order-number">{{ order.orderNumber }}</span>
              <v-chip
                :color="getStatusColor(order.status)"
                size="small"
                variant="flat"
              >
                {{ order.statusText }}
              </v-chip>
            </div>
            <p class="order-date">Đặt ngày {{ order.date }} lúc {{ order.time }}</p>
          </div>
          <div class="order-actions">
            <div class="order-total">
              <p class="total-label">Tổng tiền</p>
              <p class="total-amount">{{ formatCurrency(order.total) }}</p>
            </div>
            <v-btn
              variant="outlined"
              color="grey-darken-1"
              size="small"
              @click="viewOrderDetail(order.id)"
            >
              Xem chi tiết
            </v-btn>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Order Items -->
        <div class="order-items">
          <div
            v-for="(item, index) in order.items"
            :key="index"
            class="order-item"
            :class="{ 'opacity-60': order.status === 'cancelled' }"
          >
            <v-img
              :src="item.image"
              :alt="item.name"
              aspect-ratio="1"
              cover
              class="item-image"
            ></v-img>
            <div class="item-details">
              <div class="item-info">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-variant">{{ item.variant }}</p>
                <p class="item-quantity">x{{ item.quantity }}</p>
              </div>
              <div class="item-price">
                <p class="price">{{ formatCurrency(item.price) }}</p>
              </div>
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Order Footer -->
        <div class="order-footer">
          <div class="footer-message">
            <div v-if="order.status === 'shipping'" class="status-message info">
              <v-icon size="small" color="blue">mdi-information</v-icon>
              <span>Vui lòng xác nhận khi bạn đã nhận được hàng</span>
            </div>
            <div v-else-if="order.status === 'completed'" class="status-message success">
              <v-icon size="small" color="green">mdi-check-circle</v-icon>
              <span>Đã giao thành công</span>
            </div>
            <div v-else-if="order.status === 'cancelled'" class="status-message error">
              <span>Đơn hàng đã bị hủy bởi người mua</span>
            </div>
          </div>
          <div class="footer-actions">
            <template v-if="order.status === 'shipping'">
              <v-btn
                variant="flat"
                color="grey-lighten-2"
                size="small"
                @click="trackOrder(order.id)"
              >
                Theo dõi đơn hàng
              </v-btn>
              <v-btn
                variant="flat"
                color="primary"
                size="small"
                @click="confirmReceived(order.id)"
              >
                Đã nhận hàng
              </v-btn>
            </template>
            <template v-else-if="order.status === 'completed'">
              <v-btn
                variant="flat"
                color="grey-lighten-2"
                size="small"
                @click="rateOrder(order.id)"
              >
                Đánh giá
              </v-btn>
              <v-btn
                variant="flat"
                color="primary"
                size="small"
                @click="reorder(order.id)"
              >
                Mua lại
              </v-btn>
            </template>
            <template v-else-if="order.status === 'cancelled'">
              <v-btn
                variant="flat"
                color="primary"
                size="small"
                @click="reorder(order.id)"
              >
                Mua lại
              </v-btn>
            </template>
          </div>
        </div>
      </v-card>

      <!-- Empty State -->
      <v-card v-if="filteredOrders.length === 0" class="empty-state" elevation="0">
        <v-icon size="80" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
        <h3 class="empty-title">Không có đơn hàng nào</h3>
        <p class="empty-text">Bạn chưa có đơn hàng nào trong danh mục này</p>
        <v-btn color="primary" class="mt-4" to="/">
          Khám phá sản phẩm
        </v-btn>
      </v-card>
    </div>

    <!-- Pagination -->
    <div v-if="filteredOrders.length > 0" class="pagination-wrapper">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        rounded="circle"
        color="primary"
      ></v-pagination>
    </div>

    <!-- Support Banner -->
    <v-card class="support-banner mt-8" color="blue-lighten-5" elevation="0">
      <v-card-text class="support-content">
        <div class="support-info">
          <v-avatar size="48" color="white">
            <v-icon color="blue" size="28">mdi-headset</v-icon>
          </v-avatar>
          <div>
            <h4 class="support-title">Cần hỗ trợ?</h4>
            <p class="support-text">Đội ngũ của chúng tôi luôn sẵn sàng 24/7</p>
          </div>
        </div>
        <div class="support-actions">
          <v-btn variant="outlined" color="grey-darken-2" @click="openChat">
            Chat ngay
          </v-btn>
          <v-btn color="blue" @click="callHotline">
            Gọi hotline
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Filter Dialog -->
    <v-dialog v-model="showFilterDialog" max-width="500">
      <v-card>
        <v-card-title class="dialog-title">
          <span>Lọc đơn hàng</span>
          <v-btn icon variant="text" @click="showFilterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6">
          <v-select
            v-model="filterDateRange"
            label="Khoảng thời gian"
            :items="dateRangeOptions"
            variant="outlined"
            density="comfortable"
          ></v-select>
          <v-select
            v-model="filterPriceRange"
            label="Khoảng giá"
            :items="priceRangeOptions"
            variant="outlined"
            density="comfortable"
            class="mt-4"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="resetFilters">Đặt lại</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="applyFilters">Áp dụng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
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
import { useRouter } from 'vue-router'

const router = useRouter()

// Props
const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['track-order', 'confirm-received', 'rate-order', 'reorder', 'open-chat'])

// Refs
const searchQuery = ref('')
const activeStatus = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showFilterDialog = ref(false)
const filterDateRange = ref('all')
const filterPriceRange = ref('all')

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle')

// Sample orders data
const ordersData = ref([
  {
    id: 1,
    orderNumber: '#ORD-2394',
    date: '20/10/2023',
    time: '14:30',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    total: 450000,
    items: [
      {
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
        name: 'Gấu bông Teddy Premium - Size L',
        variant: 'Màu sắc: Nâu',
        quantity: 1,
        price: 320000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw'
      },
      {
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
        name: 'Gấu bông Teddy Premium - Size L',
        variant: 'Màu sắc: Nâu',
        quantity: 1,
        price: 320000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw'
      }
    ]
  }
])

// Filter options
const dateRangeOptions = [
  { title: 'Tất cả', value: 'all' },
  { title: '7 ngày qua', value: '7days' },
  { title: '30 ngày qua', value: '30days' },
  { title: '3 tháng qua', value: '3months' },
  { title: '6 tháng qua', value: '6months' }
]

const priceRangeOptions = [
  { title: 'Tất cả', value: 'all' },
  { title: 'Dưới 500.000đ', value: '0-500000' },
  { title: '500.000đ - 1.000.000đ', value: '500000-1000000' },
  { title: '1.000.000đ - 2.000.000đ', value: '1000000-2000000' },
  { title: 'Trên 2.000.000đ', value: '2000000+' }
]

// Computed
const filteredOrders = computed(() => {
  let filtered = props.orders.length > 0 ? props.orders : ordersData.value

  // Filter by status
  if (activeStatus.value !== 'all') {
    filtered = filtered.filter(order => order.status === activeStatus.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => {
      return order.orderNumber.toLowerCase().includes(query) ||
             order.items.some(item => item.name.toLowerCase().includes(query))
    })
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

// Methods
const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + 'đ'
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'orange',
    shipping: 'blue',
    completed: 'green',
    cancelled: 'grey'
  }
  return colors[status] || 'grey'
}

const viewOrderDetail = (orderId) => {
  console.log('View order detail:', orderId)
  router.push(`/order/${orderId}`)
}

const trackOrder = (orderId) => {
  console.log('Track order:', orderId)
  emit('track-order', orderId)
  showNotification('Đang theo dõi đơn hàng...', 'info', 'mdi-map-marker')
}

const confirmReceived = (orderId) => {
  console.log('Confirm received:', orderId)
  emit('confirm-received', orderId)
  showNotification('Đã xác nhận nhận hàng thành công!', 'success', 'mdi-check-circle')
}

const rateOrder = (orderId) => {
  console.log('Rate order:', orderId)
  emit('rate-order', orderId)
  router.push(`/order/${orderId}/review`)
}

const reorder = (orderId) => {
  console.log('Reorder:', orderId)
  emit('reorder', orderId)
  showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success', 'mdi-cart-check')
}

const openChat = () => {
  emit('open-chat')
}

const callHotline = () => {
  window.location.href = 'tel:19001234'
}

const applyFilters = () => {
  showFilterDialog.value = false
  showNotification('Đã áp dụng bộ lọc', 'info', 'mdi-filter-check')
}

const resetFilters = () => {
  filterDateRange.value = 'all'
  filterPriceRange.value = 'all'
  showNotification('Đã đặt lại bộ lọc', 'info', 'mdi-filter-remove')
}

const showNotification = (message, color, icon) => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbarIcon.value = icon
  showSnackbar.value = true
}
</script>

<style scoped>
.order-history-tab {
  width: 100%;
}

/* Header */
.tab-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
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

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-field {
  min-width: 280px;
}

/* Status Tabs */
.status-tabs {
  border-bottom: 1px solid #f4f3f0;
}

.status-tabs :deep(.v-tab) {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0;
}

.status-tabs :deep(.v-tab--selected) {
  font-weight: 700;
}

/* Order Card */
.order-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: #fcfbf9;
  flex-wrap: wrap;
}

.order-info {
  flex: 1;
  min-width: 200px;
}

.order-number-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.order-number {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
}

.order-date {
  font-size: 14px;
  color: #897961;
  margin: 0;
}

.order-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.order-total {
  text-align: right;
}

.total-label {
  font-size: 11px;
  color: #897961;
  text-transform: uppercase;
  margin-bottom: 4px;
  font-weight: 600;
}

.total-amount {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
  margin: 0;
}

/* Order Items */
.order-items {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-item {
  display: flex;
  gap: 16px;
  transition: opacity 0.3s;
}

.item-image {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  border: 1px solid #e6e1db;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 15px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.item-variant {
  font-size: 13px;
  color: #897961;
  margin: 4px 0;
}

.item-quantity {
  font-size: 13px;
  color: #181511;
  margin: 4px 0 0 0;
}

.item-price {
  display: flex;
  align-items: center;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #ee9d2b;
  margin: 0;
}

/* Order Footer */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
  flex-wrap: wrap;
}

.footer-message {
  flex: 1;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.status-message.info {
  color: #5c564b;
}

.status-message.success {
  color: #2e7d32;
  font-weight: 500;
}

.status-message.error {
  color: #d32f2f;
  font-weight: 500;
}

.footer-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Empty State */
.empty-state {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 64px 32px;
  text-align: center;
}

.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: #181511;
  margin: 16px 0 8px 0;
}

.empty-text {
  font-size: 14px;
  color: #897961;
  margin: 0;
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

/* Support Banner */
.support-banner {
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: 16px;
}

.support-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.support-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.support-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin: 0 0 4px 0;
}

.support-text {
  font-size: 14px;
  color: #5c564b;
  margin: 0;
}

.support-actions {
  display: flex;
  gap: 12px;
}

/* Dialog */
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

/* Custom Vuetify overrides */
:deep(.v-text-field .v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

:deep(.v-chip) {
  font-weight: 600;
}

:deep(.v-pagination__item) {
  border-radius: 50%;
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
  .header-content {
    flex-direction: column;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .search-field {
    width: 100%;
  }
  
  .order-header {
    flex-direction: column;
  }
  
  .order-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .order-total {
    text-align: left;
  }
  
  .footer-actions {
    width: 100%;
  }
  
  .footer-actions .v-btn {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .item-image {
    width: 80px;
    height: 80px;
  }
  
  .item-details {
    flex-direction: column;
  }
  
  .item-price {
    align-items: flex-start;
  }
  
  .support-content {
    flex-direction: column;
    text-align: center;
  }
  
  .support-info {
    flex-direction: column;
  }
  
  .support-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .support-actions .v-btn {
    width: 100%;
  }
}
</style>
