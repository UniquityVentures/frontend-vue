<template>
	<ServerAutocomplete
		v-model="model"
		:fetch="getTeachers"
		:getInfo="getTeacherInfoFromObj"
		:multiple="multiple"
		:searchField="multiple"
		:label="label"
	/>
</template>

<script setup>
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";

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
		default: "Select Teacher",
	},
	filters: {
		type: Object,
		default: () => {},
	},
});
</script>
