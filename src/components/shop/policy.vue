<template>
  <v-container fluid class="policy-page pa-0">
    <!-- Breadcrumbs & Header -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12">
          <!-- Breadcrumbs -->
          <v-breadcrumbs :items="['Trang chủ', 'Thông tin', 'Chính sách chung']" class="pa-0 mb-4">
            <template v-slot:divider>
              <v-icon size="small">mdi-chevron-right</v-icon>
            </template>
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :disabled="item === 'Chính sách chung'"
                class="text-body-2"
              >
                {{ item }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>

          <!-- Page Header -->
          <v-card class="mb-6" flat>
            <v-card-text class="pa-6">
              <v-row align="center">
                <v-col cols="12" md="9">
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="primary" size="56" class="mr-3">
                      <v-icon color="white" size="32">mdi-gavel</v-icon>
                    </v-avatar>
                    <h1 class="text-h3 font-weight-black">Chính sách Chung</h1>
                  </div>
                  <p class="text-body-1 text-grey-darken-1">
                    Cập nhật lần cuối: <span class="font-weight-bold text-black">20/10/2023</span>. 
                    Chúng tôi cam kết mang lại trải nghiệm mua sắm đồ chơi an toàn, minh bạch và vui vẻ cho mọi gia đình.
                  </p>
                </v-col>
                <v-col cols="12" md="3" class="text-md-right">
                  <v-btn
                    variant="outlined"
                    prepend-icon="mdi-printer"
                    @click="printPolicy"
                    size="large"
                  >
                    In Chính sách
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Main Content -->
      <v-row>
        <!-- Sidebar Navigation -->
        <v-col cols="12" md="3">
          <v-card class="sidebar-nav sticky-top">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-format-list-bulleted</v-icon>
              Mục lục
            </v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item
                v-for="section in sections"
                :key="section.id"
                :active="activeSection === section.id"
                @click="scrollToSection(section.id)"
                class="mb-1"
              >
                <template v-slot:prepend>
                  <v-icon :icon="section.icon"></v-icon>
                </template>
                <v-list-item-title>{{ section.title }}</v-list-item-title>
                <template v-slot:append>
                  <v-icon v-if="activeSection === section.id">mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
            
            <v-divider class="my-4"></v-divider>
            
            <v-card-text>
              <p class="text-caption text-grey mb-3">Bạn cần hỗ trợ thêm?</p>
              <v-btn
                color="primary"
                block
                variant="flat"
              >
                Liên hệ CSKH
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" md="9">
          <!-- Search Box -->
          <v-card class="mb-6" color="primary-lighten-5">
            <v-card-text>
              <v-row align="center">
                <v-col cols="12" md="6">
                  <div class="d-flex align-center">
                    <v-avatar color="white" size="48" class="mr-4">
                      <v-icon color="primary">mdi-help-circle-outline</v-icon>
                    </v-avatar>
                    <div>
                      <h4 class="font-weight-bold">Tìm kiếm nhanh</h4>
                      <p class="text-caption text-grey-darken-1">Nhập từ khóa để tìm quy định cụ thể</p>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="pageSearchQuery"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Ví dụ: 'hoàn tiền', 'vận chuyển'..."
                    variant="outlined"
                    density="compact"
                    hide-details
                    bg-color="white"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Section 1: Điều khoản sử dụng -->
          <v-card id="section-1" class="mb-6">
            <v-card-title class="d-flex align-center bg-blue-lighten-5">
              <v-icon color="blue" class="mr-2">mdi-file-document-outline</v-icon>
              <span class="text-h5 font-weight-bold">1. Điều khoản sử dụng</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6">
              <p class="mb-4">
                Chào mừng bạn đến với ToyStore. Khi truy cập vào trang web của chúng tôi, bạn đồng ý với các điều khoản này. 
                Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, 
                vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước.
              </p>

              <v-alert
                type="info"
                variant="tonal"
                class="my-4"
              >
                <template v-slot:title>
                  <span class="font-weight-bold">LƯU Ý QUAN TRỌNG</span>
                </template>
                <p class="text-body-2">
                  Khi quý khách đồng ý sử dụng dịch vụ của chúng tôi, quý khách cần đảm bảo đủ 18 tuổi hoặc truy cập dưới sự 
                  giám sát của cha mẹ hoặc người giám hộ hợp pháp.
                </p>
              </v-alert>

              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="green">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-title>
                    Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại.
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="green">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-title>
                    Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân.
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <!-- Section 2: Quyền & Nghĩa vụ -->
          <v-card id="section-2" class="mb-6">
            <v-card-title class="d-flex align-center bg-orange-lighten-5">
              <v-icon color="orange" class="mr-2">mdi-scale-balance</v-icon>
              <span class="text-h5 font-weight-bold">2. Quyền & Nghĩa vụ</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6">
              <h3 class="text-h6 font-weight-bold mb-3">2.1. Quyền lợi khách hàng</h3>
              <p class="mb-4">Khách hàng được đảm bảo quyền lợi khi mua sắm tại ToyStore bao gồm:</p>

              <v-row class="mb-6">
                <v-col cols="12" sm="6">
                  <v-card color="grey-lighten-4" flat>
                    <v-card-text>
                      <div class="d-flex align-start">
                        <v-icon color="primary" class="mr-3" size="32">mdi-shield-check</v-icon>
                        <div>
                          <h5 class="font-weight-bold mb-1">Sản phẩm chính hãng</h5>
                          <p class="text-caption">Cam kết 100% sản phẩm có nguồn gốc xuất xứ rõ ràng.</p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card color="grey-lighten-4" flat>
                    <v-card-text>
                      <div class="d-flex align-start">
                        <v-icon color="primary" class="mr-3" size="32">mdi-headset</v-icon>
                        <div>
                          <h5 class="font-weight-bold mb-1">Hỗ trợ 24/7</h5>
                          <p class="text-caption">Đội ngũ tư vấn luôn sẵn sàng giải đáp thắc mắc.</p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <h3 class="text-h6 font-weight-bold mb-3">2.2. Trách nhiệm người dùng</h3>
              <p>
                Người dùng có trách nhiệm bảo mật thông tin tài khoản và mật khẩu. ToyStore không chịu trách nhiệm 
                cho các thiệt hại xảy ra do lỗi bảo mật từ phía người dùng.
              </p>
            </v-card-text>
          </v-card>

          <!-- Section 3 & 4 in Row -->
          <v-row class="mb-6">
            <!-- Section 3: Bảo mật thông tin -->
            <v-col cols="12" md="6">
              <v-card id="section-3" class="h-100">
                <v-card-title class="d-flex align-center bg-green-lighten-5">
                  <v-icon color="green" class="mr-2">mdi-shield-check</v-icon>
                  <span class="text-h6 font-weight-bold">3. Bảo mật thông tin</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-4">
                  <p class="text-body-2 mb-4">
                    ToyStore coi trọng việc bảo mật thông tin của bạn. Chúng tôi sử dụng các biện pháp tốt nhất 
                    để bảo vệ thông tin và việc thanh toán của bạn. Thông tin cá nhân của bạn sẽ không được chia sẻ 
                    với bên thứ ba trừ khi có yêu cầu pháp lý.
                  </p>
                  <v-btn
                    variant="text"
                    color="primary"
                    append-icon="mdi-arrow-right"
                    size="small"
                  >
                    Xem chi tiết chính sách bảo mật
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Section 4: Thanh toán & Vận chuyển -->
            <v-col cols="12" md="6">
              <v-card id="section-4" class="h-100">
                <v-card-title class="d-flex align-center bg-purple-lighten-5">
                  <v-icon color="purple" class="mr-2">mdi-truck-delivery</v-icon>
                  <span class="text-h6 font-weight-bold">4. Thanh toán & Vận chuyển</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-4">
                  <p class="text-body-2 mb-4">
                    Chúng tôi hỗ trợ nhiều phương thức thanh toán: COD, thẻ tín dụng, ví điện tử. 
                    Thời gian giao hàng tiêu chuẩn từ 2-4 ngày làm việc. Phí vận chuyển được tính dựa trên 
                    khoảng cách và trọng lượng đơn hàng.
                  </p>
                  <v-btn
                    variant="text"
                    color="primary"
                    append-icon="mdi-arrow-right"
                    size="small"
                  >
                    Biểu phí vận chuyển
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Section 5: Đổi trả & Bảo hành -->
          <v-card id="section-5" class="mb-6 bg-gradient-primary">
            <v-card-title class="d-flex align-center bg-red-lighten-5">
              <v-icon color="red" class="mr-2">mdi-sync</v-icon>
              <span class="text-h5 font-weight-bold">5. Đổi trả & Bảo hành</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="6">
                  <h4 class="font-weight-bold mb-3 d-flex align-center">
                    <v-icon color="primary" size="small" class="mr-2">mdi-circle</v-icon>
                    Điều kiện đổi trả
                  </h4>
                  <ul class="text-body-2 mb-4">
                    <li class="mb-2">Sản phẩm còn nguyên tem, mác, chưa qua sử dụng.</li>
                    <li class="mb-2">Thời gian đổi trả trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
                    <li class="mb-2">Có video quay lại quá trình mở hộp (unbox).</li>
                    <li class="mb-2">Lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển.</li>
                  </ul>
                  <v-btn
                    variant="text"
                    color="primary"
                    append-icon="mdi-arrow-right"
                    size="small"
                  >
                    Xem chi tiết chính sách đổi trả
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <h4 class="font-weight-bold mb-3 d-flex align-center">
                    <v-icon color="primary" size="small" class="mr-2">mdi-circle</v-icon>
                    Bảo hành đồ chơi
                  </h4>
                  <ul class="text-body-2 mb-4">
                    <li class="mb-2">Bảo hành 12 tháng đối với các loại xe điện, đồ chơi điều khiển từ xa cao cấp.</li>
                    <li class="mb-2">Không bảo hành đối với các chi tiết nhựa vỡ do va đập, ngấm nước.</li>
                    <li class="mb-2">Hỗ trợ sửa chữa có phí sau thời gian bảo hành.</li>
                  </ul>
                  <v-btn
                    variant="text"
                    color="primary"
                    append-icon="mdi-arrow-right"
                    size="small"
                  >
                    Xem chi tiết chính sách bảo hành
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Feedback Section -->
          <v-card class="text-center" variant="outlined" style="border-style: dashed;">
            <v-card-text class="pa-8">
              <h3 class="text-h6 font-weight-bold mb-4">Thông tin này có hữu ích với bạn không?</h3>
              <div class="d-flex justify-center gap-4">
                <v-btn
                  variant="outlined"
                  prepend-icon="mdi-thumb-up-outline"
                  size="large"
                >
                  Có, rất hữu ích
                </v-btn>
                <v-btn
                  variant="outlined"
                  prepend-icon="mdi-thumb-down-outline"
                  color="red"
                  size="large"
                >
                  Không, cần chi tiết hơn
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeSection = ref('section-1')
const searchQuery = ref('')
const pageSearchQuery = ref('')

const sections = [
  { id: 'section-1', title: '1. Điều khoản sử dụng', icon: 'mdi-file-document-outline' },
  { id: 'section-2', title: '2. Quyền & Nghĩa vụ', icon: 'mdi-scale-balance' },
  { id: 'section-3', title: '3. Bảo mật thông tin', icon: 'mdi-shield-check' },
  { id: 'section-4', title: '4. Thanh toán & Giao hàng', icon: 'mdi-truck-delivery' },
  { id: 'section-5', title: '5. Đổi trả & Bảo hành', icon: 'mdi-sync' }
]

const handleScroll = () => {
  const scrollPosition = window.scrollY + 200

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i].id)
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i].id
      break
    }
  }
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 120
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

const printPolicy = () => {
  window.print()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.policy-page {
  background-color: #f8f7f6;
  min-height: 100vh;
}

.sticky-top {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidebar-nav {
  transition: all 0.3s ease;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #ffffff 0%, #fff8f0 100%);
}

.gap-4 {
  gap: 16px;
}

/* Print styles */
@media print {
  .sidebar-nav,
  .v-btn {
    display: none !important;
  }
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>
