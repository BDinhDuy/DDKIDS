<template>
  <v-container fluid class="error-page pa-0">
    <v-container class="d-flex flex-column align-center justify-center py-16">
      <div class="text-center max-w-960">
        <!-- 404 Image Section -->
        <div class="mb-8">
          <v-card class="mx-auto error-image-card" max-width="400" elevation="8">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0bDZr3Tzdkw5I7ORNGXhC1pnP2N233nHL6i1uTdzx1kchkiAhxUJNkExOi_k_OZD3Fm5gxAgFp06t4_zSxIhStHU8oxN5dDCfMc3zsU7Dr94PcINAZUF76Fay8sa4XpnWVtQ5V-8q-bPtbjVDaAnOBMZbSAQYIL1KE1OAZalF70vwKrM4ii-1GzBHpbdrdXER10L4IGkwvyZ2kXPDbT63NwL4Zylqj60x05t61qQSXG7B6YMPxDusy_s-sCRusgIDNp12ubf6Lmkq"
              alt="Lost sad teddy bear"
              aspect-ratio="4/3"
              cover
              class="error-image"
            >
              <div class="error-overlay">
                <div class="error-number">404</div>
              </div>
            </v-img>
          </v-card>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
          <h1 class="text-h3 text-sm-h2 font-weight-black text-primary mb-4">
            Ôi không! Lạc mất rồi
          </h1>
          <p class="text-h6 text-grey-darken-1 font-weight-regular mb-6 px-4">
            Có vẻ như món đồ chơi này đã bị thất lạc hoặc trang bạn tìm kiếm đã bị dọn dẹp vào hộp đồ chơi. 
            Đừng lo, chúng ta có thể tìm lại nó!
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex flex-column flex-sm-row gap-4 justify-center mb-12">
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-home"
            elevation="4"
            @click="goHome"
          >
            Về Trang Chủ
          </v-btn>
          <v-btn
            variant="outlined"
            size="large"
            prepend-icon="mdi-view-grid"
            color="primary"
          >
            Xem Danh Mục
          </v-btn>
        </div>

        <!-- Search Section -->
        <v-card class="mb-12 mx-auto" max-width="600" elevation="2">
          <v-card-text class="pa-2">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              placeholder="Tìm kiếm món đồ chơi khác..."
              variant="solo"
              flat
              hide-details
              density="comfortable"
              class="search-field"
            >
              <template v-slot:append-inner>
                <v-btn
                  color="primary"
                  variant="tonal"
                  class="d-none d-sm-flex"
                  @click="search"
                >
                  Tìm kiếm
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>

        <!-- Category Suggestions -->
        <div class="mb-8">
          <h2 class="text-h5 font-weight-bold mb-2">Hoặc khám phá các danh mục phổ biến</h2>
          <v-divider class="mx-auto my-4" :thickness="4" color="primary" width="100"></v-divider>
        </div>

        <!-- Category Grid -->
        <v-row class="mb-8">
          <v-col
            v-for="category in categories"
            :key="category.name"
            cols="6"
            md="3"
          >
            <v-card
              class="category-card"
              :href="category.link"
              elevation="2"
            >
              <v-img
                :src="category.image"
                :alt="category.name"
                aspect-ratio="1"
                cover
                class="category-image"
              >
                <div class="category-overlay">
                  <div class="category-content">
                    <h3 class="text-h6 font-weight-bold text-white mb-1">
                      {{ category.name }}
                    </h3>
                    <p class="text-caption text-white">
                      Khám phá ngay →
                    </p>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const categories = ref([
  {
    name: 'LEGO & Lắp ráp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0d3vPsMtt6_HfOJQ-wttuhwzCJiDNljmM0b3amL6cUNc1k3IwiTxR74-ddMp2NDeD0XJEkL6YfI3N0A5qtuI92C5CEfEJ3IXqdRmfQmx_QRW1716wCv2iALWv6Tw93kkGA12MkN01swF-nmcsG2-y_zsP2vQL4sih6-aybJe3S2dLupRIynnWwN8loUmqH71gmnrY-CSbgt-GxdHU6zpvdGNGLOS_eLtNjQaaH-_ozFyYgtbhHsjGCUSYEsqKYKuyzgKMe6WdQ96x',
    link: '#'
  },
  {
    name: 'Búp bê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnorUdOjFjrspsG15fFfOtU-jAeFC8hKJwRDX89S3sVihlG3HWNE-vRqX1fym6g1h8Abu6cgR9p4-4if4u7s0sk9SkE3pCrjd7Qw_vf4_gA_Ec7TdhqUGoVkDJqsh2M3NFj6sc2EzkJDUOMVBxbBgztHr0pFpp3xAK-HOVE2Ewjx8-LNwWKKwvUvnTOqUjOq-HWIqJSuGwI8ygImGhopxqHW8iZyOU_Xb_58z3Y7G-P_VgYBKZksarUpXwzpBMRsnY1YynrlTo_4sF',
    link: '#'
  },
  {
    name: 'Xe mô hình',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtzpZl3nNwWqpaxYmV_uuYewTyOCVuPv0e1ixLJIV9-0gSFbLTT3YmzMPtYeuetsqpbN_bAyohSfO-ttO8GdazHB3-YHOmSMNbSx91MoJo_TsdQ0P2FppjGLyj8VawGLlC1XJXpC1uEUvvkqCDStbe8R5noyqhjqDiSB9YpS1_U7bIqJTecZVbXez-WiWxWscAQt7yCzertyzuRpQSr5dpe4PV23dsgglQgHRr8KJcnMgxuE3j5Flw5gvqgkNztQXykyAlKQjF5sFk',
    link: '#'
  },
  {
    name: 'Gấu bông',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA695Q63tadQgqntclt6F2tvfZ6KJCjPYsSkuYrydvWvRAAMHuJyHLTcEftWdbikD90UHVOJvjaMS1iCzk6JKrHw5Qp7u7kfCfzMLv5SyK8JuXonsYo1WWsc-frvCPvcoKhwb0cTcUh9XJPRfxcjQ0DWQ9JCwgh7Vqd4Ymt0fm7RP-9ewDSTcL_g6r0hBw_Do833qnY5CaZ1kxCJUwxqgC51g-LIkU9efIw_3ktsZx1HMbz76Q1PPXM8tzsmICE_Ahu8nLpjJAjKc3_',
    link: '#'
  }
])

const goHome = () => {
  router.push('/')
}

const search = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement search logic
  }
}
</script>

<style scoped>
.error-page {
  background-color: #f8f7f6;
  min-height: calc(100vh - 64px);
}

.max-w-960 {
  max-width: 960px;
  width: 100%;
}

.error-image-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.error-image-card:hover {
  transform: scale(1.02);
}

.error-image {
  position: relative;
}

.error-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 24px;
}

.error-number {
  font-size: 128px;
  font-weight: 900;
  color: white;
  opacity: 0.2;
  line-height: 1;
  letter-spacing: -0.05em;
}

.gap-4 {
  gap: 16px;
}

.search-field :deep(.v-field) {
  border-radius: 12px;
}

.category-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.category-image {
  position: relative;
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
  display: flex;
  align-items: flex-end;
  transition: all 0.3s ease;
}

.category-card:hover .category-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
}

.category-content {
  padding: 16px;
  width: 100%;
}

.category-card:hover .category-content h3 {
  color: #ee9d2b;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .error-number {
    font-size: 80px;
  }
  
  .category-content {
    padding: 12px;
  }
  
  .category-content h3 {
    font-size: 1rem;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-page {
  animation: fadeInUp 0.6s ease-out;
}
</style>
