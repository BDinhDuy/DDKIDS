import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // State: Danh sách sản phẩm trong giỏ
    cartItems: []
  }),
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId)
    }
  },

})
