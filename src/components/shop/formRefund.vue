<template>
  <v-container fluid class="refund-form-page pa-0">
    <v-container class="py-8 px-4 px-md-8" style="max-width: 1200px;">
      <v-row>
        <!-- Sidebar -->
        <v-col cols="12" lg="4" order="2" order-lg="1">
          <div class="sidebar-content">
            <!-- Policy Card -->
            <v-card class="mb-6 rounded-xl" elevation="1">
              <v-card-text class="pa-6">
                <h3 class="text-h6 font-weight-bold mb-4 d-flex align-center gap-2">
                  <v-icon icon="mdi-shield-check-outline" class="primary-text"></v-icon>
                  Chính sách đổi trả
                </h3>
                <div class="policy-list">
                  <div v-for="(policy, index) in policies" :key="index" class="policy-item d-flex gap-3 mb-4">
                    <v-icon icon="mdi-check-circle" color="green" size="20" class="mt-1"></v-icon>
                    <span class="text-body-2 text-grey-darken-1" v-html="policy"></span>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <!-- Support Card -->
            <v-card class="support-card rounded-xl" elevation="0">
              <v-card-text class="pa-6">
                <h3 class="text-h6 font-weight-bold mb-2">Cần hỗ trợ ngay?</h3>
                <p class="text-body-2 text-grey-darken-1 mb-4">
                  Đội ngũ CSKH của chúng tôi luôn sẵn sàng lắng nghe bạn.
                </p>
                <a href="tel:19001234" class="d-flex align-center gap-2 primary-text text-h6 font-weight-bold text-decoration-none">
                  <v-icon icon="mdi-phone" class="primary-text"></v-icon>
                  1900 1234
                </a>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <!-- Form Section -->
        <v-col cols="12" lg="8" order="1" order-lg="2">
          <v-card class="rounded-xl" elevation="1">
            <!-- Form Header -->
            <div class="pa-6 pa-md-8 border-b">
              <h1 class="text-h4 text-md-h3 font-weight-black mb-2">Yêu cầu Trả hàng</h1>
              <p class="text-body-2 text-grey-darken-1">
                Chúng tôi rất tiếc vì sản phẩm không như ý. Vui lòng điền thông tin dưới đây để chúng tôi hỗ trợ bạn đổi trả nhanh nhất.
              </p>
            </div>

            <!-- Form Body -->
            <v-form ref="formRef" @submit.prevent="handleSubmit" class="pa-6 pa-md-8">
              <!-- Section 1: Order Info -->
              <div class="mb-8">
                <div class="section-title mb-6">
                  <v-avatar color="primary-lighten-4" size="24" class="mr-2">
                    <span class="text-caption primary-text font-weight-bold">1</span>
                  </v-avatar>
                  <span class="text-caption text-grey-darken-1 font-weight-bold text-uppercase">
                    Thông tin đơn hàng
                  </span>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.orderId"
                      label="Mã đơn hàng"
                      placeholder="VD: #ORD-2023-001"
                      prepend-inner-icon="mdi-receipt-text-outline"
                      variant="outlined"
                      color="primary"
                      :rules="[v => !!v || 'Vui lòng nhập mã đơn hàng']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.orderDate"
                      label="Ngày đặt hàng"
                      type="date"
                      prepend-inner-icon="mdi-calendar"
                      variant="outlined"
                      color="primary"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.productName"
                      label="Tên sản phẩm muốn trả"
                      placeholder="VD: Bộ lắp ráp Lego City - Trạm cứu hỏa"
                      prepend-inner-icon="mdi-cube-outline"
                      variant="outlined"
                      color="primary"
                      :rules="[v => !!v || 'Vui lòng nhập tên sản phẩm']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <!-- Section 2: Return Details -->
              <div class="mb-8 pt-6 border-t">
                <div class="section-title mb-6">
                  <v-avatar color="primary-lighten-4" size="24" class="mr-2">
                    <span class="text-caption primary-text font-weight-bold">2</span>
                  </v-avatar>
                  <span class="text-caption text-grey-darken-1 font-weight-bold text-uppercase">
                    Chi tiết đổi trả
                  </span>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="form.returnReason"
                      label="Lý do trả hàng"
                      :items="returnReasons"
                      prepend-inner-icon="mdi-help-circle-outline"
                      variant="outlined"
                      color="primary"
                      :rules="[v => !!v || 'Vui lòng chọn lý do']"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.quantity"
                      label="Số lượng"
                      type="number"
                      min="1"
                      variant="outlined"
                      color="primary"
                      :rules="[v => !!v || 'Vui lòng nhập số lượng']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="mb-2">
                      <span class="text-body-2 font-weight-medium">Tình trạng sản phẩm</span>
                    </div>
                    <v-radio-group v-model="form.condition" inline>
                      <v-radio
                        v-for="condition in conditions"
                        :key="condition.value"
                        :label="condition.label"
                        :value="condition.value"
                        color="primary"
                        class="condition-radio"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.description"
                      label="Mô tả thêm (Tùy chọn)"
                      placeholder="Chi tiết lỗi sản phẩm hoặc ghi chú cho nhân viên..."
                      variant="outlined"
                      color="primary"
                      rows="3"
                      no-resize
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <div class="mb-2">
                      <span class="text-body-2 font-weight-medium">Hình ảnh sản phẩm (Nếu có lỗi)</span>
                    </div>
                    <v-file-input
                      v-model="form.images"
                      accept="image/*"
                      prepend-icon=""
                      prepend-inner-icon="mdi-camera"
                      variant="outlined"
                      color="primary"
                      placeholder="Kéo thả hoặc nhấn để tải ảnh lên"
                      hint="Hỗ trợ JPG, PNG (Tối đa 5MB)"
                      persistent-hint
                      multiple
                      chips
                      class="file-upload"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </div>

              <!-- Section 3: Contact Info -->
              <div class="mb-6 pt-6 border-t">
                <div class="section-title mb-6">
                  <v-avatar color="primary-lighten-4" size="24" class="mr-2">
                    <span class="text-caption primary-text font-weight-bold">3</span>
                  </v-avatar>
                  <span class="text-caption text-grey-darken-1 font-weight-bold text-uppercase">
                    Thông tin liên hệ
                  </span>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.fullName"
                      label="Họ và tên"
                      placeholder="Nguyễn Văn A"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      color="primary"
                      :rules="[v => !!v || 'Vui lòng nhập họ tên']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.phone"
                      label="Số điện thoại"
                      placeholder="0912 xxx xxx"
                      prepend-inner-icon="mdi-phone-outline"
                      variant="outlined"
                      color="primary"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      placeholder="email@example.com"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                      color="primary"
                      hint="Chúng tôi sẽ gửi thông tin xác nhận qua email này."
                      persistent-hint
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <!-- Submit Button -->
              <div class="pt-6 border-t">
                <v-btn
                  type="submit"
                  color="#ee9d2b"
                  size="x-large"
                  block
                  class="font-weight-bold text-none rounded-xl text-white submit-btn"
                  elevation="2"
                  append-icon="mdi-send"
                >
                  Gửi yêu cầu trả hàng
                </v-btn>
                <p class="text-center text-caption text-grey-darken-1 mt-4">
                  Bằng việc gửi yêu cầu, bạn đồng ý với 
                  <a href="#" class="primary-text text-decoration-none">Chính sách bảo mật</a> và 
                  <a href="#" class="primary-text text-decoration-none">Điều khoản đổi trả</a> của ToyStore.
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500" persistent>
      <v-card class="rounded-xl text-center">
        <v-card-text class="pa-8">
          <div class="mb-4">
            <v-avatar color="green" size="80">
              <v-icon icon="mdi-check-circle" size="50" color="white"></v-icon>
            </v-avatar>
          </div>
          <h2 class="text-h5 font-weight-bold mb-3">Gửi yêu cầu thành công!</h2>
          <p class="text-body-2 text-grey-darken-1 mb-4">
            Chúng tôi đã nhận được yêu cầu trả hàng của bạn. Đội ngũ CSKH sẽ liên hệ với bạn trong vòng 24h.
          </p>
          <v-progress-circular
            :model-value="(countdown / 5) * 100"
            :size="60"
            :width="6"
            color="primary"
            class="mb-3"
          >
            <span class="text-h6 font-weight-bold">{{ countdown }}</span>
          </v-progress-circular>
          <p class="text-caption text-grey-darken-1">
            Tự động quay về trang chủ sau {{ countdown }} giây...
          </p>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-btn
            color="#ee9d2b"
            variant="text"
            block
            size="large"
            class="font-weight-bold text-none"
            @click="redirectToHome"
          >
            Quay về trang chủ ngay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { useCountdown } from '@/composables/useCountdown'

const router = useRouter()
const showSuccessDialog = ref(false)

// Use composables
const { formData: form, formRef, handleSubmit: submitForm } = useForm({
  orderId: '',
  orderDate: '',
  productName: '',
  returnReason: '',
  quantity: 1,
  condition: 'new',
  description: '',
  images: [],
  fullName: '',
  phone: '',
  email: ''
})

const { countdown, start: startCountdown } = useCountdown(5)

const policies = ref([
  'Đổi trả miễn phí trong vòng <strong class="primary-text">30 ngày</strong> kể từ khi nhận hàng.',
  'Hoàn tiền 100% nếu sản phẩm có lỗi từ nhà sản xuất.',
  'Hỗ trợ lấy hàng tận nhà cho đơn hàng trên 500k.'
])

const form = ref({
  orderId: '',
  orderDate: '',
  productName: '',
  returnReason: '',
  quantity: 1,
  condition: 'new',
  description: '',
  images: [],
  fullName: '',
  phone: '',
  email: ''
})

const returnReasons = ref([
  { title: 'Sản phẩm bị lỗi / Hư hỏng', value: 'defective' },
  { title: 'Giao sai sản phẩm', value: 'wrong_item' },
  { title: 'Thiếu phụ kiện', value: 'missing_parts' },
  { title: 'Không ưng ý / Đổi ý', value: 'unsatisfied' },
  { title: 'Khác', value: 'other' }
])

const conditions = ref([
  { label: 'Còn nguyên tem / Chưa mở', value: 'new' },
  { label: 'Đã mở hộp / Đã sử dụng thử', value: 'opened' },
  { label: 'Hư hỏng bao bì', value: 'damaged' }
])

const phoneRules = [
  v => !!v || 'Vui lòng nhập số điện thoại',
  v => /^0\d{9}$/.test(v) || 'Số điện thoại không hợp lệ'
]

const emailRules = [
  v => !!v || 'Vui lòng nhập email',
  v => /.+@.+\..+/.test(v) || 'Email không hợp lệ'
]

const redirectToHome = () => {
  router.push('/')
}

const handleSubmit = () => {
  submitForm(async (formData) => {
    console.log('Form submitted:', formData)
    // TODO: Send data to API
    showSuccessDialog.value = true
    startCountdown(redirectToHome)
  })
}
</script>

<style scoped>
.refund-form-page {
  background-color: #f8f7f6;
  min-height: 100vh;
}

.primary-text {
  color: #ee9d2b !important;
}

.border-b {
  border-bottom: 1px solid #f4f3f0;
}

.border-t {
  border-top: 1px solid #f4f3f0;
}

/* Sidebar */
.sidebar-content {
  position: sticky;
  top: 100px;
}

.policy-item {
  line-height: 1.5;
}

.support-card {
  background: linear-gradient(135deg, rgba(238, 157, 43, 0.1) 0%, rgba(238, 157, 43, 0.05) 100%);
  border: 1px solid rgba(238, 157, 43, 0.2);
}

/* Section Title */
.section-title {
  display: flex;
  align-items: center;
}

/* Radio Group */
.condition-radio :deep(.v-label) {
  font-size: 0.875rem;
}

/* File Upload */
.file-upload :deep(.v-field) {
  border: 2px dashed #e0e0e0;
  background-color: #fafafa;
  cursor: pointer;
}

.file-upload :deep(.v-field:hover) {
  border-color: #ee9d2b;
  background-color: #fff9f0;
}

/* Submit Button */
.submit-btn {
  box-shadow: 0 4px 12px rgba(238, 157, 43, 0.3) !important;
}

.submit-btn:hover {
  background-color: #d68a1f !important;
}

/* Gap utilities */
.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

/* Responsive */
@media (max-width: 1280px) {
  .sidebar-content {
    position: relative;
    top: 0;
  }
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
  
  .text-h4 {
    font-size: 1.5rem !important;
  }
}
</style>
