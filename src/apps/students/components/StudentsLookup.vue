<template>
	<v-card>
		<v-card-title>
			<FilterCard 
				:fields="fields"
				:exportFunction="exportStudents"
			/>
		</v-card-title>

		<ResponsiveDataTable 
			:getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id }})" 
			:headers="headers" 
			:fetch="getStudents" 
			v-model="filters"
			:forceMobile="forceMobile"
		/>
	</v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { getStudents, exportStudents } from "@/apps/students/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
	{
		label: "Filter by classroom",
		type: "classroom",
		key: "classrooms",
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
	{ title: "Name", key: "user_details", formatFunc: (item) => item.full_name },
	{ title: "Student No", key: "student_no" },
	{ title: "", key: "actions", align: "end", sortable: false },
];
</script>
