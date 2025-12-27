<template>
  <v-container fluid class="pa-0" style="background-color: #f8f7f6;">
    <v-container class="py-5 py-lg-10 px-4 px-md-8 px-lg-16" style="max-width: 1280px;">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 pb-6">
        <template v-slot:divider>
          <v-icon size="small">mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :href="item.href"
            :disabled="item.disabled"
            class="text-body-2"
            :class="item.disabled ? 'text-grey-darken-4 font-weight-medium' : 'text-grey'"
          >
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <!-- Product Detail -->
      <v-row>
        <!-- Left: Images -->
        <v-col cols="12" lg="7">
          <!-- Main Image -->
          <v-card class="rounded-xl mb-4" elevation="0" style="border: 1px solid #f4f3f0;">
            <div class="position-relative">
              <v-img
                :src="selectedImage"
                aspect-ratio="1"
                cover
                class="rounded-xl"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-chip
                color="red"
                text-color="white"
                class="position-absolute"
                style="top: 16px; left: 16px;"
                size="small"
              >
                -20%
              </v-chip>
            </div>
          </v-card>

          <!-- Thumbnails -->
          <v-row dense>
            <v-col
              v-for="(image, index) in product.images"
              :key="index"
              cols="3"
              sm="2"
            >
              <v-card
                class="rounded-lg cursor-pointer"
                :class="selectedImage === image ? 'border-primary' : ''"
                :style="{ border: selectedImage === image ? '2px solid #ee9d2b' : '1px solid #e6e1db' }"
                @click="selectedImage = image"
                elevation="0"
              >
                <v-img :src="image" aspect-ratio="1" cover></v-img>
              </v-card>
            </v-col>
            <!-- Video thumbnail -->
            <v-col cols="3" sm="2" class="d-none d-sm-flex">
              <v-card
                class="rounded-lg d-flex align-center justify-center"
                elevation="0"
                style="background-color: rgba(238, 157, 43, 0.1); border: 1px solid #e6e1db;"
              >
                <v-icon size="40" color="primary">mdi-play-circle</v-icon>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right: Product Info -->
        <v-col cols="12" lg="5">
          <!-- Category & Rating -->
          <div class="d-flex align-center mb-3" style="gap: 12px;">
            <v-chip color="blue-lighten-4" size="small" variant="outlined">
              Đồ chơi STEM
            </v-chip>
            <div class="d-flex align-center" style="gap: 4px;">
              <v-icon color="primary" size="small">mdi-star</v-icon>
              <span class="font-weight-bold text-body-2">{{ product.rating }}</span>
              <span class="text-caption text-grey">({{ product.reviews }} đánh giá)</span>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-h4 text-lg-h3 font-weight-black mb-2">
            {{ product.name }}
          </h1>

          <!-- SKU & Brand -->
          <p class="text-body-2 text-grey mb-6">
            Mã SP: {{ product.sku }} | Thương hiệu: 
            <span class="text-primary font-weight-medium">{{ product.brand }}</span>
          </p>

          <!-- Price & Features Card -->
          <v-card class="rounded-xl mb-6" elevation="0" style="border: 1px solid #f4f3f0;">
            <v-card-text class="pa-6">
              <!-- Price -->
              <div class="d-flex align-center mb-4" style="gap: 12px;">
                <span class="text-h4 font-weight-black" style="color: #ee9d2b;">
                  {{ formatPrice(product.price) }}
                </span>
                <span class="text-h6 text-grey text-decoration-line-through">
                  {{ formatPrice(product.oldPrice) }}
                </span>
              </div>

              <!-- Features -->
              <div class="d-flex flex-wrap mb-6" style="gap: 12px;">
                <v-chip size="small" style="background-color: #f4f3f0;">
                  <v-icon start color="success" size="small">mdi-shield-check</v-icon>
                  An toàn cho bé
                </v-chip>
                <v-chip size="small" style="background-color: #f4f3f0;">
                  <v-icon start color="blue" size="small">mdi-recycle</v-icon>
                  Nhựa ABS
                </v-chip>
                <v-chip size="small" style="background-color: #f4f3f0;">
                  <v-icon start color="orange" size="small">mdi-truck-fast</v-icon>
                  Ship 2h HCM
                </v-chip>
              </div>

              <!-- Quantity & Stock -->
              <div class="d-flex align-center mb-4" style="gap: 16px;">
                <div class="d-flex align-center rounded-lg" style="border: 1px solid #e6e1db; height: 48px;">
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="px-4 font-weight-bold">{{ quantity }}</span>
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    @click="increaseQuantity"
                    :disabled="quantity >= product.stock"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <span class="text-body-2 text-grey">
                  Còn {{ product.stock }} sản phẩm
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex" style="gap: 12px;">
                <v-btn
                  color="#ee9d2b"
                  size="large"
                  class="flex-1 text-none font-weight-bold"
                  elevation="2"
                  @click="addToCart"
                >
                  <v-icon start>mdi-cart-plus</v-icon>
                  Thêm vào giỏ
                </v-btn>
                <v-btn
                  color="#ee9d2b"
                  size="large"
                  variant="outlined"
                  class="flex-1 text-none font-weight-bold"
                  @click="buyNow"
                >
                  Mua ngay
                </v-btn>
                <v-btn
                  :color="isFavorite ? 'pink-darken-1' : 'grey-lighten-2'"
                  size="large"
                  icon
                  elevation="2"
                  @click="toggleFavorite"
                >
                  <v-icon :color="isFavorite ? 'white' : 'grey-darken-1'">
                    {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <!-- Why Kids Love It -->
          <v-card class="rounded-xl" elevation="0" style="background-color: rgba(238, 157, 43, 0.05); border: 1px solid rgba(238, 157, 43, 0.1);">
            <v-card-text class="pa-4">
              <h3 class="font-weight-bold mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
                Tại sao bé sẽ thích?
              </h3>
              <ul class="text-body-2" style="color: #897961; list-style-position: inside;">
                <li v-for="(feature, index) in product.highlights" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Customer Reviews Section -->
      <v-row class="mt-8">
        <v-col cols="12">
          <v-card class="rounded-xl" elevation="0" style="border: 1px solid #f4f3f0;">
            <v-card-text class="pa-6">
              <div class="d-flex justify-space-between align-center mb-6">
                <h2 class="text-h5 font-weight-bold">Đánh giá từ khách hàng</h2>
                <v-btn color="#ee9d2b" variant="outlined" class="text-none" size="small">
                  Viết đánh giá
                </v-btn>
              </div>

              <!-- Rating Summary -->
              <div class="d-flex flex-column flex-md-row mb-6 pa-4 rounded-lg" style="background-color: #f8f7f6; gap: 32px;">
                <div class="text-center">
                  <div class="text-h2 font-weight-black" style="color: #ee9d2b;">{{ product.rating }}</div>
                  <v-rating
                    :model-value="product.rating"
                    color="#ee9d2b"
                    active-color="#ee9d2b"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <p class="text-body-2 text-grey mt-1">{{ product.reviews }} đánh giá</p>
                </div>
                
                <v-divider vertical class="d-none d-md-flex"></v-divider>
                
                <div class="flex-1">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="d-flex align-center mb-2" style="gap: 12px;">
                    <span class="text-body-2" style="min-width: 60px;">{{ star }} sao</span>
                    <v-progress-linear
                      :model-value="getStarPercentage(star)"
                      color="#ee9d2b"
                      height="8"
                      rounded
                      class="flex-1"
                    ></v-progress-linear>
                    <span class="text-body-2 text-grey" style="min-width: 40px;">{{ getStarCount(star) }}</span>
                  </div>
                </div>
              </div>

              <!-- Review List -->
              <div>
                <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="review-item py-4"
                  :class="{ 'border-b': review.id !== reviews[reviews.length - 1].id }"
                >
                  <div class="d-flex mb-3" style="gap: 12px;">
                    <v-avatar size="48" color="#f4f3f0">
                      <v-img v-if="review.avatar" :src="review.avatar"></v-img>
                      <span v-else class="text-h6">{{ review.name.charAt(0) }}</span>
                    </v-avatar>
                    <div class="flex-1">
                      <div class="d-flex justify-space-between align-center mb-1">
                        <h4 class="font-weight-bold">{{ review.name }}</h4>
                        <span class="text-caption text-grey">{{ review.date }}</span>
                      </div>
                      <v-rating
                        :model-value="review.rating"
                        color="#ee9d2b"
                        active-color="#ee9d2b"
                        readonly
                        size="x-small"
                        density="compact"
                      ></v-rating>
                    </div>
                  </div>
                  <p class="text-body-2 mb-2">{{ review.comment }}</p>
                  <div v-if="review.images && review.images.length > 0" class="d-flex" style="gap: 8px;">
                    <v-img
                      v-for="(img, idx) in review.images"
                      :key="idx"
                      :src="img"
                      width="80"
                      height="80"
                      cover
                      class="rounded cursor-pointer"
                    ></v-img>
                  </div>
                  <div v-if="review.helpful" class="mt-3">
                    <v-btn variant="text" size="small" class="text-none">
                      <v-icon start size="small">mdi-thumb-up-outline</v-icon>
                      Hữu ích ({{ review.helpful }})
                    </v-btn>
                  </div>
                </div>
              </div>

              <div class="text-center mt-6">
                <v-btn variant="outlined" color="#ee9d2b" class="text-none">
                  Xem thêm đánh giá
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Similar Products Section -->
      <v-row class="mt-8 mb-8">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-4">
            <h2 class="text-h5 font-weight-bold">Sản phẩm tương tự</h2>
            <v-btn variant="text" color="#ee9d2b" class="text-none" @click="() => router.push('/products')">
              Xem tất cả
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </div>

          <v-row>
            <v-col
              v-for="item in similarProducts"
              :key="item.id"
              cols="6"
              sm="4"
              md="3"
            >
              <v-card
                class="product-card rounded-xl"
                elevation="0"
                style="border: 1px solid #f4f3f0;"
                @click="() => router.push(`/product/${item.id}`)"
              >
                <div class="product-image-wrapper position-relative">
                  <v-chip
                    v-if="item.discount"
                    color="red"
                    size="small"
                    class="position-absolute"
                    style="top: 8px; left: 8px; z-index: 2;"
                  >
                    -{{ item.discount }}%
                  </v-chip>
                  <v-btn
                    icon
                    size="small"
                    variant="flat"
                    color="white"
                    class="favorite-btn-similar"
                    @click.stop="toggleSimilarFavorite(item)"
                  >
                    <v-icon :color="isSimilarFavorite(item.id) ? 'red' : 'grey-lighten-1'">
                      {{ isSimilarFavorite(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>
                  <v-img :src="item.image" aspect-ratio="1" cover></v-img>
                </div>
                <v-card-text class="pa-3">
                  <p class="text-caption text-grey mb-1">{{ item.category }}</p>
                  <h4 class="text-body-2 font-weight-bold mb-2" style="line-height: 1.3; min-height: 40px;">
                    {{ item.name }}
                  </h4>
                  <div class="d-flex align-center mb-2" style="gap: 4px;">
                    <v-icon color="#ee9d2b" size="small">mdi-star</v-icon>
                    <span class="text-caption font-weight-bold">{{ item.rating }}</span>
                    <span class="text-caption text-grey">({{ item.reviews }})</span>
                  </div>
                  <div class="d-flex align-center" style="gap: 8px;">
                    <span class="text-h6 font-weight-bold" style="color: #ee9d2b;">
                      {{ formatPrice(item.price) }}
                    </span>
                    <span v-if="item.oldPrice" class="text-caption text-grey text-decoration-line-through">
                      {{ formatPrice(item.oldPrice) }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
      color="success"
      location="top"
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">Đóng</v-btn>
      </template>
    </v-snackbar>

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
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/helpers'

const router = useRouter()
const cartStore = useCartStore()

// State
const quantity = ref(1)
const selectedImage = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuATMrGJXsooJffhZtfrcEchbpFLwOBa4oMKX_t_E8xCjGAGSf1GlZLwY847fx2N1K7ZcGvuUyOJ7XICqwV7IPNDiVzQbkk0tLYiz2GUDu9y7ebx87_Cm4PqmLCC952CfM-5Tk7axF212AZntKmeBfAydKTf8hNsesS1BKle5UqDOZ_AcWmcdthqVjJ3SlLTrH8IcSMempypDiGWuyNgI8BM2hxu-gZJ8wMgpFAVp4WBw5aj_vf6WwJPSMdt02XztMCSJ2OhKW-Ld-ge')
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const isFavorite = ref(false)
const showFavoriteSnackbar = ref(false)
const favoriteMessage = ref('')
const similarFavorites = ref([])

// Breadcrumbs
const breadcrumbs = [
  { title: 'Trang chủ', href: '/', disabled: false },
  { title: 'Đồ chơi', href: '/products', disabled: false },
  { title: 'Đồ chơi giáo dục', href: '/products?category=education', disabled: false },
  { title: 'Robot thông minh MK-II', href: '#', disabled: true }
]

// Product Data
const product = ref({
  id: 1,
  name: 'Bộ Đồ Chơi Lắp Ráp Robot Thông Minh MK-II',
  sku: 'RB-MK2-2023',
  brand: 'FutureToys',
  price: 599000,
  oldPrice: 750000,
  rating: 4.8,
  reviews: 128,
  stock: 24,
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATMrGJXsooJffhZtfrcEchbpFLwOBa4oMKX_t_E8xCjGAGSf1GlZLwY847fx2N1K7ZcGvuUyOJ7XICqwV7IPNDiVzQbkk0tLYiz2GUDu9y7ebx87_Cm4PqmLCC952CfM-5Tk7axF212AZntKmeBfAydKTf8hNsesS1BKle5UqDOZ_AcWmcdthqVjJ3SlLTrH8IcSMempypDiGWuyNgI8BM2hxu-gZJ8wMgpFAVp4WBw5aj_vf6WwJPSMdt02XztMCSJ2OhKW-Ld-ge',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHad52uKWunOOsghWZDjiVfPG1tn_yZWUdF6OaGx3-I7MEDgGfVFSBqggcJMUERfbRNgtYUvLwH3QjO9sUrYdwjq5f92GzPIsLG_hdpvRlVepoLQ8Nxk5ryrhnJUvaTCQ8veKB2uqxQdoVZQ-To5geESfCLEWNqIuYszNfFqjUGWFLE4uA4Jn4zUf7_m5uJ3wo-NTMQwX-YXTzHOx131VFW3bPbipGyFjUEqc85D6hPft80HfJJ_itXBueeE4P4o24n19kyps_Y4s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBLTo1EVsPI-e3xNOnCaltDDp_NfKVRTTRlOUXoZbeAc5EAKcUxVHyunFC0xA72RUCVCubcrXtmv3KkF0f4ziws-Sp5eFp2s5lKyFhnBMcAfsAFzw1_sKUIEhTs6QaTqQcya3krjZkpVyxPA1-iKRrp9iRZq-wcAj2ZG4AK6KD8_u38mpyJz9Sm2QfryWsi0NLiSO-INaU7zW-Y0aQ0aSRDaihUWMybwZMjZHLbtrcGatd97-25U08gKGe1DNyDu1mKif-kxhGr9Um_',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDbVPekpC4vmO-lXYn1UISnxmML6VwT4rDygS2CVuyvcO5TfEW85V1Gf5Pz-PcWCe-4vDyeR2rqdHDvDsM-LztIroV3h9eW3j5VaiQ3lCutz8zoXwSMukK_NMnRlzJ26iT43sZXMXivb-lw2T3FFY1g2CFLu4wmyuL_dQ-FGOg97_pSnVL9dOuALFvpQ-NGtBWBbvEfFCpIOFcUNCxWmxgl9ITa9vlCtZ9pIy3uT7PgigUPXssLpCorvP7URHxiZdg4YjUtTFKYGXEl'
  ],
  highlights: [
    'Lắp ráp sáng tạo với 150+ mảnh ghép.',
    'Điều khiển từ xa qua ứng dụng điện thoại.',
    'Phát triển tư duy logic và kỹ năng giải quyết vấn đề.',
    'Có đèn LED và âm thanh sống động.'
  ]
})

// Reviews Data
const reviews = ref([
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    avatar: '',
    rating: 5,
    date: '15/12/2024',
    comment: 'Sản phẩm rất tuyệt vời! Con tôi rất thích chơi với robot này. Chất lượng tốt, đóng gói cẩn thận. Shop giao hàng nhanh, sẽ ủng hộ thêm.',
    images: [],
    helpful: 24
  },
  {
    id: 2,
    name: 'Trần Văn Hùng',
    avatar: '',
    rating: 4,
    date: '10/12/2024',
    comment: 'Robot đẹp, lắp ráp dễ dàng. Bé 6 tuổi tự lắp được với một chút hướng dẫn. Âm thanh và đèn LED rất bắt mắt. Giá hơi cao nhưng xứng đáng.',
    images: [],
    helpful: 18
  },
  {
    id: 3,
    name: 'Lê Thị Hoa',
    avatar: '',
    rating: 5,
    date: '05/12/2024',
    comment: 'Mua làm quà sinh nhật cho con, bé rất hài lòng. Sản phẩm an toàn, không có mùi lạ. Điều khiển qua app rất tiện lợi. Recommend!',
    images: [],
    helpful: 32
  }
])

// Similar Products Data
const similarProducts = ref([
  {
    id: 2,
    name: 'Bộ Lắp Ráp Xe Đua Thông Minh',
    category: 'Đồ chơi STEM',
    price: 450000,
    oldPrice: 550000,
    rating: 4.7,
    reviews: 89,
    discount: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATMrGJXsooJffhZtfrcEchbpFLwOBa4oMKX_t_E8xCjGAGSf1GlZLwY847fx2N1K7ZcGvuUyOJ7XICqwV7IPNDiVzQbkk0tLYiz2GUDu9y7ebx87_Cm4PqmLCC952CfM-5Tk7axF212AZntKmeBfAydKTf8hNsesS1BKle5UqDOZ_AcWmcdthqVjJ3SlLTrH8IcSMempypDiGWuyNgI8BM2hxu-gZJ8wMgpFAVp4WBw5aj_vf6WwJPSMdt02XztMCSJ2OhKW-Ld-ge'
  },
  {
    id: 3,
    name: 'Robot Khủng Long Biến Hình',
    category: 'Đồ chơi STEM',
    price: 699000,
    oldPrice: 850000,
    rating: 4.9,
    reviews: 156,
    discount: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHad52uKWunOOsghWZDjiVfPG1tn_yZWUdF6OaGx3-I7MEDgGfVFSBqggcJMUERfbRNgtYUvLwH3QjO9sUrYdwjq5f92GzPIsLG_hdpvRlVepoLQ8Nxk5ryrhnJUvaTCQ8veKB2uqxQdoVZQ-To5geESfCLEWNqIuYszNfFqjUGWFLE4uA4Jn4zUf7_m5uJ3wo-NTMQwX-YXTzHOx131VFW3bPbipGyFjUEqc85D6hPft80HfJJ_itXBueeE4P4o24n19kyps_Y4s'
  },
  {
    id: 4,
    name: 'Bộ Khoa Học Mini Lab',
    category: 'Đồ chơi STEM',
    price: 399000,
    oldPrice: 499000,
    rating: 4.6,
    reviews: 73,
    discount: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLTo1EVsPI-e3xNOnCaltDDp_NfKVRTTRlOUXoZbeAc5EAKcUxVHyunFC0xA72RUCVCubcrXtmv3KkF0f4ziws-Sp5eFp2s5lKyFhnBMcAfsAFzw1_sKUIEhTs6QaTqQcya3krjZkpVyxPA1-iKRrp9iRZq-wcAj2ZG4AK6KD8_u38mpyJz9Sm2QfryWsi0NLiSO-INaU7zW-Y0aQ0aSRDaihUWMybwZMjZHLbtrcGatd97-25U08gKGe1DNyDu1mKif-kxhGr9Um_'
  },
  {
    id: 5,
    name: 'Máy Bay Điều Khiển Từ Xa',
    category: 'Đồ chơi điều khiển',
    price: 550000,
    oldPrice: null,
    rating: 4.5,
    reviews: 45,
    discount: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbVPekpC4vmO-lXYn1UISnxmML6VwT4rDygS2CVuyvcO5TfEW85V1Gf5Pz-PcWCe-4vDyeR2rqdHDvDsM-LztIroV3h9eW3j5VaiQ3lCutz8zoXwSMukK_NMnRlzJ26iT43sZXMXivb-lw2T3FFY1g2CFLu4wmyuL_dQ-FGOg97_pSnVL9dOuALFvpQ-NGtBWBbvEfFCpIOFcUNCxWmxgl9ITa9vlCtZ9pIy3uT7PgigUPXssLpCorvP7URHxiZdg4YjUtTFKYGXEl'
  }
])

// Rating distribution for reviews
const ratingDistribution = {
  5: 89,
  4: 28,
  3: 8,
  2: 2,
  1: 1
}

const getStarPercentage = (star) => {
  return (ratingDistribution[star] / product.value.reviews) * 100
}

const getStarCount = (star) => {
  return ratingDistribution[star]
}

// Methods
const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  const item = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0],
    quantity: quantity.value
  }
  
  cartStore.addToCart(item)
  snackbarMessage.value = `Đã thêm ${quantity.value} sản phẩm vào giỏ hàng`
  showSnackbar.value = true
}

const buyNow = () => {
  addToCart()
  router.push('/checkout')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  if (isFavorite.value) {
    favoriteMessage.value = `Đã thêm "${product.value.name}" vào danh sách yêu thích`
  } else {
    favoriteMessage.value = 'Đã xóa khỏi danh sách yêu thích'
  }
  showFavoriteSnackbar.value = true
}

const isSimilarFavorite = (productId) => {
  return similarFavorites.value.includes(productId)
}

const toggleSimilarFavorite = (product) => {
  const index = similarFavorites.value.indexOf(product.id)
  if (index > -1) {
    similarFavorites.value.splice(index, 1)
    favoriteMessage.value = 'Đã xóa khỏi danh sách yêu thích'
  } else {
    similarFavorites.value.push(product.id)
    favoriteMessage.value = `Đã thêm "${product.name}" vào danh sách yêu thích`
  }
  showFavoriteSnackbar.value = true
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.border-primary {
  border-color: #ee9d2b !important;
}

.review-item {
  border-bottom: 1px solid #f4f3f0;
}

.review-item:last-child {
  border-bottom: none !important;
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

.favorite-btn-similar {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}
</style>