import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State: Danh sách sản phẩm trong giỏ
  const cartItems = ref([
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
  ])

  // Getters
  const cartCount = computed(() => cartItems.value.length)
  const totalAmount = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  })

  // Actions
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
  }

  return {
    cartItems,
    cartCount,
    totalAmount,
    addToCart,
    removeFromCart
  }
})
