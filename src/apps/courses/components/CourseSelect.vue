<template>
    <ServerAutocomplete
        :fetch="getCourses"
        :getInfo="getCourseInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
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
		default: "Select Course",
	},
});
</script>