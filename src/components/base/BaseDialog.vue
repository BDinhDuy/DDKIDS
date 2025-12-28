<template>
  <v-dialog
    v-model="isOpen"
    :max-width="maxWidth"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :scrollable="scrollable"
    v-bind="$attrs"
  >
    <v-card :rounded="rounded" :class="cardClass">
      <!-- Header -->
      <v-card-title
        v-if="title || $slots.title || showClose"
        class="d-flex align-center justify-space-between pa-6 border-b"
      >
        <div class="text-h5 font-weight-bold">
          <slot name="title">{{ title }}</slot>
        </div>
        <v-btn
          v-if="showClose"
          icon="mdi-close"
          variant="text"
          size="small"
          @click="close"
        ></v-btn>
      </v-card-title>

      <!-- Content -->
      <v-card-text :class="['pa-6', contentClass]">
        <slot></slot>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions v-if="$slots.actions" class="pa-6 pt-0">
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: [String, Number],
    default: 500
  },
  persistent: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: String,
    default: 'xl'
  },
  cardClass: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const close = () => {
  isOpen.value = false
  emit('close')
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #f4f3f0;
}
</style>
