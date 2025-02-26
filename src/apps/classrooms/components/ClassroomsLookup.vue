<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        :fields="fields"
        :exportFunction="exportClassrooms"
      /> 
    </v-card-title>
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Classroom', params: {classroomId: item.id}})" 
      :headers="classroomHeaders" 
      :fetch="getClassrooms" 
      v-model="filters"
      :forceMobile="forceMobile"
    />
  </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { exportClassrooms, getClassrooms, classroomHeaders } from "../api";

const defaultFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
	{
		label: "Grade",
		type: "n_nary",
		key: "standard",
		value: null,
		fetchOptions: () => [
			{ title: "All Grades", value: null },
			...[...Array(10)].map((_, i) => ({
				title: `Grade ${i + 1}`,
				value: (i + 1).toString(),
			})),
		],
	},
	{
		label: "Teacher",
		type: "teacher",
		key: "teacher",
		value: null,
	},
	{
		label: "Status",
		type: "n_nary",
		key: "is_active",
		value: null,
		fetchOptions: () => [
			{ title: "All Classes", value: null },
			{ title: "Active Only", value: "True" },
			{ title: "Inactive Only", value: "False" },
		],
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
</script>
