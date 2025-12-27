<template>
  <div class="address-book-tab">
    <!-- Header -->
    <div class="tab-header mb-6">
      <div class="header-content">
        <div>
          <h2 class="tab-title">Sổ địa chỉ</h2>
          <p class="tab-subtitle">
            Quản lý địa chỉ giao hàng để đặt đồ chơi cho bé nhanh chóng hơn.
          </p>
        </div>
        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-plus"
          @click="openAddDialog"
          class="add-btn"
        >
          Thêm địa chỉ mới
        </v-btn>
      </div>
    </div>

    <!-- Address Grid -->
    <div class="address-grid">
      <!-- Address Cards -->
      <v-card
        v-for="address in addresses"
        :key="address.id"
        :class="['address-card', { 'default-card': address.isDefault }]"
        elevation="0"
      >
        <!-- Card Header -->
        <div class="card-header">
          <div class="address-info">
            <div class="name-badges">
              <span class="address-name">{{ address.name }}</span>
              <v-chip
                v-if="address.isDefault"
                size="x-small"
                color="primary"
                variant="flat"
                class="default-badge"
              >
                Mặc định
              </v-chip>
              <v-chip
                size="x-small"
                color="grey"
                variant="flat"
                class="type-badge"
              >
                {{ address.type }}
              </v-chip>
            </div>
            <span class="address-phone">{{ address.phone }}</span>
          </div>
          <v-avatar
            :color="address.isDefault ? 'primary' : 'grey-lighten-3'"
            size="40"
            class="address-icon"
          >
            <v-icon :color="address.isDefault ? 'white' : 'grey'">
              {{ getAddressIcon(address.type) }}
            </v-icon>
          </v-avatar>
        </div>

        <!-- Address Details -->
        <div class="address-details">
          <p class="address-text">{{ address.fullAddress }}</p>
        </div>

        <v-divider class="my-4"></v-divider>

        <!-- Card Actions -->
        <div class="card-actions">
          <div class="action-buttons">
            <v-btn
              variant="text"
              color="grey-darken-1"
              size="small"
              prepend-icon="mdi-pencil"
              @click="editAddress(address)"
            >
              {{ address.isDefault ? 'Chỉnh sửa' : 'Sửa' }}
            </v-btn>
            <v-btn
              v-if="!address.isDefault"
              variant="text"
              color="red"
              size="small"
              prepend-icon="mdi-delete"
              @click="confirmDelete(address)"
            >
              Xóa
            </v-btn>
          </div>
          <v-btn
            v-if="!address.isDefault"
            variant="outlined"
            color="primary"
            size="small"
            @click="setAsDefault(address.id)"
          >
            Đặt làm mặc định
          </v-btn>
        </div>
      </v-card>

      <!-- Add New Card -->
      <v-card
        class="add-new-card"
        elevation="0"
        @click="openAddDialog"
      >
        <div class="add-new-content">
          <v-avatar
            size="64"
            color="grey-lighten-3"
            class="add-icon"
          >
            <v-icon size="32" color="primary">mdi-map-marker-plus</v-icon>
          </v-avatar>
          <span class="add-text">Thêm địa chỉ mới</span>
        </div>
      </v-card>
    </div>

    <!-- Support Banner -->
    <v-card class="support-banner mt-6" color="blue-lighten-5" elevation="0">
      <v-card-text class="support-content">
        <div class="support-info">
          <v-avatar size="48" color="white">
            <v-icon color="blue" size="28">mdi-headset</v-icon>
          </v-avatar>
          <div>
            <h4 class="support-title">Gặp khó khăn với địa chỉ?</h4>
            <p class="support-text">
              Liên hệ CSKH để được hỗ trợ thay đổi địa chỉ đơn hàng.
            </p>
          </div>
        </div>
        <div class="support-actions">
          <v-btn variant="outlined" color="grey-darken-2" @click="openChat">
            Chat ngay
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="showDialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          <span>{{ isEditing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới' }}</span>
          <v-btn icon variant="text" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-6">
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.name"
                  label="Họ và tên người nhận"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.phone"
                  label="Số điện thoại"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.phone]"
                  prepend-inner-icon="mdi-phone"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="formData.type"
                  label="Loại địa chỉ"
                  :items="addressTypes"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-tag"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formData.fullAddress"
                  label="Địa chỉ chi tiết"
                  variant="outlined"
                  rows="3"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-checkbox
                  v-model="formData.isDefault"
                  label="Đặt làm địa chỉ mặc định"
                  color="primary"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="closeDialog">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loading"
            @click="saveAddress"
          >
            {{ isEditing ? 'Cập nhật' : 'Thêm địa chỉ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          Xác nhận xóa
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-6">
          <p>Bạn có chắc chắn muốn xóa địa chỉ này không?</p>
          <p class="text-grey mt-2">Hành động này không thể hoàn tác.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="showDeleteDialog = false">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="deleteAddress">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      location="top"
      rounded="pill"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbarIcon }}</v-icon>
        <span>{{ snackbarMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  addresses: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['update:addresses', 'set-default', 'open-chat'])

// Refs
const showDialog = ref(false)
const showDeleteDialog = ref(false)
const isEditing = ref(false)
const formRef = ref(null)
const loading = ref(false)
const addressToDelete = ref(null)

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle')

// Form data
const formData = ref({
  id: null,
  name: '',
  phone: '',
  type: 'Nhà riêng',
  fullAddress: '',
  isDefault: false
})

// Sample addresses data
const addressesData = ref([
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    phone: '090 123 4567',
    type: 'Nhà riêng',
    fullAddress: 'Số 15, Ngõ 234 Đường Hoàng Quốc Việt, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội',
    isDefault: true
  },
  {
    id: 2,
    name: 'Nguyễn Thị Mai',
    phone: '090 999 8888',
    type: 'Văn phòng',
    fullAddress: 'Tầng 12, Tòa nhà Keangnam Landmark 72, Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    isDefault: false
  },
  {
    id: 3,
    name: 'Nguyễn Văn Hùng',
    phone: '091 234 5678',
    type: 'Nhà ông bà',
    fullAddress: 'Số 5, Đường Trần Phú, Phường Văn Quán, Quận Hà Đông, Hà Nội',
    isDefault: false
  }
])

// Address types
const addressTypes = [
  'Nhà riêng',
  'Văn phòng',
  'Nhà ông bà',
  'Khác'
]

// Validation rules
const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
  phone: value => {
    const pattern = /^[0-9]{10,11}$/
    return pattern.test(value.replace(/\s/g, '')) || 'Số điện thoại không hợp lệ'
  }
}

// Computed
const addresses = computed(() => {
  return props.addresses.length > 0 ? props.addresses : addressesData.value
})

// Methods
const getAddressIcon = (type) => {
  const icons = {
    'Nhà riêng': 'mdi-home',
    'Văn phòng': 'mdi-office-building',
    'Nhà ông bà': 'mdi-map-marker',
    'Khác': 'mdi-map-marker'
  }
  return icons[type] || 'mdi-map-marker'
}

const openAddDialog = () => {
  isEditing.value = false
  formData.value = {
    id: null,
    name: '',
    phone: '',
    type: 'Nhà riêng',
    fullAddress: '',
    isDefault: false
  }
  showDialog.value = true
}

const editAddress = (address) => {
  isEditing.value = true
  formData.value = { ...address }
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
  formRef.value?.resetValidation()
}

const saveAddress = async () => {
  const { valid } = await formRef.value.validate()
  
  if (valid) {
    loading.value = true
    
    // Simulate API call
    setTimeout(() => {
      if (isEditing.value) {
        // Update existing address
        const index = addressesData.value.findIndex(a => a.id === formData.value.id)
        if (index > -1) {
          // If setting as default, remove default from others
          if (formData.value.isDefault) {
            addressesData.value.forEach(addr => {
              addr.isDefault = false
            })
          }
          addressesData.value[index] = { ...formData.value }
          showNotification('Cập nhật địa chỉ thành công!', 'success', 'mdi-check-circle')
        }
      } else {
        // Add new address
        const newAddress = {
          ...formData.value,
          id: Date.now()
        }
        
        // If setting as default, remove default from others
        if (newAddress.isDefault) {
          addressesData.value.forEach(addr => {
            addr.isDefault = false
          })
        }
        
        addressesData.value.push(newAddress)
        showNotification('Thêm địa chỉ mới thành công!', 'success', 'mdi-check-circle')
      }
      
      emit('update:addresses', addressesData.value)
      loading.value = false
      closeDialog()
    }, 1000)
  }
}

const confirmDelete = (address) => {
  addressToDelete.value = address
  showDeleteDialog.value = true
}

const deleteAddress = () => {
  const index = addressesData.value.findIndex(a => a.id === addressToDelete.value.id)
  if (index > -1) {
    addressesData.value.splice(index, 1)
    emit('update:addresses', addressesData.value)
    showNotification('Đã xóa địa chỉ', 'info', 'mdi-information')
  }
  showDeleteDialog.value = false
  addressToDelete.value = null
}

const setAsDefault = (addressId) => {
  // Remove default from all addresses
  addressesData.value.forEach(addr => {
    addr.isDefault = addr.id === addressId
  })
  
  emit('set-default', addressId)
  emit('update:addresses', addressesData.value)
  showNotification('Đã đặt làm địa chỉ mặc định', 'success', 'mdi-check-circle')
}

const openChat = () => {
  emit('open-chat')
}

const showNotification = (message, color, icon) => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbarIcon.value = icon
  showSnackbar.value = true
}
</script>

<style scoped>
.address-book-tab {
  width: 100%;
}

/* Header */
.tab-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 1px solid #e6e1db;
}

.tab-title {
  font-size: 24px;
  font-weight: 700;
  color: #181511;
  margin-bottom: 4px;
}

.tab-subtitle {
  font-size: 14px;
  color: #897961;
  line-height: 1.6;
}

.add-btn {
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0;
}

/* Address Grid */
.address-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Address Card */
.address-card {
  border: 1px solid #e6e1db;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  transition: all 0.3s;
}

.address-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: rgba(238, 157, 43, 0.5);
}

.default-card {
  border: 2px solid #ee9d2b;
  box-shadow: 0 0 0 4px rgba(238, 157, 43, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.address-info {
  flex: 1;
  min-width: 0;
}

.name-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.address-name {
  font-size: 18px;
  font-weight: 700;
  color: #181511;
}

.default-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.type-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.address-phone {
  font-size: 14px;
  color: #5c564b;
  font-weight: 500;
}

.address-icon {
  flex-shrink: 0;
}

.address-details {
  flex: 1;
  margin-bottom: 16px;
}

.address-text {
  font-size: 14px;
  color: #5c564b;
  line-height: 1.6;
  margin: 0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: auto;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Add New Card */
.add-new-card {
  border: 2px dashed #e6e1db;
  border-radius: 16px;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.add-new-card:hover {
  border-color: #ee9d2b;
  background-color: rgba(238, 157, 43, 0.05);
}

.add-new-card:hover .add-icon {
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.add-new-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.add-icon {
  transition: all 0.3s;
}

.add-text {
  font-size: 18px;
  font-weight: 700;
  color: #897961;
}

.add-new-card:hover .add-text {
  color: #ee9d2b;
}

/* Support Banner */
.support-banner {
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: 16px;
}

.support-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.support-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.support-title {
  font-size: 16px;
  font-weight: 700;
  color: #181511;
  margin: 0 0 4px 0;
}

.support-text {
  font-size: 14px;
  color: #5c564b;
  margin: 0;
}

.support-actions {
  display: flex;
  gap: 12px;
}

/* Dialog */
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

/* Custom Vuetify overrides */
:deep(.v-text-field .v-field),
:deep(.v-select .v-field),
:deep(.v-textarea .v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

:deep(.v-chip) {
  font-weight: 700;
}

/* Remove button focus outline */
:deep(.v-btn .v-btn__focus-ring) {
  display: none !important;
}

:deep(.v-btn) {
  outline: none !important;
}

/* Responsive */
@media (max-width: 960px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .add-btn {
    width: 100%;
  }
  
  .address-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .card-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .card-actions .v-btn {
    width: 100%;
  }
  
  .support-content {
    flex-direction: column;
    text-align: center;
  }
  
  .support-info {
    flex-direction: column;
  }
  
  .support-actions {
    width: 100%;
  }
  
  .support-actions .v-btn {
    width: 100%;
  }
}
</style>
