import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [
      {
        id: 1,
        name: 'Đồ chơi lắp ráp Lego Robot DDKIDS 2024',
        price: 250000,
        quantity: 1,
        image: 'https://picsum.photos/50'
      },
      {
        id: 2,
        name: 'Gấu bông Teddy cao cấp cho bé',
        price: 180000,
        quantity: 1,
        image: 'https://picsum.photos/50'
      }
    ]
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
    },
    
  },
  getters: {
    cartCount: (state) => state.cartItems.length,
    totalAmount: (state) => {
      return state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }
  }
})
