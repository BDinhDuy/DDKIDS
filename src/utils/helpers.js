/**
 * Helper Functions
 * Common utility functions used across the application
 */

/**
 * Format price to Vietnamese currency
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

/**
 * Copy text to clipboard with async/await
 * @param {string} text - Text to copy
 * @param {string} message - Success message to return
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const copyToClipboard = async (text, message = "Đã sao chép") => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message };
  } catch (error) {
    console.error("Failed to copy:", error);
    return { success: false, message: "Không thể sao chép" };
  }
};

/**
 * Get future date from today
 * @param {number} daysFromNow - Number of days from today
 * @returns {string} Formatted date string (dd/mm)
 */
export const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
};

/**
 * Format full date
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string (dd/mm/yyyy)
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Format date with time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string with time
 */
export const formatDateTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Generate unique order number based on timestamp
 * @returns {string} Order number
 */
export const generateOrderNumber = () => {
  return `TOY${Date.now()}`;
};

/**
 * Calculate discount amount
 * @param {number} total - Total amount
 * @param {number} percentage - Discount percentage (0-100)
 * @returns {number} Discount amount
 */
export const calculateDiscount = (total, percentage) => {
  return Math.round(total * (percentage / 100));
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
