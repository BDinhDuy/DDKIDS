export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const copyToClipboard = async (text, message = "Đã sao chép") => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message };
  } catch (error) {
    console.error("Failed to copy:", error);
    return { success: false, message: "Không thể sao chép" };
  }
};

export const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
};

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

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

export const generateOrderNumber = () => {
  return `TOY${Date.now()}`;
};

export const calculateDiscount = (total, percentage) => {
  return Math.round(total * (percentage / 100));
};

//Chỉ gọi hàm SAU KHI user NGỪNG thao tác trong khoảng thời gian wait (ms)
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
