/**
 * useForm - Form validation and submission composable
 * Handles form state, validation, and submission logic
 */
import { ref, computed } from "vue";

export function useForm(initialValues = {}) {
  const formData = ref({ ...initialValues });
  const formRef = ref(null);
  const isSubmitting = ref(false);
  const errors = ref({});

  /**
   * Validate form
   * @returns {Promise<boolean>}
   */
  const validate = async () => {
    if (!formRef.value) return false;

    const { valid } = await formRef.value.validate();
    return valid;
  };

  /**
   * Reset form
   */
  const reset = () => {
    formData.value = { ...initialValues };
    errors.value = {};
    if (formRef.value) {
      formRef.value.reset();
    }
  };

  /**
   * Reset validation
   */
  const resetValidation = () => {
    errors.value = {};
    if (formRef.value) {
      formRef.value.resetValidation();
    }
  };

  /**
   * Set field value
   * @param {string} field
   * @param {any} value
   */
  const setFieldValue = (field, value) => {
    formData.value[field] = value;
  };

  /**
   * Set field error
   * @param {string} field
   * @param {string} error
   */
  const setFieldError = (field, error) => {
    errors.value[field] = error;
  };

  /**
   * Clear field error
   * @param {string} field
   */
  const clearFieldError = (field) => {
    delete errors.value[field];
  };

  /**
   * Handle form submission
   * @param {Function} submitFn - Function to execute on submit
   * @returns {Promise<void>}
   */
  const handleSubmit = async (submitFn) => {
    const isValid = await validate();
    if (!isValid) return;

    isSubmitting.value = true;
    errors.value = {};

    try {
      await submitFn(formData.value);
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  const isValid = computed(() => Object.keys(errors.value).length === 0);

  return {
    formData,
    formRef,
    isSubmitting,
    errors,
    isValid,
    validate,
    reset,
    resetValidation,
    setFieldValue,
    setFieldError,
    clearFieldError,
    handleSubmit,
  };
}
