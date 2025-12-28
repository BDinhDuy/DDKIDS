<template>
  <div class="base-loading" :class="{ 'base-loading--overlay': overlay }">
    <v-progress-circular
      :size="size"
      :width="width"
      :color="color"
      :indeterminate="indeterminate"
      :model-value="modelValue"
    >
      <slot></slot>
    </v-progress-circular>
    <div v-if="text" class="base-loading__text mt-4">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 64
  },
  width: {
    type: [String, Number],
    default: 6
  },
  color: {
    type: String,
    default: '#ee9d2b'
  },
  indeterminate: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.base-loading--overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}

.base-loading__text {
  font-size: 0.875rem;
  color: #666;
  text-align: center;
}
</style>
