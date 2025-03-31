<template>
	<ServerAutocomplete
		:fetch="getBatches"
		:getInfo="getBatchInfoFromObj"
		:searchField="searchField"
		:multiple="multiple"
		:label="label"
		v-model="model"
	/>
</template>

<script setup>
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";

const model = defineModel();

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
