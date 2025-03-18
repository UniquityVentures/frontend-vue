<template>
	<v-card>
		<v-card-title>
			<FilterCard 
				:fields="fields"
				:exportFunction="teacherViewset.export"
				v-model:filters="filters"
			/>
		</v-card-title>
		<ResponsiveDataTable
			:headers="teacherDefaultHeaders"
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

const filters = ref({})
</script>
