<template>
  <v-container fluid class="refund-page pa-0">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="['Trang chủ', 'Chính sách đổi trả']" class="pa-0 mb-6">
        <template v-slot:divider>
          <v-icon size="small">mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :disabled="item === 'Chính sách đổi trả'"
            class="text-body-2"
          >
            {{ item }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <!-- Hero Section -->
      <v-card class="mb-8 overflow-hidden" elevation="2">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdIPfrc737hTUbaClPSUA06KA1Wqq38DuxxrCJnnVtLDCxirXjhoO8CoU7EhLeOCUVcZza77VqVpegiG6Vi7xLzUjDIkg758-PgfHx9g3PT-zRlOl4jo-KE6Pinx0AHnPghtEQftQDfnanNHsOicgt8S3kmT1axQHF4Oc7L3rVYFUSLSZl2EHPhZX38cjQaXwfyDZGJTEYNllyM-kGiOOOJkGHX4MWrN8pRbiafPWfCth93DaegAOSzoGsJ_AnVBmykCYzWhjSDZvV"
              alt="Children playing with colorful wooden toys"
              cover
              height="400"
              class="hero-image"
            >
              <div class="hero-overlay"></div>
            </v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text class="pa-8 d-flex flex-column justify-center h-100">
              <v-chip
                color="primary"
                size="small"
                class="mb-4 font-weight-bold"
                label
              >
                AN TÂM MUA SẮM
              </v-chip>
              <h1 class="text-h3 font-weight-black mb-4">
                Chính sách Đổi trả & Hoàn tiền
              </h1>
              <p class="text-body-1 text-grey-darken-1 mb-6">
                Chúng tôi cam kết mang lại niềm vui trọn vẹn cho bé. Nếu món đồ chơi không phù hợp, 
                ba mẹ có thể đổi trả dễ dàng trong vòng 30 ngày kể từ khi nhận hàng.
              </p>
              <div class="d-flex gap-3 flex-wrap">
                <v-btn
                  color="primary"
                  size="large"
                  append-icon="mdi-arrow-right"
                  elevation="4"
                >
                  Gửi yêu cầu đổi trả
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="large"
                >
                  Câu hỏi thường gặp
                </v-btn>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <!-- Highlight Features -->
      <v-row class="mb-8">
        <v-col
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          md="4"
        >
          <v-card class="h-100 hover-card" elevation="1">
            <v-card-text class="pa-6">
              <v-avatar
                :color="feature.color + '-lighten-4'"
                size="56"
                class="mb-4"
              >
                <v-icon :color="feature.color" size="32">{{ feature.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Process Section -->
      <div class="py-8">
        <div class="mb-6">
          <h2 class="text-h4 font-weight-bold mb-2">Quy trình đổi trả hàng</h2>
          <p class="text-body-1 text-grey-darken-1">Thực hiện đổi trả chỉ với 4 bước đơn giản</p>
        </div>

        <v-row>
          <v-col
            v-for="(step, index) in processSteps"
            :key="index"
            cols="12"
            sm="6"
            md="3"
          >
            <div class="process-step h-100">
              <div class="d-flex align-center mb-4">
                <v-avatar
                  :color="index === 0 ? 'primary' : 'white'"
                  :class="index === 0 ? '' : 'step-number-inactive'"
                  size="48"
                  class="mr-4"
                >
                  <span :class="index === 0 ? 'text-white' : 'text-primary'" class="text-h6 font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </v-avatar>
                <v-divider
                  v-if="index < processSteps.length - 1"
                  class="d-none d-md-block"
                  :style="{ width: '60px' }"
                ></v-divider>
              </div>
              <v-card elevation="1" class="h-100">
                <v-card-text>
                  <h3 class="text-h6 font-weight-bold mb-2">{{ step.title }}</h3>
                  <p class="text-body-2 text-grey-darken-1">{{ step.description }}</p>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Detailed Policy Accordions -->
      <div class="py-8">
        <h2 class="text-h4 font-weight-bold mb-6">Chi tiết chính sách</h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="(policy, index) in policyDetails"
            :key="index"
          >
            <v-expansion-panel-title class="text-h6 font-weight-bold">
              {{ policy.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="text-grey-darken-1 pt-4">
                <p v-if="policy.intro" class="mb-3">{{ policy.intro }}</p>
                
                <ul v-if="policy.items" class="ml-4">
                  <li v-for="(item, i) in policy.items" :key="i" class="mb-2">
                    {{ item }}
                  </li>
                </ul>

                <!-- Special layout for payment methods -->
                <v-row v-if="policy.grid" class="mt-4">
                  <v-col
                    v-for="(method, i) in policy.grid"
                    :key="i"
                    cols="12"
                    md="6"
                  >
                    <v-card color="grey-lighten-4" flat>
                      <v-card-text>
                        <div class="font-weight-bold mb-1">{{ method.title }}</div>
                        <div class="text-body-2 text-grey-darken-1">{{ method.time }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- FAQ Section -->
      <div class="py-8">
        <h2 class="text-h4 font-weight-bold mb-6">Câu hỏi thường gặp</h2>
        <v-row>
          <v-col
            v-for="(faq, index) in faqs"
            :key="index"
            cols="12"
            md="6"
          >
            <div class="d-flex gap-4">
              <v-icon color="primary" size="32">mdi-help-circle</v-icon>
              <div>
                <h4 class="text-h6 font-weight-bold mb-2">{{ faq.question }}</h4>
                <p class="text-body-2 text-grey-darken-1">{{ faq.answer }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- CTA Footer -->
      <v-card color="primary-lighten-5" class="mt-8" elevation="0">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="7">
              <h3 class="text-h5 font-weight-bold mb-2">Vẫn cần hỗ trợ?</h3>
              <p class="text-body-1 text-grey-darken-1">
                Đội ngũ chăm sóc khách hàng của ToyStore luôn sẵn sàng lắng nghe bạn (8:00 - 21:00).
              </p>
            </v-col>
            <v-col cols="12" md="5" class="text-md-right">
              <div class="d-flex gap-3 justify-md-end flex-wrap">
                <v-btn
                  variant="outlined"
                  size="large"
                  prepend-icon="mdi-phone"
                  color="primary"
                >
                  1900 1234
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  prepend-icon="mdi-chat"
                  elevation="4"
                >
                  Chat ngay
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: 'mdi-calendar-month',
    color: 'primary',
    title: '30 Ngày đổi trả',
    description: 'Áp dụng cho mọi sản phẩm còn nguyên tem mác và bao bì.'
  },
  {
    icon: 'mdi-truck-delivery',
    color: 'primary',
    title: 'Miễn phí vận chuyển',
    description: 'Hỗ trợ 100% phí ship hai chiều nếu sản phẩm có lỗi từ nhà sản xuất.'
  },
  {
    icon: 'mdi-cash-fast',
    color: 'primary',
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

.hero-image {
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(238, 157, 43, 0.2) 0%, transparent 100%);
}

.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.step-number-inactive {
  border: 2px solid #ee9d2b;
}

.process-step {
  position: relative;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

/* Smooth transitions */
.v-expansion-panel {
  transition: all 0.3s ease;
}
</style>
