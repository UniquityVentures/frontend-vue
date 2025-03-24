<template>
    <v-date-input :label="label" v-model="internalValue" multiple="range" clearable :disabled="disabled" color="primary"
        @update:model-value="handleDateUpdate" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    },
    startKey: {
        type: String,
        required: true,
    },
    endKey: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: "Select Date Range",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    clearable: {
        type: Boolean,
        default: true,
    }
});

// Internal value to track the v-date-input state
const internalValue = ref(null);

// Initialize from existing filters if they exist
onMounted(() => {
    if (props.filters[props.startKey] && props.filters[props.endKey]) {
        internalValue.value = [
            props.filters[props.startKey],
            props.filters[props.endKey]
        ];
    }
});

// Handle date range change
const handleDateUpdate = (value) => {
    internalValue.value = value;

    if (!value) {
        // Clear both start and end date filters
        props.filters[props.startKey] = null;
        props.filters[props.endKey] = null;
        return;
    }

    // If it's a date range (array of dates)
    if (Array.isArray(value) && value.length >= 2) {
        const dates = [...value].sort((a, b) => new Date(a) - new Date(b));

        // Update both date filters directly on the parent's filters object
        props.filters[props.startKey] = dates[0];
        props.filters[props.endKey] = dates[dates.length - 1];
    }
};
</script>
