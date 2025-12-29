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

  const validate = async () => {
    if (!formRef.value) return false;

    const { valid } = await formRef.value.validate();
    return valid;
  };

  const reset = () => {
    formData.value = { ...initialValues };
    errors.value = {};
    if (formRef.value) {
      formRef.value.reset();
    }
  };

  const resetValidation = () => {
    errors.value = {};
    if (formRef.value) {
      formRef.value.resetValidation();
    }
  };

  const setFieldValue = (field, value) => {
    formData.value[field] = value;
  };

  const setFieldError = (field, error) => {
    errors.value[field] = error;
  };

  const clearFieldError = (field) => {
    delete errors.value[field];
  };

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
