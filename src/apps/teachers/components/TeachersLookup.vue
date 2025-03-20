<template>
	<v-card>
		<v-card-title v-if="title">
			{{ title }}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
		<v-card-text>
			<FilterCard 
				:fields="fields"
				:exportFunction="exportTeachers"
				v-model:filters="filters"
			/>
		</v-card-text>
		<v-card-text>
			<ResponsiveDataTable
				:headers="defaultHeaders"
				:fetch="getTeachers"
				v-model:filters="filters"
				:getToFunction="(item) => ({name: 'Teacher', params: {teacherId: item.id}})"
				desktopTemplate="card"
				mobileTemplate="card"
			>
				<template #card-item-slot="{ item }">
					<v-card height="100%" link :to="{ name: 'Teacher', params: { teacherId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.user_details.full_name }}</v-card-title>
						<v-card-subtitle>{{ item.identifier }}</v-card-subtitle>
						<v-card-text>
							<v-chip prepend-icon="mdi-email" color="primary">
								{{ item.user_details.email }}
							</v-chip>
							<v-chip prepend-icon="mdi-phone" color="blue">
								{{ item.phone }}
							</v-chip>
							<v-chip prepend-icon="mdi-whatsapp" color="green">
								{{ item.whatsapp }}
							</v-chip>
						</v-card-text>
					</v-card>
				</template>
			</ResponsiveDataTable>
		</v-card-text>
	</v-card>
</template>

<script setup>
import { getTeachers, exportTeachers } from "@/apps/teachers/api";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
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

// Define default headers inline instead of importing from config
const defaultHeaders = [
	{ label: "Name", key: "user_details.full_name" },
	{ label: "Teacher Id", key: "identifier" },
	{ label: "Phone", key: "phone" },
	{ label: "Email", key: "user_details.email" },
];

// Define default filter fields inline instead of importing from config
const defaultFilterFields = [
	{ label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
	{ label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batches", value: null },
	{ label: "Filter by course", type: FIELD_TYPES.COURSE, key: "courses", value: null },
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
