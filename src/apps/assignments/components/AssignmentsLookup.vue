<template>
	<v-card variant="flat">
		<v-card-title>
			<FilterCard 
				:fields="fields"
			/>
		</v-card-title>
		<ResponsiveDataTable 
			:getToFunction="(item) => ({name: 'Assignment', params: {assignmentId: item.id}})" 
			:headers="headers" 
			:fetch="getAssignments" 
			v-model="filters"
			:forceMobile="forceMobile"
		/>
	</v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAssignments } from "@/apps/assignments/api.js";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFields = [
	{
		label: "Search by title",
		type: "string",
		key: "title",
		value: "",
		defaultValue: "",
	},
	{
		label: "Search by description",
		type: "string",
		key: "description",
		value: "",
		defaultValue: "",
	},
	{
		label: "Filter by classroom",
		type: "classroom",
		key: "classroom",
		value: null,
	},
	{
		label: "Filter by subject",
		type: "subject",
		key: "subject",
		value: null,
	},
	{
		label: "Filter by active",
		type: "n_nary",
		key: "is_active",
		value: null,
		fetchOptions: () => [
			{ title: "Active", value: true },
			{ title: "Inactive", value: false },
			{ title: "All", value: null },
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
		default: () => ([]),
	},
});

// Initialize fields with any overrides from props
const fields = ref(defaultFields.map(defaultField => {
	const override = props.initialFields.find(f => f.key === defaultField.key);
	return override ? { ...defaultField, ...override } : defaultField;
}));

const filters = ref({});

// Headers
const formatDate = (dateString) =>
	Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(Date.parse(dateString));

const headers = [
	{ title: "Title", key: "title" },
	{ title: "Release Date", key: "release_at", formatFunc: formatDate },
	{ title: "Due Date", key: "due_at", formatFunc: formatDate },
	{ title: "Subject", key: "subject_details", formatFunc: (item) => item.name },
	{ title: "Actions", key: "actions", sortable: false },
];
</script>
