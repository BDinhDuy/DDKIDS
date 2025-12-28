/**
 * Constants
 * Application-wide constants and configuration
 */

// ==================== THEME ====================
export const THEME = {
  PRIMARY_COLOR: "#ee9d2b",
  PRIMARY_DARK: "#d68a1f",
  BACKGROUND_LIGHT: "#f8f7f6",
  BACKGROUND_CARD: "#ffffff",
  BORDER_COLOR: "#f4f3f0",
  BORDER_LIGHT: "#e6e1db",
  TEXT_PRIMARY: "#181511",
  TEXT_SECONDARY: "#897961",
};

// ==================== ROUTES ====================
export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  POLICY: "/policy",
  POLICY_REFUND: "/policy-refund",
  POLICY_SHIPPING: "/policy-transition",
  FORM_REFUND: "/form-refund",
  CONTACT: "/contact",
  ORDER_SUCCESS: "/orderSuccess",
};

// ==================== PAYMENT ====================
export const PAYMENT_METHODS = {
  MOMO: "momo",
  BANK: "bank",
  COD: "cod",
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.MOMO]: "Ví MoMo",
  [PAYMENT_METHODS.BANK]: "Chuyển khoản ngân hàng",
  [PAYMENT_METHODS.COD]: "Thanh toán khi nhận hàng (COD)",
};

// ==================== BANK INFO ====================
export const BANKS = [
  { id: "vietcombank", name: "Vietcombank", color: "#007f3d" },
  { id: "techcombank", name: "Techcombank", color: "#e30613" },
  { id: "acb", name: "ACB", color: "#0057a8" },
  { id: "bidv", name: "BIDV", color: "#00843d" },
];

// ==================== SHIPPING ====================
export const SHIPPING_FEE = 30000;
export const FREE_SHIPPING_THRESHOLD = 500000;

export const SHIPPING_METHODS = {
  STANDARD: "standard",
  EXPRESS: "express",
  SUPER_FAST: "super_fast",
};

export const SHIPPING_METHOD_LABELS = {
  [SHIPPING_METHODS.STANDARD]: "Giao hàng tiêu chuẩn",
  [SHIPPING_METHODS.EXPRESS]: "Giao hàng nhanh",
  [SHIPPING_METHODS.SUPER_FAST]: "Giao hàng hỏa tốc",
};

// ==================== ORDER STATUS ====================
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPING: "shipping",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Chờ xác nhận",
  [ORDER_STATUS.PROCESSING]: "Đang xử lý",
  [ORDER_STATUS.SHIPPING]: "Đang giao hàng",
  [ORDER_STATUS.COMPLETED]: "Hoàn thành",
  [ORDER_STATUS.CANCELLED]: "Đã hủy",
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "orange",
  [ORDER_STATUS.PROCESSING]: "blue",
  [ORDER_STATUS.SHIPPING]: "purple",
  [ORDER_STATUS.COMPLETED]: "green",
  [ORDER_STATUS.CANCELLED]: "red",
};

// ==================== STORAGE KEYS ====================
export const STORAGE_KEYS = {
  CURRENT_ORDER: "currentOrder",
  SHIPPING_INFO: "shippingInfo",
  CART_ITEMS: "cart_items",
  USER_TOKEN: "userToken",
  USER_INFO: "user",
  IS_LOGGED_IN: "isLoggedIn",
  BIRTHDAY_SHOWN: "birthdayShown",
};

// ==================== COUPONS ====================
export const COUPONS = {
  DISCOUNT10: {
    code: "DISCOUNT10",
    percentage: 10,
    description: "Giảm giá 10%",
    minOrder: 0,
  },
  DISCOUNT20: {
    code: "DISCOUNT20",
    percentage: 20,
    description: "Giảm giá 20%",
    minOrder: 1000000,
  },
  FREESHIP: {
    code: "FREESHIP",
    type: "shipping",
    description: "Miễn phí vận chuyển",
    minOrder: 0,
  },
};

// ==================== VALIDATION ====================
export const VALIDATION = {
  PHONE_REGEX: /^0\d{9}$/,
  EMAIL_REGEX: /.+@.+\..+/,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
};

// ==================== APP INFO ====================
export const APP_INFO = {
  NAME: "DDKIDS",
  FULL_NAME: "ToyStore - Đồ chơi trẻ em",
  HOTLINE: "1900 1234",
  EMAIL: "support@ddkids.vn",
  ADDRESS: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
};

// ==================== PAGINATION ====================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  PAGE_SIZES: [12, 24, 36, 48],
};

// ==================== DATE FORMAT ====================
export const DATE_FORMAT = {
  SHORT: "dd/MM",
  MEDIUM: "dd/MM/yyyy",
  LONG: "dd/MM/yyyy HH:mm",
  ISO: "yyyy-MM-dd",
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
