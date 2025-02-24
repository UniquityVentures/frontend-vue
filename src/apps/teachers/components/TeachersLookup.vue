<template>
	<v-container>
		<v-card variant="flat">
			<v-card-title>
				<FilterCard 
					:fields="fields"
					:exportFunction="teacherViewset.export"
					@update:filters="newFilters => filters = newFilters"
				/>
			</v-card-title>
			<ResponsiveDataTable
				:headers="headers"
				:fetch="getTeachers"
				v-model="filters"
				:getToFunction="(item) => ({name: 'Teacher', params: {teacherId: item.id}})"
				:forceMobile="forceMobile"
			/>
		</v-card>
	</v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { getTeachers, teacherViewset } from "@/apps/teachers/api";
import { getClassrooms } from "@/apps/classrooms/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const classrooms = ref([]);

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

const filters = ref({});  // Just a simple ref now, updated by FilterCard

const headers = [
	{ title: "Name", key: "user_details", formatFunc: (ud) => ud.full_name },
	{ title: "Teacher Id", key: "identifier" },
	{ title: "", key: "actions", align: "end", sortable: false },
];

onMounted(async () => {
	classrooms.value = (await getClassrooms()).results;
});
</script>
