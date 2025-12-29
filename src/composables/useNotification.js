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

  const show = (text, type = "success", duration = 3000) => {
    message.value = text;
    color.value = type;
    timeout.value = duration;
    snackbar.value = true;
  };

  const success = (text, duration = 3000) => {
    show(text, "success", duration);
  };

  const error = (text, duration = 3000) => {
    show(text, "error", duration);
  };

  const warning = (text, duration = 3000) => {
    show(text, "warning", duration);
  };

  const info = (text, duration = 3000) => {
    show(text, "info", duration);
  };

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
