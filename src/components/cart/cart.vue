<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold mb-6">Giỏ hàng của bạn</h1>

    <v-row v-if="cartStore.cartCount > 0">
      <!-- Danh sách sản phẩm -->
      <v-col cols="12" md="8">
        <v-card flat border rounded="lg">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Sản phẩm</th>
                <th class="text-center">Số lượng</th>
                <th class="text-right">Đơn giá</th>
                <th class="text-right">Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.cartItems" :key="item.id">
                <td class="py-4">
                  <div class="d-flex align-center">
                    <v-img :src="item.image" width="70" height="70" cover class="rounded mr-4"></v-img>
                    <div>
                      <div class="font-weight-bold mb-1">{{ item.name }}</div>
                      <v-btn variant="text" size="x-small" color="error" class="px-0 text-none" @click="cartStore.removeFromCart(item.id)">
                        Xóa khỏi giỏ
                      </v-btn>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex align-center justify-center">
                    <v-btn icon="mdi-minus" size="x-small" variant="outlined" @click="item.quantity > 1 ? item.quantity-- : null"></v-btn>
                    <span class="mx-3">{{ item.quantity }}</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="outlined" @click="item.quantity++"></v-btn>
                  </div>
                </td>
                <td class="text-right">{{ item.price.toLocaleString() }}đ</td>
                <td class="text-right font-weight-bold">{{ (item.price * item.quantity).toLocaleString() }}đ</td>
                <td class="text-right">
                  <v-btn icon="mdi-close" variant="text" size="small" color="grey" @click="cartStore.removeFromCart(item.id)"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Tóm tắt đơn hàng -->
      <v-col cols="12" md="4">
        <v-card flat border rounded="lg" class="pa-6 sticky-sidebar">
          <div class="text-h6 font-weight-bold mb-4">Tóm tắt đơn hàng</div>
          
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey-darken-1">Tạm tính:</span>
            <span>{{ cartStore.totalAmount.toLocaleString() }}đ</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-grey-darken-1">Phí vận chuyển:</span>
            <span class="text-success">Miễn phí</span>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6 font-weight-bold">Tổng cộng:</span>
            <span class="text-h6 font-weight-bold text-error">{{ cartStore.totalAmount.toLocaleString() }}đ</span>
          </div>

          <v-btn
            color="#ffa500"
            size="large"
            block
            flat
            class="text-none font-weight-bold"
            @click="router.push('/checkout')"
          >
            TIẾN HÀNH THANH TOÁN
          </v-btn>
          
          <v-btn
            variant="text"
            block
            class="text-none mt-2"
            color="grey-darken-1"
            @click="router.push('/product')"
          >
            Tiếp tục mua sắm
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Giỏ hàng trống -->
    <v-card v-else flat border rounded="lg" class="pa-12 text-center">
      <v-icon size="100" color="grey-lighten-2" class="mb-4">mdi-cart-off</v-icon>
      <div class="text-h5 text-grey-darken-1 mb-6">Giỏ hàng của bạn đang trống</div>
      <v-btn color="#2d7a5e" size="large" @click="router.push('/')">
        QUAY LẠI CỬA HÀNG
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useCartStore } from '../../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 100px;
}
</style>