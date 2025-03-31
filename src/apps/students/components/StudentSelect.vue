<template>
    <ServerAutocomplete
        :fetch="getStudents"
        :getInfo="getStudentInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
        :filters="props.filters"
    />
</template>

<script setup>
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";
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
		default: "Select Student/s",
	},
	filters: {
		type: Object,
		default: () => {},
	},
});
</script>
