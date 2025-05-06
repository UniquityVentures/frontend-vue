<template>
	<v-date-input 
		v-model="dateModel"
		:label="label"
		:hint="hint"
		persistent-hint
		:disabled="disabled"
		display-format="fullDate"
		multiple="range"
		prepend-icon="mdi-calendar"
		clearable
		color="accent"
		:rules="rules"
	/>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
	filters: {
		type: Object,
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
	},
	hint: {
		type: String,
		default: "",
	},
	rules: {
		required: false,
	},
});

const start = defineModel("start");
const end = defineModel("end");

const dateModel = ref([]);

// Initialize from existing filters if they exist
onMounted(() => {
	if (start.value) {
		dateModel.value.push(new Date(start.value));
	}
	if (end.value) {
		const endDate = new Date(end.value);
		const startDate = new Date(start.value);

		while (endDate >= startDate) {
			startDate.setDate(start.getDate() + 1);
			dateModel.value.push(new Date(startDate));
		}
	}
});

watch(dateModel, (dates) => {
	// If it's a date range (array of dates)
	if (dates?.length && dates.length >= 2) {
		const sortedDates = [...dates].sort((a, b) => a - b);
		// Update both date filters directly on the parent's filters object
		start.value = sortedDates[0];
		end.value = sortedDates[sortedDates.length - 1];
	} else {
		start.value = null;
		end.value = null;
	}
});
</script>
