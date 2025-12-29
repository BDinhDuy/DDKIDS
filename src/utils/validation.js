// Email validation
export const emailRules = [
  (value) => !!value || "Email là bắt buộc",
  (value) => /^[^\s@]+@[^\s@]+\.com$/.test(value) || "Email phải có đuôi .com",
];

export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: "Email là bắt buộc" };
  }
  if (!/^[^\s@]+@[^\s@]+\.com$/.test(email)) {
    return { valid: false, error: "Email phải có đuôi .com" };
  }
  return { valid: true, error: "" };
};

// Password validation
export const passwordRules = [
  (value) => !!value || "Mật khẩu là bắt buộc",
  (value) => value.length >= 8 || "Mật khẩu phải có ít nhất 8 ký tự",
];

export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, error: "Mật khẩu là bắt buộc" };
  }
  if (password.length < 8) {
    return { valid: false, error: "Mật khẩu phải có ít nhất 8 ký tự" };
  }
  return { valid: true, error: "" };
};

// Name validation
export const nameRules = [
  (value) => !!value || "Tên là bắt buộc",
  (value) => value.length >= 3 || "Tên phải có ít nhất 3 ký tự",
];

export const validateName = (name) => {
  if (!name) {
    return { valid: false, error: "Tên là bắt buộc" };
  }
  if (name.length < 3) {
    return { valid: false, error: "Tên phải có ít nhất 3 ký tự" };
  }
  return { valid: true, error: "" };
};

// Phone validation (Vietnam phone numbers)
export const phoneRules = [
  (value) => !!value || "Số điện thoại là bắt buộc",
  (value) =>
    /^(0[3|5|7|8|9])+([0-9]{8})$/.test(value) || "Số điện thoại không hợp lệ",
];

export const validatePhone = (phone) => {
  if (!phone) {
    return { valid: false, error: "Số điện thoại là bắt buộc" };
  }
  if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone)) {
    return { valid: false, error: "Số điện thoại không hợp lệ" };
  }
  return { valid: true, error: "" };
};

// Confirm password validation (requires original password)
export const confirmPasswordRules = (password) => [
  (value) => !!value || "Xác nhận mật khẩu là bắt buộc",
  (value) => value === password || "Mật khẩu không khớp",
];

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { valid: false, error: "Xác nhận mật khẩu là bắt buộc" };
  }
  if (confirmPassword !== password) {
    return { valid: false, error: "Mật khẩu không khớp" };
  }
  return { valid: true, error: "" };
};

// Terms validation
export const termsRules = [
  (value) => !!value || "Bạn phải đồng ý với điều khoản",
];

// Required field validation
export const requiredRules = (fieldName = "Trường này") => [
  (value) => !!value || `${fieldName} là bắt buộc`,
];

export const validateRequired = (value, fieldName = "Trường này") => {
  if (!value) {
    return { valid: false, error: `${fieldName} là bắt buộc` };
  }
  return { valid: true, error: "" };
};
