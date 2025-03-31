<template>
    <ServerAutocomplete
        :fetch="getTransactionPurposes"
        :getInfo="getTransactionPurposeInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import {
	getTransactionPurposeInfoFromObj,
	getTransactionPurposes,
} from "@/apps/finances/api";
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
		default: "Select Payment Purpose",
	},
});
</script>
