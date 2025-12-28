<template>
  <v-btn
    :class="['base-button', variantClass, customClass]"
    :color="color"
    :size="size"
    :variant="variant"
    :disabled="disabled || loading"
    :loading="loading"
    :block="block"
    :rounded="rounded"
    v-bind="$attrs"
    @click="handleClick"
  >
    <v-icon v-if="prependIcon" :icon="prependIcon" class="mr-2"></v-icon>
    <slot>{{ text }}</slot>
    <v-icon v-if="appendIcon" :icon="appendIcon" class="ml-2"></v-icon>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ee9d2b'
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['x-small', 'small', 'default', 'large', 'x-large'].includes(value)
  },
  variant: {
    type: String,
    default: 'flat',
    validator: (value) => ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'xl'
  },
  prependIcon: {
    type: String,
    default: ''
  },
  appendIcon: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const variantClass = computed(() => `base-button--${props.variant}`)

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  font-weight: 700;
  text-transform: none;
  letter-spacing: normal;
}

.base-button--flat,
.base-button--elevated {
  color: white !important;
}

.base-button--flat:not(:disabled):hover,
.base-button--elevated:not(:disabled):hover {
  background-color: #d68a1f !important;
}

.base-button--flat {
  box-shadow: 0 4px 12px rgba(238, 157, 43, 0.3) !important;
}
</style>
