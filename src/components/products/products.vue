<template>
  <div class="product-page">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="breadcrumbs" class="px-4 px-md-10 px-lg-16 py-3">
      <template v-slot:divider>
        <v-icon size="small">mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-container fluid class="px-4 px-md-10 px-lg-16">
      <!-- Page Header -->
      <div class="d-flex flex-wrap justify-space-between align-end ga-3 mb-6">
        <div>
          <h1 class="text-h3 text-md-h2 font-weight-black mb-2">Danh sách Sản phẩm</h1>
          <p class="text-body-1 text-grey-darken-1">
            Hơn 500+ món đồ chơi an toàn, sáng tạo dành cho bé yêu của bạn.
          </p>
        </div>
        <!-- Mobile Filter Button -->
        <v-btn class="d-lg-none" variant="outlined" prepend-icon="mdi-filter-variant" @click="showMobileFilters = true">
          Bộ lọc
        </v-btn>
      </div>

      <v-row>
        <!-- Sidebar Filters -->
        <v-col cols="12" lg="3" class="d-none d-lg-block">
          <v-sheet class="pa-4 rounded-lg" elevation="0">
            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Danh mục</h3>
              <v-checkbox
                v-for="category in categories"
                :key="category.value"
                v-model="selectedCategories"
                :label="category.label"
                :value="category.value"
                color="#ee9d2b"
                density="compact"
                hide-details
                class="mb-1"
              ></v-checkbox>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Price Filter -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Khoảng giá</h3>
              <v-range-slider
                v-model="priceRange"
                :min="0"
                :max="1000000"
                :step="50000"
                color="#ee9d2b"
                track-color="grey-lighten-2"
                thumb-label
                class="mb-4"
              >
                <template v-slot:thumb-label="{ modelValue }">
                  {{ formatPrice(modelValue) }}
                </template>
              </v-range-slider>
              <div class="d-flex ga-2">
                <v-text-field
                  v-model="priceRange[0]"
                  label="Từ"
                  variant="outlined"
                  density="compact"
                  hide-details
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model="priceRange[1]"
                  label="Đến"
                  variant="outlined"
                  density="compact"
                  hide-details
                  type="number"
                ></v-text-field>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Age Filter -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Độ tuổi</h3>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="age in ageRanges"
                  :key="age"
                  :variant="selectedAge === age ? 'flat' : 'outlined'"
                  :color="selectedAge === age ? '#ee9d2b' : 'default'"
                  @click="selectedAge = selectedAge === age ? null : age"
                  size="small"
                >
                  {{ age }}
                </v-chip>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" lg="9">
          <!-- Toolbar -->
          <v-sheet class="pa-3 mb-6 rounded-lg d-flex flex-column flex-sm-row justify-space-between align-center ga-4" elevation="1">
            <p class="text-body-2">
              Hiển thị <span class="font-weight-bold">1-{{ products.length }}</span> trong 
              <span class="font-weight-bold">56</span> sản phẩm
            </p>
            <div class="d-flex align-center ga-2">
              <span class="text-body-2 text-grey-darken-1">Sắp xếp:</span>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                variant="outlined"
                density="compact"
                hide-details
                style="min-width: 180px"
              ></v-select>
            </div>
          </v-sheet>

          <!-- Products Grid -->
          <v-row>
            <v-col
              v-for="product in products"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="product-card" elevation="1" hover @click="goToDetail(product.id)">
                <div class="product-image-wrapper">
                  <v-img
                    :src="product.image"
                    :alt="product.name"
                    aspect-ratio="1"
                    cover
                    class="product-image"
                  ></v-img>
                  
                  <!-- Badge -->
                  <v-chip
                    v-if="product.badge"
                    :color="product.badgeColor"
                    size="small"
                    class="product-badge"
                  >
                    {{ product.badge }}
                  </v-chip>

                  <!-- Favorite Button -->
                  <v-btn
                    icon
                    size="small"
                    color="white"
                    class="favorite-btn"
                    elevation="2"
                    @click.stop="toggleFavorite(product)"
                  >
                    <v-icon :color="isFavorite(product.id) ? 'red' : 'grey-lighten-1'">
                      {{ isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>

                  <!-- Add to Cart Button -->
                  <v-btn
                    icon
                    size="small"
                    color="white"
                    class="add-to-cart-btn"
                    elevation="2"
                    @click.stop="addToCart(product)"
                  >
                    <v-icon color="#ee9d2b">mdi-cart-plus</v-icon>
                  </v-btn>
                </div>

                <v-card-text class="pa-4">
                  <!-- Rating -->
                  <div class="d-flex align-center mb-2">
                    <v-rating
                      :model-value="product.rating"
                      color="#ee9d2b"
                      active-color="#ee9d2b"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <span class="text-caption text-grey-darken-1 ml-1">({{ product.reviews }})</span>
                  </div>

                  <!-- Product Name -->
                  <h3 class="text-subtitle-1 font-weight-bold mb-2 product-name">
                    {{ product.name }}
                  </h3>

                  <!-- Price -->
                  <div class="d-flex align-center justify-space-between">
                    <span class="text-h6 font-weight-black" style="color: #ee9d2b">
                      {{ formatPrice(product.price) }}đ
                    </span>
                    <span v-if="product.oldPrice" class="text-body-2 text-grey text-decoration-line-through">
                      {{ formatPrice(product.oldPrice) }}đ
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Pagination -->
          <div class="d-flex justify-center mt-8">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              color="#ee9d2b"
              rounded="lg"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Mobile Filters Dialog -->
    <v-dialog v-model="showMobileFilters" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="#ee9d2b">
          <v-btn icon @click="showMobileFilters = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Bộ lọc</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="resetFilters">Đặt lại</v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">
          <!-- Category Filter -->
          <div class="mb-6">
            <h3 class="text-h6 font-weight-bold mb-3">Danh mục</h3>
            <v-checkbox
              v-for="category in categories"
              :key="category.value"
              v-model="selectedCategories"
              :label="category.label"
              :value="category.value"
              color="#ee9d2b"
              hide-details
            ></v-checkbox>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- Price Filter -->
          <div class="mb-6">
            <h3 class="text-h6 font-weight-bold mb-3">Khoảng giá</h3>
            <v-range-slider
              v-model="priceRange"
              :min="0"
              :max="1000000"
              :step="50000"
              color="#ee9d2b"
              thumb-label
              class="mb-4"
            ></v-range-slider>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- Age Filter -->
          <div class="mb-6">
            <h3 class="text-h6 font-weight-bold mb-3">Độ tuổi</h3>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="age in ageRanges"
                :key="age"
                :variant="selectedAge === age ? 'flat' : 'outlined'"
                :color="selectedAge === age ? '#ee9d2b' : 'default'"
                @click="selectedAge = selectedAge === age ? null : age"
              >
                {{ age }}
              </v-chip>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn block color="#ee9d2b" size="large" @click="showMobileFilters = false">
            Áp dụng
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatPrice } from '@/utils/helpers'

const router = useRouter()

// Favorite state
const favorites = ref([])
const showFavoriteSnackbar = ref(false)
const favoriteMessage = ref('')

// Breadcrumbs
const breadcrumbs = [
  { title: 'Trang chủ', disabled: false, href: '/' },
  { title: 'Đồ chơi', disabled: false, href: '/products' },
  { title: 'Tất cả sản phẩm', disabled: true }
]

// Filters
const categories = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đồ chơi mới ', value: 'new' },
  { label: 'Đồ chơi giáo dục', value: 'education' },
  { label: 'Đồ chơi vận động', value: 'sports' },
  { label: 'Xếp hình & Lắp ráp', value: 'building' },
  { label: 'Búp bê & Thú bông', value: 'dolls' },
  { label: 'Xe mô hình', value: 'vehicles' }
]

const ageRanges = ['0-12 tháng', '1-3 tuổi', '3-6 tuổi', '6-12 tuổi', '12+ tuổi']

const sortOptions = [
  { title: 'Phổ biến nhất', value: 'popular' },
  { title: 'Giá: Thấp đến Cao', value: 'price_asc' },
  { title: 'Giá: Cao đến Thấp', value: 'price_desc' },
  { title: 'Mới nhất', value: 'newest' }
]

const selectedCategories = ref(['all'])
const priceRange = ref([0, 1000000])
const selectedAge = ref('1-3 tuổi')
const sortBy = ref('popular')
const currentPage = ref(1)
const totalPages = ref(8)
const showMobileFilters = ref(false)

// Products data
const products = ref([
  {
    id: 1,
    name: 'Bộ Lắp Ráp Lego City Cảnh Sát',
    price: 450000,
    oldPrice: 600000,
    rating: 4.5,
    reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9I0chOIVmMUhBYCoOmLSnFcytBi_ciHfYbH8PF18C4V0q058j5dWvx_88bRpem4MOh8YZUA3MoO1UTXxnzrSqr7b_P68gRbaTvf5z7N8-qIthi5HWIOTuLR1ewi-c5RVWszFDUNrvBDaxfU3zvzwJxjuF4ilfy9O2w18xKu2z6M9jYrtynoPPkWzs-T_IIq6cJnhh1IOBNzFzqKtzW4O8REkMh6v1JXHJ1MMw20-uetpogVPxAKb1rfLZH-GATGind93t9kcBI9_',
    badge: 'Bán chạy',
    badgeColor: '#ee9d2b'
  },
  {
    id: 2,
    name: 'Gấu Bông Teddy Khổng Lồ Mềm Mại',
    price: 320000,
    oldPrice: 400000,
    rating: 4,
    reviews: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxyxn5hOL96fdDXev4jMkwuFer3AanHnMXIu48xTlw4-35m8k_2cS7vyxYnftaUvX_ZKTj61UJtdQmXInI3OFJ8KLjc72xXGodj-qzMXWHOSJSoYTLYCGFgS7KhUrCs2JZ0lKAuwX3KwBI5MvJUhEgNPELkERXYJy-u-Ca_KbND5F-Oc1xBX3FjQ1gbXD1tDczql5_4D5TDqJdKJTSQkQoHZwooqVkZb6DAemXV1RS8Xp5mP5u1AyjHaxTYvW8nygfluPswyTIeOqF',
    badge: '-20%',
    badgeColor: 'red'
  },
  {
    id: 3,
    name: 'Bộ Đồ Chơi Gỗ Học Toán Thông Minh',
    price: 150000,
    rating: 5,
    reviews: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMJnV5wvXrhVKiKrFZLGMJt1O4wLKbc6rn4HdeZDfRDrLbsJWwnYiLHimAqKVLY0HXQDrIm09wh1nufzTIckJkNjupHWkdCpuEHycVbEzKNr5FPN-x3gdYkzz2HhDndmq4M_11GOFi662enCfciH5RWjyEU0rZ3l6QuUibr5qY1ww-MjSn3DKZzEAeozov7Nvvwet-jE2ojzgvrpr-l0ZECbVlSCfOiogVnaqvTDn6Jz0Sh4pl_0n7a5eRXzwfbdH-LBSh5F-b7nVn'
  },
  {
    id: 4,
    name: 'Xe Đua Địa Hình Điều Khiển Từ Xa Tốc Độ Cao',
    price: 550000,
    rating: 4,
    reviews: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOMl6FFqdHta9zkVE1A7nfFqSJcJ77b1vV03YALRuqCtWgmaiz24PVwp7fDMpCy0C2USQFyuOKfbwR7oOni1Wy0g10gz86rdwpg_0PcyvVFZiI1DIlBbqgk-W7lcbHnokjATzFJHO1t5BkHM9u-IBmd0PZczhgpSyhWwUZ3rC2fHOZDmvwEH7BkWxuS2oDy4X_iRT_BMfn5HumQVSz9SZizGcmnugYzv5DPizCQLLvtogjj9ltbLTDLnYdQ3fdgo_62RnMbJXWrUkv'
  },
  {
    id: 5,
    name: 'Búp Bê Công Chúa Elsa Frozen',
    price: 280000,
    rating: 3.5,
    reviews: 56,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3XJY6lL8mYRS-UIVRg9t8NYH0VNkSpQ5qnMCMnmdt4iPgBTOzE6g9DG74WipPHIns74_-gLAdp1lC_Yxo1IwI1W4EPLbyEvrEIhO57THo7Lo3SBjaILKoLtMVOSdi08ZdqcaGisVW6EkWH34ybcEcFxmMa6zTjHlYVwK6oarbnzoHpF63mrx5-U610B0goDPc9_XX6HXTU8KbArUk9P76UwD0L00pRwsCqVm0jlOLZT2ggeJm8YH9WZxblH2lSSUnAXRMSjIBgJok'
  },
  {
    id: 6,
    name: 'Khối Rubik 3x3 Tốc Độ Cao Moyu',
    price: 90000,
    rating: 5,
    reviews: 342,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQltVSC5A6G8C1wfwl4peYQnhlJvsjOuD9H1ATzOYAt6hDF4l_hpzlMCCS37OW3afB3UX88nIBwfnFnAZlbYkQ9gfzMLss9lHVm56EQowXbCCk8Wf0_xX3XchMQDHuHAVClE9DJfbWjYRu0AbOKXsyrzCwkKK0nUobbb3voSIgg7WrY60lCbsnsngUydiYlgeYv_HPzXLE1DSYWNrUSUvhblJ5VTnv_XCuqJsgQQOeu51vw9d9vFeJ3Fev1jsjAEL1SNAaOgyci6fi',
    badge: 'Mới',
    badgeColor: 'black'
  }
])

// Methods
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

const addToCart = (product) => {
  console.log('Add to cart:', product)
  // TODO: Implement cart logic
}

const goToDetail = (productId) => {
  router.push(`/products/${productId}`)
}

const resetFilters = () => {
  selectedCategories.value = ['all']
  priceRange.value = [0, 1000000]
  selectedAge.value = null
}
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  background-color: #f8f7f6;
}

.product-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08) !important;
}

.product-image-wrapper {
  position: relative;
  background-color: #f8f7f6;
  overflow: hidden;
}

.product-image {
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  font-weight: bold;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.add-to-cart-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.3s ease;
}

.product-card:hover .add-to-cart-btn {
  opacity: 1;
  transform: translateY(0);
}

.product-name {
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name:hover {
  color: #ee9d2b;
}

:deep(.v-field) {
  border-radius: 12px;
}

:deep(.v-pagination__item) {
  border-radius: 8px;
}
</style>