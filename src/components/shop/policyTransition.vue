<template>
  <v-container fluid class="shipping-page pa-0">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-6">
        <template v-slot:divider>
          <v-icon size="small">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Hero Section -->
      <v-card class="mb-8 overflow-hidden" elevation="2">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj7a3SdRUk1OilYNGC7eKs5M73PSXhY9us3_4um0yLO34gHJhUOUTt98hl6e0r87CoDCMfNYP2M0lDuu0pJMcctV_28_yGFVfN_62DI7f8l87t2_sVG1H0N4umUprWl17HJJnBzKtnbKkDeJgsFnktfK2f3fRvjzt5KfZsxaWHAiARQkeIfeUNHaeuRywxxACC_6mtoFRny6UMUqsOFnR9NukL1sfsvbs3cHXiPLulRncXZ-0zvKS7MwMgc4pv_7V-cNfMDsDeYD0R"
              alt="Yellow toy delivery truck"
              cover
              height="400"
              class="hero-image"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text class="pa-8 d-flex flex-column justify-center h-100">
              <h1 class="text-h3 font-weight-black mb-4">
                Chính sách Vận chuyển & Giao nhận
              </h1>
              <p class="text-body-1 text-grey-darken-1 mb-6">
                Chúng tôi cam kết mang những món đồ chơi an toàn đến tay bé yêu nhanh nhất có thể 
                với dịch vụ vận chuyển tin cậy và chuyên nghiệp.
              </p>
              <div class="d-flex gap-3 flex-wrap">
                <v-btn
                  color="primary"
                  size="large"
                  elevation="4"
                >
                  Tiếp tục mua sắm
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="large"
                >
                  Liên hệ hỗ trợ
                </v-btn>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <!-- Feature Cards -->
      <div class="mb-8">
        <div class="mb-6">
          <h2 class="text-h4 font-weight-bold mb-2">Dịch vụ nổi bật</h2>
          <p class="text-grey-darken-1">Những ưu đãi vận chuyển tốt nhất dành cho khách hàng.</p>
        </div>
        
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.title"
            cols="12"
            md="4"
          >
            <v-card class="h-100 hover-card" elevation="1">
              <v-card-text class="pa-6">
                <v-avatar
                  color="primary-lighten-4"
                  size="56"
                  class="mb-4"
                >
                  <v-icon color="primary" size="32">{{ feature.icon }}</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
                <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Shipping Rates Table -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold bg-grey-lighten-4">
          Bảng phí & Thời gian giao hàng dự kiến
        </v-card-title>
        <v-divider></v-divider>
        <v-table>
          <thead>
            <tr>
              <th class="text-left font-weight-bold">Hình thức</th>
              <th class="text-left font-weight-bold">Khu vực</th>
              <th class="text-left font-weight-bold">Thời gian dự kiến</th>
              <th class="text-left font-weight-bold">Phí vận chuyển</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rate in shippingRates"
              :key="rate.method"
              class="hover-row"
            >
              <td class="font-weight-bold">
                {{ rate.method }}
                <v-chip
                  v-if="rate.hot"
                  color="red"
                  size="x-small"
                  class="ml-2"
                  label
                >
                  Hot
                </v-chip>
              </td>
              <td>{{ rate.area }}</td>
              <td>{{ rate.time }}</td>
              <td class="font-weight-bold">
                {{ rate.fee }}
                <span v-if="rate.note" class="text-caption text-primary ml-1">
                  {{ rate.note }}
                </span>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-alert
          type="info"
          variant="tonal"
          class="ma-0 rounded-0"
          density="compact"
        >
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          Thời gian giao hàng có thể lâu hơn dự kiến 1-2 ngày trong các dịp lễ, tết hoặc các chương trình khuyến mãi lớn.
        </v-alert>
      </v-card>

      <!-- Detailed Policies & FAQ -->
      <v-row>
        <!-- Left Column: Policies & FAQ -->
        <v-col cols="12" lg="8">
          <!-- Policy Section -->
          <div class="mb-8">
            <div class="d-flex align-center gap-2 mb-4">
              <v-icon color="primary">mdi-shield-check</v-icon>
              <h3 class="text-h5 font-weight-bold">Chính sách đồng kiểm</h3>
            </div>
            <v-card elevation="1">
              <v-card-text>
                <p class="mb-3">Để đảm bảo quyền lợi của khách hàng, ToyStore khuyến khích quý khách hàng:</p>
                <ul class="policy-list">
                  <li>Mở gói hàng và kiểm tra tình trạng bên ngoài của sản phẩm (không rách bao bì, móp méo hộp) ngay tại thời điểm nhận hàng.</li>
                  <li>Nếu phát hiện lỗi ngoại quan, quý khách có quyền từ chối nhận hàng và liên hệ ngay với CSKH.</li>
                  <li>Lưu ý: Không hỗ trợ thử sản phẩm (lắp pin, vận hành thử) khi chưa thanh toán.</li>
                </ul>
              </v-card-text>
            </v-card>
          </div>

          <!-- FAQ Section -->
          <div>
            <div class="d-flex align-center gap-2 mb-4">
              <v-icon color="primary">mdi-help-circle</v-icon>
              <h3 class="text-h5 font-weight-bold">Câu hỏi thường gặp</h3>
            </div>
            <v-expansion-panels variant="accordion">
              <v-expansion-panel
                v-for="(faq, index) in faqs"
                :key="index"
              >
                <v-expansion-panel-title class="font-weight-medium">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="text-grey-darken-1 pt-2">{{ faq.answer }}</p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>

        <!-- Right Column: Partners & Help -->
        <v-col cols="12" lg="4">
          <!-- Partners -->
          <v-card class="mb-6" elevation="1">
            <v-card-title class="font-weight-bold">Đối tác vận chuyển</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="partner in partners"
                  :key="partner"
                  cols="6"
                >
                  <v-card
                    variant="outlined"
                    class="text-center pa-3"
                    color="grey-lighten-3"
                  >
                    <div class="text-caption font-weight-bold text-grey">{{ partner }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Help CTA -->
          <v-card color="primary-lighten-5" elevation="1">
            <v-card-text class="text-center pa-6">
              <v-avatar
                color="primary"
                size="56"
                class="mb-4 elevation-4"
              >
                <v-icon color="white" size="32">mdi-headset</v-icon>
              </v-avatar>
              <h4 class="text-h6 font-weight-bold mb-2">Cần hỗ trợ thêm?</h4>
              <p class="text-body-2 text-grey-darken-1 mb-4">
                Đội ngũ CSKH luôn sẵn sàng giải đáp thắc mắc của bạn từ 8:00 - 22:00 hàng ngày.
              </p>
              <v-btn
                color="primary"
                block
                size="large"
                prepend-icon="mdi-chat"
              >
                Chat ngay
              </v-btn>
              <div class="text-caption text-grey-darken-1 mt-3">
                Hoặc gọi hotline: 
                <a href="tel:19001234" class="text-primary font-weight-bold text-decoration-none">
                  1900 1234
                </a>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const breadcrumbs = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/'
  },
  {
    title: 'Thông tin',
    disabled: false,
    href: '#'
  },
  {
    title: 'Chính sách vận chuyển',
    disabled: true
  }
])

const features = ref([
  {
    icon: 'mdi-truck-delivery',
    title: 'Miễn phí vận chuyển',
    description: 'Áp dụng cho mọi đơn hàng có giá trị trên 500.000đ trong phạm vi toàn quốc.'
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Giao hàng hỏa tốc 2H',
    description: 'Nhận hàng ngay trong 2 giờ đối với khu vực nội thành Hà Nội & TP.HCM.'
  },
  {
    icon: 'mdi-check-decagram',
    title: 'Kiểm tra hàng trước',
    description: 'Khách hàng được quyền mở hộp kiểm tra ngoại quan trước khi thanh toán (COD).'
  }
])

const shippingRates = ref([
  {
    method: 'Tiêu chuẩn',
    area: 'Toàn quốc',
    time: '3 - 5 ngày',
    fee: '30.000đ',
    note: '(Miễn phí > 500k)',
    hot: false
  },
  {
    method: 'Nhanh',
    area: 'Hà Nội / TP.HCM',
    time: '1 - 2 ngày',
    fee: '45.000đ',
    note: null,
    hot: false
  },
  {
    method: 'Hỏa tốc',
    area: 'Nội thành HN/HCM',
    time: '2 - 4 giờ',
    fee: 'Theo ứng dụng (Grab/Ahamove)',
    note: null,
    hot: true
  }
])

const faqs = ref([
  {
    question: 'Làm sao để tôi theo dõi đơn hàng?',
    answer: 'Sau khi đặt hàng thành công, hệ thống sẽ gửi mã vận đơn qua Email hoặc SMS. Bạn có thể tra cứu trực tiếp trên website của đối tác vận chuyển hoặc trong mục "Đơn hàng của tôi".'
  },
  {
    question: 'ToyStore có giao hàng vào cuối tuần không?',
    answer: 'Các đối tác vận chuyển của chúng tôi vẫn hoạt động vào Thứ 7 và Chủ Nhật. Tuy nhiên, thời gian giao hàng có thể chậm hơn một chút so với ngày thường.'
  },
  {
    question: 'Hàng bị hư hỏng khi vận chuyển thì sao?',
    answer: 'Chúng tôi cam kết đổi mới 1-1 ngay lập tức nếu sản phẩm bị hư hỏng do quá trình vận chuyển. Vui lòng quay video khi mở hộp để được hỗ trợ nhanh nhất.'
  }
])

const partners = ref([
  'GHN',
  'Viettel Post',
  'GrabExpress',
  'Ahamove'
])
</script>

<style scoped>
.shipping-page {
  background-color: #f8f7f6;
  min-height: 100vh;
}

.hero-image {
  position: relative;
}

.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.hover-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.policy-list {
  list-style-type: disc;
  margin-left: 20px;
}

.policy-list li {
  margin-bottom: 8px;
  color: #666;
}

.gap-3 {
  gap: 12px;
}

/* Table styling */
:deep(.v-table) {
  background-color: transparent;
}

:deep(.v-table thead tr th) {
  background-color: rgba(238, 157, 43, 0.05);
  font-weight: 700;
}

:deep(.v-table tbody tr:hover) {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
