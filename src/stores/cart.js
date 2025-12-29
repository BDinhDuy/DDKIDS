import { defineStore } from "pinia";

// Storage key
const STORAGE_KEY = "cart_items";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    loading: false,
    error: null,
  }),

  actions: {
    initCart() {
      try {
        const savedCart = localStorage.getItem(STORAGE_KEY);
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
      } catch (error) {
        console.error("Init cart error:", error);
        this.cartItems = [];
      }
    },

    saveCart() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cartItems));
      } catch (error) {
        console.error("Save cart error:", error);
      }
    },

    addToCart(product, quantity = 1) {
      if (!product || !product.id) {
        console.error("Invalid product");
        return;
      }

      try {
        const existingItem = this.cartItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.cartItems.push({ ...product, quantity });
        }

        this.saveCart();
        this.error = null;
      } catch (error) {
        console.error("Add to cart error:", error);
        this.error = "Không thể thêm sản phẩm vào giỏ hàng";
        throw error;
      }
    },

    removeFromCart(productId) {
      try {
        this.cartItems = this.cartItems.filter((item) => item.id !== productId);
        this.saveCart();
        this.error = null;
      } catch (error) {
        console.error("Remove from cart error:", error);
        this.error = "Không thể xóa sản phẩm khỏi giỏ hàng";
        throw error;
      }
    },

    updateQuantity(productId, quantity) {
      try {
        const item = this.cartItems.find((item) => item.id === productId);

        if (item) {
          if (quantity <= 0) {
            this.removeFromCart(productId);
          } else {
            item.quantity = quantity;
            this.saveCart();
          }
        }

        this.error = null;
      } catch (error) {
        console.error("Update quantity error:", error);
        this.error = "Không thể cập nhật số lượng";
        throw error;
      }
    },

    clearCart() {
      try {
        this.cartItems = [];
        this.saveCart();
        this.error = null;
      } catch (error) {
        console.error("Clear cart error:", error);
        this.error = "Không thể xóa giỏ hàng";
        throw error;
      }
    },

    isInCart(productId) {
      return this.cartItems.some((item) => item.id === productId);
    },

    getProductQuantity(productId) {
      const item = this.cartItems.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
  },

  getters: {
    cartCount: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },

    uniqueProductCount: (state) => state.cartItems.length,

    totalAmount: (state) => {
      return state.cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
      );
    },
    
    isEmpty: (state) => state.cartItems.length === 0,
  },
});
