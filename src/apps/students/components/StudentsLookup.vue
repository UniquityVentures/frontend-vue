<template>
	<v-card>
		<v-card-title>
			{{ title }}
		</v-card-title>
		<v-card-subtitle>
			{{ subtitle }}
		</v-card-subtitle>

		<FilterCard :fields="fields" :exportFunction="exportStudents" v-model:filters="filters" />
		<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
			:headers="studentDefaultHeaders" :fetch="getStudents" v-model:filters="filters" :desktopTemplate="props.overrideDesktopTemplate"
			mobileTemplate="list" />
	</v-card>
</template>

<script setup>
import { ref } from "vue";
import { getStudents, exportStudents } from "../api";
import { studentDefaultHeaders, studentDefaultFilterFields } from "../config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const props = defineProps({
	title: {
		type: String,
		default: 'Students',
	},
	subtitle: {
		type: String,
		default: 'Click on any item to view or edit.',
	},
	overrideFields: {
		type: Array,
	},
	overrideDesktopTemplate: {
		type: String,
		default: 'card',
	},
});

const fields = ref(props.overrideFields ? props.overrideFields : studentDefaultFilterFields)
const filters = ref({})
</script>
