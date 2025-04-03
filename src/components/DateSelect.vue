<template>
	<v-date-input
		:model-value="dateModel"
		@update:model-value="updateDate"
		:label="label"
		:hint="hint"
		persistent-hint
		:disabled="disabled"
		prepend-icon="mdi-calendar"
	/>
</template>

<script setup>
import { ref, computed } from 'vue';
import { stringToDate, dateToString } from '@/services/utils';

const props = defineProps({
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


const model = defineModel({default:""}) 

// The key part: computed property for the v-model
const dateModel = computed(() => {
	return stringToDate(model.value);
});

// Handle date updates
const updateDate = (newValue) => {
	if (!newValue) {
		model.value = "";
		return;
	}
	try {
		const dateValue = newValue instanceof Date ? newValue : new Date(newValue);
		const formattedDate = dateToString(dateValue);
		model.value = formattedDate;
	} catch (e) {
		model.value = "";
	}
};
</script>
