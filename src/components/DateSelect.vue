<template>
	<v-date-input
		v-model="model"
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


const model = defineModel();
</script>
