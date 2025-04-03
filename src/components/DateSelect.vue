<template>
  <v-date-input
    :model-value="dateModel"
    @update:model-value="updateDate"
    :label="label"
    :hint="hint"
    persistent-hint
    :disabled="disabled"
    prepend-icon="mdi-calendar"
  ></v-date-input>
</template>

<script setup>
import { ref, computed } from 'vue';
import { stringToDate, dateToString } from '@/services/utils';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Select Date',
  },
  hint: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  }
});

const emit = defineEmits(['update:modelValue']);

// The key part: computed property for the v-model
const dateModel = computed(() => {
  return stringToDate(props.modelValue);
});

// Handle date updates
const updateDate = (newValue) => {
  if (!newValue) {
    emit('update:modelValue', '');
    return;
  }
  try {
    const dateValue = newValue instanceof Date ? newValue : new Date(newValue);
    const formattedDate = dateToString(dateValue);
    emit('update:modelValue', formattedDate);
  } catch (e) {
    emit('update:modelValue', '');
  }
};
</script>
