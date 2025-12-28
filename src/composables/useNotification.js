/**
 * useNotification - Notification/Toast composable
 * Handles showing notifications and messages
 */
import { ref } from "vue";

export function useNotification() {
  const snackbar = ref(false);
  const message = ref("");
  const color = ref("success");
  const timeout = ref(3000);

  /**
   * Show notification
   * @param {string} text - Message to display
   * @param {string} type - Type of notification (success, error, warning, info)
   * @param {number} duration - Duration in milliseconds
   */
  const show = (text, type = "success", duration = 3000) => {
    message.value = text;
    color.value = type;
    timeout.value = duration;
    snackbar.value = true;
  };

  /**
   * Show success notification
   * @param {string} text - Message to display
   * @param {number} duration - Duration in milliseconds
   */
  const success = (text, duration = 3000) => {
    show(text, "success", duration);
  };

  /**
   * Show error notification
   * @param {string} text - Message to display
   * @param {number} duration - Duration in milliseconds
   */
  const error = (text, duration = 3000) => {
    show(text, "error", duration);
  };

  /**
   * Show warning notification
   * @param {string} text - Message to display
   * @param {number} duration - Duration in milliseconds
   */
  const warning = (text, duration = 3000) => {
    show(text, "warning", duration);
  };

  /**
   * Show info notification
   * @param {string} text - Message to display
   * @param {number} duration - Duration in milliseconds
   */
  const info = (text, duration = 3000) => {
    show(text, "info", duration);
  };

  /**
   * Close notification
   */
  const close = () => {
    snackbar.value = false;
  };

  return {
    snackbar,
    message,
    color,
    timeout,
    show,
    success,
    error,
    warning,
    info,
    close,
  };
}
