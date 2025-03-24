<template>
	<v-card>
		<v-card-title v-if="title">
			{{ title }}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
		<v-card-text>
			<FilterCard :fields="fields" :exportFunction="exportAssignments" v-model:filters="filters" />
		</v-card-text>
		<v-card-text>
			<ResponsiveDataTable
				:getToFunction="(item) => ({ name: 'Assignment', params: { assignmentId: item.id } })"
				:headers="defaultHeaders"
				:fetch="getAssignments"
				:templates="{ desktop: 'card', mobile: 'card' }"
				v-model:filters="filters"
			>
				<template #card-slot="{ item }">
					<v-card height="100%" link :to="{ name: 'Assignment', params: { assignmentId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.title }} - {{item.course_details.name}}</v-card-title>
						<v-card-subtitle>{{ item.description.slice(0, 25) }}...</v-card-subtitle>
						<v-card-text>
							<v-chip color="primary">Release: {{ formatDateTime(item.release_at) }}</v-chip>
							<v-chip color="red">Due: {{ formatDateTime(item.due_at) }}</v-chip>
						</v-card-text>
					</v-card>
				</template>
			</ResponsiveDataTable>
		</v-card-text>
	</v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAssignments, exportAssignments } from "../api";
import { formatDateTime } from "@/services/utils";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
	overrideFields: {
		type: Array,
		default: null,
	},
	title: {
		type: String,
		default: null,
	},
	subtitle: {
		type: String,
		default: null,
	},
});

const defaultHeaders = [
	{ label: "Title", key: "title" },
	{ label: "Description", key: "description", type: "longstring" },
	{ label: "Due Date", key: "due_at", type: "date" },
	{ label: "Course", key: "course_details.name", type: "course" },
];

const defaultFilterFields = [
	{
		label: "Search by title",
		type: FIELD_TYPES.STRING,
		key: "title",
		value: "",
		defaultValue: "",
	},
	{
		label: "Filter by course",
		type: FIELD_TYPES.COURSE,
		key: "course",
		value: null,
	},
	{
		label: "Due Date Range",
		type: FIELD_TYPES.DATE_RANGE,
		key: ["due_at_start", "due_at_end"],
		value: null,
	},
];

// Initialize fields with consistent naming
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
