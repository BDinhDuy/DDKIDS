<template>
  <v-card
    :class="['base-card', { 'base-card--hover': hover }, customClass]"
    :elevation="elevation"
    :rounded="rounded"
    v-bind="$attrs"
  >
    <v-card-title v-if="title || $slots.title" :class="titleClass">
      <slot name="title">{{ title }}</slot>
    </v-card-title>

    <v-card-subtitle v-if="subtitle || $slots.subtitle" :class="subtitleClass">
      <slot name="subtitle">{{ subtitle }}</slot>
    </v-card-subtitle>

    <v-card-text v-if="$slots.default" :class="contentClass">
      <slot></slot>
    </v-card-text>

    <v-card-actions v-if="$slots.actions" :class="actionsClass">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  elevation: {
    type: [Number, String],
    default: 1
  },
  rounded: {
    type: String,
    default: 'xl'
  },
  hover: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  subtitleClass: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  },
  actionsClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.base-card {
  background-color: #ffffff;
  border: 1px solid #f4f3f0;
}

.base-card--hover {
  transition: all 0.3s ease;
  cursor: pointer;
}

.base-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
</style>
