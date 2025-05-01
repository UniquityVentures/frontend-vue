<template>
    <v-checkbox :model-value="displayValue" @update:model-value="updateValue" v-bind="$attrs"></v-checkbox>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Boolean, String],
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

// Convert Python string boolean to JavaScript boolean for display
const displayValue = computed(() => {
    if (typeof props.modelValue === 'string') {
        return props.modelValue === 'True';
    }
    return props.modelValue;
});

// Convert JavaScript boolean to Python string boolean on change
const updateValue = (value) => {
    emit('update:modelValue', value ? 'True' : 'False');
};

defineOptions({
    inheritAttrs: false
});
</script>