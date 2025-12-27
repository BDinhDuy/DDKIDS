<template>
  <div class="wishlist-tab">
    <!-- Header -->
    <div class="tab-header mb-6">
      <div class="header-content">
        <div>
          <h2 class="tab-title">Sản phẩm yêu thích</h2>
          <p class="tab-subtitle">
            Quản lý và theo dõi ({{ wishlistProducts.length }}) sản phẩm bạn đang quan tâm.
          </p>
        </div>
        <v-btn
          v-if="wishlistProducts.length > 0"
          variant="outlined"
          color="red"
          size="large"
          prepend-icon="mdi-delete-sweep"
          @click="confirmClearAll"
        >
          Xóa tất cả
        </v-btn>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="wishlistProducts.length > 0" class="products-grid">
      <v-card
        v-for="product in wishlistProducts"
        :key="product.id"
        class="product-card"
        elevation="0"
        @click="viewProduct(product.id)"
      >
        <!-- Product Image -->
        <div class="product-image-wrapper">
          <v-img
            :src="product.image"
            :alt="product.name"
            aspect-ratio="1.33"
            cover
            class="product-image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>

          <!-- Discount Badge -->
          <v-chip
            v-if="product.discount"
            color="red"
            size="small"
            class="discount-badge"
          >
            -{{ product.discount }}%
          </v-chip>

          <!-- Delete Button -->
          <v-btn
            icon
            size="small"
            variant="flat"
            color="white"
            class="delete-btn"
            @click.stop="confirmRemove(product)"
          >
            <v-icon size="20" color="grey-darken-1">mdi-delete</v-icon>
          </v-btn>

          <!-- Quick View Overlay -->
          <div class="quick-view-overlay">
            <v-btn
              variant="flat"
              color="white"
              size="small"
              @click.stop="quickView(product)"
            >
              Xem nhanh
            </v-btn>
          </div>
        </div>

        <!-- Product Info -->
        <v-card-text class="product-info">
          <h4 class="product-name">{{ product.name }}</h4>

          <!-- Rating -->
          <div class="product-rating">
            <v-rating
              :model-value="product.rating"
              color="yellow-darken-2"
              active-color="yellow-darken-2"
              size="small"
              density="compact"
              half-increments
              readonly
            ></v-rating>
            <span class="rating-text">({{ product.rating }})</span>
          </div>

          <v-divider class="my-3"></v-divider>

          <!-- Price and Add to Cart -->
          <div class="product-footer">
            <div class="price-section">
              <p v-if="product.originalPrice" class="original-price">
                {{ formatCurrency(product.originalPrice) }}
              </p>
              <p class="current-price">{{ formatCurrency(product.price) }}</p>
            </div>
            <v-btn
              color="primary"
              size="small"
              prepend-icon="mdi-cart-plus"
              @click.stop="addToCart(product)"
            >
              Thêm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Empty State -->
    <v-card v-else class="empty-state" elevation="0">
      <v-icon size="80" color="grey-lighten-1">mdi-heart-outline</v-icon>
      <h3 class="empty-title">Chưa có sản phẩm yêu thích</h3>
      <p class="empty-text">
        Hãy thêm những sản phẩm bạn quan tâm vào danh sách yêu thích để dễ dàng theo dõi!
      </p>
      <v-btn color="primary" class="mt-4" to="/">
        Khám phá sản phẩm
      </v-btn>
    </v-card>

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

    <!-- Remove Confirmation Dialog -->
    <v-dialog v-model="showRemoveDialog" max-width="400">
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon color="red" class="mr-2">mdi-heart-broken</v-icon>
          Xóa khỏi yêu thích
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-6">
          <p>Bạn có chắc chắn muốn xóa <strong>{{ productToRemove?.name }}</strong> khỏi danh sách yêu thích?</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="showRemoveDialog = false">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="removeFromWishlist">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Clear All Confirmation Dialog -->
    <v-dialog v-model="showClearAllDialog" max-width="400">
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          Xóa tất cả sản phẩm
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-6">
          <p>Bạn có chắc chắn muốn xóa <strong>tất cả {{ wishlistProducts.length }} sản phẩm</strong> khỏi danh sách yêu thích?</p>
          <p class="text-grey mt-2">Hành động này không thể hoàn tác.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="showClearAllDialog = false">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="clearAllWishlist">Xóa tất cả</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Quick View Dialog -->
    <v-dialog v-model="showQuickView" max-width="800">
      <v-card v-if="selectedProduct">
        <v-card-title class="dialog-title">
          <span>{{ selectedProduct.name }}</span>
          <v-btn icon variant="text" @click="showQuickView = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-6">
          <v-row>
            <v-col cols="12" md="6">
              <v-img
                :src="selectedProduct.image"
                :alt="selectedProduct.name"
                aspect-ratio="1"
                cover
                class="rounded-lg"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <div class="quick-view-info">
                <h3 class="text-h5 mb-4">{{ selectedProduct.name }}</h3>
                
                <div class="d-flex align-center mb-4">
                  <v-rating
                    :model-value="selectedProduct.rating"
                    color="yellow-darken-2"
                    size="small"
                    half-increments
                    readonly
                  ></v-rating>
                  <span class="ml-2">({{ selectedProduct.rating }})</span>
                </div>

                <div class="mb-4">
                  <p v-if="selectedProduct.originalPrice" class="text-decoration-line-through text-grey">
                    {{ formatCurrency(selectedProduct.originalPrice) }}
                  </p>
                  <p class="text-h4 text-primary font-weight-bold">
                    {{ formatCurrency(selectedProduct.price) }}
                  </p>
                </div>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  prepend-icon="mdi-cart-plus"
                  @click="addToCart(selectedProduct)"
                >
                  Thêm vào giỏ hàng
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
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
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Props
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['update:products', 'remove-product', 'clear-all', 'open-chat'])

// Refs
const showRemoveDialog = ref(false)
const showClearAllDialog = ref(false)
const showQuickView = ref(false)
const productToRemove = ref(null)
const selectedProduct = ref(null)

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle')

// Sample wishlist data
const wishlistData = ref([
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
  },
  {
    id: 4,
    name: 'Bộ xếp hình 1000 mảnh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3AOZZxYwWYwAI4rDV-DMiEK8uPvklwdVuybPgP2hVCtW0KGiHjLAxXkcNYD56UI7bnHnHtfRgJTe-TGkQrLIuF6duhXyCpySN2o7jmbWcy3RQgW6y_EisAKoG9i4yfn6-ZHR3sUf4UZZpgcuh_c_r170XiToWGSB1yNNbXxafaRcfhzEhfza7HUmOitIofCdTbct-qd2T9PGz2sQTC62vhP6vettqohJCoRJUAXlizoSv24t8Y9WopEpB4gDkUpF9KSUQxzcsunTO',
    rating: 5.0,
    price: 250000,
    originalPrice: null,
    discount: null
  },
  {
    id: 5,
    name: 'Búp bê công chúa Elsa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajBJ5JGIPjK8JWMOM5o0yW2zGEY5JWKwIcthxt60KUFMrk9OMIVOoiaFyKkgeJCCCHL6Gc6li9EXBiTiSQaZHtR3RCi7TjqQ-DRl6tTOhbbbVfFPRYXH4sJeD8aLN0yfybNFcp-70HF6T2QuVBg9V7WL0o9QVcZ04aL-RH_gOvYteeL8T4kUd9pM6vySnqVWxaZgUPa4uaX5LXyksogrv6MOl6snP2JHaE2hWzpdJS4PXZW_1K60gnvTX_LPqMknl5yzhevwR3Tw',
    rating: 4.5,
    price: 450000,
    originalPrice: null,
    discount: null
  }
])

// Computed
const wishlistProducts = computed(() => {
  return props.products.length > 0 ? props.products : wishlistData.value
})

// Methods
const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + 'đ'
}

const confirmRemove = (product) => {
  productToRemove.value = product
  showRemoveDialog.value = true
}

const removeFromWishlist = () => {
  const index = wishlistData.value.findIndex(p => p.id === productToRemove.value.id)
  if (index > -1) {
    const productName = wishlistData.value[index].name
    wishlistData.value.splice(index, 1)
    
    emit('remove-product', productToRemove.value.id)
    emit('update:products', wishlistData.value)
    
    showNotification(`Đã xóa "${productName}" khỏi danh sách yêu thích`, 'info', 'mdi-heart-broken')
  }
  
  showRemoveDialog.value = false
  productToRemove.value = null
}

const confirmClearAll = () => {
  showClearAllDialog.value = true
}

const clearAllWishlist = () => {
  wishlistData.value = []
  
  emit('clear-all')
  emit('update:products', [])
  
  showNotification('Đã xóa tất cả sản phẩm khỏi danh sách yêu thích', 'info', 'mdi-delete-sweep')
  showClearAllDialog.value = false
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success', 'mdi-cart-check')
}

const viewProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const quickView = (product) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const openChat = () => {
  emit('open-chat')
}

const callHotline = () => {
  window.location.href = 'tel:19001234'
}

const showNotification = (message, color, icon) => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbarIcon.value = icon
  showSnackbar.value = true
}
</script>

<style scoped>
.wishlist-tab {
  width: 100%;
}

/* Header */
.tab-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 1px solid #f4f3f0;
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

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Product Card */
.product-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.product-image-wrapper {
  position: relative;
  background-color: #f8f7f6;
  overflow: hidden;
}

.product-image {
  transition: transform 0.5s;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  font-weight: 700;
}

.delete-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.delete-btn:hover {
  background-color: #ffebee !important;
}

.delete-btn:hover :deep(.v-icon) {
  color: #d32f2f !important;
}

.quick-view-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .quick-view-overlay {
  opacity: 1;
}

.product-info {
  padding: 16px !important;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
  line-height: 1.3;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.rating-text {
  font-size: 12px;
  color: #897961;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin: 0;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #ee9d2b;
  margin: 0;
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
  max-width: 400px;
  margin: 0 auto;
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

.quick-view-info {
  padding: 16px;
}

/* Custom Vuetify overrides */
:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

:deep(.v-chip) {
  font-weight: 700;
}

:deep(.v-rating .v-icon) {
  padding: 0 1px;
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
    align-items: stretch;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
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
