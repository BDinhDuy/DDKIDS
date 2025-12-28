<template>
  <v-container fluid class="refund-page pa-0">
    <v-container class="py-6 px-4 px-md-10" style="max-width: 1024px;">
      <!-- Breadcrumbs -->
      <div class="d-flex flex-wrap align-center text-body-2 mb-6">
        <a href="#" class="text-grey-darken-1 text-decoration-none hover-primary">Trang chủ</a>
        <span class="mx-2 text-grey">/</span>
        <span class="font-weight-medium">Chính sách đổi trả</span>
      </div>

      <!-- Hero Section -->
      <v-card class="mb-8 rounded-xl overflow-hidden hero-card" elevation="0">
        <v-row no-gutters align="center">
          <v-col cols="12" md="6" class="pa-6 pa-md-8">
            <div class="position-relative">
              <div class="hero-gradient-overlay"></div>
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdIPfrc737hTUbaClPSUA06KA1Wqq38DuxxrCJnnVtLDCxirXjhoO8CoU7EhLeOCUVcZza77VqVpegiG6Vi7xLzUjDIkg758-PgfHx9g3PT-zRlOl4jo-KE6Pinx0AHnPghtEQftQDfnanNHsOicgt8S3kmT1axQHF4Oc7L3rVYFUSLSZl2EHPhZX38cjQaXwfyDZGJTEYNllyM-kGiOOOJkGHX4MWrN8pRbiafPWfCth93DaegAOSzoGsJ_AnVBmykCYzWhjSDZvV"
                alt="Children playing with colorful wooden toys"
                class="rounded-xl hero-image"
                aspect-ratio="1"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text class="pa-6 pa-md-8">
              <div class="text-uppercase text-caption font-weight-bold letter-spacing mb-2 primary-text">
                An tâm mua sắm
              </div>
              <h1 class="text-h4 text-md-h3 font-weight-black mb-3">
                Chính sách Đổi trả & Hoàn tiền
              </h1>
              <p class="text-body-2 text-grey-darken-1 mb-6 line-height-relaxed">
                Chúng tôi cam kết mang lại niềm vui trọn vẹn cho bé. Nếu món đồ chơi không phù hợp, 
                ba mẹ có thể đổi trả dễ dàng trong vòng 30 ngày kể từ khi nhận hàng.
              </p>
              <div class="d-flex gap-3 flex-wrap">
                <v-btn
                  color="#ee9d2b"
                  size="default"
                  append-icon="mdi-arrow-right"
                  class="font-weight-bold text-none rounded-lg px-5 text-white btn-primary"
                  elevation="2"                  @click="router.push('/')"                >
                  Gửi yêu cầu đổi trả
                </v-btn>
                <v-btn
                  variant="tonal"
                  color="grey-lighten-2"
                  size="default"
                  class="font-weight-bold text-none rounded-lg px-5"                  @click="showChatPopup = true"                >
                  Câu hỏi thường gặp
                </v-btn>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <!-- Features -->
      <v-row class="mb-8">
        <v-col
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          md="4"
        >
          <v-card class="feature-card rounded-xl pa-6 h-100" elevation="0">
            <div class="d-flex flex-column gap-4">
              <div class="feature-icon-circle">
                <v-icon :icon="feature.icon" size="28" class="primary-text"></v-icon>
              </div>
              <div>
                <h3 class="text-h6 font-weight-bold mb-1">{{ feature.title }}</h3>
                <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Process Section -->
      <div class="py-8 mb-6">
        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold mb-2">Quy trình đổi trả hàng</h2>
          <p class="text-body-2 text-grey-darken-1">Thực hiện đổi trả chỉ với 4 bước đơn giản</p>
        </div>

        <v-row>
          <v-col
            v-for="(step, index) in processSteps"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
          >
            <div class="d-flex flex-column gap-4">
              <div class="d-flex align-center gap-4">
                <v-avatar
                  :color="index === 0 ? '#ee9d2b' : 'white'"
                  :class="index === 0 ? 'step-active' : 'step-number'"
                  size="40"
                >
                  <span :class="index === 0 ? 'text-white' : 'primary-text'" class="font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </v-avatar>
                <v-divider 
                  v-if="index < processSteps.length - 1" 
                  class="flex-1-1 d-lg-none"
                ></v-divider>
              </div>
              <v-card class="rounded-xl h-100 step-card" elevation="0">
                <v-card-text class="pa-5">
                  <h3 class="text-subtitle-1 font-weight-bold mb-2">{{ step.title }}</h3>
                  <p class="text-body-2 text-grey-darken-1">{{ step.description }}</p>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Policy Accordions -->
      <div class="mb-6">
        <h2 class="text-h5 font-weight-bold mb-5 px-1">Chi tiết chính sách</h2>
        <v-expansion-panels variant="accordion" class="policy-accordion">
          <v-expansion-panel
            v-for="(policy, index) in policyDetails"
            :key="index"
            class="mb-3 rounded-xl"
            elevation="0"
          >
            <v-expansion-panel-title class="text-subtitle-1 font-weight-bold py-4">
              <span>{{ policy.title }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pt-3">
              <div class="policy-content">
                <p v-if="policy.intro" class="mb-3 text-grey-darken-1 text-body-2">{{ policy.intro }}</p>
                
                <ul v-if="policy.items" class="policy-list">
                  <li v-for="(item, i) in policy.items" :key="i" class="mb-2 text-body-2">
                    {{ item }}
                  </li>
                </ul>

                <!-- Payment methods grid -->
                <v-row v-if="policy.grid" class="mt-4">
                  <v-col
                    v-for="(method, i) in policy.grid"
                    :key="i"
                    cols="12"
                    md="6"
                  >
                    <div class="payment-method-card rounded-lg pa-3">
                      <div class="font-weight-bold text-body-2 mb-1">{{ method.title }}</div>
                      <div class="text-caption text-grey-darken-1">{{ method.time }}</div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- FAQ Section -->
      <div class="py-6 mb-6">
        <h2 class="text-h5 font-weight-bold mb-6">Câu hỏi thường gặp</h2>
        <v-row>
          <v-col
            v-for="(faq, index) in faqs"
            :key="index"
            cols="12"
            md="6"
          >
            <div class="d-flex gap-3 align-start mb-4">
              <v-icon icon="mdi-help-circle-outline" class="primary-text mt-1" size="24"></v-icon>
              <div>
                <h4 class="text-body-1 font-weight-bold mb-1">{{ faq.question }}</h4>
                <p class="text-body-2 text-grey-darken-1">{{ faq.answer }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- CTA Footer -->
      <v-card class="rounded-xl cta-card mb-4" elevation="0">
        <v-card-text class="pa-6 pa-md-8">
          <v-row align="center">
            <v-col cols="12" md="7">
              <h3 class="text-h6 font-weight-bold mb-2">Vẫn cần hỗ trợ?</h3>
              <p class="text-body-2 text-grey-darken-2 mb-0">
                Đội ngũ chăm sóc khách hàng của ToyStore luôn sẵn sàng lắng nghe bạn (8:00 - 21:00).
              </p>
            </v-col>
            <v-col cols="12" md="5" class="d-flex gap-3 justify-end flex-wrap">
              <v-btn
                variant="outlined"
                color="grey-darken-2"
                size="default"
                prepend-icon="mdi-phone"
                class="font-weight-bold text-none rounded-lg"
              >
                1900 1234
              </v-btn>
              <v-btn
                color="#ee9d2b"
                size="default"
                prepend-icon="mdi-chat"
                class="font-weight-bold text-none rounded-lg text-white btn-primary"
                elevation="2"                @click="showChatPopup = true"              >
                Chat ngay
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
    icon: 'mdi-calendar-month',
    title: '30 Ngày đổi trả',
    description: 'Áp dụng cho mọi sản phẩm còn nguyên tem mác và bao bì.'
  },
  {
    icon: 'mdi-truck-delivery',
    title: 'Miễn phí vận chuyển',
    description: 'Hỗ trợ 100% phí ship hai chiều nếu sản phẩm có lỗi từ nhà sản xuất.'
  },
  {
    icon: 'mdi-cash-refund',
    title: 'Hoàn tiền siêu tốc',
    description: 'Nhận lại tiền hoàn trong vòng 24h làm việc sau khi kho xác nhận.'
  }
])

const processSteps = ref([
  {
    title: 'Gửi yêu cầu',
    description: 'Đăng nhập vào tài khoản, chọn đơn hàng và nhấn "Yêu cầu đổi trả".'
  },
  {
    title: 'Xác nhận',
    description: 'CSKH sẽ liên hệ xác nhận tình trạng sản phẩm trong vòng 2h làm việc.'
  },
  {
    title: 'Gửi hàng',
    description: 'Đóng gói sản phẩm cẩn thận. Shipper sẽ đến lấy hàng tận nơi.'
  },
  {
    title: 'Nhận tiền hoàn',
    description: 'Tiền sẽ được hoàn về tài khoản hoặc ví mua sắm sau khi kiểm tra xong.'
  }
])

const policyDetails = ref([
  {
    title: 'Điều kiện đổi trả sản phẩm',
    items: [
      'Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng, giặt tẩy hay sửa chữa.',
      'Còn đầy đủ tem mác, hộp đựng, phụ kiện và quà tặng kèm theo (nếu có).',
      'Yêu cầu đổi trả được gửi trong vòng 30 ngày kể từ ngày nhận hàng.',
      'Có hóa đơn mua hàng hoặc xác nhận đơn hàng điện tử.'
    ]
  },
  {
    title: 'Các trường hợp không áp dụng đổi trả',
    intro: 'Chúng tôi rất tiếc không thể hỗ trợ đổi trả cho các trường hợp sau:',
    items: [
      'Sản phẩm thuộc nhóm xả kho (Clearance) hoặc khuyến mãi đặc biệt ghi rõ "Không đổi trả".',
      'Sản phẩm hư hỏng do lỗi sử dụng từ phía khách hàng (rơi vỡ, va đập mạnh, để nơi ẩm ướt).',
      'Các sản phẩm tiêu hao, đồ chơi lắp ráp đã bị mở seal và mất chi tiết.',
      'Quá thời hạn 30 ngày theo quy định.'
    ]
  },
  {
    title: 'Phương thức hoàn tiền',
    intro: 'ToyStore hỗ trợ hoàn tiền qua các hình thức sau, tùy thuộc vào phương thức thanh toán ban đầu của quý khách:',
    grid: [
      { title: 'Chuyển khoản ngân hàng', time: '3-5 ngày làm việc' },
      { title: 'Ví điện tử (Momo/ZaloPay)', time: '24h làm việc' },
      { title: 'Thẻ tín dụng/ATM', time: '5-10 ngày làm việc (tùy ngân hàng)' },
      { title: 'ToyStore Point (Điểm tích lũy)', time: 'Ngay lập tức' }
    ]
  }
])

const faqs = ref([
  {
    question: 'Tôi làm mất hóa đơn có đổi được không?',
    answer: 'Được. Chúng tôi có thể tra cứu đơn hàng qua số điện thoại mua hàng của bạn.'
  },
  {
    question: 'Phí vận chuyển đổi trả là bao nhiêu?',
    answer: 'Miễn phí nếu lỗi do ToyStore. Nếu đổi theo nhu cầu cá nhân, bạn chỉ cần trả phí ship 1 chiều gửi về.'
  },
  {
    question: 'Tôi có thể đổi sang sản phẩm khác giá cao hơn?',
    answer: 'Tất nhiên! Bạn chỉ cần thanh toán phần chênh lệch giá trị sản phẩm.'
  },
  {
    question: 'Sản phẩm quà tặng có được đổi không?',
    answer: 'Sản phẩm quà tặng không áp dụng chính sách đổi trả/hoàn tiền.'
  }
])
</script>

<style scoped>
.refund-page {
  background-color: #f8f7f6;
  min-height: 100vh;
}

.primary-text {
  color: #ee9d2b !important;
}

.hover-primary:hover {
  color: #ee9d2b !important;
}

.letter-spacing {
  letter-spacing: 0.5px;
}

.line-height-relaxed {
  line-height: 1.6;
}

/* Hero Card */
.hero-card {
  background-color: #ffffff;
  border: 1px solid #e6e1db;
}

.hero-image {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.7s ease;
}

.hero-image:hover {
  transform: scale(1.05);
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, rgba(238, 157, 43, 0.2), transparent);
  z-index: 1;
  border-radius: 12px;
  pointer-events: none;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

/* Process Steps */
.step-card {
  background-color: #ffffff;
  border: 1px solid #e6e1db;
  transition: all 0.3s ease;
}

.step-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.step-number {
  border: 2px solid #ee9d2b;
}

.step-active {
  box-shadow: 0 4px 12px rgba(238, 157, 43, 0.3);
}

/* Policy Accordion */
.policy-accordion :deep(.v-expansion-panel) {
  background-color: #ffffff;
  border: 1px solid #e6e1db;
  margin-bottom: 12px;
}

.policy-accordion :deep(.v-expansion-panel-title) {
  font-size: 0.9375rem;
}

.policy-accordion :deep(.v-expansion-panel-title__icon) {
  color: #897961;
}

.policy-accordion :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 20px 20px 20px;
  border-top: 1px solid #f4f3f0;
}

.policy-list {
  list-style: none;
  padding-left: 0;
}

.policy-list li {
  position: relative;
  padding-left: 20px;
  color: #897961;
  line-height: 1.6;
}

.policy-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #ee9d2b;
  font-weight: bold;
}

/* Payment Methods */
.payment-method-card {
  background-color: #f4f3f0;
  border: 1px solid #e6e1db;
}

/* CTA Card */
.cta-card {
  background: rgba(238, 157, 43, 0.1);
  border: 1px solid #e6e1db;
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
    max-width: 300px;
    margin: 0 auto;
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
