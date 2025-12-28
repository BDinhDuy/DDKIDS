/**
 * useDialog - Dialog/Modal management composable
 * Handles dialog state and controls
 */
import { ref } from "vue";

export function useDialog(initialState = false) {
  const isOpen = ref(initialState);
  const dialogData = ref(null);

  /**
   * Open dialog
   * @param {any} data - Optional data to pass to dialog
   */
  const open = (data = null) => {
    dialogData.value = data;
    isOpen.value = true;
  };

  /**
   * Close dialog
   */
  const close = () => {
    isOpen.value = false;
    dialogData.value = null;
  };

  /**
   * Toggle dialog
   */
  const toggle = () => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
      dialogData.value = null;
    }
  };

  return {
    isOpen,
    dialogData,
    open,
    close,
    toggle,
  };
}
