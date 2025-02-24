<template>
	<v-container>
		<v-card variant="flat">
			<v-card-title>
				<FilterCard 
					:fields="fields"
					:exportFunction="studentViewset.export"
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
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import { getStudents, studentViewset } from "@/apps/students/api";
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
		default: () => ([]),
	},
});

// Initialize fields with any overrides from props
const fields = ref(defaultFields.map(defaultField => {
	const override = props.initialFields.find(f => f.key === defaultField.key);
	return override ? { ...defaultField, ...override } : defaultField;
}));

// Computed property to transform fields into filters object for ResponsiveDataTable
const filters = ref({});

const headers = [
	{ title: "Name", key: "user_details", formatFunc: (item) => item.full_name },
	{ title: "Student No", key: "student_no" },
	{ title: "", key: "actions", align: "end", sortable: false },
];
</script>
