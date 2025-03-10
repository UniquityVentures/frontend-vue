<template>
	<v-container>
		<v-card variant="flat">
			<v-card-title>
				<FilterCard 
					:fields="fields"
					:exportFunction="teacherViewset.export"
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
import { getTeachers, teacherViewset } from "@/apps/teachers/api";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";

const defaultFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
	{
		label: "Filter by batch",
		type: "batch",
		key: "batches",
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
	{ title: "Name", key: "user_details", formatFunc: (ud) => ud.full_name },
	{ title: "Teacher Id", key: "identifier" },
	{ title: "", key: "actions", align: "end", sortable: false },
];
</script>
