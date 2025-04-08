<template>
	<v-date-input
		v-model="dateModel"
		:label="label"
		:hint="hint"
		persistent-hint
		:disabled="disabled"
		display-format="fullDate"
		prepend-icon="mdi-calendar"
		:rules="rules"
		:required="required"
	/>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { toApiDate } from "@/services/utils";

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
	rules: {
		required: false,
	},
	required: {
		type: Boolean,
		default: false
	}
});

const dateModel = ref();

const model = defineModel();

watch(dateModel, (date) => {
	model.value = toApiDate(date);
});

onMounted(() => {
	if (model.value) {
		dateModel.value = new Date(model.value);
	}
})
</script>
