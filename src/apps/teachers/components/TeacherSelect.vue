<template>
</template>

<script setup>
const props = defineProps({
	multiple: {
		type: Boolean,
		default: false,
	},
	searchField: {
		type: String,
		default: "name",
	},
	rules: {
		type: Array,
		default: () => [],
	},
	label: {
		type: String,
		default: "Select Teacher",
	},
	filters: {
		type: Object,
		default: () => {},
	},
});
</script>
