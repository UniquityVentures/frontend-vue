<template>
	<v-date-input
		v-model="dateModel"
		:label="label"
		:hint="hint"
		persistent-hint
		:disabled="disabled"
		display-format="fullDate"
		prepend-icon="mdi-calendar"
	/>
</template>

<script setup>
import { ref, watch } from "vue";
import { dateToString } from "@/services/utils";

const props = defineProps({
	label: {
		type: String,
		default: "Select Date",
	},
	hint: {
		type: String,
		default: "",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const dateModel = ref();

const model = defineModel();

watch(dateModel, (date) => {
	model.value = dateToString(date);
});
</script>
