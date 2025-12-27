/**
 * Constants
 * Application-wide constants and configuration
 */

// Payment Methods
export const PAYMENT_METHODS = {
  MOMO: "momo",
  BANK: "bank",
  COD: "cod",
};

// Bank Information
export const BANKS = [
  { id: "vietcombank", name: "Vietcombank", color: "#007f3d" },
  { id: "techcombank", name: "Techcombank", color: "#e30613" },
  { id: "acb", name: "ACB", color: "#0057a8" },
  { id: "bidv", name: "BIDV", color: "#00843d" },
];

// Shipping
export const SHIPPING_FEE = 30000;
export const DDKIDS = "DDKIDS";

// LocalStorage Keys
export const STORAGE_KEYS = {
  CURRENT_ORDER: "currentOrder",
  SHIPPING_INFO: "shippingInfo",
  CART_ITEMS: "cartItems",
  USER_TOKEN: "userToken",
  USER_INFO: "userInfo",
};

// Coupon Codes
export const COUPONS = {
  DISCOUNT10: {
    code: "DISCOUNT10",
    percentage: 10,
    description: "Giảm giá 10%",
  },
};

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPING: "shipping",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Theme Colors
export const COLORS = {
  PRIMARY: "#ee9d2b",
  SECONDARY: "#897961",
  SUCCESS: "#4caf50",
  ERROR: "#ef5350",
  WARNING: "#ff9800",
  INFO: "#2196f3",
  BACKGROUND: "#f8f7f6",
  BORDER: "#e6e1db",
};

// Order Timeline Steps
export const ORDER_STEPS = [
  {
    title: "Đã đặt hàng",
    status: "completed",
    icon: "mdi-check-circle",
  },
  {
    title: "Đang xử lý",
    status: "active",
    icon: "mdi-package-variant",
  },
  {
    title: "Đang giao",
    status: "pending",
    icon: "mdi-truck-delivery",
    daysFromNow: 1,
  },
  {
    title: "Thành công",
    status: "pending",
    icon: "mdi-check-circle-outline",
    daysFromNow: 3,
  },
];

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Trường này là bắt buộc",
  INVALID_EMAIL: "Email không hợp lệ",
  INVALID_PHONE: "Số điện thoại không hợp lệ",
  PASSWORD_MIN_LENGTH: "Mật khẩu phải có ít nhất 8 ký tự",
  PASSWORD_NOT_MATCH: "Mật khẩu không khớp",
};

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  PROVINCES: "https://provinces.open-api.vn/api",
  // Add more endpoints as needed
};
