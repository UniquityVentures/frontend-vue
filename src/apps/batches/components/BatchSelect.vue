<template>
</template>

<script setup>
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";

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
		default: "Select Batch",
	},
});
</script>
