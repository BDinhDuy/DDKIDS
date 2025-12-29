import { STORAGE_KEYS } from "./constants";

export const saveToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const hasInStorage = (key) => {
  return localStorage.getItem(key) !== null;
};

export const saveCurrentOrder = (order) => {
  saveToStorage(STORAGE_KEYS.CURRENT_ORDER, order);
};

export const getCurrentOrder = () => {
  return getFromStorage(STORAGE_KEYS.CURRENT_ORDER);
};

export const removeCurrentOrder = () => {
  removeFromStorage(STORAGE_KEYS.CURRENT_ORDER);
};

export const saveShippingInfo = (shippingInfo) => {
  saveToStorage(STORAGE_KEYS.SHIPPING_INFO, shippingInfo);
};

export const getShippingInfo = () => {
  return getFromStorage(STORAGE_KEYS.SHIPPING_INFO);
};

export const removeShippingInfo = () => {
  removeFromStorage(STORAGE_KEYS.SHIPPING_INFO);
};

export const clearOrderData = () => {
  removeCurrentOrder();
  removeShippingInfo();
};
