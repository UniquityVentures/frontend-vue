<template>
	<v-card variant="flat">
		<v-card-title>
			<FilterCard :fields="fields" />
		</v-card-title>
		<v-card-text>
			<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Event', params: { eventId: item.id } })"
				:headers="eventDefaultHeaders" :fetch="getEvents" v-model="filters">
				<template #list-item-slot="{ item }">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
					<v-list-item-text>
						<v-chip color="blue">{{ `Start: ${formatDateTime(item.start)}` }}</v-chip>
						<v-chip color="red">{{ `End: ${formatDateTime(item.end)}` }}</v-chip>
					</v-list-item-text>
				</template>
			</ResponsiveDataTable>
		</v-card-text>
	</v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { getEvents } from "../api";
import { eventDefaultFilterFields, eventDefaultHeaders } from "../config";
import { formatDateTime } from "@/services/utils";

const props = defineProps({
	overrideFields: {
		type: Array,
	},
});

// Initialize fields with any overrides from props
const fields = ref(props.overrideFields ?? eventDefaultFilterFields);

// Replace the filters ref with computed property
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
