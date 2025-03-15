<template>
	<v-card>
		<v-card-title>
			{{ title }}
		</v-card-title>
		<v-card-subtitle>
			{{ subtitle }}
		</v-card-subtitle>

		<FilterCard :fields="fields" :exportFunction="exportStudents" />
		<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
			:headers="studentDefaultHeaders" :fetch="getStudents" v-model="filters" :desktopTemplate="props.overrideDesktopTemplate"
			mobileTemplate="list" />
	</v-card>
</template>

<script setup>
import { ref, computed } from "vue";
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

const filters = computed(() => {
	return fields.value.reduce((acc, field) => {
		if (Array.isArray(field.key)) {
			field.key.forEach((k, i) => {
				acc[k] = field.value?.[i] ?? null;
			});
		} else {
			acc[field.key] = field.value;
		}
		return acc;
	}, {});
});
</script>
