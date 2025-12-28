import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    login(userData) {
      this.user = userData;
      this.isLoggedIn = true;
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    },

    initUser() {
      // Load user from localStorage on app initialization
      const savedUser = localStorage.getItem("user");
      const savedLoginStatus = localStorage.getItem("isLoggedIn");

      if (savedUser && savedLoginStatus === "true") {
        this.user = JSON.parse(savedUser);
        this.isLoggedIn = true;
      }
    },

    updateUserInfo(userData) {
      if (this.user) {
        this.user = { ...this.user, ...userData };
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
  },

  getters: {
    userName: (state) => state.user?.name || "",
    userAvatar: (state) => state.user?.avatar || "",
    userEmail: (state) => state.user?.email || "",
    userBirthdate: (state) => state.user?.birthdate || null,
  },
});
