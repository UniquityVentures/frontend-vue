<template>
	<v-card>
		<v-card-title>
			<FilterCard 
				:fields="fields"
				:exportFunction="teacherViewset.export"
			/>
		</v-card-title>
		<ResponsiveDataTable
			:headers="teacherDefaultHeaders"
			:fetch="getTeachers"
			v-model="filters"
			:getToFunction="(item) => ({name: 'Teacher', params: {teacherId: item.id}})"
			desktopTemplate="card"
		/>
	</v-card>
</template>

<script setup>
import { getTeachers, teacherViewset } from "@/apps/teachers/api";
import { teacherDefaultFilterFields, teacherDefaultHeaders } from "@/apps/teachers/config";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";

const props = defineProps({
	overrideFields: {
		type: Array,
		default: () => [],
	},
});

// Initialize fields with any overrides from props
const fields = ref(
	teacherDefaultFilterFields.map((defaultField) => {
		const override = props.overrideFields.find(
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
</script>
