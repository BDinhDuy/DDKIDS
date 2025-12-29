import { defineStore } from "pinia";

// Storage keys
const STORAGE_KEYS = {
  USER: "user",
  IS_LOGGED_IN: "isLoggedIn",
  BIRTHDAY_SHOWN: "birthdayShown",
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoggedIn: false,
    shouldShowBirthdayPopup: false,
    loading: false,
    error: null,
  }),

  actions: {
    login(userData) {
      try {
        this.user = userData;
        this.isLoggedIn = true;
        this.error = null;

        // Save to localStorage
        this.saveUserToStorage(userData);

        // Check and set birthday popup
        this.checkAndSetBirthdayPopup();
      } catch (error) {
        console.error("Login error:", error);
        this.error = "Đăng nhập thất bại";
        throw error;
      }
    },

    checkAndSetBirthdayPopup() {
      if (!this.user?.birthdate) {
        this.shouldShowBirthdayPopup = false;
        return;
      }

      const today = new Date();
      const birthdate = new Date(this.user.birthdate);

      // Check if birthday month matches current month
      if (today.getMonth() === birthdate.getMonth()) {
        const birthdayKey = this.getBirthdayStorageKey();
        const hasShownThisMonth = sessionStorage.getItem(birthdayKey);

        if (!hasShownThisMonth) {
          this.shouldShowBirthdayPopup = true;
          sessionStorage.setItem(birthdayKey, "true");
        }
      }
    },

    closeBirthdayPopup() {
      this.shouldShowBirthdayPopup = false;
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      this.error = null;

      // Clear localStorage
      this.clearUserFromStorage();
    },

    initUser() {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const savedLoginStatus = localStorage.getItem(
          STORAGE_KEYS.IS_LOGGED_IN
        );

        if (savedUser && savedLoginStatus === "true") {
          this.user = JSON.parse(savedUser);
          this.isLoggedIn = true;
          // Don't show birthday popup on init, only on login
          this.shouldShowBirthdayPopup = true;
        }
      } catch (error) {
        console.error("Init user error:", error);
        this.clearUserFromStorage();
      }
    },

    updateUserInfo(userData) {
      if (!this.user) {
        console.warn("No user to update");
        return;
      }

      try {
        this.user = { ...this.user, ...userData };
        this.saveUserToStorage(this.user);
      } catch (error) {
        console.error("Update user error:", error);
        this.error = "Cập nhật thông tin thất bại";
        throw error;
      }
    },

    saveUserToStorage(userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
    },

    clearUserFromStorage() {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    },

    getBirthdayStorageKey() {
      const today = new Date();
      return `${STORAGE_KEYS.BIRTHDAY_SHOWN}_${today.getFullYear()}_${today.getMonth()}`;
    },
  },

  getters: {
    userName: (state) => state.user?.name || "",
    userAvatar: (state) => state.user?.avatar || "",
    userEmail: (state) => state.user?.email || "",
    userPhone: (state) => state.user?.phone || "",
    userBirthdate: (state) => state.user?.birthdate || null,
    isAuthenticated: (state) => state.isLoggedIn && !!state.user,
  },
});
