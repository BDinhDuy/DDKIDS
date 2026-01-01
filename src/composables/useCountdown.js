/**
 * useCountdown - Countdown timer composable
 * Handles countdown logic with auto-callback
 */
import { ref, computed, onUnmounted } from "vue";

export function useCountdown(initialSeconds = 5) {
  const countdown = ref(initialSeconds);
  const isRunning = ref(false);
  let intervalId = null;

  const start = (callback, seconds = initialSeconds) => {
    if (isRunning.value) {
      stop();
    }

    countdown.value = seconds;
    isRunning.value = true;

    intervalId = setInterval(() => {
      countdown.value--;

      if (countdown.value <= 0) {
        stop();
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    }, 1000);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isRunning.value = false;
  };

  const reset = (seconds = initialSeconds) => {
    stop();
    countdown.value = seconds;
  };

  const pause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isRunning.value = false;
  };

  const resume = (callback) => {
    if (!isRunning.value && countdown.value > 0) {
      start(callback, countdown.value);
    }
  };

  // Progress percentage (0-100)
  const progress = computed(() => {
    return ((initialSeconds - countdown.value) / initialSeconds) * 100;
  });

  // Cleanup on unmount
  onUnmounted(() => {
    stop();
  });

  return {
    countdown,
    isRunning,
    progress,
    start,
    stop,
    reset,
    pause,
    resume,
  };
}
