<template>
	<v-card>
		<v-card-title v-if="title">
			{{ title }}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
		<v-card-text>
			<FilterCard :fields="fields" v-model:filters="filters" />
		</v-card-text>
		<v-card-text>
			<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Event', params: { eventId: item.id } })"
				:headers="defaultHeaders" :fetch="getEvents" v-model:filters="filters">
				<template #list-item-slot="{ item }">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
					<v-chip color="blue">{{ `Start: ${formatDateTime(item.start)}` }}</v-chip>
					<v-chip color="red">{{ `End: ${formatDateTime(item.end)}` }}</v-chip>
				</template>
			</ResponsiveDataTable>
		</v-card-text>
	</v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
import { getEvents } from "../api";
import { formatDateTime } from "@/services/utils";
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
});

// Define default headers inline
const defaultHeaders = [
	{ label: "Title", key: "title" },
	{ label: "Description", key: "description", type: "longstring" }, 
	{ label: "Start", key: "start", type: "datetime" },
	{ label: "End", key: "end", type: "datetime" },
	{ label: "Location", key: "location" },
	{ label: "Created By", key: "created_by_details", type: "teacher" }
];

// Define default filter fields inline
const defaultFilterFields = [
	{ label: "Search by title", type: FIELD_TYPES.STRING, key: "title", value: "", defaultValue: "" },
	{ label: "Search by location", type: FIELD_TYPES.STRING, key: "location", value: "", defaultValue: "" },
	{ label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batch", value: null },
	{ label: "Date Range", type: FIELD_TYPES.DATE_RANGE, key: ["start_start", "start_end"], value: null },
	{ label: "Created By", type: FIELD_TYPES.TEACHER, key: "created_by", value: null }
];

// Initialize fields with proper reactivity handling
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
