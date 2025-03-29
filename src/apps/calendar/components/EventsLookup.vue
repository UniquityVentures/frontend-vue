<template>
	<ResponsiveDataTable :fetch="getEvents" v-model:filters="filters"
		title="Events" subtitle="Events Master List">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by title" v-model="filters.title" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by description" v-model="filters.description" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<BatchSelect v-model="filters.batch" label="Filter by batch" />
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<DateRangeSelect
						:filters="filters"
						start-key="start_date"
						end-key="end_date"
						label="Date Range"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<TeacherSelect v-model="filters.created_by" label="Created By" />
				</v-col>
			</v-row>
		</template>
		<template #list-slot="{ items }">
			<v-list>
				<v-list-item v-for="item in items" :key="item.id" link :to="{ name: 'Event', params: { eventId: item.id } }" class="border">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
					<v-chip color="blue">{{ `Start: ${formatDateTime(item.start)}` }}</v-chip>
					<v-chip color="red">{{ `End: ${formatDateTime(item.end)}` }}</v-chip>
				</v-list-item>
			</v-list>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getEvents } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import { formatDateTime } from "@/services/utils";

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

const filters = ref({});
</script>
