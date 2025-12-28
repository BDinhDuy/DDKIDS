<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold mb-6">Giỏ hàng của bạn</h1>

    <v-row v-if="cartStore.cartCount > 0">
      <!-- Danh sách sản phẩm -->
      <v-col cols="12" md="8">
        <v-card flat border rounded="lg">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Sản phẩm</th>
                <th class="text-center">Số lượng</th>
                <th class="text-right">Đơn giá</th>
                <th class="text-right">Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.cartItems" :key="item.id">
                <td class="py-4">
                  <div class="d-flex align-center">
                    <v-img :src="item.image" width="70" height="70" cover class="rounded mr-4"></v-img>
                    <div>
                      <div class="font-weight-bold mb-1">{{ item.name }}</div>
                      <v-btn variant="text" size="x-small" color="error" class="px-0 text-none" @click="cartStore.removeFromCart(item.id)">
                        Xóa khỏi giỏ
                      </v-btn>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex align-center justify-center">
                    <v-btn 
                      icon="mdi-minus" 
                      size="x-small" 
                      variant="outlined" 
                      @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                    ></v-btn>
                    <span class="mx-3">{{ item.quantity }}</span>
                    <v-btn 
                      icon="mdi-plus" 
                      size="x-small" 
                      variant="outlined" 
                      @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                    ></v-btn>
                  </div>
                </td>
                <td class="text-right">{{ item.price.toLocaleString() }}đ</td>
                <td class="text-right font-weight-bold">{{ (item.price * item.quantity).toLocaleString() }}đ</td>
                <td class="text-right">
                  <v-btn icon="mdi-close" variant="text" size="small" color="grey" @click="cartStore.removeFromCart(item.id)"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Tóm tắt đơn hàng -->
      <v-col cols="12" md="4">
        <v-card flat border rounded="lg" class="pa-6 sticky-sidebar">
          <div class="text-h6 font-weight-bold mb-4">Tóm tắt đơn hàng</div>
          
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey-darken-1">Tạm tính:</span>
            <span>{{ cartStore.totalAmount.toLocaleString() }}đ</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey-darken-1">Phí vận chuyển:</span>
            <span class="text-success">Miễn phí</span>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6 font-weight-bold">Tổng cộng:</span>
            <span class="text-h6 font-weight-bold text-error">{{ cartStore.totalAmount.toLocaleString() }}đ</span>
          </div>

          <v-btn
            color="#ffa500"
            size="large"
            block
            flat
            class="text-none font-weight-bold"
            @click="router.push('/checkout')"
          >
            TIẾN HÀNH THANH TOÁN
          </v-btn>
          
          <v-btn
            variant="text"
            block
            class="text-none mt-2"
            color="grey-darken-1"
            @click="router.push('/product')"
          >
            Tiếp tục mua sắm
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sản phẩm có thể bé sẽ thích -->
    <v-row v-if="cartStore.cartCount > 0" class="mt-8">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h5 font-weight-bold">Có thể bé sẽ thích</h2>
          <v-btn variant="text" color="#ee9d2b" class="text-none" @click="router.push('/products')">
            Xem tất cả
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <v-row>
          <v-col
            v-for="product in recommendedProducts"
            :key="product.id"
            cols="6"
            sm="4"
            md="3"
          >
            <v-card
              class="product-card rounded-xl"
              elevation="0"
              style="border: 1px solid #f4f3f0;"
              @click="() => router.push(`/product/${product.id}`)"
            >
              <div class="product-image-wrapper position-relative">
                <v-chip
                  v-if="product.discount"
                  color="red"
                  size="small"
                  class="position-absolute"
                  style="top: 8px; left: 8px; z-index: 2;"
                >
                  -{{ product.discount }}%
                </v-chip>
                <v-btn
                  icon
                  size="small"
                  variant="flat"
                  color="white"
                  class="favorite-btn"
                  @click.stop="toggleFavorite(product)"
                >
                  <v-icon :color="isFavorite(product.id) ? 'red' : 'grey-lighten-1'">
                    {{ isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
                <v-img :src="product.image" aspect-ratio="1" cover></v-img>
              </div>
              <v-card-text class="pa-3">
                <p class="text-caption text-grey mb-1">{{ product.category }}</p>
                <h4 class="text-body-2 font-weight-bold mb-2" style="line-height: 1.3; min-height: 40px;">
                  {{ product.name }}
                </h4>
                <div class="d-flex align-center mb-2" style="gap: 4px;">
                  <v-icon color="#ee9d2b" size="small">mdi-star</v-icon>
                  <span class="text-caption font-weight-bold">{{ product.rating }}</span>
                  <span class="text-caption text-grey">({{ product.reviews }})</span>
                </div>
                <div class="d-flex align-center" style="gap: 8px;">
                  <span class="text-h6 font-weight-bold" style="color: #ee9d2b;">
                    {{ product.price.toLocaleString() }}đ
                  </span>
                  <span v-if="product.oldPrice" class="text-caption text-grey text-decoration-line-through">
                    {{ product.oldPrice.toLocaleString() }}đ
                  </span>
                </div>
                <v-btn
                  color="#ee9d2b"
                  variant="flat"
                  size="small"
                  block
                  class="text-none mt-2"
                  @click.stop="addToCart(product)"
                >
                  <v-icon start size="small">mdi-cart-plus</v-icon>
                  Thêm vào giỏ
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Giỏ hàng trống -->
    <v-card v-else flat border rounded="lg" class="pa-12 text-center">
      <v-icon size="100" color="grey-lighten-2" class="mb-4">mdi-cart-off</v-icon>
      <div class="text-h5 text-grey-darken-1 mb-6">Giỏ hàng của bạn đang trống</div>
      <v-btn color="#2d7a5e" size="large" @click="router.push('/')">
        QUAY LẠI CỬA HÀNG
      </v-btn>
    </v-card>

    <!-- Favorite Snackbar -->
    <v-snackbar
      v-model="showFavoriteSnackbar"
      :timeout="3000"
      color="pink-darken-1"
      location="top"
    >
      <v-icon start>mdi-heart</v-icon>
      {{ favoriteMessage }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="showFavoriteSnackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// Favorite state
const favorites = ref([])
const showFavoriteSnackbar = ref(false)
const favoriteMessage = ref('')

// Recommended products data
const recommendedProducts = ref([
  {
    id: 10,
    name: 'Bộ Lắp Ráp Robot Thông Minh',
    category: 'Đồ chơi STEM',
    price: 599000,
    oldPrice: 750000,
    rating: 4.8,
    reviews: 128,
    discount: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATMrGJXsooJffhZtfrcEchbpFLwOBa4oMKX_t_E8xCjGAGSf1GlZLwY847fx2N1K7ZcGvuUyOJ7XICqwV7IPNDiVzQbkk0tLYiz2GUDu9y7ebx87_Cm4PqmLCC952CfM-5Tk7axF212AZntKmeBfAydKTf8hNsesS1BKle5UqDOZ_AcWmcdthqVjJ3SlLTrH8IcSMempypDiGWuyNgI8BM2hxu-gZJ8wMgpFAVp4WBw5aj_vf6WwJPSMdt02XztMCSJ2OhKW-Ld-ge'
  },
  {
    id: 11,
    name: 'Bộ Lắp Ráp Xe Đua Thông Minh',
    category: 'Đồ chơi STEM',
    price: 450000,
    oldPrice: 550000,
    rating: 4.7,
    reviews: 89,
    discount: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHad52uKWunOOsghWZDjiVfPG1tn_yZWUdF6OaGx3-I7MEDgGfVFSBqggcJMUERfbRNgtYUvLwH3QjO9sUrYdwjq5f92GzPIsLG_hdpvRlVepoLQ8Nxk5ryrhnJUvaTCQ8veKB2uqxQdoVZQ-To5geESfCLEWNqIuYszNfFqjUGWFLE4uA4Jn4zUf7_m5uJ3wo-NTMQwX-YXTzHOx131VFW3bPbipGyFjUEqc85D6hPft80HfJJ_itXBueeE4P4o24n19kyps_Y4s'
  },
  {
    id: 12,
    name: 'Robot Khủng Long Biến Hình',
    category: 'Đồ chơi STEM',
    price: 699000,
    oldPrice: 850000,
    rating: 4.9,
    reviews: 156,
    discount: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLTo1EVsPI-e3xNOnCaltDDp_NfKVRTTRlOUXoZbeAc5EAKcUxVHyunFC0xA72RUCVCubcrXtmv3KkF0f4ziws-Sp5eFp2s5lKyFhnBMcAfsAFzw1_sKUIEhTs6QaTqQcya3krjZkpVyxPA1-iKRrp9iRZq-wcAj2ZG4AK6KD8_u38mpyJz9Sm2QfryWsi0NLiSO-INaU7zW-Y0aQ0aSRDaihUWMybwZMjZHLbtrcGatd97-25U08gKGe1DNyDu1mKif-kxhGr9Um_'
  },
  {
    id: 13,
    name: 'Bộ Khoa Học Mini Lab',
    category: 'Đồ chơi STEM',
    price: 399000,
    oldPrice: 499000,
    rating: 4.6,
    reviews: 73,
    discount: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbVPekpC4vmO-lXYn1UISnxmML6VwT4rDygS2CVuyvcO5TfEW85V1Gf5Pz-PcWCe-4vDyeR2rqdHDvDsM-LztIroV3h9eW3j5VaiQ3lCutz8zoXwSMukK_NMnRlzJ26iT43sZXMXivb-lw2T3FFY1g2CFLu4wmyuL_dQ-FGOg97_pSnVL9dOuALFvpQ-NGtBWBbvEfFCpIOFcUNCxWmxgl9ITa9vlCtZ9pIy3uT7PgigUPXssLpCorvP7URHxiZdg4YjUtTFKYGXEl'
  }
])

const addToCart = (product) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  })
}

const isFavorite = (productId) => {
  return favorites.value.includes(productId)
}

const toggleFavorite = (product) => {
  const index = favorites.value.indexOf(product.id)
  if (index > -1) {
    favorites.value.splice(index, 1)
    favoriteMessage.value = 'Đã xóa khỏi danh sách yêu thích'
  } else {
    favorites.value.push(product.id)
    favoriteMessage.value = `Đã thêm "${product.name}" vào danh sách yêu thích`
  }
  showFavoriteSnackbar.value = true
}
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 100px;
}

.product-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
}

.product-image-wrapper {
  background-color: #f8f7f6;
  overflow: hidden;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}
</style>