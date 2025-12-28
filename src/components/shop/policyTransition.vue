<template>
  <v-container fluid class="shipping-page pa-0">
    <v-container class="py-6 px-4 px-md-10" style="max-width: 960px;">
      <!-- Breadcrumbs -->
      <div class="d-flex flex-wrap align-center text-body-2 mb-5">
        <a href="#" class="text-grey-darken-1 text-decoration-none hover-primary">Trang chủ</a>
        <span class="mx-2 text-grey">/</span>
        <a href="#" class="text-grey-darken-1 text-decoration-none hover-primary">Thông tin</a>
        <span class="mx-2 text-grey">/</span>
        <span class="font-weight-medium">Chính sách vận chuyển</span>
      </div>

      <!-- Hero Section -->
      <v-card class="mb-5 rounded-xl overflow-hidden hero-card" elevation="1">
        <v-row no-gutters align="center">
          <v-col cols="12" md="6" class="pa-6 pa-md-10">
            <div class="position-relative hero-image-wrapper">
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj7a3SdRUk1OilYNGC7eKs5M73PSXhY9us3_4um0yLO34gHJhUOUTt98hl6e0r87CoDCMfNYP2M0lDuu0pJMcctV_28_yGFVfN_62DI7f8l87t2_sVG1H0N4umUprWl17HJJnBzKtnbKkDeJgsFnktfK2f3fRvjzt5KfZsxaWHAiARQkeIfeUNHaeuRywxxACC_6mtoFRny6UMUqsOFnR9NukL1sfsvbs3cHXiPLulRncXZ-0zvKS7MwMgc4pv_7V-cNfMDsDeYD0R"
                alt="Yellow toy delivery truck"
                class="rounded-xl hero-image"
                aspect-ratio="1.33"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text class="pa-6 pa-md-10">
              <h1 class="text-h4 text-md-h3 font-weight-black mb-3 line-height-tight">
                Chính sách Vận chuyển & Giao nhận
              </h1>
              <p class="text-body-2 text-grey-darken-1 mb-6 line-height-relaxed">
                Chúng tôi cam kết mang những món đồ chơi an toàn đến tay bé yêu nhanh nhất có thể với dịch vụ vận chuyển tin cậy và chuyên nghiệp.
              </p>
              <div class="d-flex gap-3 flex-wrap">
                <v-btn
                  color="#ee9d2b"
                  size="large"
                  class="font-weight-bold text-none rounded-xl px-6 text-white btn-primary"
                  elevation="2"
                  @click="router.push('/')"
                >
                  Tiếp tục mua sắm
                </v-btn>
                <v-btn
                  variant="tonal"
                  color="grey-lighten-2"
                  size="large"
                  class="font-weight-bold text-none rounded-xl px-6"
                  @click="showChatPopup = true"
                >
                  Liên hệ hỗ trợ
                </v-btn>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <!-- Feature Cards -->
      <div class="mb-5">
        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold mb-2">Dịch vụ nổi bật</h2>
          <p class="text-body-2 text-grey-darken-1">Những ưu đãi vận chuyển tốt nhất dành cho khách hàng.</p>
        </div>
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.title"
            cols="12"
            md="4"
          >
            <v-card class="feature-card rounded-xl pa-6 h-100" elevation="0">
              <div class="d-flex flex-column gap-4">
                <div class="feature-icon-circle">
                  <v-icon :icon="feature.icon" size="32" class="primary-text"></v-icon>
                </div>
                <div>
                  <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
                  <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Shipping Rates Table -->
      <v-card class="mb-5 rounded-xl overflow-hidden" elevation="1">
        <v-card-title class="pa-6 border-b">
          <h2 class="text-h6 font-weight-bold">Bảng phí & Thời gian giao hàng dự kiến</h2>
        </v-card-title>
        <div class="table-responsive">
          <v-table class="shipping-table">
            <thead class="table-header">
              <tr>
                <th class="font-weight-bold">Hình thức</th>
                <th class="font-weight-bold">Khu vực</th>
                <th class="font-weight-bold">Thời gian dự kiến</th>
                <th class="font-weight-bold">Phí vận chuyển</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rate, index) in shippingRates" :key="index" class="table-row">
                <td class="font-weight-medium">
                  <div class="d-flex align-center gap-2">
                    {{ rate.type }}
                    <v-chip
                      v-if="rate.isHot"
                      color="red-lighten-5"
                      text-color="red-darken-2"
                      size="x-small"
                      class="font-weight-bold"
                    >
                      Hot
                    </v-chip>
                  </div>
                </td>
                <td>{{ rate.area }}</td>
                <td>{{ rate.time }}</td>
                <td class="font-weight-bold">
                  {{ rate.fee }}
                  <span v-if="rate.note" class="text-caption primary-text ml-1">{{ rate.note }}</span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <v-card-text class="pa-4 bg-orange-lighten-5 border-t">
          <div class="d-flex gap-2 align-start">
            <v-icon icon="mdi-information-outline" size="small" class="text-grey-darken-1 mt-1"></v-icon>
            <p class="text-caption text-grey-darken-1">
              Thời gian giao hàng có thể lâu hơn dự kiến 1-2 ngày trong các dịp lễ, tết hoặc các chương trình khuyến mãi lớn.
            </p>
          </div>
        </v-card-text>
      </v-card>

      <!-- Policy & FAQ Grid -->
      <v-row>
        <!-- Left Column: Policy & FAQ -->
        <v-col cols="12" lg="8">
          <!-- Policy Section -->
          <div class="mb-8">
            <h3 class="text-h6 font-weight-bold mb-4 d-flex align-center gap-2">
              <v-icon icon="mdi-shield-check-outline" class="primary-text"></v-icon>
              Chính sách đồng kiểm
            </h3>
            <div class="policy-content text-body-2 text-grey-darken-1">
              <p class="mb-2">Để đảm bảo quyền lợi của khách hàng, ToyStore khuyến khích quý khách hàng:</p>
              <ul class="policy-list">
                <li>Mở gói hàng và kiểm tra tình trạng bên ngoài của sản phẩm (không rách bao bì, móp méo hộp) ngay tại thời điểm nhận hàng.</li>
                <li>Nếu phát hiện lỗi ngoại quan, quý khách có quyền từ chối nhận hàng và liên hệ ngay với CSKH.</li>
                <li>Lưu ý: Không hỗ trợ thử sản phẩm (lắp pin, vận hành thử) khi chưa thanh toán.</li>
              </ul>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="mb-6">
            <h3 class="text-h6 font-weight-bold mb-4 d-flex align-center gap-2">
              <v-icon icon="mdi-help-circle-outline" class="primary-text"></v-icon>
              Câu hỏi thường gặp
            </h3>
            <v-expansion-panels variant="accordion" class="faq-accordion">
              <v-expansion-panel
                v-for="(faq, index) in faqs"
                :key="index"
                class="mb-3 rounded-xl"
                elevation="0"
              >
                <v-expansion-panel-title class="font-weight-medium">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-body-2 text-grey-darken-1">
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>

        <!-- Right Column: Partners & Help -->
        <v-col cols="12" lg="4">
          <!-- Partners Card -->
          <v-card class="mb-6 rounded-xl" elevation="0">
            <v-card-text class="pa-6">
              <h4 class="text-subtitle-1 font-weight-bold mb-4">Đối tác vận chuyển</h4>
              <v-row>
                <v-col
                  v-for="partner in partners"
                  :key="partner"
                  cols="6"
                >
                  <div class="partner-logo rounded-lg">
                    {{ partner }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Help CTA Card -->
          <v-card class="rounded-xl cta-card" elevation="0">
            <v-card-text class="pa-6 text-center">
              <v-avatar color="#ee9d2b" size="48" class="mb-4">
                <v-icon icon="mdi-headset" color="white" size="28"></v-icon>
              </v-avatar>
              <h4 class="text-h6 font-weight-bold mb-2">Cần hỗ trợ thêm?</h4>
              <p class="text-body-2 text-grey-darken-1 mb-4">
                Đội ngũ CSKH luôn sẵn sàng giải đáp thắc mắc của bạn từ 8:00 - 22:00 hàng ngày.
              </p>
              <v-btn
                color="#ee9d2b"
                block
                size="large"
                class="font-weight-bold text-none rounded-xl text-white mb-3"
                elevation="0"
                @click="showChatPopup = true"
              >
                Chat ngay
              </v-btn>
              <div class="text-caption text-grey-darken-1">
                Hoặc gọi hotline: <a href="tel:19001234" class="font-weight-bold primary-text text-decoration-none">1900 1234</a>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Chat Popup -->
    <ChatPopup v-model="showChatPopup" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatPopup from './ChatPopup.vue'

const router = useRouter()
const showChatPopup = ref(false)

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
    icon: 'mdi-shield-check',
    title: 'Kiểm tra hàng trước',
    description: 'Khách hàng được quyền mở hộp kiểm tra ngoại quan trước khi thanh toán (COD).'
  }
])

const shippingRates = ref([
  {
    type: 'Tiêu chuẩn',
    area: 'Toàn quốc',
    time: '3 - 5 ngày',
    fee: '30.000đ',
    note: '(Miễn phí > 500k)',
    isHot: false
  },
  {
    type: 'Nhanh',
    area: 'Hà Nội / TP.HCM',
    time: '1 - 2 ngày',
    fee: '45.000đ',
    note: '',
    isHot: false
  },
  {
    type: 'Hỏa tốc',
    area: 'Nội thành HN/HCM',
    time: '2 - 4 giờ',
    fee: 'Theo ứng dụng (Grab/Ahamove)',
    note: '',
    isHot: true
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

const partners = ref(['GHN', 'Viettel Post', 'GrabExpress', 'Ahamove'])
</script>

<style scoped>
.shipping-page {
  background-color: #f8f7f6;
  min-height: 100vh;
}

.primary-text {
  color: #ee9d2b !important;
}

.hover-primary:hover {
  color: #ee9d2b !important;
}

.line-height-tight {
  line-height: 1.2;
}

.line-height-relaxed {
  line-height: 1.6;
}

/* Hero Card */
.hero-card {
  background-color: #ffffff;
  border: 1px solid #f4f3f0;
}

.hero-image-wrapper {
  position: relative;
}

.hero-image {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.hero-image:hover {
  transform: scale(1.02);
}

.btn-primary {
  box-shadow: 0 4px 12px rgba(238, 157, 43, 0.3) !important;
}

.btn-primary:hover {
  background-color: #d68a1f !important;
}

/* Feature Cards */
.feature-card {
  background-color: #ffffff;
  border: 1px solid #e6e1db;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.feature-icon-circle {
  width: 48px;
  height: 48px;
  background-color: rgba(238, 157, 43, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Shipping Table */
.shipping-table {
  background-color: #ffffff;
}

.table-header {
  background-color: rgba(238, 157, 43, 0.05);
}

.table-header th {
  color: #181511 !important;
  font-weight: 700;
  padding: 16px 24px;
  white-space: nowrap;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.table-row td {
  padding: 16px 24px;
  color: #897961;
}

.border-b {
  border-bottom: 1px solid #f4f3f0;
}

.border-t {
  border-top: 1px solid #f4f3f0;
}

/* Policy Content */
.policy-content {
  line-height: 1.6;
}

.policy-list {
  list-style: none;
  padding-left: 0;
}

.policy-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
}

.policy-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #ee9d2b;
  font-weight: bold;
}

/* FAQ Accordion */
.faq-accordion :deep(.v-expansion-panel) {
  background-color: #ffffff;
  border: 1px solid #e6e1db;
  margin-bottom: 12px;
}

.faq-accordion :deep(.v-expansion-panel-title) {
  font-size: 0.9375rem;
}

.faq-accordion :deep(.v-expansion-panel-title:hover) {
  background-color: rgba(0, 0, 0, 0.02);
}

.faq-accordion :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 16px 16px 16px;
  border-top: 1px solid #f4f3f0;
}

/* Partners */
.partner-logo {
  background-color: #f4f3f0;
  border: 1px solid #e6e1db;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  color: #999;
}

/* CTA Card */
.cta-card {
  background: linear-gradient(135deg, #fff9f0 0%, #ffffff 100%);
  border: 1px solid rgba(238, 157, 43, 0.2);
}

/* Gap utilities */
.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-image {
    max-width: 100%;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
  
  .text-h4 {
    font-size: 1.5rem !important;
  }
  
  .text-h5 {
    font-size: 1.25rem !important;
  }
}
</style>
