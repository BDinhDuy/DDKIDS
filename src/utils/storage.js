/**
 * LocalStorage Service
 * Centralized localStorage management with type safety
 */

import { STORAGE_KEYS } from "./constants";

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const saveToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Parsed value or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

/**
 * Clear all localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Check if key exists in localStorage
 * @param {string} key - Storage key
 * @returns {boolean}
 */
export const hasInStorage = (key) => {
  return localStorage.getItem(key) !== null;
};

// Specific storage functions for common use cases

/**
 * Save current order
 * @param {Object} order - Order object
 */
export const saveCurrentOrder = (order) => {
  saveToStorage(STORAGE_KEYS.CURRENT_ORDER, order);
};

/**
 * Get current order
 * @returns {Object|null}
 */
export const getCurrentOrder = () => {
  return getFromStorage(STORAGE_KEYS.CURRENT_ORDER);
};

/**
 * Remove current order
 */
export const removeCurrentOrder = () => {
  removeFromStorage(STORAGE_KEYS.CURRENT_ORDER);
};

/**
 * Save shipping info
 * @param {Object} shippingInfo - Shipping info object
 */
export const saveShippingInfo = (shippingInfo) => {
  saveToStorage(STORAGE_KEYS.SHIPPING_INFO, shippingInfo);
};

/**
 * Get shipping info
 * @returns {Object|null}
 */
export const getShippingInfo = () => {
  return getFromStorage(STORAGE_KEYS.SHIPPING_INFO);
};

/**
 * Remove shipping info
 */
export const removeShippingInfo = () => {
  removeFromStorage(STORAGE_KEYS.SHIPPING_INFO);
};

/**
 * Clear order-related data
 */
export const clearOrderData = () => {
  removeCurrentOrder();
  removeShippingInfo();
};
