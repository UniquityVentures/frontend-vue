<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        :fields="fields"
        :exportFunction="exportCourses"
      /> 
    </v-card-title>
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
      :headers="headers" 
      :fetch="getCourses" 
      v-model="filters"
      :forceMobile="forceMobile"
    />
  </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { exportCourses, getCourses } from "../api";

const defaultFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
	{
		label: "Batch",
		type: "batch",
		key: "batch",
		value: null,
	},
	{
		label: "Teacher",
		type: "teacher",
		key: "teacher",
		value: null,
	},
];

const props = defineProps({
	forceMobile: {
		type: Boolean,
		default: false,
	},
	initialFields: {
		type: Array,
		default: () => [],
	},
});

// Initialize fields with any overrides from props
const fields = ref(
	defaultFields.map((defaultField) => {
		const override = props.initialFields.find(
			(f) => f.key === defaultField.key,
		);
		return override ? { ...defaultField, ...override } : defaultField;
	}),
);

// Replace the filters ref with computed property
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

const headers = [
	{ title: "Name", key: "name" },
	{
		title: "Batch",
		key: "batch_details",
		formatFunc: (batch) => batch?.name || "-",
	},
	{
		title: "Teacher",
		key: "teacher_details",
		formatFunc: (teacher) => teacher?.user_details?.full_name || "-",
	},
	{ title: "Actions", key: "actions", sortable: false },
];
</script> 