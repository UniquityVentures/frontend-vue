<template>
	<v-card>
		<v-card-title v-if="title">
			{{ title }}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
		<v-card-text>
			<FilterCard :fields="fields" :exportFunction="exportStudents" v-model:filters="filters" />
		</v-card-text>
		<v-card-text>
			<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
				:headers="defaultHeaders" :fetch="getStudents" v-model:filters="filters" :desktopTemplate="props.overrideDesktopTemplate"
				mobileTemplate="list" />
		</v-card-text>
	</v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStudents, exportStudents } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
	title: {
		type: String,
		default: null,
	},
	subtitle: {
		type: String,
		default: null,
	},
	overrideFields: {
		type: Array,
		default: null,
	},
	overrideDesktopTemplate: {
		type: String,
		default: 'card',
	},
});

// Define default headers inline instead of importing from config
const defaultHeaders = [
	{ label: "Name", key: "user_details.full_name" },
	{ label: "Student No", key: "student_no" },
	{ label: "Batch", key: "batch_details", type: "batch" },
	{ label: "Roll Number", key: "roll_no", type: "string" },
];

// Define default filter fields inline instead of importing from config
const defaultFilterFields = [
	{ label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
	{ label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batch", value: null },
	{ label: "Filter by grade level", type: FIELD_TYPES.N_NARY, key: "grade_level", value: null, 
	  fetchOptions: () => [
		{ title: "All Grades", value: null },
		{ title: "Grade 1", value: "1" },
		{ title: "Grade 2", value: "2" },
		{ title: "Grade 3", value: "3" },
		{ title: "Grade 4", value: "4" },
		{ title: "Grade 5", value: "5" },
		{ title: "Grade 6", value: "6" },
		{ title: "Grade 7", value: "7" },
		{ title: "Grade 8", value: "8" },
		{ title: "Grade 9", value: "9" },
		{ title: "Grade 10", value: "10" },
		{ title: "Grade 11", value: "11" },
		{ title: "Grade 12", value: "12" },
	  ]
	},
	{ label: "Filter by status", type: FIELD_TYPES.N_NARY, key: "status", value: null,
	  fetchOptions: () => [
		{ title: "All Students", value: null },
		{ title: "Active", value: "active" },
		{ title: "Inactive", value: "inactive" },
		{ title: "Pending", value: "pending" },
	  ]
	},
	{ label: "Enrollment Date Range", type: FIELD_TYPES.DATE_RANGE, key: ["enrolled_start", "enrolled_end"], value: null },
];

const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});

// Make sure to update fields when overrideFields changes
onMounted(() => {
	// Force reactivity update for fields if coming from props
	if (props.overrideFields) {
		fields.value = JSON.parse(JSON.stringify(props.overrideFields));
	}
});
</script>
