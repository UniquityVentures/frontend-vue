<template>
	<FilterCard></FilterCard>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

import { computed, ref } from "vue";

const defaultFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
];

const filters = computed(() =>
	defaultFields.reduce((acc, e) => {
		acc[e.key] = e.value;
		return acc;
	}, {}),
);

</script>
